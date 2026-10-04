import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';

// ---------- TYPES ----------
type SymbolDef = { icon: string; weight: number; pay: number; pair: number };
type WinKind = 'none' | 'pair' | 'triple';
type Grid = string[][]; // grid[reel][row]

// ---------- CONFIG ----------
// pay  = bet multiplier when 3 match on the middle row
// pair = bet multiplier when any 2 match on the middle row
const SYMBOLS: SymbolDef[] = [
  { icon: '🍒', weight: 30, pay: 3, pair: 0.5 },
  { icon: '🍋', weight: 25, pay: 5, pair: 0.75 },
  { icon: '🍊', weight: 20, pay: 8, pair: 1.5 },
  { icon: '🍇', weight: 12, pay: 12, pair: 2 },
  { icon: '🔔', weight: 7, pay: 30, pair: 3 },
  { icon: '⭐', weight: 4, pay: 40, pair: 5 },
  { icon: '💎', weight: 3, pay: 100, pair: 8 },
];
const TOTAL_WEIGHT = SYMBOLS.reduce((s, x) => s + x.weight, 0);

const START_BALANCE = 1000;
const BETS = [10, 20, 50, 100];
const REELS = 3;
const CELL = 84;
const VISIBLE = 3;
const MID = 1; // payline = middle row
const FILLER = 18;
const BULBS = 12;

const randomSymbol = (): string => {
  let r = Math.random() * TOTAL_WEIGHT;
  for (const s of SYMBOLS) {
    if ((r -= s.weight) <= 0) return s.icon;
  }
  return SYMBOLS[0].icon;
};
const randomColumn = (): string[] => Array.from({ length: VISIBLE }, randomSymbol);

// Middle row only: 3 identical = big win, any 2 identical = small win
function calcWin(grid: Grid, bet: number): { win: number; kind: WinKind } {
  const line = grid.map((col) => col[MID]);
  const find = (icon: string) => SYMBOLS.find((s) => s.icon === icon);

  if (line.every((s) => s === line[0])) {
    return { win: Math.round(bet * (find(line[0])?.pay ?? 0)), kind: 'triple' };
  }

  // find a symbol that appears exactly twice (any positions)
  for (const icon of line) {
    if (line.filter((s) => s === icon).length === 2) {
      return { win: Math.round(bet * (find(icon)?.pair ?? 0)), kind: 'pair' };
    }
  }
  return { win: 0, kind: 'none' };
}

// ---------- REEL ----------
function Reel({ strip, anim }: { strip: string[]; anim: Animated.Value }) {
  return (
    <View style={styles.reelWindow}>
      <Animated.View style={{ transform: [{ translateY: anim }] }}>
        {strip.map((icon, i) => (
          <View key={i} style={styles.cell}>
            <Text style={styles.symbol}>{icon}</Text>
          </View>
        ))}
      </Animated.View>
      {/* glass shading to look like a cylinder */}
      <View pointerEvents="none" style={[styles.shade, { top: 0, opacity: 0.55 }]} />
      <View pointerEvents="none" style={[styles.shade, { bottom: 0, opacity: 0.55 }]} />
    </View>
  );
}

// ---------- MAIN ----------
export default function App() {
  const [balance, setBalance] = useState(START_BALANCE);
  const [bet, setBet] = useState(BETS[0]);
  const [spinning, setSpinning] = useState(false);
  const [lastWin, setLastWin] = useState(0);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState('INSERT BET & PULL');
  const [strips, setStrips] = useState<string[][]>(() =>
    Array.from({ length: REELS }, randomColumn)
  );

  const anims = useRef(
    Array.from({ length: REELS }, () => new Animated.Value(0))
  ).current;
  const lever = useRef(new Animated.Value(0)).current;
  const blink = useRef(new Animated.Value(0)).current;
  const flash = useRef(new Animated.Value(0)).current;

  // marquee bulbs blinking
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(blink, { toValue: 1, duration: 450, useNativeDriver: true }),
        Animated.timing(blink, { toValue: 0, duration: 450, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [blink]);

  // win line flashing
  useEffect(() => {
    if (!won) {
      flash.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(flash, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(flash, { toValue: 0.2, duration: 300, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [won, flash]);

  const canSpin = !spinning && balance >= bet;

  const changeBet = (dir: 1 | -1) => {
    if (spinning) return;
    const i = BETS.indexOf(bet) + dir;
    if (i >= 0 && i < BETS.length) setBet(BETS[i]);
  };

  const spin = () => {
    if (!canSpin) return;

    setSpinning(true);
    setWon(false);
    setLastWin(0);
    setMessage('SPINNING...');
    setBalance((b) => b - bet);

    // lever pull animation
    Animated.sequence([
      Animated.timing(lever, { toValue: 1, duration: 180, useNativeDriver: true }),
      Animated.timing(lever, { toValue: 0, duration: 350, useNativeDriver: true }),
    ]).start();

    const finals: Grid = Array.from({ length: REELS }, randomColumn);
    const newStrips = strips.map((cur, i) => [
      ...cur.slice(-VISIBLE),
      ...Array.from({ length: FILLER }, randomSymbol),
      ...finals[i],
    ]);

    anims.forEach((a) => a.setValue(0));
    setStrips(newStrips);

    Animated.parallel(
      newStrips.map((strip, i) =>
        Animated.timing(anims[i], {
          toValue: -(strip.length - VISIBLE) * CELL,
          duration: 1400 + i * 500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
          useNativeDriver: true,
        })
      )
    ).start(() => {
      setStrips(finals);
      anims.forEach((a) => a.setValue(0));

      const { win, kind } = calcWin(finals, bet);
      if (win > 0) {
        setBalance((b) => b + win);
        setLastWin(win);
        setWon(true);
        setMessage(kind === 'triple' ? '*** JACKPOT! ***' : 'PAIR! SMALL WIN');
      } else {
        setMessage('TRY AGAIN');
      }
      setSpinning(false);
    });
  };

  const reset = () => {
    setBalance(START_BALANCE);
    setLastWin(0);
    setWon(false);
    setMessage('INSERT BET & PULL');
  };

  const broke = !spinning && balance < BETS[0];

  const leverY = lever.interpolate({ inputRange: [0, 1], outputRange: [0, 62] });

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0b0618" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.machineRow}>
          {/* ===== CABINET ===== */}
          <View style={styles.cabinet}>
            {/* marquee */}
            <View style={styles.marquee}>
              <View style={styles.bulbRow}>
                {Array.from({ length: BULBS }).map((_, i) => (
                  <Animated.View
                    key={i}
                    style={[
                      styles.bulb,
                      {
                        opacity:
                          i % 2 === 0
                            ? blink
                            : blink.interpolate({ inputRange: [0, 1], outputRange: [1, 0.15] }),
                      },
                    ]}
                  />
                ))}
              </View>
              <Text style={styles.marqueeText}>LUCKY 777</Text>
            </View>

            {/* reel window */}
            <View style={styles.reelFrame}>
              <View style={styles.reelsRow}>
                {strips.map((strip, i) => (
                  <Reel key={i} strip={strip} anim={anims[i]} />
                ))}

                {/* payline */}
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.payline,
                    { opacity: won ? flash : 0.9, backgroundColor: won ? '#22c55e' : '#ef4444' },
                  ]}
                />
                {won && (
                  <Animated.View pointerEvents="none" style={[styles.winBox, { opacity: flash }]} />
                )}
              </View>
              <Text style={[styles.arrow, { left: -2 }]}>▶</Text>
              <Text style={[styles.arrow, { right: -2 }]}>◀</Text>
            </View>

            {/* control panel */}
            <View style={styles.panel}>
              <View style={styles.lcdRow}>
                <View style={styles.lcd}>
                  <Text style={styles.lcdLabel}>CREDIT</Text>
                  <Text style={styles.lcdValue}>{balance}</Text>
                </View>
                <View style={styles.lcd}>
                  <Text style={styles.lcdLabel}>WIN</Text>
                  <Text style={[styles.lcdValue, won && { color: '#fde047' }]}>{lastWin}</Text>
                </View>
              </View>

              <Text style={styles.msg}>{message}</Text>

              <View style={styles.btnRow}>
                <TouchableOpacity style={styles.smallBtn} onPress={() => changeBet(-1)} disabled={spinning}>
                  <Text style={styles.smallBtnText}>−</Text>
                </TouchableOpacity>
                <View style={styles.betLcd}>
                  <Text style={styles.lcdLabel}>BET</Text>
                  <Text style={styles.lcdValue}>{bet}</Text>
                </View>
                <TouchableOpacity style={styles.smallBtn} onPress={() => changeBet(1)} disabled={spinning}>
                  <Text style={styles.smallBtnText}>+</Text>
                </TouchableOpacity>

                {broke ? (
                  <TouchableOpacity style={styles.spinBtn} onPress={reset}>
                    <Text style={styles.spinText}>RESET</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={[styles.spinBtn, !canSpin && { opacity: 0.5 }]}
                    onPress={spin}
                    disabled={!canSpin}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.spinText}>SPIN</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* coin tray */}
            <View style={styles.tray}>
              <View style={styles.trayHole} />
            </View>
          </View>

          {/* ===== LEVER ===== */}
          <TouchableOpacity activeOpacity={1} onPress={spin} disabled={!canSpin} style={styles.leverWrap}>
            <View style={styles.leverBase} />
            <View style={styles.leverRod} />
            <Animated.View style={[styles.leverBall, { transform: [{ translateY: leverY }] }]} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ---------- STYLES ----------
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#0b0618' },
  scroll: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 24 },
  machineRow: { flexDirection: 'row', alignItems: 'flex-start' },

  cabinet: {
    backgroundColor: '#b91c1c',
    borderWidth: 5,
    borderColor: '#facc15',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    padding: 10,
    alignItems: 'center',
    elevation: 14,
  },

  marquee: {
    width: '100%',
    backgroundColor: '#450a0a',
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#facc15',
    paddingVertical: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  bulbRow: { flexDirection: 'row', justifyContent: 'space-between', width: '88%', marginBottom: 4 },
  bulb: { width: 9, height: 9, borderRadius: 5, backgroundColor: '#fde047' },
  marqueeText: { color: '#fde047', fontSize: 26, fontWeight: '900', letterSpacing: 4 },

  reelFrame: {
    backgroundColor: '#1c1917',
    borderWidth: 4,
    borderColor: '#d4d4d8',
    borderRadius: 12,
    padding: 8,
    paddingHorizontal: 14,
  },
  reelsRow: { flexDirection: 'row', gap: 4, backgroundColor: '#000' },
  reelWindow: {
    width: CELL,
    height: CELL * VISIBLE,
    overflow: 'hidden',
    backgroundColor: '#fffbeb',
  },
  cell: { width: CELL, height: CELL, alignItems: 'center', justifyContent: 'center' },
  symbol: { fontSize: 48 },
  shade: { position: 'absolute', left: 0, right: 0, height: CELL * 0.8, backgroundColor: '#000' },

  payline: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: CELL * MID + CELL / 2 - 1.5,
    height: 3,
  },
  winBox: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: CELL * MID,
    height: CELL,
    borderWidth: 3,
    borderColor: '#22c55e',
    backgroundColor: 'rgba(34,197,94,0.25)',
  },
  arrow: { position: 'absolute', top: '50%', marginTop: -10, color: '#ef4444', fontSize: 16 },

  panel: {
    width: '100%',
    backgroundColor: '#292524',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#a8a29e',
    padding: 10,
    marginTop: 10,
  },
  lcdRow: { flexDirection: 'row', gap: 8 },
  lcd: {
    flex: 1,
    backgroundColor: '#052e16',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#14532d',
    alignItems: 'center',
    paddingVertical: 4,
  },
  betLcd: {
    backgroundColor: '#052e16',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#14532d',
    alignItems: 'center',
    paddingVertical: 2,
    width: 52,
  },
  lcdLabel: { color: '#86efac', fontSize: 9, fontWeight: '700', letterSpacing: 1 },
  lcdValue: { color: '#4ade80', fontSize: 20, fontWeight: '800', fontVariant: ['tabular-nums'] },
  msg: {
    color: '#fde047',
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 13,
    letterSpacing: 1,
    marginVertical: 8,
  },
  btnRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  smallBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#facc15',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 4,
    borderBottomColor: '#a16207',
  },
  smallBtnText: { fontSize: 22, fontWeight: '900', color: '#450a0a', marginTop: -2 },
  spinBtn: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#22c55e',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 5,
    borderBottomColor: '#15803d',
    marginLeft: 4,
  },
  spinText: { color: '#fff', fontWeight: '900', fontSize: 18, letterSpacing: 2 },


  tray: {
    marginTop: 10,
    width: '70%',
    height: 26,
    backgroundColor: '#78716c',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#d6d3d1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trayHole: { width: '80%', height: 8, borderRadius: 4, backgroundColor: '#0c0a09' },

  leverWrap: { width: 34, height: 190, marginTop: 110, marginLeft: -2, alignItems: 'center' },
  leverBase: {
    position: 'absolute',
    top: 70,
    width: 16,
    height: 40,
    backgroundColor: '#a8a29e',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    left: 0,
  },
  leverRod: {
    position: 'absolute',
    top: 8,
    left: 11,
    width: 8,
    height: 90,
    backgroundColor: '#d4d4d8',
    borderRadius: 4,
  },
  leverBall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ef4444',
    borderWidth: 3,
    borderColor: '#fecaca',
    marginTop: -16 + 8,
  },
});

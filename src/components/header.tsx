import { Menu, X, Wallet, Droplets, Users, Swords, Factory, Settings } from 'lucide-react-native';
import { View, Pressable, Text, StyleSheet } from "react-native";
import { useState } from 'react';
import { router } from 'expo-router';

const COLORS = {
  green: "#00ff88",
  grayLight: '#A0A0A0'
};

function MenuItem({
  icon,
  title,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={styles.menuItem}
      onPress={onPress}
    >
      
      <Text style={styles.menuText}>
        {title}
      </Text>

      {icon}
    </Pressable>
  );
}

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigateTo = (path: any) => {
    setMenuOpen(false);
    router.push(path);
  };
  return (
    <View style={styles.header}>

      <View style={styles.headerRight}>
        <Text style={styles.dayText}>DAY 127</Text>
      </View>

      <View style={styles.headerLeft}>
        <View>
          <Text style={styles.logo}>WAR ZONE</Text>
          <Text style={styles.logoSubtitle}>
            STRATEGY // POWER // CONTROL
          </Text>
        </View>
      </View>

      <Pressable
          style={styles.menuButton}
          onPress={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X size={26} color="#00ff88" />
          ) : (
            <Menu size={26} color="#00ff88" />
          )}
        </Pressable>

      {/* Menu */}
      {menuOpen && (
        <View style={styles.menu}>
          <MenuItem
            icon={<Wallet size={21} color="#00ff88" />}
            title="Dashboard"
            onPress={() => navigateTo('/dashboard')}
          />

          <MenuItem
            icon={<Swords size={21} color="#00ff88" />}
            title="Army"
            onPress={() => navigateTo('/army')}
          />

          <MenuItem
            icon={<Droplets size={21} color="#00ff88" />}
            title="Resources"
            onPress={() => navigateTo('/resources')}
          />

          <MenuItem
            icon={<Factory size={21} color="#00ff88" />}
            title="Production"
            onPress={() => navigateTo('/production')}
          />

          <MenuItem
            icon={<Users size={21} color="#00ff88" />}
            title="Population"
            onPress={() => navigateTo('/population')}
          />

          <MenuItem
            icon={<Settings size={21} color="#777" />}
            title="Settings"
            onPress={() => navigateTo('/settings')}
          />

        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    minHeight: 72,
    marginTop: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#183F16',
    borderRadius: 16,
    backgroundColor: '#020602',
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    shadowColor: COLORS.green,
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 4,
    zIndex: 9999
  },

  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },

  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#20521A',
    backgroundColor: '#071007',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  menuLine: {
    width: 20,
    height: 2,
    backgroundColor: COLORS.green,
    marginVertical: 2.5,
    borderRadius: 2,
  },

  logo: {
    color: COLORS.green,
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 2,
  },

  logoSubtitle: {
    color: '#657060',
    fontSize: 7.5,
    letterSpacing: 1.1,
    marginTop: 2,
  },

  headerRight: {
    alignItems: 'flex-end',
    marginLeft: 8,
  },

  dayText: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },

  menu: {
    position: 'absolute',

    top: 75,
    right: 0,

    width: 240,

    padding: 10,

    backgroundColor: '#050805',

    borderWidth: 1,
    borderColor: '#1d5c1d',
    borderRadius: 12,

    elevation: 20,
  },

  menuItem: {
    height: 50,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',

    paddingHorizontal: 14,

    gap: 14,

    borderRadius: 8,
  },

  menuText: {
    color: '#ddd',
    fontSize: 14,
    fontWeight: '600',
  }
});

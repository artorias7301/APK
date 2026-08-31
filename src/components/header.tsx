import { View, Pressable, Text, StyleSheet } from "react-native";

const COLORS = {
  green: '#39FF14',
  grayLight: '#A0A0A0'
};

export const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Pressable style={styles.menuButton}>
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
          <View style={styles.menuLine} />
        </Pressable>

        <View>
          <Text style={styles.logo}>WAR ZONE</Text>
          <Text style={styles.logoSubtitle}>
            STRATEGY // POWER // CONTROL
          </Text>
        </View>
      </View>

      <View style={styles.headerRight}>
        <Text style={styles.dayText}>DAY 127</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    minHeight: 72,
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
});
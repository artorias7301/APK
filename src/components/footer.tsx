import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Href, router } from "expo-router";

type IconLibrary = 'ion' | 'mci';
interface AppIconProps {
  icon: string;
  library?: IconLibrary;
  size?: number;
  color?: string;
};
const AppIcon = ({
  icon,
  library = 'mci',
  size = 22,
  color = COLORS.green,
}: AppIconProps) => {
  if (library === 'ion') {
    return (
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        size={size}
        color={color}
      />
    );
  }

  return (
    <MaterialCommunityIcons
      name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
      size={size}
      color={color}
    />
  );
};

const COLORS = {
  green: '#39FF14',
  gray: '#777777',
  black: '#000000'
};

interface tabs {
  label: string;
  icon: string;
  path: Href;
  active: boolean
}

export const Footer = () => {
  const Path_Handler = (path: Href) => router.push(path);
  const tabs: tabs[] = [
    {
      label: 'ماموریت ها',
      icon: 'target',
      active: false,
      path: '/messions'
    },
    {
      label: 'تجهیزات',
      icon: 'shield-outline',
      active: false,
      path: '/equipment'
    },
    {
      label: 'داشبورد',
      icon: 'flag-outline',
      active: true,
      path: '/dashboard'
    },
    {
      label: 'فروشگاه',
      icon: 'cart-outline',
      active: false,
      path: '/shop'
    },
    {
      label: 'لیدربرد',
      icon: 'trophy-outline',
      active: false,
      path: '/leaderboard'
    },
  ];

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => (
        <Pressable
          key={tab.label}
          style={[styles.bottomTab, tab.active && styles.bottomTabActive]}
          onPress={() => Path_Handler(tab.path)}>
          <AppIcon
            icon={tab.icon}
            size={21}
            color={
              tab.active
                ? COLORS.green
                : COLORS.gray
            }
          />

          <Text
            style={[
              styles.bottomTabText,
              tab.active && styles.bottomTabTextActive,
            ]}
          >
            {tab.label}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    minHeight: 65,
    marginHorizontal: 9,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#183F16',
    backgroundColor: '#030603',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',

    shadowColor: COLORS.green,
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 6,

    zIndex: 9999
  },

  bottomTab: {
    minWidth: 56,
    minHeight: 52,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },

  bottomTabActive: {
    backgroundColor: '#0A190A',
    borderWidth: 1,
    borderColor: '#245A1C',

    shadowColor: COLORS.green,
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 3,
  },

  bottomTabText: {
    color: COLORS.gray,
    fontSize: 8.5,
    marginTop: 4,
  },

  bottomTabTextActive: {
    color: COLORS.green,
    fontWeight: '800',
  },

  pressed: {
    opacity: 0.65,
  },
});
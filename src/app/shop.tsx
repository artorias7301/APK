import { useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, ScrollView, Pressable, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {Ionicons,MaterialCommunityIcons} from '@expo/vector-icons';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

/* TYPES */
type IconLibrary = 'ion' | 'mci';
interface IconConfig {
  name: string;
  library?: IconLibrary;
};

interface Equipment {
  id: string;
  name: string;
  description: string;
  quantity: number;
  readiness: number;
  power: number;
  level: number;
  exp: number;
  expRequired: number;
  icon: string;
};

interface EquipmentCategory {
  id: string;
  name: string;
  icon: IconConfig;
  equipment: Equipment[];
};

interface CountryStats {
  money: number;
  satisfaction: number;
  militaryPower: number;
  combatReadiness: number;
};

type EquipmentIconName =
  | 'tank'
  | 'apc'
  | 'artillery'
  | 'rocket'
  | 'antiTank'
  | 'engineering'
  | 'ballistic'
  | 'cruise'
  | 'tactical'
  | 'launcher'
  | 'fighter'
  | 'bomber'
  | 'drone'
  | 'transportAircraft'
  | 'helicopter'
  | 'reconAircraft'
  | 'destroyer'
  | 'frigate'
  | 'submarine'
  | 'carrier'
  | 'patrol'
  | 'supplyShip'
  | 'airDefense'
  | 'radar'
  | 'interceptor'
  | 'sam'
  | 'antiDrone'
  | 'earlyWarning'
  | 'infantry'
  | 'specialForces'
  | 'mechanized'
  | 'sniper'
  | 'medic'
  | 'recon'
  | 'cyber'
  | 'server'
  | 'intel'
  | 'signal'
  | 'satellite'
  | 'electronic'
  | 'specialWeapon'
  | 'laser'
  | 'emp'
  | 'strategic'
  | 'command'
  | 'fuel'
  | 'transport'
  | 'repair'
  | 'warehouse'
  | 'logistics';

/* CONSTANTS */
const COLORS = {
  black: '#000000',
  panel: '#071007',
  green: '#00ff88',
  white: '#F5FFF3',
  gray: '#777777',
  grayLight: '#A0A0A0',
  orange: '#FFB020',
};

const initialCountryStats: CountryStats = {
  money: 12450000,
  satisfaction: 72,
  militaryPower: 72450,
  combatReadiness: 84,
};

/* HELPERS */
const formatNumber = (value: number) =>new Intl.NumberFormat('en-US').format(value);
const getEquipmentIcon = (
  icon: EquipmentIconName,
): { library: IconLibrary; name: string } => {
  const map: Record<EquipmentIconName, { library: IconLibrary; name: string }> =
    {
      tank: { library: 'mci', name: 'tank' },
      apc: { library: 'mci', name: 'arm-flex' },
      artillery: { library: 'mci', name: 'cannon' },
      rocket: { library: 'mci', name: 'rocket-launch' },
      antiTank: { library: 'mci', name: 'target' },
      engineering: { library: 'mci', name: 'excavator' },

      ballistic: { library: 'mci', name: 'rocket-launch-outline' },
      cruise: { library: 'mci', name: 'rocket' },
      tactical: { library: 'mci', name: 'crosshairs-gps' },
      launcher: { library: 'mci', name: 'missile' },

      fighter: { library: 'mci', name: 'airplane' },
      bomber: { library: 'mci', name: 'airplane-takeoff' },
      drone: { library: 'mci', name: 'drone' },
      transportAircraft: { library: 'mci', name: 'airplane' },
      helicopter: { library: 'mci', name: 'helicopter' },
      reconAircraft: { library: 'mci', name: 'radar' },

      destroyer: { library: 'mci', name: 'ferry' },
      frigate: { library: 'mci', name: 'sail-boat' },
      submarine: { library: 'mci', name: 'submarine' },
      carrier: { library: 'mci', name: 'ferry' },
      patrol: { library: 'mci', name: 'speedometer' },
      supplyShip: { library: 'mci', name: 'ship-wheel' },

      airDefense: { library: 'mci', name: 'shield-airplane' },
      radar: { library: 'mci', name: 'radar' },
      interceptor: { library: 'mci', name: 'target' },
      sam: { library: 'mci', name: 'shield-check' },
      antiDrone: { library: 'mci', name: 'drone' },
      earlyWarning: { library: 'mci', name: 'radar' },

      infantry: { library: 'mci', name: 'account-group' },
      specialForces: { library: 'mci', name: 'account-tie' },
      mechanized: { library: 'mci', name: 'truck' },
      sniper: { library: 'mci', name: 'crosshairs' },
      medic: { library: 'mci', name: 'medical-bag' },
      recon: { library: 'mci', name: 'binoculars' },

      cyber: { library: 'mci', name: 'laptop' },
      server: { library: 'mci', name: 'server' },
      intel: { library: 'mci', name: 'database-search' },
      signal: { library: 'mci', name: 'signal-cellular-3' },
      satellite: { library: 'mci', name: 'satellite-variant' },
      electronic: { library: 'mci', name: 'access-point' },

      specialWeapon: { library: 'mci', name: 'atom' },
      laser: { library: 'mci', name: 'laser-pointer' },
      emp: { library: 'mci', name: 'flash' },
      strategic: { library: 'mci', name: 'nuke' },
      command: { library: 'mci', name: 'target-account' },

      fuel: { library: 'mci', name: 'fuel' },
      transport: { library: 'mci', name: 'truck-fast' },
      repair: { library: 'mci', name: 'wrench' },
      warehouse: { library: 'mci', name: 'warehouse' },
      logistics: { library: 'mci', name: 'package-variant-closed' },
    };

  return map[icon];
};

/* MOCK DATA */
const shopCategories: EquipmentCategory[] = [
  {
    id: 'missiles',
    name: 'تسلیحات موشکی',
    icon: { library: 'mci', name: 'rocket-launch' },
    equipment: [
      {
        id: 'ballistic',
        name: 'موشک بالستیک',
        description: 'موشک برد بلند با قدرت تخریب بالا',
        quantity: 42,
        readiness: 88,
        power: 18400,
        level: 3,
        exp: 720,
        expRequired: 1400,
        icon: 'ballistic',
      },
      {
        id: 'cruise',
        name: 'موشک کروز',
        description: 'حمله دقیق به اهداف استراتژیک',
        quantity: 76,
        readiness: 91,
        power: 12600,
        level: 3,
        exp: 540,
        expRequired: 1200,
        icon: 'cruise',
      },
      {
        id: 'tactical',
        name: 'موشک تاکتیکی',
        description: 'پشتیبانی سریع از نیروهای زمینی',
        quantity: 128,
        readiness: 84,
        power: 8300,
        level: 2,
        exp: 390,
        expRequired: 800,
        icon: 'tactical',
      },
      {
        id: 'launcher',
        name: 'پرتابگر متحرک',
        description: 'افزایش تحرک و انعطاف سامانه موشکی',
        quantity: 36,
        readiness: 79,
        power: 7200,
        level: 2,
        exp: 280,
        expRequired: 800,
        icon: 'launcher',
      },
    ],
  },
  {
    id: 'air',
    name: 'نیروی هوایی',
    icon: { library: 'mci', name: 'airplane' },
    equipment: [
      {
        id: 'fighter',
        name: 'جنگنده چندمنظوره',
        description: 'جنگنده سریع برای عملیات هوایی',
        quantity: 64,
        readiness: 92,
        power: 19400,
        level: 4,
        exp: 900,
        expRequired: 1600,
        icon: 'fighter',
      },
      {
        id: 'bomber',
        name: 'هواپیمای بمب‌افکن',
        description: 'حمل مهمات سنگین در عملیات راهبردی',
        quantity: 18,
        readiness: 81,
        power: 15200,
        level: 3,
        exp: 630,
        expRequired: 1200,
        icon: 'bomber',
      },
      {
        id: 'drone',
        name: 'پهپاد رزمی',
        description: 'عملیات شناسایی و حمله بدون سرنشین',
        quantity: 137,
        readiness: 95,
        power: 6800,
        level: 3,
        exp: 740,
        expRequired: 1400,
        icon: 'drone',
      },
      {
        id: 'helicopter',
        name: 'بالگرد تهاجمی',
        description: 'پشتیبانی نزدیک از نیروهای زمینی',
        quantity: 31,
        readiness: 86,
        power: 9100,
        level: 2,
        exp: 450,
        expRequired: 800,
        icon: 'helicopter',
      },
    ],
  },
  {
    id: 'navy',
    name: 'ناوگان دریایی',
    icon: { library: 'mci', name: 'ferry' },
    equipment: [
      {
        id: 'destroyer',
        name: 'ناوشکن',
        description: 'کشتی رزمی چندمنظوره',
        quantity: 8,
        readiness: 84,
        power: 17200,
        level: 3,
        exp: 620,
        expRequired: 1200,
        icon: 'destroyer',
      },
      {
        id: 'frigate',
        name: 'ناوچه رزمی',
        description: 'دفاع و گشت دریایی',
        quantity: 17,
        readiness: 89,
        power: 8300,
        level: 2,
        exp: 360,
        expRequired: 800,
        icon: 'frigate',
      },
      {
        id: 'submarine',
        name: 'زیردریایی',
        description: 'عملیات مخفیانه در عمق آب',
        quantity: 6,
        readiness: 76,
        power: 14600,
        level: 3,
        exp: 410,
        expRequired: 1200,
        icon: 'submarine',
      },
      {
        id: 'patrol',
        name: 'شناور گشتی',
        description: 'کنترل و حفاظت از آب‌های سرزمینی',
        quantity: 29,
        readiness: 94,
        power: 3600,
        level: 2,
        exp: 510,
        expRequired: 800,
        icon: 'patrol',
      },
    ],
  },
  {
    id: 'airDefense',
    name: 'پدافند هوایی',
    icon: { library: 'mci', name: 'shield-airplane' },
    equipment: [
      {
        id: 'sam',
        name: 'سامانه موشکی پدافند',
        description: 'رهگیری اهداف هوایی دشمن',
        quantity: 28,
        readiness: 94,
        power: 11900,
        level: 3,
        exp: 810,
        expRequired: 1400,
        icon: 'sam',
      },
      {
        id: 'radar',
        name: 'رادار برد بلند',
        description: 'کشف اهداف هوایی در فواصل دور',
        quantity: 14,
        readiness: 91,
        power: 7600,
        level: 3,
        exp: 560,
        expRequired: 1200,
        icon: 'radar',
      },
      {
        id: 'interceptor',
        name: 'سامانه رهگیر',
        description: 'واکنش سریع به تهدیدات هوایی',
        quantity: 19,
        readiness: 87,
        power: 9800,
        level: 2,
        exp: 390,
        expRequired: 800,
        icon: 'interceptor',
      },
      {
        id: 'antiDrone',
        name: 'ضد پهپاد',
        description: 'شناسایی و انهدام پهپادها',
        quantity: 46,
        readiness: 93,
        power: 4200,
        level: 2,
        exp: 510,
        expRequired: 800,
        icon: 'antiDrone',
      },
    ],
  },
  {
    id: 'ground',
    name: 'تجهیزات زمینی',
    icon: { library: 'mci', name: 'tank' },
    equipment: [
      {
        id: 'tank',
        name: 'تانک اصلی نبرد',
        description: 'تانک سنگین با قدرت آتش و زره بالا',
        quantity: 248,
        readiness: 91,
        power: 12400,
        level: 3,
        exp: 650,
        expRequired: 1200,
        icon: 'tank',
      },
      {
        id: 'apc',
        name: 'نفربر زرهی',
        description: 'انتقال نیرو با حفاظت بالا',
        quantity: 516,
        readiness: 87,
        power: 8200,
        level: 2,
        exp: 320,
        expRequired: 800,
        icon: 'apc',
      },
      {
        id: 'artillery',
        name: 'توپخانه خودکششی',
        description: 'پشتیبانی آتش از فواصل دور',
        quantity: 184,
        readiness: 79,
        power: 6750,
        level: 2,
        exp: 210,
        expRequired: 800,
        icon: 'artillery',
      },
      {
        id: 'rocket',
        name: 'سامانه راکت‌انداز',
        description: 'حملات گسترده با راکت‌های چندگانه',
        quantity: 96,
        readiness: 76,
        power: 5300,
        level: 1,
        exp: 120,
        expRequired: 400,
        icon: 'rocket',
      },
      {
        id: 'antiTank',
        name: 'سامانه ضد تانک',
        description: 'مقابله با تانک‌های دشمن',
        quantity: 132,
        readiness: 83,
        power: 4800,
        level: 2,
        exp: 410,
        expRequired: 800,
        icon: 'antiTank',
      },
      {
        id: 'engineering',
        name: 'خودرو مهندسی',
        description: 'ساخت و تخریب موانع و استحکامات',
        quantity: 64,
        readiness: 68,
        power: 2100,
        level: 1,
        exp: 80,
        expRequired: 400,
        icon: 'engineering',
      },
    ],
  },
  {
    id: 'infantry',
    name: 'پیاده نظام',
    icon: { library: 'mci', name: 'account-group' },
    equipment: [
      {
        id: 'infantry',
        name: 'یگان پیاده نظام',
        description: 'نیروی پایه عملیات زمینی',
        quantity: 18400,
        readiness: 74,
        power: 9200,
        level: 4,
        exp: 780,
        expRequired: 1600,
        icon: 'infantry',
      },
      {
        id: 'specialForces',
        name: 'نیروهای ویژه',
        description: 'واحدهای تخصصی عملیات ویژه',
        quantity: 920,
        readiness: 91,
        power: 11800,
        level: 3,
        exp: 610,
        expRequired: 1200,
        icon: 'specialForces',
      },
      {
        id: 'mechanized',
        name: 'واحد مکانیزه',
        description: 'نیروی متحرک و زرهی',
        quantity: 2100,
        readiness: 82,
        power: 7400,
        level: 2,
        exp: 350,
        expRequired: 800,
        icon: 'mechanized',
      },
      {
        id: 'sniper',
        name: 'واحد تک‌تیرانداز',
        description: 'عملیات دقیق علیه اهداف حساس',
        quantity: 480,
        readiness: 88,
        power: 3900,
        level: 2,
        exp: 440,
        expRequired: 800,
        icon: 'sniper',
      },
    ],
  },
  {
    id: 'cyber',
    name: 'سایبری و اطلاعاتی',
    icon: { library: 'mci', name: 'laptop' },
    equipment: [
      {
        id: 'cyber',
        name: 'مرکز عملیات سایبری',
        description: 'دفاع و عملیات در فضای سایبری',
        quantity: 12,
        readiness: 93,
        power: 13200,
        level: 4,
        exp: 920,
        expRequired: 1800,
        icon: 'cyber',
      },
      {
        id: 'server',
        name: 'مرکز پردازش اطلاعات',
        description: 'پردازش داده‌های استراتژیک',
        quantity: 24,
        readiness: 89,
        power: 8100,
        level: 3,
        exp: 540,
        expRequired: 1200,
        icon: 'server',
      },
      {
        id: 'intel',
        name: 'سامانه اطلاعاتی',
        description: 'جمع‌آوری و تحلیل اطلاعات',
        quantity: 17,
        readiness: 86,
        power: 7600,
        level: 3,
        exp: 460,
        expRequired: 1200,
        icon: 'intel',
      },
      {
        id: 'signal',
        name: 'مرکز سیگنال',
        description: 'رهگیری و تحلیل ارتباطات',
        quantity: 9,
        readiness: 81,
        power: 6300,
        level: 2,
        exp: 290,
        expRequired: 800,
        icon: 'signal',
      },
    ],
  },
  {
    id: 'special',
    name: 'تسلیحات ویژه',
    icon: { library: 'mci', name: 'atom' },
    equipment: [
      {
        id: 'specialWeapon',
        name: 'سامانه راهبردی ویژه',
        description: 'تجهیزات راهبردی با قدرت بسیار بالا',
        quantity: 4,
        readiness: 72,
        power: 24500,
        level: 2,
        exp: 340,
        expRequired: 1000,
        icon: 'specialWeapon',
      },
      {
        id: 'laser',
        name: 'سامانه لیزری',
        description: 'رهگیری و مقابله با اهداف سریع',
        quantity: 7,
        readiness: 84,
        power: 11200,
        level: 2,
        exp: 510,
        expRequired: 900,
        icon: 'laser',
      },
      {
        id: 'emp',
        name: 'سامانه اختلال الکترومغناطیسی',
        description: 'اختلال در سامانه‌های الکترونیکی',
        quantity: 6,
        readiness: 78,
        power: 9800,
        level: 2,
        exp: 310,
        expRequired: 800,
        icon: 'emp',
      },
      {
        id: 'command',
        name: 'سامانه فرماندهی راهبردی',
        description: 'هماهنگی عملیات راهبردی کشور',
        quantity: 3,
        readiness: 96,
        power: 15700,
        level: 3,
        exp: 670,
        expRequired: 1400,
        icon: 'command',
      },
    ],
  },
  {
    id: 'logistics',
    name: 'پشتیبانی و لجستیک',
    icon: { library: 'mci', name: 'truck-fast' },
    equipment: [
      {
        id: 'fuel',
        name: 'تانکر سوخت‌رسان',
        description: 'تأمین سوخت یگان‌های عملیاتی',
        quantity: 86,
        readiness: 88,
        power: 3100,
        level: 3,
        exp: 470,
        expRequired: 1000,
        icon: 'fuel',
      },
      {
        id: 'transport',
        name: 'ناوگان حمل‌ونقل',
        description: 'انتقال سریع نیرو و تجهیزات',
        quantity: 340,
        readiness: 83,
        power: 4200,
        level: 3,
        exp: 520,
        expRequired: 1100,
        icon: 'transport',
      },
      {
        id: 'repair',
        name: 'واحد تعمیرات',
        description: 'تعمیر و آماده‌سازی تجهیزات',
        quantity: 48,
        readiness: 91,
        power: 5100,
        level: 2,
        exp: 390,
        expRequired: 800,
        icon: 'repair',
      },
      {
        id: 'warehouse',
        name: 'انبار استراتژیک',
        description: 'ذخیره تجهیزات و قطعات یدکی',
        quantity: 22,
        readiness: 96,
        power: 2800,
        level: 3,
        exp: 610,
        expRequired: 1000,
        icon: 'warehouse',
      },
    ],
  },
];

/* ICON COMPONENT */
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

/* PAGE TITLE */
const PageTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleDecorationLeft}>
        <View style={styles.titleLine} />
        <View style={styles.titleDiamond} />
      </View>

      <View style={styles.titleCenter}>
        <Text style={styles.pageTitle}>فروشگاه</Text>
        <Text style={styles.pageSubtitle}>EQUIPMENT SHOP</Text>
      </View>

      <View style={styles.titleDecorationRight}>
        <View style={styles.titleDiamond} />
        <View style={styles.titleLine} />
      </View>
    </View>
  );
};

/* COUNTRY STATS */
interface CountryStatsProps {
  stats: CountryStats;
}

const CountryStatsPanel = ({ stats }: CountryStatsProps) => {
  return (
    <View style={styles.statsPanel}>
      <View style={styles.statItem}>
        <View style={styles.statIconBox}>
          <AppIcon
            icon="cash-multiple"
            size={25}
            color={COLORS.green}
          />
        </View>

        <View style={styles.statText}>
          <Text style={styles.statLabel}>پول کشور</Text>
          <Text style={styles.statValue}>
            {formatNumber(stats.money)}
          </Text>
        </View>
      </View>

      <View style={styles.statDivider} />

      <View style={styles.statItem}>
        <View style={styles.statIconBox}>
          <AppIcon
            icon="emoticon-happy-outline"
            size={25}
            color={COLORS.green}
          />
        </View>

        <View style={styles.statText}>
          <Text style={styles.statLabel}>رضایت مردم</Text>
          <Text style={styles.statValue}>
            {stats.satisfaction}%
          </Text>
        </View>
      </View>
    </View>
  );
};

/* CATEGORY SELECTOR */
interface CategorySelectorProps {
  selectedId: string;
  onSelect: (id: string) => void;
};

const CategorySelector = ({selectedId, onSelect}: CategorySelectorProps) => {
  const scrollRef = useRef<ScrollView>(null);
  return (
    <View style={styles.categoryWrapper}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryContent}
        directionalLockEnabled>
        {shopCategories.map((category) => {
          const selected = category.id === selectedId;

          return (
            <Pressable
              key={category.id}
              onPress={() => onSelect(category.id)}
              style={({ pressed }) => [
                styles.categoryTab,
                selected && styles.categoryTabSelected,
                pressed && styles.categoryPressed,
              ]}>
              <AppIcon
                icon={category.icon.name}
                library={category.icon.library}
                size={18}
                color={selected ? COLORS.green : COLORS.gray}/>

              <Text
                numberOfLines={1}
                style={[
                  styles.categoryText,
                  selected && styles.categoryTextSelected,
                ]}>
                {category.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

/* EQUIPMENT CARD */
interface EquipmentCardProps {
  item: Equipment;
  onUpgrade: (id: string) => void;
};

const EquipmentCard = ({
  item,
  onUpgrade,
}: EquipmentCardProps) => {
  const expPercent = Math.min(
    100,
    (item.exp / item.expRequired) * 100,
  );

  const icon = getEquipmentIcon(
    item.icon as EquipmentIconName,
  );

  return (
    <View style={styles.equipmentCard}>
      <View style={styles.equipmentTop}>
        <View style={styles.equipmentIconBox}>
          <AppIcon
            icon={icon.name}
            library={icon.library}
            size={38}
            color={COLORS.green}
          />
        </View>

        <View style={styles.equipmentInfo}>
          <Text
            style={styles.equipmentName}
            numberOfLines={1}
          >
            {item.name}
          </Text>

          <Text
            style={styles.equipmentDescription}
            numberOfLines={2}
          >
            {item.description}
          </Text>
        </View>
      </View>

      <View style={styles.equipmentStats}>
        <View style={styles.miniStat}>
          <Text style={styles.miniStatLabel}>تعداد بسته</Text>
          <Text style={styles.miniStatValue}>
            {formatNumber(item.quantity)}
          </Text>
        </View>
        <Pressable
          onPress={() => onUpgrade(item.id)}
          style={({ pressed }) => [
            styles.upgradeButton,
            pressed && styles.upgradeButtonPressed,
          ]}>
          <Text style={styles.upgradeText}>خرید</Text>
        </Pressable>
      </View>
    </View>
  );
};

/* EQUIPMENT LIST */
interface EquipmentListProps {
  category: EquipmentCategory;
  equipment: Equipment[];
  onUpgrade: (id: string) => void;
};

const EquipmentList = ({
  category,
  equipment,
  onUpgrade,
}: EquipmentListProps) => {
  return (
    <View style={styles.equipmentColumn}>
      <View style={styles.equipmentListHeader}>
        <View style={styles.equipmentListTitle}>
          <AppIcon
            icon={category.icon.name}
            library={category.icon.library}
            size={20}
          />

          <Text style={styles.equipmentListTitleText}>
            {category.name}
          </Text>
        </View>

        <View style={styles.listCounter}>
          <Text style={styles.listCounterText}>
            {equipment.length}/18
          </Text>
        </View>
      </View>

      <FlatList
        data={equipment}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <EquipmentCard
            item={item}
            onUpgrade={onUpgrade}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.equipmentListContent}
        ItemSeparatorComponent={() => (
          <View style={styles.cardSeparator} />
        )}
      />
    </View>
  );
};

/* MAIN SCREEN */
export default function EquipmentManagementScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const [selectedCategoryId, setSelectedCategoryId] =
    useState('ground');

  const [countryStats] =
    useState<CountryStats>(initialCountryStats);

  const [equipmentState, setEquipmentState] =
    useState<Record<string, Equipment[]>>(
      Object.fromEntries(
        shopCategories.map((category) => [
          category.id,
          category.equipment,
        ]),
      ),
    );

  const selectedCategory = useMemo(
    () =>
      shopCategories.find(
        (category) =>
          category.id === selectedCategoryId,
      ) ?? shopCategories[4],
    [selectedCategoryId],
  );

  const currentEquipment =
    equipmentState[selectedCategory.id] ?? [];

  const isTabletOrLargePhone = width >= 720;

  const handleUpgrade = (equipmentId: string) => {
    setEquipmentState((previous) => {
      const currentItems =
        previous[selectedCategory.id] ?? [];

      const updatedItems = currentItems.map((item) => {
        if (item.id !== equipmentId) {
          return item;
        }

        const newLevel = item.level + 1;
        const newRequiredExp = Math.round(
          item.expRequired * 1.35,
        );

        return {
          ...item,
          level: newLevel,
          exp: 0,
          expRequired: newRequiredExp,
          power: Math.round(item.power * 1.12),
          readiness: Math.min(
            100,
            item.readiness + 2,
          ),
        };
      });

      return {
        ...previous,
        [selectedCategory.id]: updatedItems,
      };
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header />
      <SafeAreaView
        style={[
          styles.safeArea,
          {
            paddingTop: Math.max(insets.top, 8),
          },
        ]}
      >
        <View style={styles.container}>
          <FlatList
            data={[]}
            renderItem={null}
            ListHeaderComponent={
              <>
                <PageTitle />

                <CountryStatsPanel
                  stats={countryStats}
                />

                <CategorySelector
                  selectedId={selectedCategoryId}
                  onSelect={setSelectedCategoryId}
                />

                {isTabletOrLargePhone ? (
                  <View style={styles.twoColumnLayout}>
                    <EquipmentList
                      category={selectedCategory}
                      equipment={currentEquipment}
                      onUpgrade={handleUpgrade}
                    />
                  </View>
                ) : (
                  <View style={styles.singleColumnLayout}>
                    <View style={styles.mobileEquipmentArea}>
                      <EquipmentList
                        category={selectedCategory}
                        equipment={currentEquipment}
                        onUpgrade={handleUpgrade}
                      />
                    </View>
                  </View>
                )}
              </>
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={[
              styles.mainScrollContent,
              {
                paddingBottom: 110 + insets.bottom,
              },
            ]}/>
        </View>
      </SafeAreaView>
      <Footer />
    </SafeAreaView>
  );
};

/* STYLES */
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#050807",
  },

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.black,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },

  /* TITLE */
  titleContainer: {
    minHeight: 82,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  titleCenter: {
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  pageTitle: {
    color: COLORS.green,
    fontSize: 26,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: 0.3,
  },

  pageSubtitle: {
    color: '#596158',
    fontSize: 8,
    letterSpacing: 1.5,
    marginTop: 4,
  },

  titleDecorationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  titleDecorationRight: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },

  titleLine: {
    height: 1,
    backgroundColor: '#215D1B',
    flex: 1,
    maxWidth: 90,
  },

  titleDiamond: {
    width: 6,
    height: 6,
    backgroundColor: COLORS.green,
    transform: [{ rotate: '45deg' }],
    marginHorizontal: 8,
  },

  /* COUNTRY STATS */

  statsPanel: {
    marginHorizontal: 12,
    minHeight: 100,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#1C5517',
    backgroundColor: '#061006',
    flexDirection: 'row',
    alignItems: 'center',

    shadowColor: COLORS.green,
    shadowOpacity: 0.1,
    shadowRadius: 9,
    elevation: 3,
  },

  statItem: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },

  statIconBox: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: '#0A180A',
    borderWidth: 1,
    borderColor: '#194B15',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
  },

  statText: {
    minWidth: 0,
  },

  statLabel: {
    color: COLORS.grayLight,
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 4,
  },

  statValue: {
    color: COLORS.green,
    fontSize: 19,
    fontWeight: '900',
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },

  statDivider: {
    width: 1,
    height: 55,
    backgroundColor: '#21461D',
  },

  /* CATEGORY */

  categoryWrapper: {
    height: 65,
    marginTop: 10,
    position: 'relative',
    justifyContent: 'center',
  },

  categoryContent: {
    paddingHorizontal: 28,
    gap: 8,
    alignItems: 'center',
  },

  categoryTab: {
    height: 43,
    paddingHorizontal: 13,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#202920',
    backgroundColor: '#050905',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    maxWidth: 190,
  },

  categoryTabSelected: {
    borderColor: COLORS.green,
    backgroundColor: '#0B1D09',

    shadowColor: COLORS.green,
    shadowOpacity: 0.22,
    shadowRadius: 8,
    elevation: 4,
  },

  categoryPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },

  categoryText: {
    color: COLORS.gray,
    fontSize: 11,
    fontWeight: '700',
    flexShrink: 1,
  },

  categoryTextSelected: {
    color: COLORS.green,
  },

  scrollArrowLeft: {
    position: 'absolute',
    left: 4,
    zIndex: 5,
    width: 25,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#071007',
    borderWidth: 1,
    borderColor: '#173E13',
    alignItems: 'center',
    justifyContent: 'center',
  },

  scrollArrowRight: {
    position: 'absolute',
    right: 4,
    zIndex: 5,
    width: 25,
    height: 42,
    borderRadius: 8,
    backgroundColor: '#071007',
    borderWidth: 1,
    borderColor: '#173E13',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* MAIN */

  mainScrollContent: {
    paddingTop: 4,
  },

  twoColumnLayout: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 12,
    marginTop: 4,
  },

  summaryColumn: {
    flex: 0.78,
    minWidth: 290,
  },

  equipmentColumn: {
    flex: 1.22,
    minWidth: 0,
    minHeight: 400,
  },

  singleColumnLayout: {
    paddingHorizontal: 12,
    marginTop: 4,
  },

  mobileEquipmentArea: {
    marginTop: 8,
  },

  /* PANELS */

  panel: {
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: '#174A13',
    borderRadius: 15,
    padding: 13,
    marginBottom: 10,

    shadowColor: COLORS.green,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  panelHeader: {
    minHeight: 35,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#132A12',
    paddingBottom: 9,
  },

  panelHeaderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },

  panelHeaderIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: '#0B190B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  panelTitle: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '800',
    flexShrink: 1,
  },

  counterBadge: {
    minWidth: 42,
    height: 27,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#245B1C',
    backgroundColor: '#091509',
    justifyContent: 'center',
    alignItems: 'center',
  },

  counterText: {
    color: COLORS.green,
    fontSize: 11,
    fontWeight: '800',
  },

  /* POWER */

  powerBox: {
    minHeight: 76,
    borderRadius: 11,
    backgroundColor: '#091609',
    borderWidth: 1,
    borderColor: '#163C13',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 13,
  },

  powerIcon: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#0C210B',
    borderWidth: 1,
    borderColor: '#24611B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 11,
  },

  powerLabel: {
    color: COLORS.grayLight,
    fontSize: 11,
    marginBottom: 3,
  },

  powerValue: {
    color: COLORS.green,
    fontSize: 23,
    fontWeight: '900',
    fontVariant: ['tabular-nums'],
  },

  readinessHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 7,
  },

  sectionLabel: {
    color: COLORS.grayLight,
    fontSize: 11,
  },

  sectionValue: {
    color: COLORS.green,
    fontSize: 13,
    fontWeight: '800',
  },

  progressTrackLarge: {
    height: 7,
    backgroundColor: '#172017',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#263126',
  },

  progressFill: {
    height: '100%',
    backgroundColor: COLORS.green,
    borderRadius: 5,
  },

  branchTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 4,
  },

  branchTitleText: {
    color: '#7C857A',
    fontSize: 10,
    marginRight: 8,
  },

  branchTitleLine: {
    height: 1,
    backgroundColor: '#173417',
    flex: 1,
  },

  /* READINESS */

  readinessRow: {
    minHeight: 37,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#111A11',
  },

  readinessIcon: {
    width: 27,
    alignItems: 'center',
    marginRight: 6,
  },

  readinessLabel: {
    color: '#B3BBB1',
    fontSize: 10.5,
    flex: 1,
  },

  readinessValue: {
    color: COLORS.green,
    fontSize: 11,
    fontWeight: '800',
    minWidth: 35,
    textAlign: 'right',
  },

  /* PRODUCTION */

  productionRow: {
    minHeight: 42,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#111A11',
  },

  productionIcon: {
    width: 30,
    alignItems: 'center',
    marginRight: 5,
  },

  productionLabel: {
    color: COLORS.grayLight,
    fontSize: 11,
    flex: 1,
  },

  productionPositive: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: '800',
  },

  productionNegative: {
    color: COLORS.orange,
    fontSize: 12,
    fontWeight: '800',
  },

  /* EQUIPMENT LIST */

  equipmentListHeader: {
    height: 51,
    borderWidth: 1,
    borderColor: '#174A13',
    borderRadius: 13,
    backgroundColor: '#061006',
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  equipmentListTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 0,
    flex: 1,
  },

  equipmentListTitleText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '900',
    marginLeft: 8,
    flexShrink: 1,
  },

  listCounter: {
    backgroundColor: '#0A190A',
    borderWidth: 1,
    borderColor: '#23551B',
    borderRadius: 7,
    paddingHorizontal: 9,
    paddingVertical: 5,
    marginLeft: 8,
  },

  listCounterText: {
    color: COLORS.green,
    fontSize: 10,
    fontWeight: '800',
  },

  equipmentListContent: {
    paddingBottom: 15,
  },

  cardSeparator: {
    height: 8,
  },

  /* EQUIPMENT CARD */

  equipmentCard: {
    backgroundColor: '#071007',
    borderWidth: 1,
    borderColor: '#194B15',
    borderRadius: 14,
    padding: 11,

    shadowColor: COLORS.green,
    shadowOpacity: 0.07,
    shadowRadius: 7,
    elevation: 2,
  },

  equipmentTop: {
    minHeight: 62,
    flexDirection: 'row',
    alignItems: 'center',
  },

  equipmentIconBox: {
    width: 59,
    height: 59,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#20591A',
    backgroundColor: '#0A180A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  equipmentInfo: {
    flex: 1,
    minWidth: 0,
  },

  equipmentName: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'right',
    marginBottom: 4,
  },

  equipmentDescription: {
    color: '#707970',
    fontSize: 9.5,
    lineHeight: 15,
    textAlign: 'right',
  },

  levelBox: {
    width: 49,
    minHeight: 48,
    borderRadius: 9,
    backgroundColor: '#0A160A',
    borderWidth: 1,
    borderColor: '#1A4016',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },

  levelLabel: {
    color: COLORS.gray,
    fontSize: 8,
    marginBottom: 2,
  },

  levelValue: {
    color: COLORS.green,
    fontSize: 12,
    fontWeight: '900',
  },

  /* MINI STATS */

  equipmentStats: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 10,
  },

  miniStat: {
    flex: 1,
    minHeight: 43,
    backgroundColor: '#0A140A',
    borderWidth: 1,
    borderColor: '#142A13',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },

  miniStatLabel: {
    color: COLORS.gray,
    fontSize: 8,
    marginBottom: 3,
  },

  miniStatValue: {
    color: COLORS.green,
    fontSize: 10.5,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },

  /* EXP / UPGRADE */

  equipmentBottom: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 9,
  },

  expContainer: {
    flex: 1,
  },

  expHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },

  expText: {
    color: COLORS.gray,
    fontSize: 8,
    fontWeight: '700',
  },

  expNumbers: {
    color: '#8A9387',
    fontSize: 8,
  },

  expTrack: {
    height: 6,
    backgroundColor: '#182018',
    borderRadius: 4,
    overflow: 'hidden',
  },

  expFill: {
    height: '100%',
    backgroundColor: COLORS.green,
    borderRadius: 4,
  },

  upgradeButton: {
    height: 36,
    minWidth: 75,
    paddingHorizontal: 10,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: COLORS.green,
    backgroundColor: '#071607',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,

    shadowColor: COLORS.green,
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 2,
  },

  upgradeButtonPressed: {
    backgroundColor: '#102910',
    transform: [{ scale: 0.96 }],
  },

  upgradeText: {
    color: COLORS.green,
    fontSize: 10,
    fontWeight: '900',
  }
});
import { useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, ScrollView, Pressable, StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons,MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { COLORS } from '@/APIs/Colors';
import { user_equipments } from '@/APIs/api';

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
    equipment: user_equipments.missiles,
  },
  {
    id: 'air',
    name: 'نیروی هوایی',
    icon: { library: 'mci', name: 'airplane' },
    equipment: user_equipments.aircraft
  },
  {
    id: 'navy',
    name: 'ناوگان دریایی',
    icon: { library: 'mci', name: 'ferry' },
    equipment: user_equipments.navy
  },
  {
    id: 'airDefense',
    name: 'پدافند هوایی',
    icon: { library: 'mci', name: 'shield-airplane' },
    equipment: user_equipments.airDefense
  },
  {
    id: 'ground',
    name: 'تجهیزات زمینی',
    icon: { library: 'mci', name: 'tank' },
    equipment: user_equipments.ground
  },
  {
    id: 'infantry',
    name: 'پیاده نظام',
    icon: { library: 'mci', name: 'account-group' },
    equipment: user_equipments.infantry
  },
  {
    id: 'cyber',
    name: 'سایبری و اطلاعاتی',
    icon: { library: 'mci', name: 'laptop' },
    equipment: user_equipments.cyber
  },
  {
    id: 'special',
    name: 'تسلیحات ویژه',
    icon: { library: 'mci', name: 'atom' },
    equipment: user_equipments.special
  },
  {
    id: 'logistics',
    name: 'پشتیبانی و لجستیک',
    icon: { library: 'mci', name: 'truck-fast' },
    equipment: user_equipments.logistics
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
        <Text style={styles.pageTitle}>مدیریت تجهیزات</Text>
        <Text style={styles.pageSubtitle}>EQUIPMENT MANAGEMENT</Text>
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
            color={COLORS.gold}
          />
        </View>

        <View style={styles.statText}>
          <Text style={styles.statLabel}>پول کشور</Text>
          <Text style={styles.statmoney}>
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
            color={COLORS.PeopleSatisfy}
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
interface EquipmentCardProps {item: Equipment};

const EquipmentCard = ({item}: EquipmentCardProps) => {
  const icon = getEquipmentIcon(item.icon as EquipmentIconName);
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

        <View style={styles.levelBox}>
          <Text style={styles.levelLabel}>تعداد</Text>
          <Text style={styles.levelValue}>
            {formatNumber(item.quantity)}
          </Text>
        </View>
      </View>
    </View>
  );
};

/* EQUIPMENT LIST */
interface EquipmentListProps {
  category: EquipmentCategory;
  equipment: Equipment[];
};

const EquipmentList = ({ category, equipment }: EquipmentListProps) => {
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
        renderItem={({ item }) => (<EquipmentCard item={item}/>)}
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
                    />
                  </View>
                ) : (
                  <View style={styles.singleColumnLayout}>
                    <View style={styles.mobileEquipmentArea}>
                      <EquipmentList
                        category={selectedCategory}
                        equipment={currentEquipment}
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
    color: COLORS.white,
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
    color: COLORS.PeopleSatisfy,
    fontSize: 19,
    fontWeight: '900',
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },

  statmoney: {
    color: COLORS.gold,
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
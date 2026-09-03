import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

/* TYPES */
type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface Mission {
  id: string;
  description: string;
  reward: number;
  icon: IconName;
}

/* DAILY MISSIONS */
const dailyMissions: Mission[] = [
  {
    id: 'daily-1',
    description: 'یک ساختمان درآمدزا خریداری کنید',
    reward: 100,
    icon: 'cash-plus',
  },
  {
    id: 'daily-2',
    description: 'یک بار تجهیزات کشور را ارتقا دهید',
    reward: 150,
    icon: 'shield-star',
  },
  {
    id: 'daily-3',
    description: 'در یک نبرد پیروز شوید',
    reward: 250,
    icon: 'sword-cross',
  },
  {
    id: 'daily-4',
    description: 'درآمد روزانه کشور را افزایش دهید',
    reward: 200,
    icon: 'trending-up',
  },
];

/* SEASON MISSIONS */
const seasonMissions: Mission[] = [
  {
    id: 'season-1',
    description: 'قدرت نظامی کشور را به بیش از ۵۰,۰۰۰ برسانید',
    reward: 500,
    icon: 'arm-flex',
  },
  {
    id: 'season-2',
    description: '۱۰ ساختمان درآمدزا در کشور ایجاد کنید',
    reward: 750,
    icon: 'factory',
  },
  {
    id: 'season-3',
    description: '۵۰ واحد تجهیزات زمینی خریداری کنید',
    reward: 600,
    icon: 'tank',
  },
  {
    id: 'season-4',
    description: 'سه بار تجهیزات نظامی خود را ارتقا دهید',
    reward: 850,
    icon: 'arrow-up-bold-circle',
  },
  {
    id: 'season-5',
    description: '۵ نبرد را با موفقیت به پایان برسانید',
    reward: 1000,
    icon: 'trophy',
  },
  {
    id: 'season-6',
    description: 'رضایت مردم را به بالای ۸۰٪ برسانید',
    reward: 700,
    icon: 'account-heart',
  },
  {
    id: 'season-7',
    description: 'درآمد روزانه کشور را به ۵۰۰,۰۰۰ برسانید',
    reward: 1200,
    icon: 'finance',
  },
  {
    id: 'season-8',
    description: 'حداقل یک واحد از هر شاخه نظامی داشته باشید',
    reward: 900,
    icon: 'domain',
  },
  {
    id: 'season-9',
    description: 'یک ناوگان دریایی قدرتمند تشکیل دهید',
    reward: 1100,
    icon: 'ferry',
  },
  {
    id: 'season-10',
    description: 'سامانه پدافندی کشور را تقویت کنید',
    reward: 950,
    icon: 'radar',
  },
  {
    id: 'season-11',
    description: 'قدرت نیروی هوایی کشور را افزایش دهید',
    reward: 1000,
    icon: 'airplane',
  },
  {
    id: 'season-12',
    description: 'در مجموع ۱۰۰,۰۰۰ امتیاز نظامی کسب کنید',
    reward: 1500,
    icon: 'star-circle',
  },
];

/* SECTION HEADER */
interface SectionHeaderProps {
  title: string;
  count: number;
}

function SectionHeader({
  title,
  count,
}: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionLine} />

      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionTitle}>
          {title}
        </Text>

        <View style={styles.countBadge}>
          <Text style={styles.countText}>
            {count.toLocaleString('fa-IR')}
          </Text>
        </View>
      </View>

      <View style={styles.sectionLine} />
    </View>
  );
}

/* MISSION CARD */
interface MissionCardProps {
  mission: Mission;
}

function MissionCard({
  mission,
}: MissionCardProps) {
  return (
    <View style={styles.missionCard}>

      {/* ICON */}

      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={mission.icon}
          size={27}
          color='#00ff88'
        />
      </View>

      {/* DESCRIPTION */}

      <View style={styles.descriptionContainer}>
        <Text
          style={styles.missionDescription}
          numberOfLines={2}
        >
          {mission.description}
        </Text>
      </View>

      {/* REWARD */}

      <View style={styles.rewardContainer}>

        <MaterialCommunityIcons
          name="star-four-points"
          size={14}
          color='#00ff88'
        />

        <Text style={styles.rewardValue}>
          +{mission.reward.toLocaleString('fa-IR')}
        </Text>

        <Text style={styles.rewardLabel}>
          POINT
        </Text>

      </View>

    </View>
  );
}

/* DAILY MISSIONS */
function DailyMissions() {
  return (
    <View style={styles.dailyList}>

      {dailyMissions.map((mission) => (
        <MissionCard
          key={mission.id}
          mission={mission}
        />
      ))}

    </View>
  );
}

/* PAGE TITLE */
const PageTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleDecorationLeft}>
        <View style={styles.titleLine} />
        <View style={styles.titleDiamond} />
      </View>

      <View style={styles.titleCenter}>
        <Text style={styles.pageTitle}>ماموریت ها</Text>
        <Text style={styles.pageSubtitle}>Messions</Text>
      </View>

      <View style={styles.titleDecorationRight}>
        <View style={styles.titleDiamond} />
        <View style={styles.titleLine} />
      </View>
    </View>
  );
};

/* MISSIONS SCREEN */
export default function Missions() {
  return (
    <SafeAreaView style={styles.screen}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={true}>

        {/* PAGE TITLE */}
        <PageTitle />

        {/* DAILY MISSIONS */}
        <SectionHeader
          title="ماموریت‌های روزانه"
          count={dailyMissions.length}
        />

        <DailyMissions />

        {/* SEASON MISSIONS */}
        <SectionHeader
          title="ماموریت‌های سیزن"
          count={seasonMissions.length}
        />

        <View style={styles.seasonList}>

          {seasonMissions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
            />
          ))}

        </View>

        {/* Bottom spacing for shared footer */}
        <View style={styles.bottomSpacing} />

      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

/* STYLES */
const COLORS = {green: '#00ff88'};

const styles = StyleSheet.create({

  /* SCREEN */
  screen: {
    flex: 1,
    backgroundColor: "#050807",
  },

  scrollView: {
    flex: 1,
    backgroundColor: '#000000',
  },

  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 30,
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

  /* SECTION HEADER */
  sectionHeader: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 8,
    marginBottom: 9,

    gap: 9,
  },

  sectionLine: {
    flex: 1,

    height: 1,

    backgroundColor: '#102A0B',
  },

  sectionTitleContainer: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 8,
  },

  sectionTitle: {
    color: '#E8FFE4',

    fontSize: 15,

    fontWeight: '800',

    textAlign: 'center',
  },

  countBadge: {
    minWidth: 25,
    height: 21,

    paddingHorizontal: 6,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 6,

    borderWidth: 1,
    borderColor: '#245D18',

    backgroundColor: '#061006',
  },

  countText: {
    color: '#00ff88',

    fontSize: 10,

    fontWeight: '800',
  },

  /* DAILY LIST */
  dailyList: {
    gap: 7,

    marginBottom: 4,
  },

  /* SEASON LIST */
  seasonList: {
    gap: 8,
  },

  /* MISSION CARD */
  missionCard: {
    width: '100%',

    minHeight: 70,

    flexDirection: 'row',

    alignItems: 'center',

    backgroundColor: '#050805',

    borderWidth: 1,

    borderColor: '#173C11',

    borderRadius: 12,

    paddingVertical: 9,

    paddingHorizontal: 10,

    shadowColor: '#00ff88',

    shadowOpacity: 0.08,

    shadowRadius: 5,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 2,
  },

  /* ICON */
  iconContainer: {
    width: 47,
    height: 47,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,

    borderWidth: 1,

    borderColor: '#174C0E',

    backgroundColor: '#061006',

    marginRight: 10,
  },

  /* DESCRIPTION */
  descriptionContainer: {
    flex: 1,

    minWidth: 0,

    paddingRight: 7,
  },

  missionDescription: {
    color: '#E9E9E9',

    fontSize: 13,

    lineHeight: 21,

    fontWeight: '600',

    textAlign: 'right',
  },

  /* REWARD */
  rewardContainer: {
    width: 72,

    minHeight: 48,

    alignItems: 'center',
    justifyContent: 'center',

    paddingLeft: 8,

    borderLeftWidth: 1,

    borderLeftColor: '#122511',
  },

  rewardValue: {
    marginTop: 1,

    color: '#00ff88',

    fontSize: 15,

    fontWeight: '900',

    textAlign: 'center',

    textShadowColor: '#00ff88',

    textShadowOffset: {
      width: 0,
      height: 0,
    },

    textShadowRadius: 4,
  },

  rewardLabel: {
    marginTop: 1,

    color: '#4E7149',

    fontSize: 7,

    fontWeight: '800',

    letterSpacing: 0.8,
  },

  /* BOTTOM SPACE */
  bottomSpacing: {
    height: 45,
  },
});
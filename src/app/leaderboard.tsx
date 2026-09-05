import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { COLORS } from '@/APIs/Colors';
import { Color } from 'expo-router';

type IconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>['name'];

interface CountryRanking {
  id: string;
  country: string;
  value: string;
  numericValue: number;
  flag: string;
}

interface RankingCategory {
  id: string;
  title: string;
  subtitle: string;
  icon: IconName;
  unit: string;
  rankings: CountryRanking[];
  playerRank: number;
  playerValue: string;
}

const playerCountry = 'ایران';

const rankingCategories: RankingCategory[] = [
  {
    id: 'wealth',
    title: 'ثروتمندترین کشورها',
    subtitle: 'بیشترین موجودی خزانه',
    icon: 'cash-multiple',
    unit: 'دلار',
    playerRank: 7,
    playerValue: '12,450,000',
    rankings: [
      {
        id: '1',
        country: 'ایالات متحده',
        value: '84,750,000',
        numericValue: 84750000,
        flag: '🇺🇸',
      },
      {
        id: '2',
        country: 'چین',
        value: '76,430,000',
        numericValue: 76430000,
        flag: '🇨🇳',
      },
      {
        id: '3',
        country: 'ژاپن',
        value: '62,800,000',
        numericValue: 62800000,
        flag: '🇯🇵',
      },
      {
        id: '4',
        country: 'آلمان',
        value: '51,620,000',
        numericValue: 51620000,
        flag: '🇩🇪',
      },
      {
        id: '5',
        country: 'انگلستان',
        value: '43,900,000',
        numericValue: 43900000,
        flag: '🇬🇧',
      },
    ],
  },

  {
    id: 'missile',
    title: 'قدرت موشکی',
    subtitle: 'بیشترین قدرت تسلیحات موشکی',
    icon: 'rocket-launch',
    unit: 'قدرت',
    playerRank: 4,
    playerValue: '48,650',
    rankings: [
      {
        id: '1',
        country: 'روسیه',
        value: '92,450',
        numericValue: 92450,
        flag: '🇷🇺',
      },
      {
        id: '2',
        country: 'چین',
        value: '81,700',
        numericValue: 81700,
        flag: '🇨🇳',
      },
      {
        id: '3',
        country: 'کره شمالی',
        value: '63,200',
        numericValue: 63200,
        flag: '🇰🇵',
      },
      {
        id: '4',
        country: playerCountry,
        value: '48,650',
        numericValue: 48650,
        flag: '🇮🇷',
      },
      {
        id: '5',
        country: 'فرانسه',
        value: '42,800',
        numericValue: 42800,
        flag: '🇫🇷',
      },
    ],
  },

  {
    id: 'air',
    title: 'قدرت نیروی هوایی',
    subtitle: 'بیشترین قدرت جنگنده‌های هوایی',
    icon: 'airplane',
    unit: 'قدرت',
    playerRank: 6,
    playerValue: '41,280',
    rankings: [
      {
        id: '1',
        country: 'ایالات متحده',
        value: '96,400',
        numericValue: 96400,
        flag: '🇺🇸',
      },
      {
        id: '2',
        country: 'روسیه',
        value: '82,700',
        numericValue: 82700,
        flag: '🇷🇺',
      },
      {
        id: '3',
        country: 'چین',
        value: '78,900',
        numericValue: 78900,
        flag: '🇨🇳',
      },
      {
        id: '4',
        country: 'هند',
        value: '57,300',
        numericValue: 57300,
        flag: '🇮🇳',
      },
      {
        id: '5',
        country: 'فرانسه',
        value: '49,850',
        numericValue: 49850,
        flag: '🇫🇷',
      },
    ],
  },

  {
    id: 'navy',
    title: 'قدرت ناوگان دریایی',
    subtitle: 'قدرتمندترین ناوگان دریایی',
    icon: 'ferry',
    unit: 'قدرت',
    playerRank: 8,
    playerValue: '29,740',
    rankings: [
      {
        id: '1',
        country: 'ایالات متحده',
        value: '91,600',
        numericValue: 91600,
        flag: '🇺🇸',
      },
      {
        id: '2',
        country: 'چین',
        value: '84,200',
        numericValue: 84200,
        flag: '🇨🇳',
      },
      {
        id: '3',
        country: 'روسیه',
        value: '61,700',
        numericValue: 61700,
        flag: '🇷🇺',
      },
      {
        id: '4',
        country: 'انگلستان',
        value: '44,300',
        numericValue: 44300,
        flag: '🇬🇧',
      },
      {
        id: '5',
        country: 'ژاپن',
        value: '39,800',
        numericValue: 39800,
        flag: '🇯🇵',
      },
    ],
  },

  {
    id: 'defense',
    title: 'قدرت پدافندی',
    subtitle: 'قوی‌ترین سامانه‌های پدافندی',
    icon: 'shield-check',
    unit: 'قدرت',
    playerRank: 3,
    playerValue: '52,900',
    rankings: [
      {
        id: '1',
        country: 'روسیه',
        value: '76,500',
        numericValue: 76500,
        flag: '🇷🇺',
      },
      {
        id: '2',
        country: 'چین',
        value: '68,300',
        numericValue: 68300,
        flag: '🇨🇳',
      },
      {
        id: '3',
        country: playerCountry,
        value: '52,900',
        numericValue: 52900,
        flag: '🇮🇷',
      },
      {
        id: '4',
        country: 'اسرائیل',
        value: '49,800',
        numericValue: 49800,
        flag: '🇮🇱',
      },
      {
        id: '5',
        country: 'هند',
        value: '41,600',
        numericValue: 41600,
        flag: '🇮🇳',
      },
    ],
  },

  {
    id: 'ground',
    title: 'قدرت تجهیزات زمینی',
    subtitle: 'بیشترین قدرت نیروهای زمینی',
    icon: 'tank',
    unit: 'قدرت',
    playerRank: 5,
    playerValue: '57,400',
    rankings: [
      {
        id: '1',
        country: 'روسیه',
        value: '98,500',
        numericValue: 98500,
        flag: '🇷🇺',
      },
      {
        id: '2',
        country: 'چین',
        value: '87,200',
        numericValue: 87200,
        flag: '🇨🇳',
      },
      {
        id: '3',
        country: 'ایالات متحده',
        value: '81,900',
        numericValue: 81900,
        flag: '🇺🇸',
      },
      {
        id: '4',
        country: 'هند',
        value: '63,700',
        numericValue: 63700,
        flag: '🇮🇳',
      },
      {
        id: '5',
        country: playerCountry,
        value: '57,400',
        numericValue: 57400,
        flag: '🇮🇷',
      },
    ],
  },

  {
    id: 'infantry',
    title: 'قدرت پیاده‌نظام',
    subtitle: 'بیشترین قدرت نیروهای انسانی',
    icon: 'account-group',
    unit: 'قدرت',
    playerRank: 9,
    playerValue: '35,800',
    rankings: [
      {
        id: '1',
        country: 'چین',
        value: '94,700',
        numericValue: 94700,
        flag: '🇨🇳',
      },
      {
        id: '2',
        country: 'هند',
        value: '86,300',
        numericValue: 86300,
        flag: '🇮🇳',
      },
      {
        id: '3',
        country: 'روسیه',
        value: '79,900',
        numericValue: 79900,
        flag: '🇷🇺',
      },
      {
        id: '4',
        country: 'ایالات متحده',
        value: '65,400',
        numericValue: 65400,
        flag: '🇺🇸',
      },
      {
        id: '5',
        country: 'پاکستان',
        value: '58,600',
        numericValue: 58600,
        flag: '🇵🇰',
      },
    ],
  },

  {
    id: 'cyber',
    title: 'قدرت سایبری و اطلاعاتی',
    subtitle: 'برترین قدرت سایبری',
    icon: 'lan',
    unit: 'قدرت',
    playerRank: 6,
    playerValue: '31,500',
    rankings: [
      {
        id: '1',
        country: 'ایالات متحده',
        value: '88,700',
        numericValue: 88700,
        flag: '🇺🇸',
      },
      {
        id: '2',
        country: 'چین',
        value: '81,400',
        numericValue: 81400,
        flag: '🇨🇳',
      },
      {
        id: '3',
        country: 'روسیه',
        value: '75,800',
        numericValue: 75800,
        flag: '🇷🇺',
      },
      {
        id: '4',
        country: 'اسرائیل',
        value: '63,900',
        numericValue: 63900,
        flag: '🇮🇱',
      },
      {
        id: '5',
        country: 'بریتانیا',
        value: '52,600',
        numericValue: 52600,
        flag: '🇬🇧',
      },
    ],
  },

  {
    id: 'satisfaction',
    title: 'رضایت مردم',
    subtitle: 'شادترین و راضی‌ترین مردم',
    icon: 'emoticon-happy-outline',
    unit: '%',
    playerRank: 5,
    playerValue: '72%',
    rankings: [
      {
        id: '1',
        country: 'سوئیس',
        value: '94%',
        numericValue: 94,
        flag: '🇨🇭',
      },
      {
        id: '2',
        country: 'نروژ',
        value: '91%',
        numericValue: 91,
        flag: '🇳🇴',
      },
      {
        id: '3',
        country: 'دانمارک',
        value: '89%',
        numericValue: 89,
        flag: '🇩🇰',
      },
      {
        id: '4',
        country: 'ژاپن',
        value: '81%',
        numericValue: 81,
        flag: '🇯🇵',
      },
      {
        id: '5',
        country: playerCountry,
        value: '72%',
        numericValue: 72,
        flag: '🇮🇷',
      },
    ],
  },

  {
    id: 'income',
    title: 'بیشترین درآمد روزانه',
    subtitle: 'بیشترین درآمد تولید شده در هر روز',
    icon: 'finance',
    unit: 'دلار / روز',
    playerRank: 8,
    playerValue: '+385,000',
    rankings: [
      {
        id: '1',
        country: 'ایالات متحده',
        value: '+2,450,000',
        numericValue: 2450000,
        flag: '🇺🇸',
      },
      {
        id: '2',
        country: 'چین',
        value: '+2,120,000',
        numericValue: 2120000,
        flag: '🇨🇳',
      },
      {
        id: '3',
        country: 'ژاپن',
        value: '+1,680,000',
        numericValue: 1680000,
        flag: '🇯🇵',
      },
      {
        id: '4',
        country: 'آلمان',
        value: '+1,420,000',
        numericValue: 1420000,
        flag: '🇩🇪',
      },
      {
        id: '5',
        country: 'فرانسه',
        value: '+1,180,000',
        numericValue: 1180000,
        flag: '🇫🇷',
      },
    ],
  },

  {
    id: 'military',
    title: 'قدرت نظامی کل',
    subtitle: 'قوی‌ترین کشورهای جهان',
    icon: 'shield-star',
    unit: 'قدرت',
    playerRank: 4,
    playerValue: '72,450',
    rankings: [
      {
        id: '1',
        country: 'ایالات متحده',
        value: '184,500',
        numericValue: 184500,
        flag: '🇺🇸',
      },
      {
        id: '2',
        country: 'روسیه',
        value: '167,800',
        numericValue: 167800,
        flag: '🇷🇺',
      },
      {
        id: '3',
        country: 'چین',
        value: '159,300',
        numericValue: 159300,
        flag: '🇨🇳',
      },
      {
        id: '4',
        country: playerCountry,
        value: '72,450',
        numericValue: 72450,
        flag: '🇮🇷',
      },
      {
        id: '5',
        country: 'هند',
        value: '68,900',
        numericValue: 68900,
        flag: '🇮🇳',
      },
    ],
  },

  {
    id: 'oil',
    title: 'تولید نفت',
    subtitle: 'بیشترین استخراج روزانه نفت',
    icon: 'oil',
    unit: 'واحد / روز',
    playerRank: 6,
    playerValue: '+48,500',
    rankings: [
      {
        id: '1',
        country: 'عربستان سعودی',
        value: '+92,400',
        numericValue: 92400,
        flag: '🇸🇦',
      },
      {
        id: '2',
        country: 'روسیه',
        value: '+88,700',
        numericValue: 88700,
        flag: '🇷🇺',
      },
      {
        id: '3',
        country: 'ایالات متحده',
        value: '+81,300',
        numericValue: 81300,
        flag: '🇺🇸',
      },
      {
        id: '4',
        country: 'عراق',
        value: '+63,900',
        numericValue: 63900,
        flag: '🇮🇶',
      },
      {
        id: '5',
        country: 'امارات',
        value: '+57,600',
        numericValue: 57600,
        flag: '🇦🇪',
      },
    ],
  },
];

const PageTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleDecorationLeft}>
        <View style={styles.titleLine} />
        <View style={styles.titleDiamond} />
      </View>

      <View style={styles.titleCenter}>
        <Text style={styles.pageTitle}>لیدربرد</Text>
        <Text style={styles.pageSubtitle}>Leader Board</Text>
      </View>

      <View style={styles.titleDecorationRight}>
        <View style={styles.titleDiamond} />
        <View style={styles.titleLine} />
      </View>
    </View>
  );
};

function PlayerRankCard() {
  return (
    <View style={styles.playerRankCard}>
      <View style={styles.playerRankIcon}>
        <MaterialCommunityIcons
          name="crown"
          size={29}
          color='#f5b942'
        />
      </View>

      <View style={styles.playerRankInfo}>
        <Text style={styles.playerRankLabel}>
          رتبه کشور شما
        </Text>

        <Text style={styles.playerCountry}>
          {playerCountry}
        </Text>

        <Text style={styles.playerRankHint}>
          جایگاه شما در میان بازیکنان جهان
        </Text>
      </View>

      <View style={styles.playerRankNumberContainer}>
        <Text style={styles.playerRankSmall}>
          RANK
        </Text>

        <Text style={styles.playerRankNumber}>
          #4
        </Text>
      </View>
    </View>
  );
}

interface RankingCardProps {
  category: RankingCategory;
}

function RankingCard({
  category,
}: RankingCardProps) {
  return (
    <View style={styles.rankingCard}>

      {/* CARD HEADER */}

      <View style={styles.rankingHeader}>

        <View style={styles.categoryIcon}>
          <MaterialCommunityIcons
            name={category.icon}
            size={23}
            color='#00ff88'
          />
        </View>

        <View style={styles.categoryTitleContainer}>
          <Text style={styles.categoryTitle}>
            {category.title}
          </Text>

          <Text style={styles.categorySubtitle}>
            {category.subtitle}
          </Text>
        </View>

        <View style={styles.rankIcon}>
          <MaterialCommunityIcons
            name="podium"
            size={19}
            color="#31562A"
          />
        </View>

      </View>

      {/* TOP COUNTRIES */}

      <View style={styles.rankList}>

        {category.rankings.map((item, index) => {
          const rank = index + 1;

          const isPlayer =
            item.country === playerCountry;

          return (
            <View
              key={item.id}
              style={[
                styles.rankRow,
                isPlayer && styles.playerRow,
              ]}
            >

              {/* RANK */}

              <View
                style={[
                  styles.rankNumberContainer,
                  rank <= 3 && styles.topRankNumber,
                ]}
              >
                {rank === 1 ? (
                  <MaterialCommunityIcons
                    name="medal"
                    size={20}
                    color='#00ff88'
                  />
                ) : (
                  <Text
                    style={[
                      styles.rankNumber,
                      rank <= 3 &&
                        styles.topRankText,
                    ]}
                  >
                    {rank}
                  </Text>
                )}
              </View>

              {/* COUNTRY */}

              <View style={styles.countryContainer}>

                <Text style={styles.flag}>
                  {item.flag}
                </Text>

                <Text
                  style={[
                    styles.countryName,
                    isPlayer &&
                      styles.playerCountryName,
                  ]}
                  numberOfLines={1}
                >
                  {item.country}
                </Text>

                {isPlayer && (
                  <View style={styles.youBadge}>
                    <Text style={styles.youBadgeText}>
                      شما
                    </Text>
                  </View>
                )}

              </View>

              {/* VALUE */}

              <View style={styles.valueContainer}>
                <Text
                  style={[
                    styles.value,
                    isPlayer && styles.playerValue,
                  ]}
                >
                  {item.value}
                </Text>

                <Text style={styles.unit}>
                  {category.unit}
                </Text>
              </View>

            </View>
          );
        })}

      </View>

      {/* PLAYER POSITION */}

      <View style={styles.playerPosition}>

        <View style={styles.playerPositionIcon}>
          <MaterialCommunityIcons
            name="account"
            size={17}
            color='#00ff88'
          />
        </View>

        <View style={styles.playerPositionText}>
          <Text style={styles.playerPositionLabel}>
            رتبه شما
          </Text>

          <Text style={styles.playerPositionValue}>
            #{category.playerRank}
          </Text>
        </View>

        <View style={styles.playerPositionScore}>
          <Text style={styles.playerScoreValue}>
            {category.playerValue}
          </Text>

          <Text style={styles.unit}>
            {category.unit}
          </Text>
        </View>

      </View>

    </View>
  );
}

export default function LeaderBoard() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <PageTitle />

        <PlayerRankCard />

        <View style={styles.globalStatus}>
          <MaterialCommunityIcons
            name="earth"
            size={17}
            color='#00ff88'
          />

          <Text style={styles.globalStatusText}>
            رتبه‌بندی جهانی بازیکنان
          </Text>

          <View style={styles.liveDot} />

          <Text style={styles.liveText}>
            LIVE
          </Text>
        </View>

        {rankingCategories.map((category) => (
          <RankingCard
            key={category.id}
            category={category}
          />
        ))}

        <View style={styles.bottomSpacing} />

      </ScrollView>
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000000',
  },

  scrollView: {
    flex: 1,
    backgroundColor: '#000000',
  },

  scrollContent: {
    paddingHorizontal: 14,
    paddingTop: 8,
    paddingBottom: 35,
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
    backgroundColor: '#00ff88',
    transform: [{ rotate: '45deg' }],
    marginHorizontal: 8,
  },  

  playerRankCard: {
    flexDirection: 'row',

    alignItems: 'center',

    minHeight: 82,

    padding: 11,

    marginBottom: 10,

    backgroundColor: '#061006',

    borderWidth: 1,

    borderColor: '#2A7A1B',

    borderRadius: 13,

    shadowColor: '#00ff88',

    shadowOpacity: 0.16,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 3,
  },

  playerRankIcon: {
    width: 52,
    height: 52,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 11,

    borderWidth: 1,

    borderColor: '#286B1A',

    backgroundColor: '#081508',

    marginRight: 10,
  },

  playerRankInfo: {
    flex: 1,

    minWidth: 0,
  },

  playerRankLabel: {
    color: '#00ff88',

    fontSize: 11,

    fontWeight: '800',

    textAlign: 'right',
  },

  playerCountry: {
    marginTop: 2,

    color: '#F0F0F0',

    fontSize: 17,

    fontWeight: '900',

    textAlign: 'right',
  },

  playerRankHint: {
    marginTop: 2,

    color: '#5E7359',

    fontSize: 9,

    textAlign: 'right',
  },

  playerRankNumberContainer: {
    minWidth: 58,

    alignItems: 'center',

    justifyContent: 'center',

    paddingLeft: 8,

    borderLeftWidth: 1,

    borderLeftColor: '#193116',
  },

  playerRankSmall: {
    color: '#4E7149',

    fontSize: 8,

    fontWeight: '800',

    letterSpacing: 1,
  },

  playerRankNumber: {
    marginTop: 1,

    color: COLORS.white,

    fontSize: 25,

    fontWeight: '900',

    textShadowColor: COLORS.white,

    textShadowOffset: {
      width: 0,
      height: 0,
    },

    textShadowRadius: 5,
  },

  globalStatus: {
    flexDirection: 'row',

    alignItems: 'center',

    alignSelf: 'center',

    marginBottom: 11,

    paddingHorizontal: 12,

    paddingVertical: 6,

    borderRadius: 20,

    borderWidth: 1,

    borderColor: '#153D0E',

    backgroundColor: '#030703',
  },

  globalStatusText: {
    marginLeft: 6,

    color: '#7A8C76',

    fontSize: 10,

    fontWeight: '700',
  },

  liveDot: {
    width: 5,
    height: 5,

    marginLeft: 9,

    borderRadius: 3,

    backgroundColor: '#00ff88',
  },

  liveText: {
    marginLeft: 4,

    color: '#00ff88',

    fontSize: 7,

    fontWeight: '900',

    letterSpacing: 0.8,
  },

  rankingCard: {
    marginBottom: 12,

    padding: 10,

    backgroundColor: '#040604',

    borderWidth: 1,

    borderColor: '#153A10',

    borderRadius: 13,

    shadowColor: '#00ff88',

    shadowOpacity: 0.06,

    shadowRadius: 6,

    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 2,
  },

  rankingHeader: {
    flexDirection: 'row',

    alignItems: 'center',

    minHeight: 49,

    paddingBottom: 9,

    borderBottomWidth: 1,

    borderBottomColor: '#10250D',
  },

  categoryIcon: {
    width: 42,
    height: 42,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 9,

    borderWidth: 1,

    borderColor: '#1B4D12',

    backgroundColor: '#061006',

    marginRight: 9,
  },

  categoryTitleContainer: {
    flex: 1,

    minWidth: 0,
  },

  categoryTitle: {
    color: '#E9FFE6',

    fontSize: 14,

    fontWeight: '900',

    textAlign: 'right',
  },

  categorySubtitle: {
    marginTop: 2,

    color: '#52664E',

    fontSize: 8,

    fontWeight: '600',

    textAlign: 'right',
  },

  rankIcon: {
    marginLeft: 7,
  },

  rankList: {
    marginTop: 3,
  },

  rankRow: {
    minHeight: 48,

    flexDirection: 'row',

    alignItems: 'center',

    paddingVertical: 5,

    borderBottomWidth: 1,

    borderBottomColor: '#0D180B',
  },

  playerRow: {
    backgroundColor: '#071207',

    borderRadius: 7,

    borderWidth: 1,

    borderColor: '#1D5514',

    paddingHorizontal: 5,

    marginVertical: 2,
  },

  rankNumberContainer: {
    width: 28,

    alignItems: 'center',

    justifyContent: 'center',

    marginRight: 5,
  },

  topRankNumber: {
    backgroundColor: '#071307',

    borderRadius: 6,
  },

  rankNumber: {
    color: '#536150',

    fontSize: 13,

    fontWeight: '800',
  },

  topRankText: {
    color: '#82937D',
  },

  countryContainer: {
    flex: 1,

    minWidth: 0,

    flexDirection: 'row',

    alignItems: 'center',
  },

  flag: {
    fontSize: 19,

    marginRight: 7,
  },

  countryName: {
    flexShrink: 1,

    color: '#D6D6D6',

    fontSize: 11,

    fontWeight: '700',

    textAlign: 'right',
  },

  playerCountryName: {
    color: '#00ff88',

    fontWeight: '900',
  },

  youBadge: {
    marginLeft: 6,

    paddingHorizontal: 5,

    paddingVertical: 2,

    borderRadius: 4,

    borderWidth: 1,

    borderColor: '#245D18',

    backgroundColor: '#0A1808',
  },

  youBadgeText: {
    color: '#00ff88',

    fontSize: 7,

    fontWeight: '900',
  },

  valueContainer: {
    width: 88,

    alignItems: 'flex-end',

    justifyContent: 'center',
  },

  value: {
    color: '#B6C2B3',

    fontSize: 11,

    fontWeight: '800',

    textAlign: 'right',
  },

  playerValue: {
    color: '#00ff88',

    fontWeight: '900',
  },

  unit: {
    marginTop: 1,

    color: '#43523F',

    fontSize: 7,

    textAlign: 'right',
  },

  playerPosition: {
    flexDirection: 'row',

    alignItems: 'center',

    marginTop: 9,

    padding: 8,

    borderRadius: 8,

    borderWidth: 1,

    borderColor: '#173D11',

    backgroundColor: '#050A05',
  },

  playerPositionIcon: {
    width: 30,
    height: 30,

    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 7,

    backgroundColor: '#071307',

    borderWidth: 1,

    borderColor: '#1A4A12',

    marginRight: 8,
  },

  playerPositionText: {
    flex: 1,
  },

  playerPositionLabel: {
    color: '#657260',

    fontSize: 8,

    fontWeight: '700',

    textAlign: 'right',
  },

  playerPositionValue: {
    marginTop: 1,

    color: '#00ff88',

    fontSize: 14,

    fontWeight: '900',

    textAlign: 'right',
  },

  playerPositionScore: {
    minWidth: 90,

    alignItems: 'flex-end',

    justifyContent: 'center',
  },

  playerScoreValue: {
    color: '#00ff88',

    fontSize: 13,

    fontWeight: '900',

    textAlign: 'right',
  },

  bottomSpacing: {
    height: 45,
  },
});

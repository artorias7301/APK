import {View, Text, StyleSheet, ScrollView, Dimensions }from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { COLORS } from '@/APIs/Colors';

const { width } = Dimensions.get("window");
const stats = [
  {
    title: "خزانه",
    value: "wz 2,450,000",
    icon: "wallet",
    color: COLORS.orange,
  },
  {
    title: "درآمد روزانه",
    value: "wz 125,000",
    icon: "trending-up",
    color: COLORS.green,
  },
  {
    title: "رضایت مردم",
    value: "78%",
    icon: "people",
    color: COLORS.green,
  },
  {
    title: "مالیات روزانه",
    value: "wz 84,500",
    icon: "cash",
    color: COLORS.green,
  },
  {
    title: "نفت",
    value: "1,280,000 بشکه",
    icon: "flame",
    color: COLORS.green,
  },
  {
    title: "استخراج روزانه",
    value: "42,000 بشکه",
    icon: "construct",
    color: COLORS.green,
  },
];

const events = [
  {
    icon: "trending-up",
    title: "افزایش درآمد مالیاتی",
    description: "درآمد مالیاتی کشور 8% افزایش یافت.",
    time: "امروز",
  },
  {
    icon: "people",
    title: "افزایش رضایت مردم",
    description: "رضایت مردم 3 درصد افزایش پیدا کرد.",
    time: "روز 24",
  },
  {
    icon: "water",
    title: "افزایش تولید نفت",
    description: "ظرفیت استخراج نفت افزایش یافت.",
    time: "روز 23",
  },
  {
    icon: "warning",
    title: "بحران اقتصادی",
    description: "هزینه‌های دولتی افزایش پیدا کرده است.",
    time: "روز 21",
  },
];

const chartData = [
  38, 44, 41, 49, 46, 55, 52, 61, 58, 67, 64, 72, 69, 78, 75, 84,
];

function StatCard({ item }: any) {
  return (
    <View style={styles.statCard}>
      <View style={styles.statTop}>
        <View style={styles.iconBox}>
          <Ionicons name={item.icon} size={21} color="#00ff88" />
        </View>

        <Text style={styles.statTitle}>{item.title}</Text>
      </View>

      <Text style={styles.statValue}>{item.value}</Text>
    </View>
  );
}

function MoneyChart() {
  const max = Math.max(...chartData);
  const min = Math.min(...chartData);

  return (
    <View style={styles.chartContainer}>
      <View style={styles.chartYAxis}>
        <Text style={styles.axisText}>2.5M</Text>
        <Text style={styles.axisText}>2.0M</Text>
        <Text style={styles.axisText}>1.5M</Text>
        <Text style={styles.axisText}>1.0M</Text>
        <Text style={styles.axisText}>500K</Text>
      </View>

      <View style={styles.chart}>
        {/* خطوط افقی */}
        <View style={[styles.gridLine, { top: 0 }]} />
        <View style={[styles.gridLine, { top: "25%" }]} />
        <View style={[styles.gridLine, { top: "50%" }]} />
        <View style={[styles.gridLine, { top: "75%" }]} />
        <View style={[styles.gridLine, { top: "100%" }]} />

        <View style={styles.bars}>
          {chartData.map((value, index) => {
            const height =
              ((value - min) / (max - min)) * 75 + 20;

            return (
              <View
                key={index}
                style={[
                  styles.bar,
                  {
                    height: `${height}%`,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const PageTitle = () => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleDecorationLeft}>
        <View style={styles.titleLine} />
        <View style={styles.titleDiamond} />
      </View>

      <View style={styles.titleCenter}>
        <Text style={styles.pageTitle}>داشبورد</Text>
        <Text style={styles.pageSubtitle}>Dashboard</Text>
      </View>

      <View style={styles.titleDecorationRight}>
        <View style={styles.titleDiamond} />
        <View style={styles.titleLine} />
      </View>
    </View>
  );
};

export default function Dashbord() {
  return (
    <SafeAreaView style={styles.screen}>
      <Header/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <PageTitle />
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          {stats.map((item, index) => (
            <StatCard item={item} key={index} />
          ))}
        </View>

        {/* Country Status */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>وضعیت کشور</Text>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <View>
              <Text style={styles.statusLabel}>قدرت اقتصادی</Text>
              <Text style={styles.statusValue}>GOOD</Text>
            </View>

            <View style={styles.statusCircle}>
              <Ionicons
                name="shield-checkmark"
                size={26}
                color="#00ff88"
              />
            </View>
          </View>

          <View style={styles.progressBackground}>
            <View style={styles.progress} />
          </View>

          <View style={styles.statusDetails}>
            <Text style={styles.detailText}>اقتصاد پایدار</Text>
            <Text style={styles.detailPercent}>82%</Text>
          </View>
        </View>

        {/* Chart */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>
            موجودی خزانه در روزهای بازی
          </Text>
        </View>

        <View style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <View>
              <Text style={styles.chartLabel}>موجودی فعلی</Text>
              <Text style={styles.chartValue}>₽ 2.45M</Text>
            </View>

            <View style={styles.growthBox}>
              <Ionicons
                name="arrow-up"
                size={15}
                color="#00ff88"
              />
              <Text style={styles.growthText}>+14.8%</Text>
            </View>
          </View>

          <MoneyChart />

          <View style={styles.xAxis}>
            <Text style={styles.axisText}>روز 1</Text>
            <Text style={styles.axisText}>روز 8</Text>
            <Text style={styles.axisText}>روز 16</Text>
            <Text style={styles.axisText}>روز 24</Text>
          </View>
        </View>

        {/* Events */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionLine} />
          <Text style={styles.sectionTitle}>اتفاقات اخیر کشور</Text>
        </View>

        <View style={styles.eventsCard}>
          {events.map((event, index) => (
            <View key={index}
              style={[styles.event, index !== events.length - 1 && styles.eventBorder,]}>
              <View style={styles.eventIcon}>
                <Ionicons name={event.icon} size={20} color="#00ff88"/>
              </View>

              <View style={styles.eventContent}>
                <Text style={styles.eventTitle}>
                  {event.title}
                </Text>

                <Text style={styles.eventDescription}>
                  {event.description}
                </Text>
              </View>

              <Text style={styles.eventTime}>{event.time}</Text>
            </View>
          ))}
        </View>

        <View style={styles.footer}>
          <Ionicons
            name="radio"
            size={14}
            color="#00ff88"
          />
          <Text style={styles.footerText}>
            SYSTEM STATUS: STABLE
          </Text>
        </View>
      </ScrollView>
      <Footer/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#050807",
  },

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

  container: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    paddingTop: 8,
  },

  smallHeader: {
    color: COLORS.green,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    textAlign: "right",
  },

  onlineIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderWidth: 1,
    borderColor: "#0d4029",
    backgroundColor: "#07150e",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 8,
  },

  onlineDot: {
    width: 7,
    height: 7,
    borderRadius: 10,
    backgroundColor: COLORS.green,
  },

  onlineText: {
    color: COLORS.green,
    fontSize: 9,
    fontWeight: "800",
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  statCard: {
    width: "48.5%",
    backgroundColor: "#0a100d",
    borderWidth: 1,
    borderColor: "#163d2a",
    borderRadius: 12,
    padding: 13,
    marginBottom: 10,
  },

  statTop: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },

  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 9,
    backgroundColor: "#071b11",
    borderWidth: 1,
    borderColor: "#124d31",
    alignItems: "center",
    justifyContent: "center",
  },

  statTitle: {
    color: "#8c9b93",
    fontSize: 12,
    fontWeight: "600",
  },

  statValue: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 14,
    textAlign: "right",
  },

  sectionHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 10,
    gap: 9,
  },

  sectionLine: {
    width: 4,
    height: 19,
    borderRadius: 4,
    backgroundColor: COLORS.green,
  },

  sectionTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "right",
  },

  statusCard: {
    backgroundColor: "#0a100d",
    borderWidth: 1,
    borderColor: "#163d2a",
    borderRadius: 14,
    padding: 16,
  },

  statusHeader: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statusLabel: {
    color: "#829088",
    fontSize: 11,
    textAlign: "right",
  },

  statusValue: {
    color: COLORS.green,
    fontSize: 21,
    fontWeight: "900",
    marginTop: 4,
    textAlign: "right",
  },

  statusCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#071b11",
    borderWidth: 1,
    borderColor: "#124d31",
    alignItems: "center",
    justifyContent: "center",
  },

  progressBackground: {
    height: 7,
    backgroundColor: "#16221c",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 17,
  },

  progress: {
    width: "82%",
    height: "100%",
    backgroundColor: COLORS.green,
    borderRadius: 10,
  },

  statusDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  detailText: {
    color: "#75827b",
    fontSize: 10,
  },

  detailPercent: {
    color: COLORS.green,
    fontSize: 11,
    fontWeight: "800",
  },

  statusRows: {
    marginTop: 13,
    gap: 9,
  },

  statusRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 7,
  },

  statusRowText: {
    color: "#b4beb9",
    fontSize: 11,
  },

  chartCard: {
    backgroundColor: "#0a100d",
    borderWidth: 1,
    borderColor: "#163d2a",
    borderRadius: 14,
    padding: 16,
  },

  chartHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chartLabel: {
    color: "#7f8d85",
    fontSize: 11,
    textAlign: "right",
  },

  chartValue: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "900",
    marginTop: 3,
    textAlign: "right",
  },

  growthBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#071b11",
    borderWidth: 1,
    borderColor: "#124d31",
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 7,
  },

  growthText: {
    color: COLORS.green,
    fontSize: 11,
    fontWeight: "800",
  },

  chartContainer: {
    flexDirection: "row",
    height: 180,
    marginTop: 20,
  },

  chartYAxis: {
    width: 42,
    justifyContent: "space-between",
    paddingVertical: 2,
  },

  axisText: {
    color: "#536159",
    fontSize: 9,
  },

  chart: {
    flex: 1,
    position: "relative",
    marginLeft: 5,
  },

  gridLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "#14201a",
  },

  bars: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 3,
    paddingBottom: 1,
  },

  bar: {
    width: Math.max(4, (width - 100) / 30),
    backgroundColor: COLORS.green,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    opacity: 0.8,
  },

  xAxis: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 47,
    marginTop: 7,
  },

  eventsCard: {
    backgroundColor: "#0a100d",
    borderWidth: 1,
    borderColor: "#163d2a",
    borderRadius: 14,
    paddingHorizontal: 14,
  },

  event: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingVertical: 14,
    gap: 10,
  },

  eventBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#14231a",
  },

  eventIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#071b11",
    borderWidth: 1,
    borderColor: "#124d31",
    alignItems: "center",
    justifyContent: "center",
  },

  eventContent: {
    flex: 1,
  },

  eventTitle: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "right",
  },

  eventDescription: {
    color: "#6f7c74",
    fontSize: 10,
    marginTop: 4,
    textAlign: "right",
  },

  eventTime: {
    color: COLORS.green,
    fontSize: 9,
    fontWeight: "700",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 25,
  },

  footerText: {
    color: "#31503f",
    fontSize: 9,
    letterSpacing: 1,
    fontWeight: "700",
  },
});
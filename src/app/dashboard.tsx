import Header from "@/components/header";
import {View, Text, StyleSheet, ScrollView, Dimensions}from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const stats = [
  {
    title: "خزانه",
    value: "₽ 2,450,000",
    icon: "wallet",
    color: "#00ff88",
  },
  {
    title: "درآمد روزانه",
    value: "₽ 125,000",
    icon: "trending-up",
    color: "#00ff88",
  },
  {
    title: "رضایت مردم",
    value: "78%",
    icon: "people",
    color: "#00ff88",
  },
  {
    title: "مالیات روزانه",
    value: "₽ 84,500",
    icon: "cash",
    color: "#00ff88",
  },
  {
    title: "نفت",
    value: "1,280,000 بشکه",
    icon: "flame",
    color: "#00ff88",
  },
  {
    title: "استخراج روزانه",
    value: "42,000 بشکه",
    icon: "construct",
    color: "#00ff88",
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

export default function Dashbord() {
  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>

        <Header/>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>داشبورد کشور</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#050807",
  },

  container: {
    padding: 16,
    paddingBottom: 40,
  },

  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingTop: 8,
  },

  smallHeader: {
    color: "#00ff88",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2,
    textAlign: "right",
  },

  headerTitle: {
    color: "#ffffff",
    fontSize: 26,
    fontWeight: "900",
    marginTop: 4,
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
    backgroundColor: "#00ff88",
  },

  onlineText: {
    color: "#00ff88",
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
    backgroundColor: "#00ff88",
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
    color: "#00ff88",
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
    backgroundColor: "#00ff88",
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
    color: "#00ff88",
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
    color: "#00ff88",
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
    backgroundColor: "#00ff88",
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
    color: "#00ff88",
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

// // // // // // // // // // // // // // // // // // // // // // 

// import { Image } from 'expo-image';
// import { SymbolView } from 'expo-symbols';
// import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';

// import { ExternalLink } from '@/components/external-link';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { Collapsible } from '@/components/ui/collapsible';
// import { WebBadge } from '@/components/web-badge';
// import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
// import { useTheme } from '@/hooks/use-theme';

// export default function TabTwoScreen() {
//   const safeAreaInsets = useSafeAreaInsets();
//   const insets = {
//     ...safeAreaInsets,
//     bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
//   };
//   const theme = useTheme();

//   const contentPlatformStyle = Platform.select({
//     android: {
//       paddingTop: insets.top,
//       paddingLeft: insets.left,
//       paddingRight: insets.right,
//       paddingBottom: insets.bottom,
//     },
//     web: {
//       paddingTop: Spacing.six,
//       paddingBottom: Spacing.four,
//     },
//   });

//   return (
//     <ScrollView
//       style={[styles.scrollView, { backgroundColor: theme.background }]}
//       contentInset={insets}
//       contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
//       <ThemedView style={styles.container}>
//         <ThemedView style={styles.titleContainer}>
//           <ThemedText type="subtitle">Explore</ThemedText>
//           <ThemedText style={styles.centerText} themeColor="textSecondary">
//             This starter app includes example{'\n'}code to help you get started.
//           </ThemedText>

//           <ExternalLink href="https://docs.expo.dev" asChild>
//             <Pressable style={({ pressed }) => pressed && styles.pressed}>
//               <ThemedView type="backgroundElement" style={styles.linkButton}>
//                 <ThemedText type="link">Expo documentation</ThemedText>
//                 <SymbolView
//                   tintColor={theme.text}
//                   name={{ ios: 'arrow.up.right.square', android: 'link', web: 'link' }}
//                   size={12}
//                 />
//               </ThemedView>
//             </Pressable>
//           </ExternalLink>
//         </ThemedView>

//         <ThemedView style={styles.sectionsWrapper}>
//           <Collapsible title="File-based routing">
//             <ThemedText type="small">
//               This app has two screens: <ThemedText type="code">src/app/index.tsx</ThemedText> and{' '}
//               <ThemedText type="code">src/app/explore.tsx</ThemedText>
//             </ThemedText>
//             <ThemedText type="small">
//               The layout file in <ThemedText type="code">src/app/_layout.tsx</ThemedText> sets up
//               the tab navigator.
//             </ThemedText>
//             <ExternalLink href="https://docs.expo.dev/router/introduction">
//               <ThemedText type="linkPrimary">Learn more</ThemedText>
//             </ExternalLink>
//           </Collapsible>

//           <Collapsible title="Android, iOS, and web support">
//             <ThemedView type="backgroundElement" style={styles.collapsibleContent}>
//               <ThemedText type="small">
//                 You can open this project on Android, iOS, and the web. To open the web version,
//                 press <ThemedText type="smallBold">w</ThemedText> in the terminal running this
//                 project.
//               </ThemedText>
//               <Image
//                 source={require('@/assets/images/tutorial-web.png')}
//                 style={styles.imageTutorial}
//               />
//             </ThemedView>
//           </Collapsible>

//           <Collapsible title="Images">
//             <ThemedText type="small">
//               For static images, you can use the <ThemedText type="code">@2x</ThemedText> and{' '}
//               <ThemedText type="code">@3x</ThemedText> suffixes to provide files for different
//               screen densities.
//             </ThemedText>
//             <Image source={require('@/assets/images/react-logo.png')} style={styles.imageReact} />
//             <ExternalLink href="https://reactnative.dev/docs/images">
//               <ThemedText type="linkPrimary">Learn more</ThemedText>
//             </ExternalLink>
//           </Collapsible>

//           <Collapsible title="Light and dark mode components">
//             <ThemedText type="small">
//               This template has light and dark mode support. The{' '}
//               <ThemedText type="code">useColorScheme()</ThemedText> hook lets you inspect what the
//               user&apos;s current color scheme is, and so you can adjust UI colors accordingly.
//             </ThemedText>
//             <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
//               <ThemedText type="linkPrimary">Learn more</ThemedText>
//             </ExternalLink>
//           </Collapsible>

//           <Collapsible title="Animations">
//             <ThemedText type="small">
//               This template includes an example of an animated component. The{' '}
//               <ThemedText type="code">src/components/ui/collapsible.tsx</ThemedText> component uses
//               the powerful <ThemedText type="code">react-native-reanimated</ThemedText> library to
//               animate opening this hint.
//             </ThemedText>
//           </Collapsible>
//         </ThemedView>
//         {Platform.OS === 'web' && <WebBadge />}
//       </ThemedView>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   scrollView: {
//     flex: 1,
//   },
//   contentContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   container: {
//     maxWidth: MaxContentWidth,
//     flexGrow: 1,
//   },
//   titleContainer: {
//     gap: Spacing.three,
//     alignItems: 'center',
//     paddingHorizontal: Spacing.four,
//     paddingVertical: Spacing.six,
//   },
//   centerText: {
//     textAlign: 'center',
//   },
//   pressed: {
//     opacity: 0.7,
//   },
//   linkButton: {
//     flexDirection: 'row',
//     paddingHorizontal: Spacing.four,
//     paddingVertical: Spacing.two,
//     borderRadius: Spacing.five,
//     justifyContent: 'center',
//     gap: Spacing.one,
//     alignItems: 'center',
//   },
//   sectionsWrapper: {
//     gap: Spacing.five,
//     paddingHorizontal: Spacing.four,
//     paddingTop: Spacing.three,
//   },
//   collapsibleContent: {
//     alignItems: 'center',
//   },
//   imageTutorial: {
//     width: '100%',
//     aspectRatio: 296 / 171,
//     borderRadius: Spacing.three,
//     marginTop: Spacing.two,
//   },
//   imageReact: {
//     width: 100,
//     height: 100,
//     alignSelf: 'center',
//   },
// });

import {MaterialCommunityIcons, Ionicons} from "@expo/vector-icons";
import {useCallback,useMemo,useState,} from "react";
import {FlatList,SafeAreaView,StatusBar, ScrollView} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useRef } from "react";
import {Animated, Dimensions, Pressable, StyleSheet, Text, View} from "react-native";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

type IconFamily = "MaterialCommunityIcons" | "Ionicons";
interface ShopCategory {
  id: string;
  name: string;
  icon: string;
  iconFamily: IconFamily;
}

interface ShopItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  benefit: string;
  icon: string;
  iconFamily: IconFamily;
  color?: string;
  upgradeable?: boolean;
}

const shopCategories: ShopCategory[] = [
  {
    id: "income",
    name: "منابع درآمد",
    icon: "cash-multiple",
    iconFamily: "MaterialCommunityIcons",
  },
  {
    id: "missiles",
    name: "تسلیحات موشکی",
    icon: "rocket-launch",
    iconFamily: "MaterialCommunityIcons",
  },
  {
    id: "aircraft",
    name: "جنگنده های هوایی",
    icon: "airplane",
    iconFamily: "MaterialCommunityIcons",
  },
  {
    id: "navy",
    name: "ناوگان دریایی",
    icon: "ferry",
    iconFamily: "MaterialCommunityIcons",
  },
  {
    id: "defense",
    name: "سامانه پدافندی",
    icon: "shield-check",
    iconFamily: "MaterialCommunityIcons",
  },
  {
    id: "ground",
    name: "تجهیزات زمینی",
    icon: "tank",
    iconFamily: "MaterialCommunityIcons",
  },
  {
    id: "infantry",
    name: "پیاده نظام",
    icon: "account-group",
    iconFamily: "MaterialCommunityIcons",
  },
  {
    id: "cyber",
    name: "تجهیزات سایبری و جاسوسی",
    icon: "radar",
    iconFamily: "MaterialCommunityIcons",
  },
  {
    id: "biological",
    name: "تسلیحات بیولوژیکی",
    icon: "biohazard",
    iconFamily: "MaterialCommunityIcons",
  },
  {
    id: "riot",
    name: "کنترل شورش و رضایت مردم",
    icon: "account-supervisor",
    iconFamily: "MaterialCommunityIcons",
  },
  {
    id: "special",
    name: "شاپ ویژه",
    icon: "star-four-points",
    iconFamily: "MaterialCommunityIcons",
  },
];

const shopItems: Record<string, ShopItem[]> = {
  income: [
    {
      id: "income-1",
      name: "پالایشگاه نفت",
      description: "افزایش درآمد نفتی کشور",
      cost: 2500000,
      benefit: "+85,000 / روز",
      icon: "factory",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "income-2",
      name: "نیروگاه",
      description: "افزایش ظرفیت تولید انرژی کشور",
      cost: 1800000,
      benefit: "+60,000 / روز",
      icon: "flash",
      iconFamily: "Ionicons",
    },
    {
      id: "income-3",
      name: "معدن فلزات",
      description: "استخراج و فروش فلزات ارزشمند",
      cost: 2200000,
      benefit: "+70,000 / روز",
      icon: "cube-outline",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "income-4",
      name: "مزرعه کشاورزی",
      description: "تولید محصولات کشاورزی",
      cost: 1200000,
      benefit: "+40,000 / روز",
      icon: "leaf",
      iconFamily: "Ionicons",
    },
    {
      id: "income-5",
      name: "مرکز تجارت",
      description: "افزایش درآمد از تجارت داخلی",
      cost: 3000000,
      benefit: "+100,000 / روز",
      icon: "domain",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "income-6",
      name: "صنعت گردشگری",
      description: "جذب گردشگر و افزایش درآمد ارزی",
      cost: 2800000,
      benefit: "+90,000 / روز",
      icon: "city-variant-outline",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "income-7",
      name: "شرکت مخابرات",
      description: "ارائه خدمات ارتباطی و اینترنت",
      cost: 2000000,
      benefit: "+75,000 / روز",
      icon: "wifi",
      iconFamily: "Ionicons",
    },
  ],

  missiles: [
    {
      id: "missile-1",
      name: "موشک بالستیک",
      description: "افزایش قدرت تهاجمی دوربرد",
      cost: 4200000,
      benefit: "+12 قدرت تهاجمی",
      icon: "rocket-launch",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "missile-2",
      name: "موشک کروز",
      description: "سامانه حمله دقیق برد متوسط",
      cost: 3200000,
      benefit: "+8 قدرت تهاجمی",
      icon: "rocket",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "missile-3",
      name: "موشک هایپرسونیک",
      description: "فناوری پیشرفته حمله سریع",
      cost: 8500000,
      benefit: "+25 قدرت تهاجمی",
      icon: "rocket-launch-outline",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "missile-4",
      name: "مرکز کنترل موشکی",
      description: "افزایش کنترل و دقت موشک ها",
      cost: 5000000,
      benefit: "+15 دقت",
      icon: "target",
      iconFamily: "MaterialCommunityIcons",
    },
  ],

  aircraft: [
    {
      id: "aircraft-1",
      name: "جنگنده نسل چهارم",
      description: "جنگنده چندمنظوره عملیاتی",
      cost: 6500000,
      benefit: "+15 قدرت هوایی",
      icon: "airplane",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "aircraft-2",
      name: "جنگنده نسل پنجم",
      description: "جنگنده پیشرفته با قابلیت پنهان کاری",
      cost: 12000000,
      benefit: "+30 قدرت هوایی",
      icon: "airplane-takeoff",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "aircraft-3",
      name: "پهپاد شناسایی",
      description: "افزایش توان شناسایی هوایی",
      cost: 2400000,
      benefit: "+10 شناسایی",
      icon: "drone",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "aircraft-4",
      name: "پایگاه هوایی",
      description: "زیرساخت عملیاتی نیروی هوایی",
      cost: 7500000,
      benefit: "+20 ظرفیت هوایی",
      icon: "airport",
      iconFamily: "MaterialCommunityIcons",
    },
  ],

  navy: [
    {
      id: "navy-1",
      name: "ناوچه رزمی",
      description: "افزایش قدرت دریایی کشور",
      cost: 5000000,
      benefit: "+12 قدرت دریایی",
      icon: "ferry",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "navy-2",
      name: "ناوشکن",
      description: "کشتی رزمی سنگین",
      cost: 9500000,
      benefit: "+25 قدرت دریایی",
      icon: "ferry",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "navy-3",
      name: "زیردریایی",
      description: "افزایش توان عملیات زیرسطحی",
      cost: 8200000,
      benefit: "+20 قدرت دریایی",
      icon: "submarine",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "navy-4",
      name: "پایگاه دریایی",
      description: "زیرساخت اصلی ناوگان",
      cost: 6000000,
      benefit: "+18 ظرفیت دریایی",
      icon: "anchor",
      iconFamily: "MaterialCommunityIcons",
    },
  ],

  defense: [
    {
      id: "defense-1",
      name: "سامانه پدافندی کوتاه برد",
      description: "دفاع در برابر تهدیدات هوایی",
      cost: 3500000,
      benefit: "+12 دفاع",
      icon: "shield-check",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "defense-2",
      name: "سامانه پدافندی دوربرد",
      description: "پوشش دفاعی گسترده کشور",
      cost: 8000000,
      benefit: "+25 دفاع",
      icon: "shield-star",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "defense-3",
      name: "رادار پیشرفته",
      description: "تشخیص زودهنگام تهدیدات",
      cost: 4200000,
      benefit: "+18 شناسایی",
      icon: "radar",
      iconFamily: "MaterialCommunityIcons",
    },
  ],

  ground: [
    {
      id: "ground-1",
      name: "تانک اصلی میدان نبرد",
      description: "افزایش قدرت نیروهای زمینی",
      cost: 4300000,
      benefit: "+14 قدرت زمینی",
      icon: "tank",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "ground-2",
      name: "خودروی زرهی",
      description: "افزایش تحرک نیروهای زمینی",
      cost: 2600000,
      benefit: "+8 قدرت زمینی",
      icon: "car",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "ground-3",
      name: "توپخانه",
      description: "پشتیبانی آتش نیروهای زمینی",
      cost: 3800000,
      benefit: "+11 قدرت زمینی",
      icon: "target",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "ground-4",
      name: "پایگاه زمینی",
      description: "افزایش ظرفیت نیروهای زمینی",
      cost: 5500000,
      benefit: "+20 ظرفیت",
      icon: "warehouse",
      iconFamily: "MaterialCommunityIcons",
    },
  ],

  infantry: [
    {
      id: "infantry-1",
      name: "نیروی پیاده حرفه ای",
      description: "افزایش ظرفیت نیروهای نظامی",
      cost: 1500000,
      benefit: "+5,000 نیرو",
      icon: "account-group",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "infantry-2",
      name: "نیروی ویژه",
      description: "واحدهای نخبه و آموزش دیده",
      cost: 3800000,
      benefit: "+12 قدرت",
      icon: "account-star",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "infantry-3",
      name: "مرکز آموزش نظامی",
      description: "افزایش سرعت آموزش نیروها",
      cost: 2800000,
      benefit: "+20% آموزش",
      icon: "school",
      iconFamily: "MaterialCommunityIcons",
    },
  ],

  cyber: [
    {
      id: "cyber-1",
      name: "مرکز فرماندهی سایبری",
      description: "افزایش قدرت دفاع سایبری",
      cost: 4800000,
      benefit: "+15 سایبری",
      icon: "server-security",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "cyber-2",
      name: "شبکه جاسوسی",
      description: "افزایش اطلاعات درباره رقبا",
      cost: 5200000,
      benefit: "+20 اطلاعات",
      icon: "radar",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "cyber-3",
      name: "هوش اطلاعاتی",
      description: "تحلیل اطلاعات کشورهای دیگر",
      cost: 6500000,
      benefit: "+25 اطلاعات",
      icon: "brain",
      iconFamily: "MaterialCommunityIcons",
    },
  ],

  biological: [
    {
      id: "bio-1",
      name: "آزمایشگاه تحقیقاتی",
      description: "مرکز تحقیقات زیستی",
      cost: 7000000,
      benefit: "+15 فناوری",
      icon: "biohazard",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "bio-2",
      name: "مرکز تحقیقات پیشرفته",
      description: "توسعه فناوری های زیستی",
      cost: 9500000,
      benefit: "+25 فناوری",
      icon: "flask",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "bio-3",
      name: "شبکه آزمایشگاهی",
      description: "گسترش ظرفیت تحقیقات",
      cost: 11000000,
      benefit: "+30 فناوری",
      icon: "microscope",
      iconFamily: "MaterialCommunityIcons",
    },
  ],

  riot: [
    {
      id: "riot-1",
      name: "مرکز مدیریت بحران",
      description: "افزایش ثبات داخلی کشور",
      cost: 2800000,
      benefit: "+6% رضایت",
      icon: "account-supervisor",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "riot-2",
      name: "مرکز خدمات عمومی",
      description: "بهبود خدمات عمومی کشور",
      cost: 3500000,
      benefit: "+8% رضایت",
      icon: "city",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "riot-3",
      name: "زیرساخت اجتماعی",
      description: "افزایش رضایت و ثبات",
      cost: 5000000,
      benefit: "+12% رضایت",
      icon: "account-heart",
      iconFamily: "MaterialCommunityIcons",
    },
  ],

  special: [
    {
      id: "special-1",
      name: "مرکز فرماندهی ویژه",
      description: "افزایش کلی عملکرد کشور",
      cost: 15000000,
      benefit: "+10% عملکرد",
      icon: "star-four-points",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "special-2",
      name: "شبکه ماهواره ای",
      description: "افزایش اطلاعات و ارتباطات",
      cost: 18000000,
      benefit: "+25% اطلاعات",
      icon: "satellite-variant",
      iconFamily: "MaterialCommunityIcons",
    },
    {
      id: "special-3",
      name: "ابرکامپیوتر ملی",
      description: "افزایش قدرت تحلیل و تصمیم گیری",
      cost: 22000000,
      benefit: "+30% تحلیل",
      icon: "desktop-classic",
      iconFamily: "MaterialCommunityIcons",
    },
  ],
};

const { width } = Dimensions.get("window");
const COLORS = {
  black: "#000000",
  panel: "#07100A",
  panelLight: "#0A160D",
  green: "#39FF14",
  greenDark: "#103D0A",
  border: "#174D12",
  borderBright: "#2ACF13",
  white: "#FFFFFF",
  gray: "#777777",
  grayLight: "#A1A1A1",
  red: "#FF3B30",
  yellow: "#DFFF00",
};

interface IconProps {
  name: string;
  size?: number;
  color?: string;
}

function AppIcon({ name, size = 24, color = COLORS.green }: IconProps) {
  return (
    <MaterialCommunityIcons
      name={name as any}
      size={size}
      color={color}
    />
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

interface CountryStatsProps {
  money: number;
  satisfaction: number;
}

function CountryStats({
  money,
  satisfaction,
}: CountryStatsProps) {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.stat}>
        <View style={styles.statIcon}>
          <Ionicons
            name="wallet-outline"
            size={22}
            color={COLORS.green}
          />
        </View>

        <View style={styles.statTexts}>
          <Text style={styles.statLabel}>پول</Text>

          <Text style={styles.statValue}>
            {money.toLocaleString("en-US")}
          </Text>
        </View>
      </View>

      <View style={styles.verticalDivider} />

      <View style={styles.stat}>
        <View style={styles.statIcon}>
          <Ionicons
            name="happy-outline"
            size={23}
            color={COLORS.green}
          />
        </View>

        <View style={styles.statTexts}>
          <Text style={styles.statLabel}>
            رضایت مردم
          </Text>

          <Text style={styles.statValue}>
            {satisfaction}%
          </Text>
        </View>
      </View>
    </View>
  );
}

interface CategorySelectorProps {
  categories: ShopCategory[];
  selectedId: string;
  onSelect: (id: string) => void;
}

function CategorySelector({
  categories,
  selectedId,
  onSelect,
}: CategorySelectorProps) {
  return (
    <View style={styles.categoryWrapper}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryHeaderText}>
          دسته بندی تجهیزات
        </Text>

        <View style={styles.scrollHint}>
          <Ionicons
            name="chevron-back"
            size={15}
            color={COLORS.green}
          />
        </View>
      </View>

      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {categories.map((category) => {
          const selected = category.id === selectedId;

          return (
            <CategoryButton
              key={category.id}
              category={category}
              selected={selected}
              onPress={() => onSelect(category.id)}
            />
          );
        })}
      </Animated.ScrollView>
    </View>
  );
}

interface CategoryButtonProps {
  category: ShopCategory;
  selected: boolean;
  onPress: () => void;
}

function CategoryButton({
  category,
  selected,
  onPress,
}: CategoryButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(scale, {
      toValue: selected ? 1.02 : 1,
      useNativeDriver: true,
      friction: 7,
    }).start();
  }, [selected, scale]);

  return (
    <Animated.View
      style={[
        styles.categoryAnimated,
        { transform: [{ scale }] },
      ]}
    >
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.categoryButton,
          selected && styles.categoryButtonSelected,
          pressed && styles.categoryPressed,
        ]}
      >
        <AppIcon
          name={category.icon}
          size={18}
          color={
            selected
              ? COLORS.green
              : COLORS.gray
          }
        />

        <Text
          numberOfLines={1}
          style={[
            styles.categoryText,
            selected && styles.categoryTextSelected,
          ]}
        >
          {category.name}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

interface ProductCardProps {
  item: ShopItem;
  money: number;
  purchased: boolean;
  onPurchase: (item: ShopItem) => void;
}

function ProductCard({
  item,
  money,
  purchased,
  onPurchase,
}: ProductCardProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const canBuy = money >= item.cost && !purchased;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      friction: 8,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 6,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.productCard,
        { transform: [{ scale }] },
      ]}
    >
      <View style={styles.productIconBox}>
        <AppIcon
          name={item.icon}
          size={29}
          color={
            purchased
              ? "#176E0B"
              : COLORS.green
          }
        />

        <View style={styles.productCode}>
          <Text style={styles.productCodeText}>
            MCI
          </Text>
        </View>
      </View>

      <View style={styles.productInfo}>
        <Text
          style={styles.productName}
          numberOfLines={1}
        >
          {item.name}
        </Text>

        <Text
          style={styles.productDescription}
          numberOfLines={1}
        >
          {item.description}
        </Text>

        <View style={styles.productStats}>
          <View style={styles.productStat}>
            <Text style={styles.productStatLabel}>
              هزینه
            </Text>

            <Text style={styles.costText}>
              {item.cost.toLocaleString("en-US")}
            </Text>
          </View>

          <View style={styles.productStat}>
            <Text style={styles.productStatLabel}>
              سود
            </Text>

            <Text style={styles.benefitText}>
              {item.benefit}
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        disabled={!canBuy}
        onPress={() => onPurchase(item)}
        onPressIn={pressIn}
        onPressOut={pressOut}
        style={({ pressed }) => [
          styles.buyButton,
          purchased && styles.purchasedButton,
          !canBuy && !purchased && styles.disabledButton,
          pressed && styles.buyPressed,
        ]}
      >
        <Ionicons
          name={
            purchased
              ? "checkmark-circle-outline"
              : "cart-outline"
          }
          size={17}
          color={
            purchased
              ? "#1B6411"
              : canBuy
              ? COLORS.green
              : COLORS.gray
          }
        />

        <Text
          style={[
            styles.buyText,
            purchased && styles.purchasedText,
            !canBuy &&
              !purchased &&
              styles.disabledText,
          ]}
        >
          {purchased ? "فعال" : "خرید"}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

interface FeedbackProps {
  message: string | null;
  success: boolean;
}

function PurchaseFeedback({
  message,
  success,
}: FeedbackProps) {
  if (!message) {
    return null;
  }

  return (
    <View
      style={[
        styles.feedback,
        success
          ? styles.feedbackSuccess
          : styles.feedbackError,
      ]}
    >
      <Ionicons
        name={
          success
            ? "checkmark-circle"
            : "alert-circle"
        }
        size={18}
        color={
          success
            ? COLORS.green
            : COLORS.red
        }
      />

      <Text
        style={[
          styles.feedbackText,
          {
            color: success
              ? COLORS.green
              : COLORS.red,
          },
        ]}
      >
        {message}
      </Text>
    </View>
  );
}

export default function ShopScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("income");
  const [money, setMoney] = useState(12450000);
  const [satisfaction] = useState(72);
  const [purchasedItems, setPurchasedItems] = useState<Set<string>>(new Set());
  const [feedback, setFeedback] = useState<{
    message: string | null;
    success: boolean;
  }>({
    message: null,
    success: false,
  });

  const products = useMemo(() => {
    return shopItems[selectedCategory] ?? [];
  }, [selectedCategory]);

  useEffect(() => {
    if (!feedback.message) {
      return;
    }

    const timer = setTimeout(() => {
      setFeedback({
        message: null,
        success: false,
      });
    }, 2200);

    return () => clearTimeout(timer);
  }, [feedback]);

  const handlePurchase = useCallback(
    (item: ShopItem) => {
      if (purchasedItems.has(item.id)) {
        return;
      }

      if (money < item.cost) {
        setFeedback({
          message: "موجودی کافی نیست",
          success: false,
        });

        return;
      }

      setMoney((currentMoney) => {
        return currentMoney - item.cost;
      });

      setPurchasedItems((previous) => {
        const next = new Set(previous);
        next.add(item.id);
        return next;
      });

      setFeedback({
        message: `${item.name} با موفقیت فعال شد`,
        success: true,
      });
    },
    [money, purchasedItems]
  );

  const renderProduct = useCallback(
    ({ item }: { item: ShopItem }) => {
      return (
        <ProductCard
          item={item}
          money={money}
          purchased={purchasedItems.has(item.id)}
          onPurchase={handlePurchase}
        />
      );
    },
    [
      money,
      purchasedItems,
      handlePurchase,
    ]
  );

  const renderHeader = useCallback(() => {
    return (
      <View>
        <PageTitle />
        <CountryStats money={money} satisfaction={satisfaction}/>

        <CategorySelector
          categories={shopCategories}
          selectedId={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <View style={styles.productsHeader}>
          <View style={styles.productsHeaderLine} />

          <Text style={styles.productsHeaderText}>
            تجهیزات موجود
          </Text>

          <Text style={styles.productsCount}>
            {products.length.toString().padStart(2, "0")}
          </Text>
        </View>
      </View>
    );
  }, [
    money,
    satisfaction,
    selectedCategory,
    products.length,
  ]);

  return (
    <View style={styles.screen}>
      <Header />
      <ScrollView
        style={[styles.safeArea, {paddingTop: Math.max(insets.top - 8, 0)}]}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.black}/>

        <View style={styles.container}>
          <FlatList
            data={products}
            keyExtractor={(item) => item.id}
            renderItem={renderProduct}
            ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[styles.listContent, {paddingBottom: insets.bottom + 105}]}
            extraData={{money, purchasedItems, selectedCategory,}}/>

          <PurchaseFeedback message={feedback.message} success={feedback.success}/>
        </View>
      </ScrollView>
      <Footer />
    </View>
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

  statsContainer: {
    minHeight: 88,
    marginHorizontal: 13,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "rgba(7, 16, 10, 0.92)",

    flexDirection: "row-reverse",
    alignItems: "center",

    shadowColor: COLORS.green,
    shadowOpacity: 0.08,
    shadowRadius: 13,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 4,
  },

  stat: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  statIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#071A0A",
    borderWidth: 1,
    borderColor: "#16550E",
    alignItems: "center",
    justifyContent: "center",
  },

  statTexts: {
    alignItems: "flex-end",
  },

  statLabel: {
    color: COLORS.grayLight,
    fontSize: 11,
    fontWeight: "600",
  },

  statValue: {
    color: COLORS.green,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 4,
  },

  verticalDivider: {
    width: 1,
    height: "62%",
    backgroundColor: "#16480F",
  },

  categoryWrapper: {
    marginTop: 18,
  },

  categoryHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    marginBottom: 8,
  },

  categoryHeaderText: {
    color: "#8A9A8E",
    fontSize: 11,
    fontWeight: "700",
  },

  scrollHint: {
    width: 27,
    height: 27,
    borderRadius: 8,
    backgroundColor: "#071A0A",
    borderWidth: 1,
    borderColor: "#16480F",
    alignItems: "center",
    justifyContent: "center",
  },

  categoryScroll: {
    paddingHorizontal: 13,
    gap: 8,
    paddingVertical: 3,
  },

  categoryAnimated: {
    shadowColor: COLORS.green,
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },

  categoryButton: {
    minHeight: 44,
    maxWidth: width * 0.65,

    paddingHorizontal: 12,

    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#18301C",

    backgroundColor: "#060B07",

    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 7,
  },

  categoryButtonSelected: {
    backgroundColor: "#0A210D",
    borderColor: COLORS.green,
    shadowColor: COLORS.green,
    shadowOpacity: 0.35,
    shadowRadius: 9,
    elevation: 4,
  },

  categoryPressed: {
    opacity: 0.7,
  },

  categoryText: {
    color: COLORS.gray,
    fontSize: 11,
    fontWeight: "600",
  },

  categoryTextSelected: {
    color: COLORS.green,
    fontWeight: "800",
  },

  productCard: {
    minHeight: 118,
    marginHorizontal: 13,
    marginTop: 9,

    padding: 11,

    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#123E0D",
    backgroundColor: "#07100A",

    flexDirection: "row-reverse",
    alignItems: "center",

    shadowColor: COLORS.green,
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 2,
  },

  productIconBox: {
    width: 61,
    height: 86,
    borderRadius: 11,
    backgroundColor: "#050A06",
    borderWidth: 1,
    borderColor: "#174D12",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  productCode: {
    position: "absolute",
    bottom: 5,
    left: 5,
    right: 5,
    alignItems: "center",
  },

  productCodeText: {
    color: "#315B35",
    fontSize: 7,
    fontWeight: "900",
    letterSpacing: 1,
  },

  productInfo: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 10,
    alignItems: "flex-end",
  },

  productName: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "800",
    textAlign: "right",
    width: "100%",
  },

  productDescription: {
    color: "#68776C",
    fontSize: 9.5,
    marginTop: 4,
    textAlign: "right",
    width: "100%",
  },

  productStats: {
    width: "100%",
    flexDirection: "row-reverse",
    marginTop: 10,
    gap: 15,
  },

  productStat: {
    alignItems: "flex-end",
  },

  productStatLabel: {
    color: "#4E5D52",
    fontSize: 8,
  },

  costText: {
    color: "#D6DDD7",
    fontSize: 10,
    fontWeight: "700",
    marginTop: 2,
  },

  benefitText: {
    color: COLORS.green,
    fontSize: 10,
    fontWeight: "800",
    marginTop: 2,
  },

  buyButton: {
    width: 65,
    height: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.green,
    backgroundColor: "#071A0A",

    alignItems: "center",
    justifyContent: "center",

    flexDirection: "row-reverse",
    gap: 5,
  },

  purchasedButton: {
    borderColor: "#175F0E",
    backgroundColor: "#071009",
  },

  disabledButton: {
    borderColor: "#263229",
    backgroundColor: "#050806",
  },

  buyPressed: {
    opacity: 0.65,
    transform: [{ scale: 0.96 }],
  },

  buyText: {
    color: COLORS.green,
    fontSize: 11,
    fontWeight: "900",
  },

  purchasedText: {
    color: "#257B19",
  },

  disabledText: {
    color: COLORS.gray,
  },

  feedback: {
    position: "absolute",
    left: 25,
    right: 25,
    bottom: 91,

    minHeight: 45,

    borderRadius: 12,
    borderWidth: 1,

    paddingHorizontal: 14,

    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,

    zIndex: 50,
  },

  feedbackSuccess: {
    backgroundColor: "#061508",
    borderColor: "#17640E",
  },

  feedbackError: {
    backgroundColor: "#160606",
    borderColor: "#63201D",
  },

  feedbackText: {
    fontSize: 11,
    fontWeight: "800",
  },

  safeArea: {
    flex: 1,
    backgroundColor: COLORS.black,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },

  listContent: {
    paddingBottom: 110,
  },

  productsHeader: {
    marginTop: 19,
    marginHorizontal: 14,
    marginBottom: 2,

    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
  },

  productsHeaderLine: {
    width: 3,
    height: 18,
    borderRadius: 3,
    backgroundColor: COLORS.green,
  },

  productsHeaderText: {
    flex: 1,
    color: "#A2ADA5",
    fontSize: 11,
    fontWeight: "800",
    textAlign: "right",
  },

  productsCount: {
    color: COLORS.green,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
});

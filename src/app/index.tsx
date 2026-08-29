import { View, TextInput, Pressable, Image, StyleSheet } from "react-native"
import { useState } from "react";

function handelLogin() {};

export default function LoginScreen() {
  const [focused, setFocused] = useState(false);
  return (
    <View style={styles.container}>

      <Image style={styles.titleImage}
        source={require('@/assets/images/LogTitle.webp')}
        resizeMode="contain" />

      <TextInput style={[styles.input, focused && styles.inputFocused]}
        onFocus={() => {setFocused(true)}}
        onBlur={() => {setFocused(false)}}
        placeholder=":کد کشور👤"
        placeholderTextColor="#39ff14"
        secureTextEntry />

      <Pressable style={({ pressed }) =>
        [styles.button, pressed && styles.buttonPressed,]}
        onPress={() => { handelLogin }}>
        <Image style={styles.buttonImage}
          source={require('@/assets/images/LogButton.webp')}
          resizeMode="contain" />
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  titleImage: {
    width: 400,
    height: 200,
  },
  input: {
    color: '#39ff14',
    width: '80%',
    height: 60,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#39ff14',
    textAlign: 'center',
    paddingHorizontal: 15,
    marginTop: 120,
  },
  inputFocused: {
    borderColor: '#39ff14',
    borderWidth: 3,
    shadowColor: '#39ff14',
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 20
  },
  button: {
    width: 400,
    height: 85,
    marginTop: 10
  },
  buttonPressed: {
    opacity: 0.8
  },
  buttonImage: {
    width: '100%',
    height: '100%'
  }
})

// import { Redirect } from 'expo-router';

// export default function Index() {
//   return <Redirect href={"/login"} />
// };


// // // // // // // // // // // // // // // // // // // // // // // // // // 

// import * as Device from 'expo-device';
// import { Platform, StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// import { AnimatedIcon } from '@/components/animated-icon';
// import { HintRow } from '@/components/hint-row';
// import { ThemedText } from '@/components/themed-text';
// import { ThemedView } from '@/components/themed-view';
// import { WebBadge } from '@/components/web-badge';
// import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

// function getDevMenuHint() {
//   if (Platform.OS === 'web') {
//     return <ThemedText type="small">welcome</ThemedText>;
//   }
//   if (Device.isDevice) {
//     return (
//       <ThemedText type="small">
//         shake device or press <ThemedText type="code">⠋m</ThemedText> in terminal
//       </ThemedText>
//     );
//   }
//   const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
//   return (
//     <ThemedText type="small">
//       press <ThemedText type="code">{shortcut}</ThemedText>
//     </ThemedText>
//   );
// }

// export default function HomeScreen() {
//   return (
//     <ThemedView style={styles.container}>
//       <SafeAreaView style={styles.safeArea}>
//         <ThemedView style={styles.heroSection}>
//           <AnimatedIcon />
//           <ThemedText type="title" style={styles.title}>
//             Welcome to&nbsp;Expo
//           </ThemedText>
//         </ThemedView>

//         <ThemedText type="code" style={styles.code}>
//           get started
//         </ThemedText>

//         <ThemedView type="backgroundElement" style={styles.stepContainer}>
//           <HintRow
//             title="Try editing"
//             hint={<ThemedText type="code">src/app/index.tsx</ThemedText>}
//           />
//           <HintRow title="Dev tools" hint={getDevMenuHint()} />
//           <HintRow
//             title="Fresh start"
//             hint={<ThemedText type="code">npm run reset-project</ThemedText>}
//           />
//         </ThemedView>

//         {Platform.OS === 'web' && <WebBadge />}
//       </SafeAreaView>
//     </ThemedView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     flexDirection: 'row',
//   },
//   safeArea: {
//     flex: 1,
//     paddingHorizontal: Spacing.four,
//     alignItems: 'center',
//     gap: Spacing.three,
//     paddingBottom: BottomTabInset + Spacing.three,
//     maxWidth: MaxContentWidth,
//   },
//   heroSection: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flex: 1,
//     paddingHorizontal: Spacing.four,
//     gap: Spacing.four,
//   },
//   title: {
//     textAlign: 'center',
//   },
//   code: {
//     textTransform: 'uppercase',
//   },
//   stepContainer: {
//     gap: Spacing.three,
//     alignSelf: 'stretch',
//     paddingHorizontal: Spacing.three,
//     paddingVertical: Spacing.four,
//     borderRadius: Spacing.four,
//   },
// });

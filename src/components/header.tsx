import { View, Image, Pressable, Text, StyleSheet } from "react-native";
import { Menu, X, Wallet, Droplets, Users, Swords, Factory, Settings } from 'lucide-react-native';
import { Href, router } from "expo-router";
import { useState } from "react";

function MenuItem({
  icon,
  title,
  onPress,
}: {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={styles.menuItem}
      onPress={onPress}
    >
      {icon}

      <Text style={styles.menuText}>
        {title}
      </Text>
    </Pressable>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const Path_Handler = (path: Href) => {
    setMenuOpen(false);
    router.push(path);
  };
  return (
    <View style={styles.container}>

      <Pressable onPress={() => Path_Handler('/')}>
        <Settings size={30} color="#37ff14e2" />
      </Pressable>

      <Image style={styles.logoImage}
        source={require('@/assets/images/logo.png')}
        resizeMode="contain" />

      <Pressable style={styles.menuButton}
        onPress={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (<X size={30} color="#37ff14e2" />) : (<Menu size={30} color="#37ff14e2" />)}
      </Pressable>

      {menuOpen && (
         <View style={styles.menu}>

           <MenuItem
              icon={<Wallet size={21} color="#39FF14" />}
              title="داشبورد"
              onPress={() => Path_Handler('/dashboard')}
           />

           <MenuItem
             icon={<Swords size={21} color="#39FF14" />}
             title="ارتش"
             onPress={() => Path_Handler('/')}
           />

           <MenuItem
             icon={<Droplets size={21} color="#39FF14" />}
             title="منابع"
             onPress={() => Path_Handler('/')}
           />

           <MenuItem
             icon={<Factory size={21} color="#39FF14" />}
             title="تولیدات"
             onPress={() => Path_Handler('/')}
           />

           <MenuItem
             icon={<Users size={21} color="#39FF14" />}
             title="محبوبیت"
             onPress={() => Path_Handler('/')}
           />


         </View>
       )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: '#030503',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 16,

    borderBottomWidth: 1,
    borderBottomColor: '#102010',
  },

  menuButton: {
    width: 40,
    height: 40,

    alignItems: 'center',
    justifyContent: 'center',

    backgroundColor: '#071007',
  },

  logoImage: {
    width: '70%',
    height: '100%',
    
  },
  
  menu: {
    position: 'absolute',

    alignItems: 'flex-end',

    top: 75,
    right: 16,

    width: 200,

    padding: 10,

    backgroundColor: '#050805',

    borderWidth: 1,
    borderColor: '#1d5c1d',
    borderRadius: 12,

    zIndex: 999,
    elevation: 20,
  },

  menuItem: {
    height: 50,

    flexDirection: 'row-reverse',
    alignItems: 'center',

    paddingHorizontal: 14,

    gap: 14,

    borderRadius: 8,
  },

  menuText: {
    color: '#ddd',
    fontSize: 14,
    fontWeight: '600',
  },

});




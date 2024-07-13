
import {Tabs} from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function RootLayout() {
  return (
    
   <>
    <Tabs 
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#161622'
        }
      }}
    >
      <Tabs.Screen 
        name = "home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="home" size={24} color="white" />
          ),
          tabBarLabelPosition:'below-icon'
        }}
      />

      <Tabs.Screen 
        name = "Social"
        options={{
          title: "Social",
          headerShown: false,
          tabBarIcon: () => (
            <Octicons name="inbox" size={24} color="white" />
          ),
          tabBarLabelPosition:'below-icon'
        }}
      />

      <Tabs.Screen 
        name = "friends"
        options={{
          title: "Friends",
          headerShown: false,
          tabBarIcon: () => (
            <FontAwesome5 name="user-friends" size={24} color="white" />
          ),
          tabBarLabelPosition:'below-icon'
        }}
      />

      <Tabs.Screen 
        name = "more"
        options={{
          title: "More",
          headerShown: false,
          tabBarIcon: () => (
            <Feather name="more-horizontal" size={24} color="white" /> 
          ),
          tabBarLabelPosition:'below-icon'
        }}
      />

    </Tabs>
   </>
  );
}

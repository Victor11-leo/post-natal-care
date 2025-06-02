import {Tabs } from 'expo-router'
import { Image, View,Text  } from 'react-native';
import {icons} from '../../../constants/icons'


export default function AuthRoutesLayout() {
  console.log("Hitting tabs");
  const TabIcon = ({
    focused,
    icon,
    title,
  }) => (
    <View className="flex-1 mt-3 flex flex-col items-center">
      <Image
        source={icon}
        tintColor={focused ? "#FB6F92" : "#666876"}
        resizeMode="contain"
        className="size-6"
      />
      <Text
        className={`${
          focused
            ? "text-primary-300 font-rubik-medium"
            : "text-black-200 font-rubik"
        } text-xs w-full text-center mt-1`}
      >
        {title}
      </Text>
    </View>
  );

  return (
    <Tabs
    screenOptions={{
        tabBarShowLabel:false
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
            title:"Home",
            headerShown:false,    
            tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.dashboard} title="Home" />
          ),        
        }}
      />
    <Tabs.Screen
    name="posts/page"
    options={{
      title:"Posts",
      headerShown:false,    
      tabBarIcon: ({ focused }) => (
      <TabIcon focused={focused} icon={icons.posts} title="Posts" />    
    )}}
    />
    <Tabs.Screen
    name="questions/page"
    options={{
      title:"Questions",
      headerShown:false,    
      tabBarIcon: ({ focused }) => (
      <TabIcon focused={focused} icon={icons.questions} title="Questions" />    
    )}}
    />
    <Tabs.Screen
    name="account/page"
    options={{
      title:"Account",
      headerShown:false,    
      tabBarIcon: ({ focused }) => (
      <TabIcon focused={focused} icon={icons.account} title="Account" />    
    )}}
    />
    </Tabs>
  )
}
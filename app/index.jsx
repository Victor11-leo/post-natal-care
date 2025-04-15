import { useQuery } from "convex/react";
import {api} from '../convex/_generated/api'
import { Image, Text, TextInput, Touchable, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native";
import Card from "../components/Card";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import {SignOutButton} from '../components/SignOutButton'
import { useEffect, useState } from "react";

export default function Index() {
  const [posts,setPosts] = useState([])
  const [query,setQuery] = useState([])

  const {isSignedIn} = useAuth()
  
  if (!isSignedIn) {
      return <Redirect href={'/sign-in'} />
  }
  console.log(isSignedIn);

  const data = useQuery(api.posts.getPosts)
  useEffect(() => {
    if (data != undefined) setPosts(data)
  },[data])
  const {user} = useUser()
  
  return (
    <View className='flex-1 bg-white'>
      <View className='px-5 mt-10'>
        <View className='flex flex-row items-center justify-between'>
          <View className='flex flex-row items-center gap-2.5'>
            <Image
            source={{uri:user?.imageUrl}}
            className='size-10 rounded-full'
            />
            <View>
              <Text className='text-sm font-semibold'>{user?.username}</Text>
              <Text className='text-xs '>{user?.emailAddresses[0].emailAddress}</Text>
            </View>
          </View>
          <View>
            <SignOutButton/>
          </View>
        </View>
        <View className='mt-5'>
          <Text className='font-bold '>Articles</Text>          

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-4 mt-3"
            data={posts}
            contentContainerStyle={{
              gap: 26,
            }}
            renderItem={({ item}) => (
              <Card post={item}  />
            )}
            keyExtractor={(item) => item._id}
            ItemSeparatorComponent={() => <View className="w-4" />}
          />
        </View>
        </View>
    </View>
  );
}

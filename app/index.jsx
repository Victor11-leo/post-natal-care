import { useQuery } from "convex/react";
import {api} from '../convex/_generated/api'
import { Image, Text,TouchableOpacity,View } from "react-native";
import { FlatList } from "react-native";
import Card from "../components/Card";
import {SignOutButton} from '../components/SignOutButton'
import { useEffect, useState } from "react";
import { useSession, useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

export default function Index() {
  const [posts,setPosts] = useState([])
  const {session} = useSession()
  
  const data = useQuery(api.posts.getPosts)
  useEffect(() => {
    if (data != undefined) setPosts(data)
  },[data])
  const {user} = useUser()
  if (!user) return <Redirect href='/sign-in'/>
  
  const handleLogout = async () => {
    await session.end()
    return <Redirect href='/sign-in'/>
  }
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
            <TouchableOpacity onPress={handleLogout}>
              <Text className='text-red-600'>Sign Out</Text>
            </TouchableOpacity>
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

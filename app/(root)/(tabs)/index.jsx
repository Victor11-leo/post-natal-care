import { useUser } from '@clerk/clerk-expo'
import {Text, SafeAreaView, FlatList, View, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '../../../utils/supabase';
import { router } from 'expo-router';


const Page = () => {
  const [articles,setArticles] = useState([])
  const { isSignedIn, user, isLoaded } = useUser()
  useEffect(() => {
    const getArticles = async () => {
      const {data,error} = await supabase.from('articles').select()
      if (error) {
        console.log(error.message);
      }
      if (data) {
        setArticles(data);
      }
    }
    getArticles()
  },[])

  if (articles.length < 1) return (
    <View>
      <Text>No data</Text>
    </View>
  )
    return (
        <SafeAreaView className='h-full bg-[#FFE5EC] px-5 py-10'>
            <FlatList
            data={articles}
            numColumns={2}
            keyExtractor={(item) => item.id}
            contentContainerClassName='pb-32'
            showsVerticalScrollIndicator={false}
            columnWrapperClassName='flex gap-5 '
            renderItem={({item}) => {              
              return (
              <TouchableOpacity 
              onPress={() => router.push(`/articles/${item.id}`)}
              className='flex flex-row w-full items-center gap-4 my-2 '>
                <View className='bg-slate-950 w-40 h-40 rounded-lg'>
                  <Image
                  source={{uri:item.featuredImage}}
                  className='size-full object-cover rounded-lg'
                  />
                </View>
                <View className=''>
                  <Text className='font-semibold'>{item.title}</Text>
                  <Text className='text-sm'>{item.excerpt}</Text>
                </View>
              </TouchableOpacity>
            )}}
            ListHeaderComponent={() => (
              <View >
                <View className='flex flex-row gap-4 items-center'>
                  <View className='w-14 h-14 bg-slate-900 rounded-full'>
                    <Image
                    source={{uri:user.imageUrl}}
                    className='size-full rounded-full border-2 border-[#FB6F92]'
                    />
                  </View>
                  <View className='grid'>
                    <Text className='font-semibold text-lg'>Welcome back,</Text>
                    <Text className='font-semibold text-lg'>{user.username}</Text>
                  </View>
                </View>

                <View className='my-4'>
                  <Text className='font-semibold text-lg'>Latest Articles</Text>

                  <FlatList
                  data={articles}
                  keyExtractor={(item) => item.id}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerClassName="flex gap-5 mt-2"
                  renderItem={({item}) => (
                    <TouchableOpacity
                    onPress={() => router.push(`/articles/${item.id}`)}
                    className="flex flex-col items-start w-60 h-40 rounded-lg relative bg-slate-900"
                    >
                      <Image
                      source={{uri:item.featuredImage}}
                      className="size-full absolute bottom-0 rounded-lg "
                      />

                      <View className="flex flex-row items-center bg-[#FB6F92]/90 px-3 py-1.5 rounded-full absolute top-2 left-2">
                        <Text className='text-xs text-white'>{item.tags[0]}</Text>
                      </View>

                      <View className="flex flex-row items-center  px-3 py-1.5 rounded-full absolute bottom-2 left-2">
                        <Text className='text-sm text-white font-semibold'>{item.title}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  />

                  <View className='flex flex-row items-center justify-between mt-5'>
                    <Text className='font-semibold text-lg'>Recommendation</Text>
                    <Text className='text-[#FB6F92] font-semibold'>View all</Text>
                  </View>

                </View>
              </View>
            )}
            />
        </SafeAreaView>
    );
}

export default Page;

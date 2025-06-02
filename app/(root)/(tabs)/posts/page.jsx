
import { useUser } from '@clerk/clerk-expo'
import {Text, SafeAreaView, FlatList, View, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '../../../../utils/supabase';
import Search from '../../../../components/Search';
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
            numColumns={1}
            keyExtractor={(item) => item.id}
            contentContainerClassName='pb-32'
            showsVerticalScrollIndicator={false}            
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
                <View>
                    <View className='flex flex-row gap-4 items-center'>
                        <View className='w-14 h-14 bg-slate-900 rounded-full'>
                        <Image
                        source={{uri:user.imageUrl}}
                        className='size-full rounded-full border-2 border-[#FB6F92]'
                        />
                        </View>
                        <View className='grid'>
                        <Text className='font-semibold text-lg'>Discover</Text>
                        <Text className='font-semibold text-lg'>All of our articles</Text>
                        </View>
                    </View>
                    
                    <View>

                    </View>
                </View>
            )}

            />
        </SafeAreaView>
    );
}

export default Page;

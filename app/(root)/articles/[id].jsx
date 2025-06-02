
import { useUser } from '@clerk/clerk-expo';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {Text, SafeAreaView, View, Image, FlatList, TouchableOpacity,useWindowDimensions, ScrollView } from 'react-native';
import { supabase } from '../../../utils/supabase';
import RenderHTML from 'react-native-render-html'
import {icons} from '../../../constants/icons'

const Page = () => {
    const { id } = useLocalSearchParams();
    const { width } = useWindowDimensions();
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

        const articleRead = async ()=> {
          const {data,error} = await supabase
          .from('read_article')
          .insert({
              user_id:user.id,
              article_id:id,          
          })
        }
        getArticles()
        articleRead()
      },[id])
    

    const feedbackResponse = async (response) => {
      const {data,error} = await supabase
      .from('feedback')
      .insert({
          user_id:user.id,
          article_id:id,
          response
      })
    }

    const articleRead = async (response) => {
      
    }

    if (articles.length < 1) return (
        <View>
          <Text>No data</Text>
        </View>
    )
    const article = articles.filter((item) => item.id == Number(id))
    const {title,content,excerpt,featuredImage,tags} = article[0]
    
    const tagsStyles = {
    h1: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 10,      
    },
    p: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 8,
    },
    ul: {
      marginVertical: 8,
      paddingLeft: 16,
    },
    li: {
      fontSize: 16,
      lineHeight: 24,
    },
    strong: {
      fontWeight: 'bold',
      
    },
  };

    return (
        <ScrollView className='bg-[#FFE5EC] pb-10 flex-1'>
            <View className='bg-slate-950 w-full h-80 rounded-lg '>
                <Image
                source={{uri:featuredImage}}
                className='size-full object-cover rounded-lg'
                />
                <TouchableOpacity 
                className='absolute top-10 left-4 border-2 flex items-center justify-center border-slate-900 w-10 h-10 rounded-full'
                onPress={() => router.back()}>
                  <Image
                  source={icons.arrow}
                  className='rotate-180'
                  />
                </TouchableOpacity>
                <View className='absolute bottom-2 left-2 flex gap-4'>
                    <FlatList
                    data={tags}
                    keyExtractor={(tag) => tag}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerClassName="flex gap-5 mt-2"
                    renderItem={({item}) => (
                        <TouchableOpacity className='bg-[#FB6F92] rounded-md'>
                            <Text className='text-white px-2 py-1'>{item}</Text>
                        </TouchableOpacity>
                    )}
                    />
                    <Text className='font-semibold text-xl'>{title}</Text>
                </View>
            </View>
            <View className='px-5'>
                <RenderHTML
                contentWidth={width}
                source={{html:content}}
                tagsStyles={tagsStyles}
                />
            </View>

            <View className='flex flex-row items-center gap-4 justify-center mt-4 mb-20'>
                <TouchableOpacity 
                onPress={() => feedbackResponse('helpful')}
                className='bg-green-500 rounded-md flex flex-row items-center gap-4 px-2 py-1 w-fit'>
                    <Text className='font-semibold text-white'>Helpful</Text>
                    <Image
                    source={icons.thumbsUp}
                    tintColor='white'
                    className='size-8'
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => feedbackResponse('not-helpful')}
                className='bg-red-500 rounded-md flex flex-row items-center gap-4 px-2 py-1 w-fit'>
                    <Text className='font-semibold text-white'>Helpful</Text>
                    <Image
                    source={icons.thumbsUp}
                    tintColor='white'
                    className='size-8'
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default Page;
Page.options = {
    headerShown:false
}

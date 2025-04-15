import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Link, useLocalSearchParams } from 'expo-router';
import {icons} from '../../constants/icons'

const Post = () => {
    const { id } = useLocalSearchParams();
    const data = useQuery(api.subpost.getSubPosts,{posts:id})
    const dataPost = useQuery(api.posts.getPostById,{id:id})
    console.log(dataPost);
  return (
    <View className='bg-white flex-1'>
      <View className='mt-5 px-5'>        
        <Text className='font-semibold text-lg capitalize'>{dataPost?.title}</Text>
        <FlatList
          vertical
          showsHorizontalScrollIndicator={false}
          className="mb-4 mt-3"
          data={data}
          contentContainerStyle={{
            gap: 20,
          }}
          renderItem={({ item}) => (
              <Link href={`/subpost/${item._id}`} asChild>
                  <TouchableOpacity>
                      <View className='bg-pink-400  rounded-md p-4'>
                          <Text className='text-white font-semibold'>{item.title}</Text>            
                      </View>
                  </TouchableOpacity>
              </Link>
          )}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <View className="w-4" />}
        />
      </View>
    </View>
  )
}

export default Post
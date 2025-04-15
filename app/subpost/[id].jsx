import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

const SubPost = () => {
    const { id } = useLocalSearchParams();
    const data = useQuery(api.subpost.getSubPostsById,{id:id})
    console.log(data);
    if (data == undefined) return null
  return (
    <View className='bg-white flex-1'>
      <View className='mt-5 px-5'>
        <Text className='font-semibold text-lg capitalize'>{data.title}</Text>
        <View className='mt-5'>
          <Text className='tracking-wider leading-8'>{data.body}</Text>
        </View>
        <View>
          
        </View>
      </View>
    </View>
  )
}

export default SubPost
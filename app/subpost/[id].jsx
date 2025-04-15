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
    <View>
      <Text>{data.title}</Text>
      <Text>{data.body}</Text>
    </View>
  )
}

export default SubPost
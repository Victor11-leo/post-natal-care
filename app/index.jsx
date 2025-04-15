import { useQuery } from "convex/react";
import {api} from '../convex/_generated/api'
import { Text, View } from "react-native";
import { FlatList } from "react-native";
import Card from "../components/Card";


export default function Index() {
  const data = useQuery(api.posts.getPosts)
  console.log(data);
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-4 mt-3"
        data={data}
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
  );
}

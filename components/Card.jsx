import { Link } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";



const Card = (post) => {
    
    const {title,image,_id} = post.post    
  return (
    <Link href={`/posts/${_id}`} asChild>
      <TouchableOpacity className="w-[40%] relative pl-5">
        <View className='w-36 h-48 bg-slate-900 relative rounded-md '>
            <Image
            source={{uri:image}}
            className="w-full h-full rounded-md"
            />
            <Text className='absolute text-sm bottom-2 left-2 text-white font-semibold capitalize px-2 w-32'>{title}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default Card;
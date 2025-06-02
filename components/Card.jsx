import { Link } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";



const Card = (post) => {  
    const {title,image,_id} = post.post    
  return (
    <Link href={`/posts/${_id}`} asChild>
      <TouchableOpacity className=" relative ">
        <View className='w-96 h-56 bg-slate-900 relative rounded-lg '>
            <Image
            source={{uri:'https://images.unsplash.com/photo-1676466136470-8df848f84a28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vbSUyMHByZWduYW5jeXxlbnwwfHwwfHx8MA%3D%3D'}}
            className="w-full h-full rounded-md"
            />
            <Text className='absolute top-2 left-2 text-white bg-[#FF8FAB] text-xs rounded-md px-2 py-1'>
              Breastfeeding basics
            </Text>
            <Text className='absolute text-xl bottom-2 left-2 text-white font-semibold capitalize px-2 w-[80%]'>What Every New mom should know</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export const SmallCard = (post) => {  
  const {title,image,_id} = post.post    
return (
  <Link href={`/posts/${_id}`} asChild>
    <TouchableOpacity className=" relative ">
      <View className='w-96  bg-transparent relative rounded-lg flex flex-row items-center'>
        <View>
          <Image
          source={{uri:'https://images.unsplash.com/photo-1676466136470-8df848f84a28?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vbSUyMHByZWduYW5jeXxlbnwwfHwwfHx8MA%3D%3D'}}
          className="w-36 h-36 rounded-md"
          />
        </View>
          <View className='flex flex-col gap-1'>
            <Text className=' text-xl  font-semibold capitalize px-2 w-[80%]'>What Every New mom should know</Text>
            <Text className=' text-sm rounded-md px-2 py-1'>
              Breastfeeding basics
            </Text>
          </View>
      </View>
    </TouchableOpacity>
  </Link>
);
};

export default Card;

import { useUser } from '@clerk/clerk-expo';
import {icons} from '../../../../constants/icons'
import {Text, SafeAreaView, View, Image, TouchableOpacity } from 'react-native';
import { SignOutButton } from '../../../../components/SignOutButton';

const Page = () => {
    const { isSignedIn, user, isLoaded } = useUser()
    
    const date = new Date(user?.createdAt)
    const options = { month: 'long', year: 'numeric' };
    const formatted = date.toLocaleDateString('en-US', options);
    return (
        <SafeAreaView className='h-full  bg-[#FFE5EC] px-5 py-10'>
            <View className='flex items-center justify-center mt-10'>
                <Image
                source={{uri:user.imageUrl}}
                className='w-40 h-40 rounded-full border-2 border-[#FB6F92]'
                />
                <View>
                    <View className='flex flex-row items-center gap-[2px]'>
                        <Text className='font-semibold text-xl'>{user.firstName}, </Text>
                        <Text className='font-semibold'>loving mom</Text>
                    </View>
                    <Text>Member since {formatted}</Text>
                </View>
            </View>
            <View className='mt-10 flex gap-4'>
                {/* <TouchableOpacity className='flex flex-row gap-2 item-center'>                        
                    <Text className='font-semibold'>Bookmarked</Text>
                    <Image source={icons.arrow}/>
                </TouchableOpacity> */}
                <TouchableOpacity 
                onPress={() => router.push('/questions')}
                className='flex flex-row gap-2 item-center'>                        
                    <Text className='font-semibold'>Try out some questionnaires</Text>
                    <Image source={icons.arrow}/>
                </TouchableOpacity>
                <SignOutButton/>
            </View>
        </SafeAreaView>
    );
}

export default Page;

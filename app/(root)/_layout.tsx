import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function AppLayout() {
  const { isSignedIn,isLoaded } = useAuth()
  console.log(isSignedIn);
  
  if (!isLoaded) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        <ActivityIndicator className="text-primary-300" size="large" />        
      </SafeAreaView>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/sign-in" />;
  }

  return <Slot/>;
}
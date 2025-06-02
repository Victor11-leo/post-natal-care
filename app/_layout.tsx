import {Stack} from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ClerkProvider} from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import './globals.css'




const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});


export default function RootLayout() {

  return (
    <ConvexProvider client={convex}>
      <ClerkProvider tokenCache={tokenCache}>
        <Stack screenOptions={{headerShown:false}}/>
      </ClerkProvider>
    </ConvexProvider>
  )
}

import { useClerk, useSession } from '@clerk/clerk-expo'
import { useLocalCredentials } from '@clerk/clerk-expo/local-credentials'
import * as Linking from 'expo-linking'
import { Text, TouchableOpacity } from 'react-native'

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function

  const {userOwnsCredentials, clearCredentials} = useLocalCredentials()
  const {session} = useSession()
  

  const handleSignOut = async () => {    
    console.log(userOwnsCredentials);
    try {      
      await session.end()  
      
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      console.log(err.message);
    }
  }

  return (
    <TouchableOpacity onPress={handleSignOut}>      
      <Text className="text-red-500">Sign out</Text>
    </TouchableOpacity>
  )
}
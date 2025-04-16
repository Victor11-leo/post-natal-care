import { useAuth, useSession, useSessionList, useSignIn } from '@clerk/clerk-expo'
import { Link, Redirect, useRouter } from 'expo-router'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useLocalCredentials } from '@clerk/clerk-expo/local-credentials'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const { hasCredentials, setCredentials, authenticate,userOwnsCredentials, clearCredentials ,biometricType } = useLocalCredentials()
  console.log(hasCredentials);
  const router = useRouter()

  const {isSignedIn,sessionId} = useAuth()
  const {session} = useSession()
  console.log(session);
        
    // console.log(isSignedIn);

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  // Handle the submission of the sign-in form
  const onSignInPress = async (useLocal) => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {      
      const signInAttempt =
        hasCredentials && useLocal
          ? await authenticate()
          : await signIn.create({
              identifier: emailAddress,
              password,
            })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        if (!useLocal) {
          await setCredentials({
            identifier: emailAddress,
            password,
          })
        }
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
      console.log(err.message);
    }
  }

  return (
    <View className='flex-1 flex-col items-center bg-white'>
      <View className='mt-5 px-5 flex flex-col items-start justify-center h-full w-[80%]'>
        <Text className='font-bold text-xl'>Welcome, back to Post Natal Care</Text>
        <Text className='font-semibold text-sm'>A haven to guide young mothers</Text>
        <Text className='font-semibold text-lg mt-4'>Sign in</Text>
        <View className='flex flex-col gap-4 w-full'>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            className='rounded-md border-2 border-slate-900 px-4 py-1.5'
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          />
          <TextInput
            value={password}
            placeholder="Enter password"
            secureTextEntry={false}
            className='rounded-md border-2 border-slate-900 px-4 py-1.5'
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <TouchableOpacity className='bg-pink-700 rounded-md px-4 py-2 w-40 flex flex-row justify-center mt-5 mb-3' onPress={onSignInPress}>
          <Text className='text-white font-semibold'>Continue</Text>
        </TouchableOpacity>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
          <Link href="/sign-up" className='text-pink-500 font-semibold'>
            <Text>Don't have an account?</Text>
            <Text>Sign up</Text>
          </Link>
        </View>
      </View>
    </View>
  )
}
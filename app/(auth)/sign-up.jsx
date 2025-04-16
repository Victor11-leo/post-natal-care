import * as React from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return

    
    // Start sign-up process using email and password provided
    const convertedName = name.replace(" ", "_");
    console.log(emailAddress, password,convertedName)
    
    try {
      await signUp.create({
        emailAddress,
        password,
        username:convertedName
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  if (pendingVerification) {
    return (
      <View className='flex-1 h-screen  flex-col gap-2 items-center justify-center bg-white'>
        <View className='mt-5 px-5 flex flex-col items-start justify-center  w-[80%]'>
          <Text className='font-bold text-xl'>You're almost there</Text>
          <Text className='font-semibold text-sm'>A haven to guide young mothers</Text>
          <Text className='font-semibold text-lg mt-4 '>Verify your email</Text>
          <View className='flex flex-col gap-4 w-full'>
            <TextInput
              value={code}
              placeholder="Enter your verification code"
              className='rounded-md border-2 border-slate-900 px-4 py-1.5'
              onChangeText={(code) => setCode(code)}
            />            
          </View>
          <TouchableOpacity 
          className='bg-pink-700 rounded-md px-4 py-2 w-40 flex flex-row justify-center mt-5 mb-3'
          onPress={onVerifyPress}>
            <Text className='text-white font-semibold'>Verify</Text>
          </TouchableOpacity>
          <Link href="/" className='text-pink-500 font-semibold'>
            <Text>Already verified?</Text>
            <Text>Go Home</Text>
          </Link>
        </View>
      </View>
    )
  }

  return (
    <View className='flex-1 flex-col items-center bg-white'>
      <View className='mt-5 px-5 flex flex-col items-start justify-center h-full w-[80%]'>
        <Text className='font-bold text-xl'>Welcome,to Post Natal Care</Text>
        <Text className='font-semibold text-sm'>A haven to guide young mothers</Text>

        <Text className='font-semibold text-lg mt-4'>Sign up</Text>
        <View className='flex flex-col gap-4 w-full'>
          <TextInput
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Enter email"
            className='rounded-md border-2 border-slate-900 px-4 py-1.5'
            onChangeText={(email) => setEmailAddress(email)}
          />
          <TextInput
            autoCapitalize="none"
            value={name}
            placeholder="Enter username"
            className='rounded-md border-2 border-slate-900 px-4 py-1.5'
            onChangeText={(name) => setName(name)}
          />
          <TextInput
            value={password}
            placeholder="Enter password"
            className='rounded-md border-2 border-slate-900 px-4 py-1.5'
            secureTextEntry={false}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <TouchableOpacity 
        className='bg-pink-700 rounded-md px-4 py-2 w-40 flex flex-row justify-center mt-5 mb-3'
        onPress={onSignUpPress}>
          <Text className='text-white font-semibold'>Continue</Text>
        </TouchableOpacity>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
          <Link href="/sign-in" className='text-pink-500 font-semibold'>
            <Text>Already have an account?</Text>
            <Text>Sign in</Text>
          </Link>
        </View>
      </View>
    </View>
  )
}
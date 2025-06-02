
import { useUser } from '@clerk/clerk-expo';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {Text, SafeAreaView, View, Image, FlatList, TouchableOpacity,useWindowDimensions, ScrollView } from 'react-native';
import { supabase } from '../../../utils/supabase';
import RenderHTML from 'react-native-render-html'
import {icons} from '../../../constants/icons'

const Page = () => {
    const { id } = useLocalSearchParams();
    const { width } = useWindowDimensions();
    const [articles,setArticles] = useState([])
    const { isSignedIn, user, isLoaded } = useUser()

     const [answers, setAnswers] = useState({});
     const [submitted, setSubmitted] = useState(false);
     const [issue, setIssue] = useState(false);

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const submitResponses = async () => {
    const payload = Object.entries(answers).map(([questionId, answer]) => ({
        user_id: user.id,
        question_id: questionId,
        answer,
    }));
    
    const { data, error } = await supabase
        .from('answers')
        .insert(payload);
    
    if (error) {
        console.error('Submission error:', error);
        setIssue(true)
        return false;
    }

    console.log('Submitted successfully:', data);
    setSubmitted(true)
    return true;
    };

const feedbackResponse = async (response) => {
    const {data,error} = await supabase
    .from('feedback')
    .insert({
        user_id:user.id,
        question_id:id,
        response
    })
}


    useEffect(() => {
    const getArticles = async () => {
        const {data,error} = await supabase.from('questionnaires').select()
        if (error) {
        console.log(error.message);
        }
        if (data) {            
        setArticles(data);
        }
    }
    getArticles()
    },[])

    if (articles.length < 1) return (
        <View>
          <Text>No data</Text>
        </View>
    )
    const article = articles.filter((item) => item.id == Number(id))
    const {title,description,questions} = article[0]
    
    const tagsStyles = {
    h1: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 10,      
    },
    p: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 8,
    },
    ul: {
      marginVertical: 8,
      paddingLeft: 16,
    },
    li: {
      fontSize: 16,
      lineHeight: 24,
    },
    strong: {
      fontWeight: 'bold',
      
    },
  };

    return (
        <ScrollView className='bg-[#FFE5EC] pb-40 flex-1'>
            <View className='bg-slate-950 w-full h-80 rounded-lg '>
                <Image
                source={{uri:'https://images.unsplash.com/photo-1586173806725-797f4d632f5d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cnViaWt8ZW58MHx8MHx8fDA%3D'}}
                className='size-full object-cover rounded-lg'
                />
                <TouchableOpacity 
                className='absolute top-10 left-4 border-2 flex items-center justify-center border-[#FB6F92] w-10 h-10 rounded-full'
                onPress={() => router.back()}>
                  <Image
                  source={icons.arrow}
                  tintColor='#FB6F92'
                  className='rotate-180'
                  />
                </TouchableOpacity>
                <View className='absolute bottom-2 left-2 flex gap-4'>                    
                    <Text className='font-semibold text-xl text-white'>{title}</Text>
                </View>
            </View>
            <View className='px-5'>
            {questions.map(question => (
                <View key={question.id} className="mb-6">
                <Text className="font-semibold mb-2">{question.title}</Text>

                <View className="flex-row flex-wrap gap-3">
                    {(question.type === 'yes-no' ? ['Yes', 'No'] : question.options).map(option => (
                    <TouchableOpacity
                        key={option}
                        onPress={() => handleAnswer(question.id, option)}
                        className={`px-4 py-2 rounded-full ${
                        answers[question.id] === option ? 'bg-pink-500' : 'bg-gray-300'
                        }`}
                    >
                        <Text className="text-white">{option}</Text>
                    </TouchableOpacity>
                    ))}
                </View>
                </View>
            ))}

            <TouchableOpacity 
            className='bg-pink-500 px-4 py-2 rounded-md flex items-center justify-center'
            onPress={submitResponses}>
                {submitted ? 
                <Text className='text-white font-semibold'>Submitted successfully</Text>
                :
                <Text className='text-white font-semibold'>Submit</Text>
                }
            </TouchableOpacity>
    
            </View>

            <View className='flex flex-row items-center gap-4 justify-center my-4 mb-40'>
                <TouchableOpacity 
                onPress={() => feedbackResponse('helpful')}
                className='bg-green-500 rounded-md flex flex-row items-center gap-4 px-2 py-1 w-fit'>
                    <Text className='font-semibold text-white'>Helpful</Text>
                    <Image
                    source={icons.thumbsUp}
                    tintColor='white'
                    className='size-8'
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={ () => feedbackResponse('not-helpful')}
                className='bg-red-500 rounded-md flex flex-row items-center gap-4 px-2 py-1 w-fit'>
                    <Text className='font-semibold text-white'>Not Helpful</Text>
                    <Image
                    source={icons.thumbsUp}
                    tintColor='white'
                    className='size-8'
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default Page;
Page.options = {
    headerShown:false
}

import { supabase } from "./supabase";

export const getArticles = async () => {
    try {
        const {data,error} = await supabase.from('articles').select()
        if (error) {
            console.log(error.message);
            return "Failed to fetch data"
        }
        if (data) {            
            return data
        }
    } catch (error) {
        console.log(error);
        return "Failed to fetch data"
    }
}
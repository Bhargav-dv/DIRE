
export async function getArticles(){
        try{
            let articles = await fetch(`https://newsapi.org/v2/top-headlines?country=au&apiKey=8063c35e0c684967854b3b21c4ab3cf2`)
            let result =  await articles.json()
            articles = null
            return result.articles
        }catch(error){
            throw error
        }

}
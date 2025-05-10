export const baseUrl = "http://localhost:5000/api"
// base url for backend API. wherever you want to change it when deploy apprication it can easily do so.

// a funtion which help us to perform the post request
// parem1 :url that we making request to
// parem2 :body of the request
export const postRequest = async(url, body) =>{
    try{
    // use 'fetch' to perform our post request
    // it usually take some time to process so we 'await'
    const response = await fetch(url,{
        method:"POST", // to perfrom POST request
        headers: {
            "Content-Type" : "application/json", // to working with Json data
        },//object which have serveral properties

        body, // json object
    });

    // get data from response
    const data = await response.json();

    // if response isnt 'OK' message, it error
    if(!response.ok){
        let message;

        // if we actually have a message
        if(data?.message){
            message = data.message 
            // message that we seting at "../chat-server/Controllers/userControllers.js" line 61
        }else{
            message = data;
            // message that we seting at "../chat-server/Controllers/userControllers.js" line 76, 77
        }

        return {error: true, message};
    }
    
    return data;
    
    }catch(error){
        return {error: true, message: error.message};
    }
};

export const getRequest = async(url) =>{
    const response = await fetch(url)
    const data = await response.json()

    // if there are an error
    if(!response.ok){
        let message = "An error occured..."
        if(data?.message){
            message = data.message
        }
        return {error: true, message}
    }
    
    // if success
    return data;
}
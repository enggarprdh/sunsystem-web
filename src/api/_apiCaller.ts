import Config from "@/config";
import axios from "axios";


const CONFIG = Config();
let axiosConfig = {
    baseURL: CONFIG.apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
}

const onError = async (err:any, method:string, url:string, body:any, token:string, addConfig:any) => {

    console.error(`Error in API call: ${method} ${url}`, err);
    // You can add more error handling logic here, like logging to an external service
    // or showing a notification to the user.
}

const apiCaller = async (method:string, url:string, body:any, token:string = '', addConfig:any) => {
    let axiosConfig_ = JSON.parse(JSON.stringify(axiosConfig));
    axiosConfig_.method = method;
    axiosConfig_.url = url;
    axiosConfig_.data = body;
    if (token) {
        axiosConfig_.headers['Authorization'] = `Bearer ${token}`;
    }
    if (addConfig) {
        axiosConfig_ = { ...axiosConfig_, ...addConfig };
    }

    try {
        let response = await axios(axiosConfig_);
        if (response.status !== 200) {
            throw new Error(`API call failed with status ${response.status}`);
        }
        return response.data;
    }catch (error) {
        await onError(error, method, url, body, token, addConfig);
    }

    
}

export { apiCaller };
import Config from "@/config";
import type { UserInfo } from "@/models/userInfo";
import axios from "axios";
import store from "@/store/store";
import type { RootState } from "@/store/store";


const CONFIG = Config();

// Selector untuk mengambil userInfo dari state Redux
const selectUserInfo = (state: RootState) => state.user.userInfo;

const onError = async (err:any, method:string, url:string) => {
    console.error(`Error in API call: ${method} ${url}`, err);
    // Removed recursive call to apiCaller to prevent infinite loop
    // You can add more error handling logic here, like logging to an external service
    // or showing a notification to the user.
    
    throw err; // Re-throw the error for handling by the caller
}

const apiCaller = async (method:string, url:string, body:any, token:string = '', addConfig:any) => {
    // Get the latest userInfo from the store each time the function is called
    const userInfo: UserInfo = selectUserInfo(store.getState());
    
    // Create base axios config
    const axiosConfig_ = {
        baseURL: CONFIG.apiUrl,
        method,
        url,
        data: body,
        headers: {
            'Authorization': `Bearer ${token || userInfo?.token || ''}`,
            'Content-Type': 'application/json',
        },
    };
    
    if (addConfig) {
        Object.assign(axiosConfig_, addConfig);
    }
    
    try {
        let response = await axios(axiosConfig_);
        if (response.status !== 200) {
            throw new Error(`API call failed with status ${response.status}`);
        }
        return response.data;
    } catch (error) {
        await onError(error, method, url);
        throw error; // Re-throw the error to be caught by the caller
    }
}

export { apiCaller };
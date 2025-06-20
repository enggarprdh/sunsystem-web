import Config from "@/config";
import axios from "axios";
import {store} from "@/app/store";



const CONFIG = Config();

// Selector untuk mengambil userInfo dari state Redux
// const selectUserInfo = (state: RootState) => state.user.userInfo;

const onError = async (err:any, method:string, url:string) => {
    console.error(`Error in API call: ${method} ${url}`, err);    

    throw err; // Re-throw the error for handling by the caller
}

const getToken = () => {
    const state = store.getState();
    const { token } = state.dataSlicePersisted;
    return token || '';
}

const apiCaller = async (method:string, url:string, body:any, addConfig:any = null) => {
    const token:any = getToken();
    
    // Create base axios config
    const axiosConfig_ = {
        baseURL: CONFIG.apiUrl,
        method,
        url,
        data: body,
        headers: {
            'Authorization': `Bearer ${token.token || ''}`,
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
import { apiCaller } from "./_apiCaller";
type LoginResponse = {
    token: string;
    refreshToken: string;
    userName:string;
    role:string;
    message: string;
}

type LoginPayload = {
    userName: string;
    password: string;
}

const apiLogin = async (username: string, password: string): Promise<LoginResponse> => {
    let body: LoginPayload = {
        userName: username,
        password: password
    };
    const response = await apiCaller('POST', '/auth/login', body, "", null);
    if (response?.status == 200) {

    }
    console.log('Login response:', response);
    if (response && response.data) {
        return {
            token: response.data.token ?? "",
            refreshToken: response.data.refreshToken ?? "",
            userName: response.data.userName ?? "",
            role: response.data.role ?? "",
            message: 'Login successful'
        };
    } else {
        throw new Error('Login failed');
    }
}

export {apiLogin};


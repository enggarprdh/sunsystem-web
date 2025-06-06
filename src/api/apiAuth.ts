import type { UserInfo } from "@/models/userInfo";
import { apiCaller } from "./_apiCaller";

type LoginPayload = {
    userName: string;
    password: string;
}

const apiLogin = async (username: string, password: string): Promise<UserInfo> => {
    let body: LoginPayload = {
        userName: username,
        password: password
    };
    const response = await apiCaller('POST', '/auth/login', body, "", null);
    if (response?.status == 200) {

    }
    if (response && response.data) {
        return {
            token: response.data.token ?? "",
            refreshToken: response.data.refreshToken ?? "",
            userName: response.data.userName ?? "",
            role: response.data.role ?? "",
            menu: response.data.menu ?? [],
            message: 'Login successful'
        };
    } else {
        throw new Error('Login failed');
    }
}

export {apiLogin};


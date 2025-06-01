export const USER_INFO = 'USER_INFO';

export const updateUserInfo = (userInfo: any) => {
    return {
        type: USER_INFO,
        data: {
            userInfo,
        },
    };
}
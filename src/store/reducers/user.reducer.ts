import { USER_INFO } from "../actions/user.action";

const initialState = {
    userInfo: null,
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case USER_INFO:
            return {
                ...state,
                userInfo: action.data.userInfo,
            };
        default:
            return state;
    }
};

export default userReducer;
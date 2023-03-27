import { LOGIN, INIT, LOGOUT } from '../actions/AuthAction';
const initialState = {
    isAuthenticated: false,
    isInitialised: false,
    fullName: null,
    role: 'na',
    accessToken: '',
};

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case INIT:
            const { isAuthenticated, fullName, role } = action.payload;
            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                fullName,
                role,
            };

        case LOGIN: {
            const { isAuthenticated, fullName, access_token } = action.payload;
            console.log(access_token);
            return {
                ...state,
                isAuthenticated,
                fullName,
                accessToken: access_token,
            };
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                fullName: null,
            };
        }
        default: {
            return { ...state };
        }
    }
};

export default AuthReducer;

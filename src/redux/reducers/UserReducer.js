import { storeData } from "../../utils/storage";

const initialState = {
    user: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            if(action.data.token) {
                storeData('token', action.data.token)
            }

            return {
                ...state,
                user: action.data
            }
        default:
            return state;
    }
}
export default userReducer;
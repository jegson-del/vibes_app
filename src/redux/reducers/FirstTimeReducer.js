const initialState = {
    isFirstTime: true
};

const firstTimeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FIRST_TIME':
            return {
                ...state,
                isFirstTime: action.data
            }
        default:
            return state;
    }
}

export default firstTimeReducer;
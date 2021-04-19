const initialState = {
    token: ''
};

const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.data
            }
        default:
            return state;
    }
}

export default tokenReducer;
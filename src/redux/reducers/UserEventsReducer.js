const initialState = {
    userEvents: [],
    tickets: [],
};

const userEventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER_EVENTS':
            return {
                ...state,
                userEvents: action.data
            }
        case 'SET_TICKET':
            return {
                ...state,
                tickets: action.data
            }
        default:
            return state;
    }
}

export default userEventsReducer;
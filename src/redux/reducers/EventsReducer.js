const initialState = {
    events: [],
    eventsType: 0,
    activeEvent: {},
    topLocations: [],
};

const eventsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_EVENTS':
            let events = [];

            if(action.data.type === 0) {
                let oldEvents = state.events;
                let newEvents = action.data.events;

                if (oldEvents.length > 0 && newEvents.length > 0) {
                    if(action.data.filter_changed) {
                        events = oldEvents;
                    } else {
                        events = [...oldEvents, ...newEvents];
                    }
                } else if(oldEvents.length > 0 && newEvents.length === 0) {
                    events = oldEvents;
                } else {
                    events = newEvents;
                }
            } else if(action.data.type === 1 || action.data.type === 2) {
                events = action.data.events;
            }

            return {
                ...state,
                events: events,
            }
        case 'SET_EVENTS_TYPE':
            return {
                ...state,
                eventsType: action.data
            }
        case 'SET_ACTIVE_EVENT':
            return {
                ...state,
                activeEvent: action.data
            }
        case 'SET_TOP_LOCATIONS':
            return {
                ...state,
                topLocations: action.data
            }
        case 'SET_EVENTS_AFTER_DELETE':
            return {
                ...state,
                events: action.data
            }
        default:
            return state;
    }
}
export default eventsReducer;
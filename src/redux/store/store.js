import { createStore, combineReducers } from "redux";
import firstTimeReducer from "../reducers/FirstTimeReducer";
import eventsReducer from "../reducers/EventsReducer";
import userReducer from "../reducers/UserReducer";
import tokenReducer from "../reducers/TokenReducer";
import userEventsReducer from "../reducers/UserEventsReducer";

const rootReducer = combineReducers({
    firstTimeReducer: firstTimeReducer,
    eventsReducer: eventsReducer,
    userReducer: userReducer,
    tokenReducer: tokenReducer,
    userEventsReducer: userEventsReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
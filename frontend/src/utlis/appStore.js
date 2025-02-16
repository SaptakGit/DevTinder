import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./userSlice";
import feedReducer from "./feedSlice";
import connectionSlice from "./connectionSlice";
import requestSlice from "./requestSlice";

const appStore = configureStore({
    reducer: {
        user: useReducer,
        feed: feedReducer,
        connections: connectionSlice,
        requests: requestSlice
    }
});

export default appStore;
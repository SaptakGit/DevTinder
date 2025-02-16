import { configureStore } from "@reduxjs/toolkit";
import  useReducer  from "./userSlice";
import feedReducer from "./feedSlice";
import connectionSlice from "./connectionSlice"

const appStore = configureStore({
    reducer: {
        user: useReducer,
        feed: feedReducer,
        connections: connectionSlice
    }
});

export default appStore;
import { configureStore } from "@reduxjs/toolkit";
import utentiReducer from "../utentiSlice";

const store = configureStore({

    reducer: utentiReducer
})

export default store
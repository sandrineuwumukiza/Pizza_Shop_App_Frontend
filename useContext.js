import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "../Redux/CartSlice"

export default configureStore({
    reducer:{
        cart:CartReducer
    }
})
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./Redux/cartReducer";

export default configureStore({
    reducer:{
        cart:cartReducer
    }
})
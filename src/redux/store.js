import { configureStore } from '@reduxjs/toolkit';
import userSlice from "./features/user/userSlice";
import { useDispatch } from 'react-redux';
import authSlice from "./features/user/userSlice";




export const store = configureStore({
    reducer: {
        user: userSlice,
    },
});


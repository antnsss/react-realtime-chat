import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice';
import chatReducer from './slices/chatSlice'; // підключаємо чат

export const store = configureStore({
    reducer: {
        user: userReducer,
        chat: chatReducer, // додаємо чат
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; // якщо потрібно для useDispatch з TS

import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/note/noteSlice';

// configuring the redux store here
export const store = configureStore({
    reducer: {
        note: noteReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',

});

// declaring type of the store here
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
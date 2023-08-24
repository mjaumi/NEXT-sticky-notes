import { configureStore } from '@reduxjs/toolkit';

// configuring the redux store here
export const store = configureStore({
    reducer: {

    },
    devTools: process.env.NODE_ENV !== 'production',

});

// declaring type of the store here
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
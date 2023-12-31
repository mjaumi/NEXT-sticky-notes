import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/note/noteSlice';
import { apiSlice } from '../features/api/apiSlice';
import searchReducer from '../features/search/searchSlice';

// configuring the redux store here
export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        note: noteReducer,
        search: searchReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});

// declaring type of the store here
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
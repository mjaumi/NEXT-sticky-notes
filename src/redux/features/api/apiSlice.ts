import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// creating the API Slice here
export const apiSlice = createApi({
    reducerPath: 'stickyNotesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:9000',
    }),
    tagTypes: [],
    endpoints: builder => ({}),
});
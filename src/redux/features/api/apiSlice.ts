import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// creating the API Slice here
export const apiSlice = createApi({
    reducerPath: 'stickyNotesAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
    }),
    tagTypes: ['notes'],
    endpoints: builder => ({}),
});
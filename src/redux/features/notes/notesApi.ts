import { apiSlice } from '../api/apiSlice';

// initializing the notes APIs here
export const notesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET query to get all the notes from the server
        getNotes: builder.query<Note[], null>({
            query: () => '/notes',
            providesTags: ['notes'],
        }),
    }),
});

export const {
    useGetNotesQuery,
    useLazyGetNotesQuery,
} = notesApi;
import { apiSlice } from '../api/apiSlice';

export const notesApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // GET query to get all the notes from the server
        getNotes: builder.query<Note[], null>({
            query: () => '/notes',
        }),
    }),
});

export const {
    useGetNotesQuery,
} = notesApi;
import { apiSlice } from '../api/apiSlice';
import { notesApi } from '../notes/notesApi';

// defining the patch method argument types here
interface IUpdateNote {
    noteId: string,
    data: Note,
}

// initializing the note APIs here
export const noteApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        // PATCH mutation to note to the server
        updateNote: builder.mutation<Result, IUpdateNote>({
            query: ({ noteId, data }) => ({
                url: `/note/${noteId}`,
                method: 'PATCH',
                body: data,
            }),

            // updating notes in the redux store pessimistically after the database update
            async onQueryStarted({ noteId }, { queryFulfilled, dispatch }) {
                const { data: updatedNote } = await queryFulfilled;

                if (updatedNote.status === 'success') {
                    dispatch(notesApi.util.updateQueryData('getNotes', null,
                        (draftNote) => {
                            const updatedNoteIndex = draftNote.findIndex(note => note._id === noteId);
                            draftNote.splice(updatedNoteIndex, 1, updatedNote.body);
                        }
                    ))
                }
            }
        }),
    }),
});

export const {
    useUpdateNoteMutation,
} = noteApi;
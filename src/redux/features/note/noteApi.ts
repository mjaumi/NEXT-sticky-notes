import { socket } from '@/lib/socketConnection';
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
        // POST mutation to create a new note to the server
        addNote: builder.mutation<Result, Partial<Note>>({
            query: data => ({
                url: '/note',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['notes'],
        }),

        // PATCH mutation to update note to the server
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

                    // emitting note updated event to inform the server here 
                    socket.emit('note-updated', true);

                    dispatch(notesApi.util.updateQueryData('getNotes', null,
                        (draftNote) => {
                            const updatedNoteIndex = draftNote.findIndex(note => note._id === noteId);
                            draftNote.splice(updatedNoteIndex, 1, updatedNote.body);
                        }
                    ))
                }
            }
        }),

        // DELETE mutation to delete note from the server
        deleteNote: builder.mutation<DeleteResult, string>({
            query: noteId => ({
                url: `/note/${noteId}`,
                method: 'DELETE',
            }),

            // deleting notes from redux store with optimistic approach here
            async onQueryStarted(noteId, { queryFulfilled, dispatch }) {
                let deleteResult = dispatch(
                    notesApi.util.updateQueryData('getNotes', null,
                        draftNotes => {
                            const deletedNoteIndex = draftNotes.findIndex(note => note._id === noteId);
                            draftNotes.splice(deletedNoteIndex, 1);
                        }
                    ),
                );

                try {
                    await queryFulfilled;

                    // emitting note deleted event to inform the server here 
                    socket.emit('note-deleted', true);
                } catch (error) {
                    deleteResult.undo();
                }
            }
        }),
    }),
});

export const {
    useAddNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation,
} = noteApi;
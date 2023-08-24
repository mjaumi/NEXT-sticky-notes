import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// declaring the initial state's type here
type NoteState = {
    note: Note | null;
}

// initial state
const initialState: NoteState = {
    note: null
}

// creating the note slice here
export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        createNewNote: (state, action: PayloadAction<Note>) => {
            state.note = action.payload;
        },
        removeNewNote: () => initialState,
    },
});

export const {
    createNewNote,
    removeNewNote
} = noteSlice.actions;

export default noteSlice.reducer;
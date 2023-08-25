import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// declaring the initial state's type here
type searchState = {
    searchText: string,
}

// initial state
const initialState: searchState = {
    searchText: ''
}

// initializing the search slice here
const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        searchNotes: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload;
        }
    },
});

export default searchSlice.reducer;
export const { searchNotes } = searchSlice.actions;
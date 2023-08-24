'use client';

import React from 'react';
import NoteItem from './NoteItem';
import getNotes from '../../lib/getNotes';
import NotesContainer from './NotesContainer';
import { useGetNotesQuery } from '@/redux/features/notes/notesApi';

const Notes = () => {
  // integration of RTK Query hooks here
  const { data: notes } = useGetNotesQuery(null);

  // rendering the notes container component here
  return (
    <section className='w-full px-20 py-5'>
      <div className='pt-20'>
        <h1 className='text-5xl font-semibold'>Notes</h1>
        <NotesContainer notes={notes} />
      </div>
    </section>
  );
};

export default Notes;

import React from 'react';
import NoteItem from './NoteItem';
import getNotes from '../../lib/getNotes';
import NotesContainer from './NotesContainer';

const Notes = async () => {
  // getting fake data from local server here [TEMPORARY]
  const notesData: Promise<Note[]> = getNotes();
  const notes = await notesData;

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

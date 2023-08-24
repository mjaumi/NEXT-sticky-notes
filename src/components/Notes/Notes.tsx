import React from 'react';
import NoteItem from './NoteItem';
import getNotes from '../../lib/getNotes';

const Notes = async () => {
  // getting fake data from local server here [temporary]
  const notesData: Promise<Note[]> = getNotes();
  const notes = await notesData;

  // rendering the notes container component here
  return (
    <section className='w-full px-20 py-5'>
      <div className='pt-20'>
        <h1 className='text-5xl font-semibold'>Notes</h1>
        <div className='mt-20 grid grid-cols-4 gap-12'>
          {notes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Notes;

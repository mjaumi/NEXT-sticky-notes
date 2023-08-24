'use client';

import React from 'react';
import NoteItem from './NoteItem';
import { useAppSelector } from '@/redux/hooks';

const NotesContainer = ({ notes }: { notes: Array<Note> }) => {
  // integration or react-redux custom hooks here
  const noteData = useAppSelector((state) => state.note);

  // rendering the notes container component here [TEMPORARY]
  return (
    <div className='mt-20 grid grid-cols-4 gap-12'>
      {noteData.note && <NoteItem note={noteData.note} />}
      {notes.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </div>
  );
};

export default NotesContainer;

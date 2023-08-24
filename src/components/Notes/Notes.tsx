'use client';

import React from 'react';
import NoteItem from './NoteItem';
import { useGetNotesQuery } from '@/redux/features/notes/notesApi';
import { useAppSelector } from '@/redux/hooks';
import { socket } from '@/lib/socketConnection';

const Notes = () => {
  // integration of RTK Query hooks here
  const { data: notes, refetch } = useGetNotesQuery(null);

  // refetching the notes when the socket io is emitting updated note
  socket.on('receive-updated-note', () => {
    refetch();
  });

  // integration or react-redux custom hooks here
  const noteData = useAppSelector((state) => state.note);

  // rendering the notes container component here
  return (
    <section className='w-full px-20 py-5'>
      <div className='pt-20'>
        <h1 className='text-5xl font-semibold'>Notes</h1>
        <div className='mt-20 grid grid-cols-4 gap-12'>
          {noteData.note && <NoteItem note={noteData.note} />}
          {notes?.map((note) => (
            <NoteItem key={note._id} note={note} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Notes;

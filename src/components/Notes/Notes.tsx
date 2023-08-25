'use client';

import React from 'react';
import NoteItem from './NoteItem';
import { useGetNotesQuery } from '@/redux/features/notes/notesApi';
import { useAppSelector } from '@/redux/hooks';
import { socket } from '@/lib/socketConnection';
import SearchBar from '../SearchBar/SearchBar';

const Notes = () => {
  // integration of RTK Query hooks here
  const { data: notes, isUninitialized, refetch } = useGetNotesQuery(null);

  // refetching the notes when the socket io is emitting updated note
  socket.onAny(() => {
    if (!isUninitialized) {
      refetch();
    }
  });

  // integration or react-redux custom hooks here
  const noteData = useAppSelector((state) => state.note);

  // rendering the notes container component here
  return (
    <section className='w-full py-5'>
      <div>
        <SearchBar />
      </div>
      <div className='pt-32 xl:pt-20 px-5 md:px-10 2xl:px-20'>
        <h1 className='text-5xl font-semibold'>Notes</h1>
        <div className='mt-8 md:mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 2xl:gap-12'>
          {noteData.note && <NoteItem note={noteData.note} isNew />}
          {notes &&
            [...notes]
              .reverse()
              .map((note) => (
                <NoteItem key={note._id} note={note} isNew={false} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Notes;

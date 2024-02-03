'use client';

import { socket } from '@/lib/socketConnection';
import { useGetNotesQuery } from '@/redux/features/notes/notesApi';
import { useAppSelector } from '@/redux/hooks';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import Error from '../UI/Error';
import Loading from '../UI/Loading';
import NoteItem from './NoteItem';

const Notes = () => {
  // integration of RTK Query hooks here
  const {
    data: notes,
    isUninitialized,
    refetch,
    isLoading,
    isError,
  } = useGetNotesQuery(null);

  // refetching the notes when the socket io is emitting updated note
  socket.onAny(() => {
    if (!isUninitialized) {
      refetch();
    }
  });

  // integration or react-redux custom hooks here
  const noteData = useAppSelector((state) => state.note);
  const searchData = useAppSelector((state) => state.search);

  // handler function to filter notes by search
  const searchNotesHandler = (note: Note) => {
    return note.noteText
      .toLowerCase()
      .includes(searchData.searchText.toLowerCase());
  };

  // deciding what to render here
  let content: React.JSX.Element | null = null;

  if (isLoading) {
    content = <Loading />;
  }

  if (!isLoading && isError) {
    content = <Error errorText='Failed To Load The Notes!' />;
  }

  if (!isLoading && !isError && !notes?.length) {
    content = <Error errorText='No Notes Found!' />;
  }

  if (!isLoading && !isError && noteData.note) {
    content = (
      <div className='mt-8 md:mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 2xl:gap-12'>
        {noteData.note && <NoteItem note={noteData.note} isNew />}
      </div>
    );
  }

  if (!isLoading && !isError && notes?.length) {
    content = (
      <div className='mt-8 md:mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 2xl:gap-12'>
        {noteData.note && <NoteItem note={noteData.note} isNew />}
        {[...notes]
          .reverse()
          .filter(searchNotesHandler)
          .map((note) => (
            <NoteItem key={note._id} note={note} isNew={false} />
          ))}
      </div>
    );
  }
  // rendering the notes container component here
  return (
    <section className='w-full py-5'>
      <div>
        <SearchBar />
      </div>
      <div className='pt-32 xl:pt-20 px-5 md:px-10 2xl:px-20'>
        <h1 className='text-5xl font-semibold'>Notes</h1>
        {content}
      </div>
    </section>
  );
};

export default Notes;

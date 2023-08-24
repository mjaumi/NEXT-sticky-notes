import React from 'react';
import NoteItem from './NoteItem';

const Notes = () => {

    // rendering the notes container component here
    return (
        <section className='w-full px-20 py-5'>
            <div className='pt-20'>
                <h1 className='text-5xl font-semibold'>Notes</h1>
                <div className='mt-20 grid grid-cols-4 gap-12'>
                    <NoteItem/>
                    <NoteItem/>
                    <NoteItem/>
                    <NoteItem/>
                    <NoteItem/>
                    <NoteItem/>
                </div>
            </div>
        </section>
    );
};

export default Notes;
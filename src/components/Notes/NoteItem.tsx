import React from 'react';
import { MdModeEdit } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import NoteButton from '../NoteButton/NoteButton';

const NoteItem = () => {

    // rendering note item card component here
    return (
        <div className='group flex flex-col justify-between bg-sticky-indigo h-[350px] rounded-3xl px-6 py-8 font-medium'>
            <div>
                <p className='text-lg'>The beginning of screenless design: UI jobs to be taken over by Solution Architect</p>
            </div>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='font-base text-sm'>August 23, 2023</p>
                </div>
                <div>
                    <NoteButton additionalClassName='mr-3 opacity-0 group-hover:opacity-100'>
                        <AiFillStar className='w-5 h-5'/>
                    </NoteButton>
                    <NoteButton>
                        <MdModeEdit className='w-5 h-5'/>
                    </NoteButton>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
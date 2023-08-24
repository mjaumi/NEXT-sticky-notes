'use client'

import React, { useState, useRef, useEffect } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';

const NoteItem = () => {
    // integration of react hooks here
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // taking focus to the textarea if user wants to edit it
    useEffect(() => {
        isEdit && textAreaRef.current?.focus();
    }, [isEdit]);

    // handler function to handle the edit button click events
    const editNoteButtonHandler = () => {
        setIsEdit(isEdit => !isEdit);
    }

    // rendering note item card component here
    return (
        <div className='group flex flex-col justify-between bg-sticky-indigo h-[350px] rounded-3xl px-6 py-8 font-medium'>
            <div className='h-full mb-5'>
                {
                    !isEdit ?
                    <p className='text-lg'>The beginning of screenless design: UI jobs to be taken over by Solution Architect</p>
                    :
                    <textarea ref={textAreaRef} className='bg-transparent w-full h-full text-lg outline-none' name='note-textarea' defaultValue={'The beginning of screenless design: UI jobs to be taken over by Solution Architect'}></textarea>
                }
            </div>
            <div className='flex justify-between items-center'>
                <div>
                    <p className='font-base text-sm'>August 23, 2023</p>
                </div>
                <div>
                    <button className='bg-sticky-black text-white p-3 rounded-full hover:scale-125 mr-3 opacity-0 group-hover:opacity-100 duration-300'>
                        <AiFillStar className='w-5 h-5'/>
                    </button>
                    <button onClick={editNoteButtonHandler} className='bg-sticky-black text-white p-3 rounded-full hover:scale-125 duration-300'>
                        <MdModeEdit className='w-5 h-5'/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteItem;
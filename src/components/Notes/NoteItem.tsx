'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MdModeEdit, MdDone } from 'react-icons/md';
import { AiFillStar } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { useUpdateNoteMutation } from '@/redux/features/note/noteApi';
import { toast } from 'react-toastify';

const NoteItem = ({ note }: { note: Note }) => {
  // destructuring the note object here
  const { _id, noteText, bgColor, isStared, createdAt } = note;

  // integration of RTK Query hooks here
  const [updateNote, { isSuccess, isError }] = useUpdateNoteMutation();

  // integration of react hooks here
  const [textareaText, setTextAreaText] = useState<string>(noteText);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // taking focus to the textarea if user wants to edit it
  useEffect(() => {
    if (isEdit) {
      textAreaRef.current?.focus();
      textAreaRef.current?.setSelectionRange(-1, -1);
    }
  }, [isEdit]);

  // showing notification using toasts to the user here
  useEffect(() => {
    if (isSuccess) {
      toast.success('Note Updated Successfully!!', {
        toastId: 'update-success',
      });
    }

    if (isError) {
      toast.error('Failed Update The Note!!', {
        toastId: 'update-error',
      });
    }
  }, [isError, isSuccess]);

  // handler function to handle the edit button click events
  const editNoteButtonHandler = () => {
    if (isEdit && noteText !== textareaText) {
      const noteToUpdate: Note = {
        ...note,
        noteText: textareaText,
      };

      updateNote({
        noteId: _id,
        data: noteToUpdate,
      });
    }
    setIsEdit((isEdit) => !isEdit);
  };

  // handler function to handle note staring functionality
  const starButtonHandler = () => {
    const noteToUpdate: Note = {
      ...note,
      isStared: !note.isStared,
    };

    updateNote({
      noteId: _id,
      data: noteToUpdate,
    });
  };

  // rendering note item card component here
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      layoutId={_id}
      transition={{
        duration: 2,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      }}
      style={{ backgroundColor: bgColor }}
      className='group flex flex-col justify-between h-[350px] rounded-3xl px-6 py-8 font-medium overflow-x-hidden'
    >
      <div className='h-full mb-5'>
        {!isEdit ? (
          <p className='text-lg'>{noteText}</p>
        ) : (
          <textarea
            ref={textAreaRef}
            className='bg-transparent w-full h-full text-lg outline-none resize-none'
            name='note-textarea'
            defaultValue={noteText}
            onChange={(e) => setTextAreaText(e.target.value)}
          ></textarea>
        )}
      </div>
      <div className='flex justify-between items-center'>
        <div>
          <p className='font-base text-sm'>{createdAt}</p>
        </div>
        <div>
          <button
            onClick={starButtonHandler}
            className={`bg-sticky-black  p-3 rounded-full hover:scale-125 mr-3 ${
              isStared
                ? 'text-sticky-golden'
                : 'text-white opacity-0 group-hover:opacity-100'
            } duration-300`}
          >
            <AiFillStar className='w-5 h-5' />
          </button>
          <button
            onClick={editNoteButtonHandler}
            className='bg-sticky-black text-white p-3 rounded-full hover:scale-125 duration-300'
          >
            {isEdit ? (
              <MdDone className='w-5 h-5' />
            ) : (
              <MdModeEdit className='w-5 h-5' />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteItem;

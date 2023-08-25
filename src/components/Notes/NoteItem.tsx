'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MdModeEdit, MdDone, MdDelete } from 'react-icons/md';
import { AiFillStar, AiOutlinePlus } from 'react-icons/ai';
import { motion } from 'framer-motion';
import {
  useAddNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation,
} from '@/redux/features/note/noteApi';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { removeNewNote } from '@/redux/features/note/noteSlice';
import isEmptyOrWhitespace from '@/lib/isEmptyOrWhitespace';
import moment from 'moment';

const NoteItem = ({ note, isNew }: { note: Note; isNew: boolean }) => {
  // destructuring the note object here
  const { _id, noteText, bgColor, isStared, createdAt } = note;

  // integration of RTK Query hooks here
  const [updateNote, updateMutationFlags] = useUpdateNoteMutation();
  const [deleteNote, deleteMutationFlags] = useDeleteNoteMutation();
  const [addNote, addMutationFlags] = useAddNoteMutation();

  // integration of react-redux hooks here
  const { note: newNote } = useAppSelector((state) => state.note);
  const dispatch = useAppDispatch();

  // integration of react hooks here
  const [textareaText, setTextareaText] = useState<string>(noteText);
  const [isEdit, setIsEdit] = useState<boolean>(isNew);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // taking focus to the textarea if user wants to edit it
  useEffect(() => {
    if (isEdit) {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(-1, -1);
    }
  }, [isEdit]);

  // showing notification using toasts to the user here
  useEffect(() => {
    if (updateMutationFlags.isSuccess) {
      toast.success('Note Updated Successfully!!', {
        toastId: 'update-success',
      });
    }

    if (updateMutationFlags.isError) {
      toast.error('Failed To Update The Note!!', {
        toastId: 'update-error',
      });
    }

    if (deleteMutationFlags.isSuccess) {
      toast.success('Note Deleted Successfully!!', {
        toastId: 'delete-success',
      });
    }

    if (deleteMutationFlags.isError) {
      toast.error('Failed To Delete The Note!!', {
        toastId: 'delete-error',
      });
    }
  }, [deleteMutationFlags, updateMutationFlags]);

  if (addMutationFlags.isSuccess) {
    console.log('Success');
  }

  // handler function to handle the add button click events
  const addNoteButtonHandler = () => {
    if (!isEmptyOrWhitespace(textareaText)) {
      const noteToAdd: Note = {
        noteText: textareaText,
        category: newNote?.category as string,
        bgColor: newNote?.bgColor as string,
        isStared: newNote?.isStared as boolean,
        createdAt: moment().format('LL'),
      };

      addNote(noteToAdd);
    }

    dispatch(removeNewNote());
  };

  // handler function to handle the delete button click events
  const deleteNoteButtonHandler = (noteId: string) => {
    deleteNote(noteId);
  };

  // handler function to handle the edit button click events
  const editNoteButtonHandler = () => {
    if (isEdit && noteText !== textareaText) {
      const noteToUpdate: Note = {
        ...note,
        noteText: textareaText,
      };

      updateNote({
        noteId: _id as string,
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
      noteId: _id as string,
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
            ref={textareaRef}
            className='bg-transparent w-full h-full text-lg outline-none resize-none'
            name='note-textarea'
            defaultValue={noteText}
            onChange={(e) => setTextareaText(e.target.value)}
          ></textarea>
        )}
      </div>
      <div className='flex justify-between items-center'>
        <div>
          <p className='font-base text-sm'>{createdAt}</p>
        </div>
        <div>
          {!isNew ? (
            <>
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
                onClick={() => deleteNoteButtonHandler(_id as string)}
                className='bg-sticky-black text-red-500 hover:text-white p-3 rounded-full hover:scale-125 mr-3 duration-300'
              >
                <MdDelete className='w-5 h-5' />
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
            </>
          ) : (
            <button
              onClick={addNoteButtonHandler}
              className={`bg-sticky-black p-2 rounded-full hover:scale-125 duration-300 ${
                !isEmptyOrWhitespace(textareaText)
                  ? 'text-white'
                  : 'text-red-500'
              }`}
            >
              <AiOutlinePlus
                className={`w-6 h-6 duration-300 ${
                  !isEmptyOrWhitespace(textareaText)
                    ? 'rotate-0'
                    : 'rotate-[45deg]'
                }`}
              />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default NoteItem;

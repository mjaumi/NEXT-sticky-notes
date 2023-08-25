'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/redux/hooks';
import { createNewNote } from '@/redux/features/note/noteSlice';

// declaring the color button variants here
const colorBtnVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: -50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const AddNoteColorButton = ({ bgColor }: { bgColor: string }) => {
  // integration of react-redux custom hooks here
  const dispatch = useAppDispatch();

  // handler function to add new note on click add note color button
  const addNoteBtnHandler = () => {
    const newNote: Note = {
      noteText: '',
      createdAt: '',
      isStared: false,
      category: '',
      bgColor,
    };

    dispatch(createNewNote(newNote));
  };

  // rendering the add note color button component here
  return (
    <motion.button
      onClick={addNoteBtnHandler}
      variants={colorBtnVariants}
      style={{ backgroundColor: bgColor }}
      className='mb-5 p-2 rounded-full opacity-0'
    />
  );
};

export default AddNoteColorButton;

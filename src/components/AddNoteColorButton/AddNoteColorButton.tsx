'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAppDispatch } from '@/redux/hooks';
import { createNewNote } from '@/redux/features/note/noteSlice';

// declaring the color button variants here
const colorBtnVariantsMobile = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -50,
    opacity: 0,
    transition: {
      x: { stiffness: 1000 },
    },
  },
};

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

  // integration or react hooks here
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

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
      variants={windowWidth < 1280 ? colorBtnVariantsMobile : colorBtnVariants}
      style={{ backgroundColor: bgColor }}
      className='ml-5 xl:ml-0 xl:mb-5 p-2 rounded-full opacity-0'
    />
  );
};

export default AddNoteColorButton;

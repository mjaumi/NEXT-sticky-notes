'use client';

import React, { useState } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { BsPlus } from 'react-icons/bs';
import AddNoteColorButton from '../AddNoteColorButton/AddNoteColorButton';

// defining the color button container variants here
const containerVariants = {
  open: {
    width: '60%',
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    width: '0%',
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const Sidebar = () => {
  // integration of framer-motion hooks here
  const [scope, animate] = useAnimate();

  // integration of react hooks here
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasAnimFinished, setHasAnimFinished] = useState<boolean>(false);

  // defining the buttons color codes here
  const colorCodes: string[] = [
    '#FFCA68',
    '#FF9C6F',
    '#B78FFF',
    '#00D3FF',
    '#E4EF88',
  ];

  // handler function to handle the visibility of the color buttons
  const addNoteButtonHandler = () => {
    animate([
      [
        '#add-button',
        { rotate: isOpen ? -90 : 90, y: '-10px' },
        { duration: 0.2 },
      ],
      [
        '#add-button',
        { rotate: isOpen ? -180 : 180, y: '0px' },
        { duration: 0.2 },
      ],
      ['#add-button', { rotate: 0 }, { duration: 0.000001, at: 0.4 }],
    ]);

    setIsOpen((isOpen) => !isOpen);
  };

  // rendering the sidebar component here
  return (
    <aside className='fixed xl:sticky bottom-5 xl:top-0 xl:border-r w-full xl:w-28 px-3 py-5 xl:h-screen shadow-md xl:shadow-none z-[999]'>
      <p className='hidden xl:block text-center font-semibold'>Sticky</p>

      <div
        ref={scope}
        className='py-5 xl:py-0 xl:pt-14 flex xl:flex-col justify-center items-center w-4/5 mx-auto bg-white rounded-xl'
      >
        <button
          id='add-button'
          onClick={addNoteButtonHandler}
          className='bg-sticky-black text-white rounded-full p-1 z-20'
        >
          <BsPlus className='w-8 h-8' />
        </button>
        <motion.div
          variants={containerVariants}
          animate={isOpen ? 'open' : 'closed'}
          onAnimationStart={() => {
            setHasAnimFinished(false);
          }}
          onAnimationComplete={() => {
            !isOpen && setHasAnimFinished(true);
          }}
          className={`xl:mt-8 flex xl:flex-col justify-center items-center ${
            hasAnimFinished && 'hidden'
          }`}
        >
          {colorCodes.map((color: string) => (
            <AddNoteColorButton key={color} bgColor={color} />
          ))}
        </motion.div>
      </div>
    </aside>
  );
};

export default Sidebar;

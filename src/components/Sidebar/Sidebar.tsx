'use client'

import React, {useState} from 'react';
import { motion, useAnimate } from 'framer-motion';
import { BsPlus } from 'react-icons/bs';
import AddNoteColorButton from '../AddNoteColorButton/AddNoteColorButton';

// defining the color button container variants here
const containerVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const Sidebar = () => {
    // integration of framer-motion hooks here
    const [scope, animate] = useAnimate();

    // integration of react hooks here
    const [isOpen, setIsOpen] = useState<boolean>(false);

    // defining the buttons color codes here
    const colorCodes: string[] = ['#FFCA68', '#FF9C6F', '#B78FFF', '#00D3FF', '#E4EF88'];

    // handler function to handle the visibility of the color buttons
    const addNoteButtonHandler = () => {
        animate([
            ['#add-button', {rotate: 90, y: '-10px'}, {duration: 0.2}],
            ['#add-button', {rotate: 180, y: '0px'}, {duration: 0.2}],
            ['#add-button', {rotate: 0,}, {duration: 0.000001, at: 0.4}]
        ]);

        setIsOpen(isOpen => !isOpen);
    }

    // rendering the sidebar component here
    return (
        <aside className='border-r w-28 px-3 py-5'>
            <p className='text-center font-semibold'>Sticky</p>
            
            <div ref={scope}  className='pt-14 flex flex-col items-center'>
                <button
                    id='add-button' 
                    onClick={addNoteButtonHandler}
                    className='bg-sticky-black text-white rounded-full p-1'
                >
                    <BsPlus className='w-8 h-8'/>
                </button>
                <motion.div 
                    variants={containerVariants}
                    animate={isOpen ? 'open' : 'closed'}
                    className='mt-8 flex flex-col items-center'
                >
                    {
                        colorCodes.map((color: string) => 
                            <AddNoteColorButton
                                key={color} 
                                bgColor={color}
                        />)
                    }
                </motion.div>
            </div>
        </aside>
    );
};

export default Sidebar;
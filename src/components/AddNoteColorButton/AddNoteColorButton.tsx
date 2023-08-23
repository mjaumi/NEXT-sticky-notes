import React from 'react';
import { motion } from 'framer-motion';

// declaring the color button variants here
const colorBtnVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: -50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const AddNoteColorButton = ({bgColor}: {bgColor: string}) => {

    // rendering the add note color button component here
    return (
        <motion.button 
            variants={colorBtnVariants}
            style={{backgroundColor: bgColor}} className='mb-5 p-2 rounded-full'
        />
    );
};

export default AddNoteColorButton;
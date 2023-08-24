import React from 'react';

// interface to define the props datatype
interface INoteButton {
    children: React.ReactNode,
    additionalClassName?: string
}

const NoteButton = ({children, additionalClassName}: INoteButton) => {

    // rendering note rounded button component here 
    return (
        <button className={`bg-sticky-black text-white p-3 rounded-full hover:scale-125 duration-300 ${additionalClassName}`}>
            {children}
        </button>
    );
};

export default NoteButton;
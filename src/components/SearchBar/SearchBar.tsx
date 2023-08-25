import React from 'react';
import { HiSearch } from 'react-icons/hi';

const SearchBar = () => {
  // rendering search bar component here
  return (
    <div className='fixed xl:block top-0 py-5 w-full bg-white border-b px-5 md:px-10 2xl:px-20'>
      <p className='block xl:hidden text-center font-semibold mb-3'>Sticky</p>

      <div className='bg-white border w-full xl:w-fit px-5 py-3 rounded-lg flex justify-center items-center'>
        <HiSearch className='text-sticky-gray mr-3' />
        <input
          className='bg-transparent w-full xl:w-[400px] outline-none font-medium'
          type='text'
          placeholder='Search notes...'
        />
      </div>
    </div>
  );
};

export default SearchBar;

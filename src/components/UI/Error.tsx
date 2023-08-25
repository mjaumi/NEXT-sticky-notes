import React from 'react';

const Error = ({ errorText }: { errorText: string }) => {
  // rendering the error component here
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <p className='text-center text-red-500 font-semibold text-xl'>
        {errorText}
      </p>
    </div>
  );
};

export default Error;

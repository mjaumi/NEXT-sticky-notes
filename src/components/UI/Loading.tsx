import React from 'react';
import { Bars } from 'react-loading-icons';

const Loading = () => {
  // rendering the loading icon here
  return (
    <div className='w-full min-h-screen flex justify-center pt-80'>
      <Bars fill='#161516' />
    </div>
  );
};

export default Loading;

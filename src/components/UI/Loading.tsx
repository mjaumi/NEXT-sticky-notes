import { Bars } from 'react-loading-icons';

const Loading = () => {
  // rendering the loading icon here
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <Bars fill='#161516' />
    </div>
  );
};

export default Loading;

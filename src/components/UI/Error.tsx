const Error = ({ errorText }: { errorText: string }) => {
  // rendering the error component here
  return (
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
      <p className='text-center text-red-500 font-semibold text-xl'>
        {errorText}
      </p>
    </div>
  );
};

export default Error;

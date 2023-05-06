import { useEffect, useState } from 'react';

interface IAlertProps {
  message: string;
  description?: string;
}

export const SuccessAlert = ({ message, description }: IAlertProps) => {
  const [display, setDisplay] = useState('block');

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDisplay('hidden');
    }, 5000);

    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  return (
    <>
      <div
        className={`bg-green-100  rounded-lg text-lime-700 px-4 py-5 absolute bottom-3 right-3 ${display}`}
        role='alert'
      >
        <div className='flex'>
          <div className='py-1 pr-2 '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='green'
              className='h-4 w-5 '
            >
              <path
                fillRule='evenodd'
                d='M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <div>
            <p className='text-sm font-semibold mb-1'>{message}</p>
            <p className='text-sm'>{description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

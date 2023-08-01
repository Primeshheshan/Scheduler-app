import { clearCount } from '@/redux/todoCount.slice';
import {
  ArrowLeftOnRectangleIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  CogIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import {
  Avatar,
  IconButton,
  SpeedDial,
  SpeedDialAction,
  SpeedDialContent,
  SpeedDialHandler,
  Typography,
} from '@material-tailwind/react';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

const SpeedDialComponent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const accessToken = useRef<string | null>('');

  useEffect(() => {
    accessToken.current = localStorage.getItem('accessToken');
  }, []);

  const labelProps = {
    variant: 'small',
    color: 'blue-gray',
    className:
      'absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal',
  };

  const onLogoutHandler = () => {
    dispatch(clearCount());
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    router.push('/login');
  };

  if (
    router.asPath === '/login' ||
    router.asPath === '/signup' ||
    router.asPath === '/forgot-password' ||
    router.asPath === '/reset-password'
  ) {
    return null;
  }

  return (
    <SpeedDial className=''>
      <div className='hidden lg:block'>
        <div
          className={`flex items-center max-w-md ${
            accessToken.current !== '' ? 'justify-between' : 'justify-end'
          }`}
        >
          {accessToken.current !== '' && (
            <>
              <Typography
                variant='small'
                color='gray'
                className='font-normal mr-1'
              >
                {localStorage.getItem('username')}
              </Typography>
              <Avatar src='/profile.jpg' alt='avatar' />
            </>
          )}
          <SpeedDialHandler>
            <IconButton
              size='lg'
              className='rounded-full text-blue-gray-600'
              variant='text'
            >
              <ChevronDownIcon className='h-5 w-5 transition-transform group-hover:rotate-180' />
            </IconButton>
          </SpeedDialHandler>
        </div>
      </div>
      <SpeedDialContent>
        <SpeedDialAction className='relative'>
          <UserCircleIcon
            className='h-5 w-5'
            onClick={() => router.push('/profile')}
          />
          <Typography {...labelProps}>Profile</Typography>
        </SpeedDialAction>
        <SpeedDialAction className='relative'>
          <CogIcon className='h-5 w-5' />
          <Typography {...labelProps}>Settings</Typography>
        </SpeedDialAction>
        <SpeedDialAction className='relative'>
          {accessToken.current !== '' ? (
            <>
              <ArrowRightOnRectangleIcon
                className='h-5 w-5'
                onClick={onLogoutHandler}
              />
              <Typography {...labelProps}>Logout</Typography>
            </>
          ) : (
            <>
              <ArrowLeftOnRectangleIcon
                className='h-5 w-5'
                onClick={onLogoutHandler}
              />
              <Typography {...labelProps}>Login</Typography>
            </>
          )}
        </SpeedDialAction>
      </SpeedDialContent>
    </SpeedDial>
  );
};

export default SpeedDialComponent;

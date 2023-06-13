import { RootState } from '@/redux';
import { clearAccessToken } from '@/redux/auth.slice';
import { clearCount } from '@/redux/todoCount.slice';
import {
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  CogIcon,
  HomeIcon,
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
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SpeedDialComponent = () => {
  const router = useRouter();
  const [loginUser, setloginUser] = useState(false);
  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootState) => state.authStore.accessToken
  );

  useEffect(() => {
    setloginUser(accessToken !== '');
  }, [accessToken]);

  const labelProps = {
    variant: 'small',
    color: 'blue-gray',
    className:
      'absolute top-2/4 -left-2/4 -translate-y-2/4 -translate-x-3/4 font-normal',
  };

  const onLogoutHandler = () => {
    dispatch(clearAccessToken());
    dispatch(clearCount());
    localStorage.removeItem('isLoggedIn');
    router.push('/login');
  };

  if (router.asPath === '/login' || router.asPath === '/signup') {
    return null;
  }

  return (
    <SpeedDial className=''>
      <div className='hidden lg:block'>
        <div
          className={`flex items-center w-40 ${
            loginUser ? 'justify-between' : 'justify-end'
          }`}
        >
          {loginUser && (
            <>
              <Typography variant='small' color='gray' className='font-normal'>
                Primesh
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
          <HomeIcon className='h-5 w-5' />
          <Typography {...labelProps}>Profile</Typography>
        </SpeedDialAction>
        <SpeedDialAction className='relative'>
          <CogIcon className='h-5 w-5' />
          <Typography {...labelProps}>Settings</Typography>
        </SpeedDialAction>
        <SpeedDialAction className='relative'>
          <ArrowRightOnRectangleIcon
            className='h-5 w-5'
            onClick={onLogoutHandler}
          />
          <Typography {...labelProps}>
            {loginUser ? 'Logout' : 'Login'}
          </Typography>
        </SpeedDialAction>
      </SpeedDialContent>
    </SpeedDial>
  );
};

export default SpeedDialComponent;

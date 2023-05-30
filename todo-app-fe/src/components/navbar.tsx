import {
  Button,
  Collapse,
  IconButton,
  Navbar,
  Typography,
} from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const NavbarComponent = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-semibold'
      >
        <Link href='/inprogress' className='flex items-center'>
          In Progress
        </Link>
      </Typography>
      <Typography
        as='li'
        variant='small'
        color='blue-gray'
        className='p-1 font-semibold'
      >
        <Link href='/completed' className='flex items-center'>
          Completed
        </Link>
      </Typography>
    </ul>
  );

  const onLogoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    router.push('login');
  };

  return (
    <>
      <Navbar className='sticky inset-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4'>
        <div className='flex items-center justify-between text-blue-gray-900'>
          <Typography
            as='li'
            color='blue-gray'
            className='mr-4 cursor-pointer py-1.5 font-semibold'
          >
            <Link href='/' className='flex items-center'>
              Todo
            </Link>
          </Typography>
          <div className='flex items-center gap-4'>
            <div className='mr-4 hidden lg:block'>{navList}</div>
            <Button
              size='sm'
              className='hidden lg:inline-block bg-indigo-600'
              onClick={onLogoutHandler}
            >
              <span>Logout</span>
            </Button>
            <IconButton
              variant='text'
              className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  className='h-6 w-6'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>
          {navList}
          <Button
            size='sm'
            fullWidth
            className='mb-2 bg-indigo-600'
            onClick={onLogoutHandler}
          >
            <span>Logout</span>
          </Button>
        </Collapse>
      </Navbar>
    </>
  );
};

export default NavbarComponent;

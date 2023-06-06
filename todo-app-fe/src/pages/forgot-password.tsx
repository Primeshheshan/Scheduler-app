import {
  Button,
  Card,
  IconButton,
  Input,
  Typography,
} from '@material-tailwind/react';

import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
const ForgotPassword = () => {
  return (
    <div className='flex justify-center my-16'>
      <Card className='p-6'>
        <div className='flex items-center'>
          <IconButton variant='text' className='mr-1'>
            <Link href='/login'>
              <ChevronLeftIcon className='h-5 w-5 transition-transform group-hover:rotate-180' />
            </Link>
          </IconButton>
          <Typography variant='h4' color='blue-gray'>
            Forgot Password
          </Typography>
        </div>
        <Typography color='gray' className='mt-1 font-normal'>
          Enter your details to reset password.
        </Typography>
        <form className='mt-4 mb-2 w-80 max-w-screen-lg sm:w-96'>
          <div className='mb-4 flex flex-col gap-6'>
            <Input size='lg' label='Name' />
            <Input size='lg' label='Email' />
          </div>

          <Button className='mt-6' fullWidth>
            Send Reset Password
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPassword;

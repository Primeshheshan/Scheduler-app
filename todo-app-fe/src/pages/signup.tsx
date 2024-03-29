import axios from '@/api/axios';
import AlertPopup from '@/components/alert';
import ErrorMessage from '@/components/errorMessage';
import useAlert from '@/hooks/alert.hook';
import { Color } from '@/types/alert-color';
import {
  Button,
  Card,
  Checkbox,
  Input,
  Typography,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

const SingUpPage = () => {
  const router = useRouter();
  const { openAlert, alert, showAlert, setOpenAlert } = useAlert();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phoneNumber: Yup.string()
      .max(12, 'Phone number is too long - should be 12 maximum')
      .min(12, 'Phone number is too short - should be 12 minimum'),
    password: Yup.string()
      .required('Password is required')
      .min(4, 'Password is too short - should be 8 chars minimum'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phoneNumber: 0,
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values: {
      name: string;
      email: string;
      phoneNumber: number;
      password: string;
    }) => {
      try {
        const response = await axios.post(
          'auth/register',
          JSON.stringify({
            name: values.name,
            username: values.email,
            password: values.password,
            phoneNumber: values.phoneNumber,
          }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (response) {
          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          const username = values.email.split('@')[0];
          localStorage.setItem('username', username);
          router.push('/');
        }
      } catch (error: any) {
        const { message } = error.response.data;
        showAlert('Account creation failed!', `${message}`, 'red');
      }

      formik.resetForm();
    },
  });

  return (
    <>
      <div className='flex justify-center my-16'>
        <Card className='p-6'>
          <Typography variant='h4' color='blue-gray'>
            Sign Up
          </Typography>
          <Typography color='gray' className='mt-1 font-normal'>
            Enter your details to register.
          </Typography>
          <form
            onSubmit={formik.handleSubmit}
            className='mt-4 mb-2 w-80 max-w-screen-lg sm:w-96'
          >
            <div className='mb-4 flex flex-col gap-6'>
              <div>
                <Input
                  id='name'
                  size='lg'
                  label='Name'
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik?.errors.name ? true : false}
                  className='focus:ring-0'
                />
                <ErrorMessage message={formik.errors.name} />
              </div>

              <div>
                <Input
                  id='email'
                  size='lg'
                  label='Email'
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik?.errors.email ? true : false}
                  className='focus:ring-0'
                />
                <ErrorMessage message={formik.errors.email} />
              </div>

              <div>
                <Input
                  id='phoneNumber'
                  size='lg'
                  label='Phone Number'
                  required
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  error={formik?.errors.phoneNumber ? true : false}
                  className='focus:ring-0'
                />
                <ErrorMessage message={formik.errors.phoneNumber} />
              </div>

              <div>
                <Input
                  id='password'
                  type='password'
                  size='lg'
                  label='Password'
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={formik.errors.password ? true : false}
                  className='focus:ring-0'
                />
                <ErrorMessage message={formik.errors.password} />
              </div>
            </div>

            <Checkbox
              className='focus:ring-0'
              label={
                <Typography
                  variant='small'
                  color='gray'
                  className='flex items-center font-normal'
                >
                  I agree the
                  <a
                    href='#'
                    className='font-medium transition-colors hover:text-blue-500'
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: '-ml-2.5' }}
            />
            <Button className='mt-6' fullWidth type='submit'>
              Register
            </Button>
            <Typography color='gray' className='mt-4 text-center font-normal'>
              Already have an account?{' '}
              <Link
                href='/login'
                className='font-medium text-blue-500 transition-colors hover:text-blue-700'
              >
                Sign In
              </Link>
            </Typography>
          </form>
        </Card>
      </div>
      <AlertPopup
        open={openAlert}
        setOpen={setOpenAlert}
        message={alert.message}
        description={alert.description}
        color={alert.color as Color}
      />
    </>
  );
};

export default SingUpPage;

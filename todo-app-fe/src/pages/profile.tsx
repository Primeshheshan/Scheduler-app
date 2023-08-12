import axiosInstance from '@/api/axios';
import ErrorMessage from '@/components/errorMessage';
import OTPDialog from '@/components/otp-dialog';
import useAlert from '@/hooks/alert.hook';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

type User = {
  username: string;
  name: string;
  phoneNumber: number;
};

export default function CheckoutForm() {
  const [type, setType] = React.useState('profile');
  const { openAlert, alert, showAlert, setOpenAlert } = useAlert();
  const accessToken = useRef<string | null>('');
  const username = useRef<string | null>('');
  const [openDialog, setOpenDialog] = useState(false);
  const [phoneNumberVerified, setPhoneNumberVerified] = useState(false);
  const [user, setUser] = useState<User>({
    username: '',
    name: '',
    phoneNumber: 0,
  });
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const SignupSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string()
      .max(12, 'Phone number is too long - should be 12 maximum')
      .min(12, 'Phone number is too short - should be 12 minimum'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user?.name,
      phoneNumber: user?.phoneNumber,
    },
    validationSchema: SignupSchema,
    onSubmit: async (values: { name: string; phoneNumber: number }) => {
      try {
        const response = await axiosInstance.put(
          'user/profile',
          JSON.stringify({
            name: values.name,
            phoneNumber: values.phoneNumber,
          }),
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken.current}`,
            },
          }
        );
        if (response) {
          console.log(response);
        }
      } catch (error: any) {
        const { message } = error.response.data;
        showAlert('Account creation failed!', `${message}`, 'red');
      }
      getProfile();
      formik.resetForm();
    },
  });

  useEffect(() => {
    accessToken.current = localStorage.getItem('accessToken') ?? '';
    username.current = localStorage.getItem('username') ?? '';
  }, []);

  const getProfile = useCallback(async () => {
    const response = await axiosInstance.get('user/profile', {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${accessToken.current}`,
      },
    });
    setUser(response?.data.user);
    setPhoneNumberVerified(
      response?.data?.user?.isPhoneNumberVerified ?? false
    );
  }, []);

  useEffect(() => {
    getProfile();
  }, [getProfile]);

  const handleVerifyContactNumber = () => setOpenDialog(!openDialog);

  return (
    <div className='flex justify-center mt-8 p-6'>
      <Card className='w-full max-w-[28rem] '>
        <CardHeader
          color='blue'
          floated={false}
          shadow={false}
          className='m-0 grid place-items-center rounded-b-none py-4 px-4 text-center'
        >
          <Avatar src='/profile.jpg' alt='avatar' className='w-24 h-24' />
          <Typography variant='h4' color='white'>
            {username.current ?? ''}
          </Typography>
        </CardHeader>
        <CardBody>
          <Tabs value={type} className='overflow-visible'>
            <TabsHeader className='relative z-0 '>
              <Tab value='profile' onClick={() => setType('profile')}>
                Profile
              </Tab>
              <Tab
                value='updateProfile'
                onClick={() => setType('updateProfile')}
              >
                Update Profile
              </Tab>
            </TabsHeader>
            <TabsBody
              className='h-full'
              animate={{
                initial: {
                  x: type === 'profile' ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === 'profile' ? 400 : -400,
                },
              }}
            >
              <TabPanel value='profile' className='p-0 flex justify-center'>
                <form className='my-10 w-72 max-w-screen-lg sm:w-96'>
                  <div className='mb-4 flex flex-col gap-9'>
                    <div>
                      <Input
                        id='name'
                        size='lg'
                        label='Name'
                        value={user?.name ?? ''}
                        disabled
                        className='focus:ring-0'
                      />
                    </div>

                    <div>
                      <Input
                        id='email'
                        size='lg'
                        label='Email'
                        value={user?.username ?? ''}
                        disabled
                        className='focus:ring-0'
                      />
                    </div>

                    <div>
                      <Input
                        id='phoneNumber'
                        size='lg'
                        label='Phone Number'
                        value={user?.phoneNumber ?? 0}
                        disabled
                        className='focus:ring-0'
                      />
                    </div>
                  </div>
                </form>
              </TabPanel>
              <TabPanel value='updateProfile' className='p-0'>
                <form
                  onSubmit={formik.handleSubmit}
                  className='my-10 w-72 max-w-screen-lg sm:w-96'
                >
                  <div className='mb-4 flex flex-col gap-6'>
                    <div>
                      <Input
                        id='name'
                        size='lg'
                        label='Name'
                        onChange={formik.handleChange}
                        value={formik?.values.name ?? ''}
                        error={formik?.errors.name ? true : false}
                        className='focus:ring-0'
                      />
                      <ErrorMessage message={formik.errors.name} />
                    </div>

                    <div className='relative flex w-full max-w-[24rem]'>
                      <Input
                        id='phoneNumber'
                        size='lg'
                        label='Phone Number'
                        required
                        onChange={formik.handleChange}
                        value={formik.values.phoneNumber ?? 0}
                        error={formik?.errors.phoneNumber ? true : false}
                        className='focus:ring-0'
                      />
                      {!phoneNumberVerified ? (
                        <Button
                          onClick={handleVerifyContactNumber}
                          size='sm'
                          color={'green'}
                          className='!absolute right-1 top-1.5 rounded'
                        >
                          Verify
                        </Button>
                      ) : (
                        <Button
                          size='sm'
                          disabled
                          color={'green'}
                          className='!absolute right-1 top-1.5 rounded'
                        >
                          Verified
                        </Button>
                      )}
                      <ErrorMessage message={formik.errors.phoneNumber} />
                    </div>
                  </div>

                  <Button className='mt-6' fullWidth type='submit'>
                    update
                  </Button>
                </form>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
      <OTPDialog
        openDialog={openDialog}
        handler={handleVerifyContactNumber}
        phoneNumber={`${formik.values.phoneNumber}`}
        verified={setPhoneNumberVerified}
      />
    </div>
  );
}

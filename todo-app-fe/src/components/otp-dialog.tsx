import axiosInstance from '@/api/axios';
import useAlert from '@/hooks/alert.hook';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from '@material-tailwind/react';
import {} from 'postcss';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import AlertPopup from './alert';
import { Color } from '@/types/alert-color';

interface IOTPDialog {
  openDialog: boolean;
  phoneNumber: string;
  handler: () => void;
  verified: Dispatch<SetStateAction<boolean>>;
}

const OTPDialog = ({
  openDialog,
  handler,
  phoneNumber,
  verified,
}: IOTPDialog) => {
  const accessToken = useRef<string | null>('');
  const { openAlert, alert, showAlert, setOpenAlert } = useAlert();

  useEffect(() => {
    accessToken.current = localStorage.getItem('accessToken') ?? '';
  }, []);

  const [otpValue, setOtp] = useState('');
  const handleSendOTP = async () => {
    try {
      const response = await axiosInstance.post(
        'user/send-otp',
        JSON.stringify({
          phoneNumber,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken.current}`,
          },
        }
      );
      if (response) {
        const { message } = response.data;
        if (message === 'pending')
          showAlert('OTP send successfully!', '', 'green');
      }
    } catch (error) {
      showAlert(
        'OTP sending unsuccessful',
        'Something went wrong please try again!',
        'red'
      );
    }
  };

  const handleOTP = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleValidateOTP = async () => {
    try {
      const response = await axiosInstance.post(
        'user/verify-otp',
        JSON.stringify({
          otp: otpValue,
          phoneNumber,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken.current}`,
          },
        }
      );
      if (response) {
        const { message } = response.data;
        if (message === 'approved') {
          showAlert('OTP verified successfully!', '', 'green');
          verified(true);
        }
      }
    } catch (error) {
      showAlert(
        'OTP verifing unsuccessful',
        'Something went wrong please try again!',
        'red'
      );
    }
    handler();
  };
  return (
    <>
      <Dialog
        size='xs'
        open={openDialog}
        handler={handler}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Verify Phone Number</DialogHeader>
        <DialogBody divider className='flex justify-center'>
          <div className='relative flex w-full max-w-[24rem]'>
            <Input
              id='otp'
              size='lg'
              label='OTP'
              onChange={handleOTP}
              value={otpValue}
              className='focus:ring-0'
            />
            <Button
              onClick={handleSendOTP}
              size='sm'
              color={'green'}
              className='!absolute right-1 top-1.5 rounded'
            >
              send OTP
            </Button>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button variant='text' color='red' onClick={handler} className='mr-1'>
            <span>Cancel</span>
          </Button>
          <Button variant='gradient' color='green' onClick={handleValidateOTP}>
            <span>Validate</span>
          </Button>
        </DialogFooter>
      </Dialog>
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

export default OTPDialog;

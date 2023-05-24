import { useEffect, useState } from 'react';
import { Alert, Button } from '@material-tailwind/react';
import { Color } from '@/types/alert-color';

interface IAlertPopupProps {
  message: string;
  description: string;
  color: Color;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AlertPopup = ({
  message,
  open,
  setOpen,
  description,
  color,
}: IAlertPopupProps) => {
  return (
    <Alert
      className='absolute w-fit bottom-2.5 right-2.5'
      open={open}
      onClose={() => setOpen(false)}
      color={color}
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
    >
      <div className='font-semibold'>{message}</div>
      <div className='block'>{description}</div>
    </Alert>
  );
};

export default AlertPopup;

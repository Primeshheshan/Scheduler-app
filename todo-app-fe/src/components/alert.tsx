import { Color } from '@/types/alert-color';
import { Alert } from '@material-tailwind/react';
import { useEffect } from 'react';

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
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [open, setOpen]);

  return (
    <Alert
      className='fixed w-fit bottom-2.5 right-2.5'
      open={open}
      onClose={() => setOpen(false)}
      color={color}
      animate={{
        mount: { y: 0 },
        unmount: { y: 100 },
      }}
    >
      <div className='text-sm'>
        <div className='font-semibold '>{message}</div>
        {description && <span className='block'>{description}</span>}
      </div>
    </Alert>
  );
};

export default AlertPopup;

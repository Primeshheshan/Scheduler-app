import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import AlertPopup from '@/components/alert';
import { Color } from '@/types/alert-color';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [openAlert, setOpenAlert] = useState(false);

  const [alert, setAlert] = useState({
    message: '',
    description: '',
    color: '',
  });

  useEffect(() => {
    setOpenAlert(true);
    setAlert({
      message: 'User created successfully!',
      description:
        'Congratulations, your account has been successfully created. Thank you for being awesome!',
      color: 'green',
    });
  }, []);

  return (
    <div>
      <AlertPopup
        open={openAlert}
        setOpen={setOpenAlert}
        message={alert.message}
        description={alert.description}
        color={alert.color as Color}
      />
    </div>
  );
}

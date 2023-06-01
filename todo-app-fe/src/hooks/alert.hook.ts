import { useState } from 'react';

interface Alert {
  message: string;
  description: string;
  color: string;
}

const useAlert = () => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState<Alert>({
    message: '',
    description: '',
    color: '',
  });

  const showAlert = (message: string, description: string, color: string) => {
    setOpenAlert(true);
    setAlert({
      message,
      description,
      color,
    });
  };

  return { openAlert, alert, showAlert, setOpenAlert };
};

export default useAlert;

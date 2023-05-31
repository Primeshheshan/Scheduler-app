import AlertPopup from '@/components/alert';
import ErrorMessage from '@/components/errorMessage';
import { Color } from '@/types/alert-color';
import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import axios from 'axios';
import { useFormik } from 'formik';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: '',
    description: '',
    color: 'red',
  });

  const addNewTaskValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: addNewTaskValidationSchema,
    onSubmit: async ({ title, description }) => {
      try {
        await axios.post(`http://localhost:8080/api/v1/todo`, {
          title,
          description,
        });
        setOpenAlert(true);
        setAlert({
          message: 'Task created successfully!',
          description: '',
          color: 'green',
        });
      } catch (error) {
        setOpenAlert(true);
        setAlert({
          message: 'Task creation failed!',
          description: 'Opps something went wrong, please try again!',
          color: 'red',
        });
      }
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      localStorage.setItem('isLoggedIn', 'true');
      setOpenAlert(true);
      setAlert({
        message: 'User created successfully!',
        description:
          'Congratulations, your account has been successfully created. Thank you for being awesome!',
        color: 'green',
      });
    }
  }, []);
  return (
    <>
      <div className='mx-auto max-w-screen-md py-12'>
        <Card className='mb-12 p-5'>
          <Typography variant='h4' color='blue-gray' className='mb-5'>
            New Todo
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <div>
              <Input
                id='title'
                name='title'
                label='Title'
                required
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.errors.title ? true : false}
              />
              <ErrorMessage message={formik.errors.title} />
            </div>
            <Textarea
              id='description'
              className='focus:ring-0'
              label='Description'
              containerProps={{ className: 'mt-3' }}
              onChange={formik.handleChange}
              value={formik.values.description}
              error={formik.errors.description ? true : false}
            />
            <div className='flex justify-center'>
              <Button className='mt-3 w-80' type='submit'>
                Add
              </Button>
            </div>
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
}

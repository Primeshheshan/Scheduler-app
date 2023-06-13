import axios from '@/api/axios';
import AlertPopup from '@/components/alert';
import ErrorMessage from '@/components/errorMessage';
import TodoTist from '@/components/todoList';
import { TodoStatus } from '@/enums/todo.enums';
import useAlert from '@/hooks/alert.hook';
import useDeleteTodo from '@/hooks/delete-todo.hook';
import useDoneTodo from '@/hooks/done-todo.hook';
import { RootState } from '@/redux';
import { storeUsername } from '@/redux/auth.slice';
import {
  decrementDoneCount,
  decrementImporgressCount,
  incrementDoneByAmount,
  incrementDoneCount,
  incrementImporgressCount,
  incrementInprogressByAmount,
} from '@/redux/todoCount.slice';
import { Color } from '@/types/alert-color';
import { ITodoObject } from '@/types/todo-object';
import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import { Inter } from 'next/font/google';
import { GetStaticProps } from 'next/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [todosArray, setTodos] = useState<ITodoObject[]>([]);
  const isFetchedData = useRef(false);
  const isLoggedIn = useRef(false);

  const dispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootState) => state.authStore.accessToken
  );

  const { openAlert, alert, showAlert, setOpenAlert } = useAlert();
  const { deleteTodo } = useDeleteTodo();
  const { doneTodo } = useDoneTodo();

  const fetchTodoCount = useCallback(async () => {
    try {
      const response = await axios.get('todo/count', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { doneCount, inProgressCount } = response.data;
      dispatch(incrementInprogressByAmount(inProgressCount));
      dispatch(incrementDoneByAmount(doneCount));
    } catch (error) {
      console.log(error);
    }
  }, [accessToken, dispatch]);

  const addNewTaskValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get('todo', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const { allTodos } = response.data;
      setTodos(allTodos);
    } catch (error) {
      if (!accessToken) {
        showAlert('Please login using username and password!', '', 'red');
      } else {
        showAlert(
          'Task fetching failed!',
          'Opps something went wrong, please try again!',
          'red'
        );
      }
    }
  }, [accessToken, showAlert]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: addNewTaskValidationSchema,
    onSubmit: async ({ title, description }) => {
      try {
        await addTodo(title, description);
        dispatch(incrementImporgressCount());
      } catch (error) {
        showAlert(
          'Task creation failed!',
          'Opps something went wrong, please try again!',
          'red'
        );
      }
      formik.resetForm();
    },
  });

  const addTodo = async (title: string, description: string) => {
    try {
      const response = await axios.post(
        'todo',
        JSON.stringify({
          title,
          description,
          status: TodoStatus.IN_PROGRESS,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 201) {
        showAlert('Task created successfully!', '', 'green');
      }
      await fetchTodos();
    } catch (error) {
      showAlert(
        'Task adding failed!',
        'Opps something went wrong, please try again!',
        'red'
      );
    }
  };

  const handleDeleteTodo = async (id: string, status: string) => {
    try {
      await deleteTodo(id);
      await fetchTodos();
      if (status === TodoStatus.IN_PROGRESS) {
        dispatch(decrementImporgressCount());
      } else {
        dispatch(decrementDoneCount());
      }
    } catch (error) {
      showAlert(
        'Task deleting failed!',
        'Opps something went wrong, please try again!',
        'red'
      );
    }
  };

  const handleDoneTodo = async (id: string) => {
    try {
      await doneTodo(id);
      await fetchTodos();
      dispatch(decrementImporgressCount());
      dispatch(incrementDoneCount());
    } catch (error) {
      showAlert(
        'Task status change failed!',
        'Opps something went wrong, please try again!',
        'red'
      );
    }
  };

  useEffect(() => {
    if (!isFetchedData.current) {
      fetchTodos();
      fetchTodoCount();
    }
    isFetchedData.current = true;
  }, [fetchTodos, fetchTodoCount]);

  return (
    <>
      <div className='md:mx-auto max-w-screen-md py-12 mx-2'>
        <div className='relative q-full max-q-lg top-52'>
          <div className='absolute top-0 -left-2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob'></div>
          <div className='absolute top-0 right-64 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000'></div>
          <div className='absolute top-20 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000'></div>
        </div>
        <Card className='p-5'>
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
      {todosArray?.length ? (
        todosArray.map((todo) => (
          <TodoTist
            key={todo._id}
            id={todo._id}
            title={todo.title}
            description={todo.description}
            status={todo.status}
            onDeleteHandler={handleDeleteTodo}
            onDoneHandler={handleDoneTodo}
          />
        ))
      ) : (
        <Typography
          variant='lead'
          color='blue-gray'
          className='mb-5 text-center'
        >
          No Todos
        </Typography>
      )}
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

import AlertPopup from '@/components/alert';
import ErrorMessage from '@/components/errorMessage';
import TodoTist from '@/components/todoList';
import { TodoStatus } from '@/enums/todo.enums';
import useAlert from '@/hooks/alert.hook';
import useDeleteTodo from '@/hooks/delete-todo.hook';
import useFetchTodos from '@/hooks/fetch-todos.hook';
import { Color } from '@/types/alert-color';
import { ITodoObject } from '@/types/todo-object';
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
  const [todosArray, setTodos] = useState<ITodoObject[]>([]);
  const { openAlert, alert, showAlert, setOpenAlert } = useAlert();

  const { todos, error, fetchTodos } = useFetchTodos();
  const { deleteTodo } = useDeleteTodo();

  const addNewTaskValidationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
  });

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      localStorage.setItem('isLoggedIn', 'true');
      showAlert(
        'User created successfully!',
        'Congratulations, your account has been successfully created. Thank you for being awesome!',
        'green'
      );
    }
  }, []);

  useEffect(() => {
    setTodos(todos);
    if (error) {
      showAlert(
        'Task fetching failed!',
        'Opps something went wrong, please try again!',
        'red'
      );
    }
  }, [error, showAlert, todos]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
    },
    validationSchema: addNewTaskValidationSchema,
    onSubmit: async ({ title, description }) => {
      try {
        await addTodo(title, description);
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
    const response = await axios.post('http://localhost:8080/api/v1/todo', {
      title,
      description,
      status: TodoStatus.IN_PROGRESS,
    });
    if (response.status === 201) {
      showAlert('Task created successfully!', '', 'green');
    }
    await fetchTodos();
    if (error) throw error;
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      await fetchTodos();
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
      const response = await axios.put(
        `http://localhost:8080/api/v1/todo/${id}`,
        {
          status: TodoStatus.DONE,
        }
      );
      if (response.status === 200) {
        await fetchTodos();
      }
    } catch (error) {
      showAlert(
        'Task status change failed!',
        'Opps something went wrong, please try again!',
        'red'
      );
    }
  };

  return (
    <>
      <div className='md:mx-auto max-w-screen-md py-12 mx-2'>
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
      {todosArray.length ? (
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

import axiosInstance from '@/api/axios';
import AlertPopup from '@/components/alert';
import TodoTist from '@/components/todoList';
import useAlert from '@/hooks/alert.hook';
import useDeleteTodo from '@/hooks/delete-todo.hook';
import { RootState } from '@/redux';
import { decrementDoneCount } from '@/redux/todoCount.slice';
import { Color } from '@/types/alert-color';
import { ITodoObject } from '@/types/todo-object';
import { Typography } from '@material-tailwind/react';
import axios, { CancelToken } from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Completed = () => {
  const [todosArray, setTodos] = useState<ITodoObject[]>([]);
  const { deleteTodo } = useDeleteTodo();
  const { openAlert, alert, showAlert, setOpenAlert } = useAlert();

  const dispatch = useDispatch();
  const accessToken = useRef<string | null>('');

  useEffect(() => {
    accessToken.current = localStorage.getItem('accessToken');
  }, []);

  const fetchDoneTodos = useCallback(
    async (cancelToken: CancelToken | undefined) => {
      try {
        const response = await axiosInstance.get('todo/done', {
          cancelToken,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken.current}`,
          },
        });
        const { doneTodos } = response.data;
        setTodos(doneTodos);
      } catch (error) {
        if (!accessToken.current) {
          showAlert('Please login using username and password!', '', 'red');
        } else {
          showAlert(
            'Task fetching failed!',
            'Opps something went wrong, please try again!',
            'red'
          );
        }
      }
    },
    [accessToken, showAlert]
  );

  useEffect(() => {
    const axiosCancelToken = axios.CancelToken.source();
    fetchDoneTodos(axiosCancelToken.token);
    return () => {
      axiosCancelToken.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      dispatch(decrementDoneCount());
      await fetchDoneTodos(undefined);
    } catch (error) {
      showAlert(
        'Task deleting failed!',
        'Opps something went wrong, please try again!',
        'red'
      );
    }
  };

  return (
    <>
      <div className='pt-12'>
        {todosArray?.length ? (
          todosArray.map((todo) => (
            <TodoTist
              key={todo._id}
              id={todo._id}
              title={todo.title}
              description={todo.description}
              status={todo.status}
              onDeleteHandler={handleDeleteTodo}
              onDoneHandler={() => {}}
            />
          ))
        ) : (
          <Typography
            variant='lead'
            color='blue-gray'
            className='mb-5 text-center'
          >
            No Done Todos
          </Typography>
        )}
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

export default Completed;

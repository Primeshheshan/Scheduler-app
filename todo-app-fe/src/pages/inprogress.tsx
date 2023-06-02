import AlertPopup from '@/components/alert';
import TodoTist from '@/components/todoList';
import useAlert from '@/hooks/alert.hook';
import useDeleteTodo from '@/hooks/delete-todo.hook';
import useDoneTodo from '@/hooks/done-todo.hook';
import {
  decrementImporgressCount,
  incrementDoneCount,
} from '@/redux/todoCount.slice';
import { Color } from '@/types/alert-color';
import { ITodoObject } from '@/types/todo-object';
import { Typography } from '@material-tailwind/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const InProgress = () => {
  const [todosArray, setTodos] = useState<ITodoObject[]>([]);

  const { doneTodo } = useDoneTodo();
  const { deleteTodo } = useDeleteTodo();
  const { openAlert, alert, showAlert, setOpenAlert } = useAlert();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchInprogressTodos();
  }, []);

  const fetchInprogressTodos = async () => {
    const response = await axios.get(
      `http://localhost:8080/api/v1/todo/inprogress`
    );
    const { inProgressTodos } = response.data;
    setTodos(inProgressTodos);
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      dispatch(decrementImporgressCount());
      await fetchInprogressTodos();
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
      dispatch(decrementImporgressCount());
      dispatch(incrementDoneCount());
      await fetchInprogressTodos();
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
      <div className='pt-12'>
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
            No In Progress Todos
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

export default InProgress;

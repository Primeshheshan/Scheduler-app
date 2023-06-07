import axios from '@/api/axios';
import AlertPopup from '@/components/alert';
import TodoTist from '@/components/todoList';
import useAlert from '@/hooks/alert.hook';
import useDeleteTodo from '@/hooks/delete-todo.hook';
import { decrementDoneCount } from '@/redux/todoCount.slice';
import { Color } from '@/types/alert-color';
import { ITodoObject } from '@/types/todo-object';
import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const Completed = () => {
  const [todosArray, setTodos] = useState<ITodoObject[]>([]);
  const { deleteTodo } = useDeleteTodo();
  const { openAlert, alert, showAlert, setOpenAlert } = useAlert();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchDoneTodos();
  }, []);

  const fetchDoneTodos = async () => {
    const response = await axios.get('todo/done');
    const { doneTodos } = response.data;
    setTodos(doneTodos);
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      await deleteTodo(id);
      dispatch(decrementDoneCount());

      await fetchDoneTodos();
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

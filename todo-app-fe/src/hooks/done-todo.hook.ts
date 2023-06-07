import axios from '@/api/axios';
import { TodoStatus } from '@/enums/todo.enums';

const useDoneTodo = () => {
  const doneTodo = async (id: string) => {
    try {
      await axios.put(`todo/${id}`, {
        status: TodoStatus.DONE,
      });
    } catch (error) {
      throw error;
    }
  };

  return { doneTodo };
};

export default useDoneTodo;

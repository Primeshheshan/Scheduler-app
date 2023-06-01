import { TodoStatus } from '@/enums/todo.enums';
import axios from 'axios';

const useDoneTodo = () => {
  const doneTodo = async (id: string) => {
    try {
      await axios.put(`http://localhost:8080/api/v1/todo/${id}`, {
        status: TodoStatus.DONE,
      });
    } catch (error) {
      throw error;
    }
  };

  return { doneTodo };
};

export default useDoneTodo;

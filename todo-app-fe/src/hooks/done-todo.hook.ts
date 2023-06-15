import axios from '@/api/axios';
import { TodoStatus } from '@/enums/todo.enums';
import { useEffect, useRef } from 'react';

const useDoneTodo = () => {
  const accessToken = useRef<string | null>('');

  useEffect(() => {
    accessToken.current = localStorage.getItem('accessToken');
  }, []);

  const doneTodo = async (id: string) => {
    try {
      await axios.put(
        `todo/${id}`,
        {
          status: TodoStatus.DONE,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken.current}`,
          },
        }
      );
    } catch (error) {
      throw error;
    }
  };

  return { doneTodo };
};

export default useDoneTodo;

import axios from '@/api/axios';
import { TodoStatus } from '@/enums/todo.enums';
import { RootState } from '@/redux';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const useDoneTodo = () => {
  const accessToken = useRef("");
 
  useEffect(() => {
    accessToken.current = localStorage.getItem('accessToken') ?? "";
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

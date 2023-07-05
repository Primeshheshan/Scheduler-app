import axios from '@/api/axios';
import { useEffect, useRef } from 'react';

const useDeleteTodo = () => {
  const accessToken = useRef("");

  useEffect(() => {
    accessToken.current = localStorage.getItem('accessToken') ?? "";
 }, []);

  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`todo/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken.current}`,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  return { deleteTodo };
};

export default useDeleteTodo;

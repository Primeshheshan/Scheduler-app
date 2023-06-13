import axios from '@/api/axios';
import { RootState } from '@/redux';
import { useSelector } from 'react-redux';

const useDeleteTodo = () => {
  const accessToken = useSelector(
    (state: RootState) => state.authStore.accessToken
  );
  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`todo/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      throw error;
    }
  };

  return { deleteTodo };
};

export default useDeleteTodo;

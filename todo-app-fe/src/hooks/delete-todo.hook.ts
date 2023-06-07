import axios from '@/api/axios';

const useDeleteTodo = () => {
  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`todo/${id}`);
    } catch (error) {
      throw error;
    }
  };

  return { deleteTodo };
};

export default useDeleteTodo;

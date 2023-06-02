import axios from 'axios';

const useDeleteTodo = () => {
  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/todo/${id}`);
    } catch (error) {
      throw error;
    }
  };

  return { deleteTodo };
};

export default useDeleteTodo;

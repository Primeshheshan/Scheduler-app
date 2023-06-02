import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchTodos = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fetchTodos();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/todo`);
      const { allTodos } = response.data;
      setTodos(allTodos);
    } catch (error) {
      setError(error as Error);
    }
  };

  return { todos, error, fetchTodos };
};

export default useFetchTodos;

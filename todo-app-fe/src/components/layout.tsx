import { ReactNode, useEffect, useState } from 'react';
import NavbarComponent from './navbar';
import axios from 'axios';

interface ILayout {
  children: ReactNode;
}

export default function Layout({ children }: ILayout) {
  const [doneCountState, setDoneCount] = useState(0);
  const [inProgressState, setInProgressCount] = useState(0);

  useEffect(() => {
    fetchTodoCount();
  }, []);

  const fetchTodoCount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/todo/count`
      );
      const { doneCount, inProgressCount } = response.data;
      setInProgressCount(inProgressCount);
      setDoneCount(doneCount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavbarComponent
        doneCount={doneCountState}
        inProgressCount={inProgressState}
      />
      <>{children}</>
    </>
  );
}

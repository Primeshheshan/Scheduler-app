import { ReactNode, useEffect, useRef, useState } from 'react';
import NavbarComponent from './navbar';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  incrementDoneByAmount,
  incrementInprogressByAmount,
} from '@/redux/todoCount.slice';

interface ILayout {
  children: ReactNode;
}

export default function Layout({ children }: ILayout) {
  const dispatch = useDispatch();
  const isFetchedData = useRef(false);

  const fetchTodoCount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/todo/count`
      );
      const { doneCount, inProgressCount } = response.data;
      dispatch(incrementInprogressByAmount(inProgressCount));
      dispatch(incrementDoneByAmount(doneCount));
      console.log(doneCount);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isFetchedData.current) {
      isFetchedData.current = true;
      fetchTodoCount();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavbarComponent />
      <>{children}</>
    </>
  );
}

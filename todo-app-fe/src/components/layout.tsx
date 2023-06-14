import { ReactNode } from 'react';
import NavbarComponent from './navbar';

interface ILayout {
  children: ReactNode;
}

export default function Layout({ children }: ILayout) {
  return (
    <>
      <NavbarComponent />
      <>{children}</>
    </>
  );
}

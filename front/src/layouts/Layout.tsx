import { FC, PropsWithChildren } from 'react';
import { Header } from '../components';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={'w-full flex flex-col'}>
      <div className={'fixed w-full z-50'}>
        <Header />
      </div>
      <main className={'mt-12 md:mt-16'}>{children}</main>
    </div>
  );
};

export default Layout;

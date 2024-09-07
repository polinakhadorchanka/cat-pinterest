import { FC, PropsWithChildren } from 'react';
import { Header } from '../components';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={'w-full flex flex-col'}>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;

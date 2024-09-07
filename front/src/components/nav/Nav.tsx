import { Button } from '../index.ts';
import { Link, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { ROUTES } from './types.ts';

const Nav = () => {
  const location = useLocation();
  const currentPath = useMemo(() => {
    return location.pathname;
  }, [location]);

  return (
    <div
      className={
        'w-full grid grid-cols-2 md:flex md:flex-row md:justify-start min-h-12 md:min-h-16'
      }>
      <Link to={ROUTES.ALL}>
        <Button
          isActive={currentPath === ROUTES.ALL}
          className={'w-full md:w-auto'}>
          Все котики
        </Button>
      </Link>
      <Link to={ROUTES.FAVORITES}>
        <Button
          isActive={currentPath === ROUTES.FAVORITES}
          className={'w-full md:w-auto'}>
          Любимые котики
        </Button>
      </Link>
    </div>
  );
};

export default Nav;

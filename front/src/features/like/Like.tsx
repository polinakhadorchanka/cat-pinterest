import { Cat } from '../../types/cat.ts';
import { FC, useMemo } from 'react';

interface LikeProps {
  cat: Cat;
}

const Like: FC<LikeProps> = () => {
  const isActive = useMemo(() => {
    return false;
  }, []);

  return (
    <div
      className={`absolute hidden group-hover:block cursor-pointer
      bottom-6 right-6 min-w-12 min-h-12 bg-no-repeat bg-center ${isActive ? 'bg-like_fill' : 'bg-like'} hover:bg-like_fill`}></div>
  );
};

export default Like;

import { FC } from 'react';

interface LikeProps {
  isActive: boolean;
}

const Like: FC<LikeProps> = ({ isActive }) => {
  return (
    <div
      className={`absolute hidden group-hover:block cursor-pointer
      bottom-6 right-6 min-w-12 min-h-12 bg-no-repeat bg-center ${isActive ? 'bg-like_fill' : 'bg-like'} hover:bg-like_fill`}></div>
  );
};

export default Like;

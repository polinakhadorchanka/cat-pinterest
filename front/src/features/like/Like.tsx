import { FC, useMemo } from 'react';

interface LikeProps {
  isActive: boolean;
  onActive?: () => void;
  onInactive?: () => void;
}

const Like: FC<LikeProps> = ({ isActive, onActive, onInactive }) => {
  const onClickAction = useMemo(() => {
    return isActive ? onInactive : onActive;
  }, [isActive]);

  return (
    <div
      onClick={onClickAction}
      className={`absolute hidden group-hover:block cursor-pointer
      bottom-6 right-6 min-w-12 min-h-12 bg-no-repeat bg-center 
      ${isActive ? 'bg-like_fill' : 'bg-like'} hover:bg-like_fill`}></div>
  );
};

export default Like;

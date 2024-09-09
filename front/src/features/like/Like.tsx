import { FC, useMemo } from 'react';

interface LikeProps {
  isActive: boolean;
  onActive?: () => void;
  onInactive?: () => void;
  className?: string;
}

const Like: FC<LikeProps> = ({ isActive, onActive, onInactive, className }) => {
  const onClickAction = useMemo(() => {
    return isActive ? onInactive : onActive;
  }, [isActive]);

  return (
    <div
      onClick={onClickAction}
      className={`min-w-12 min-h-12 bg-no-repeat bg-center 
      ${isActive ? 'bg-like_fill' : 'bg-like'} hover:bg-like_fill ${className}`}></div>
  );
};

export default Like;

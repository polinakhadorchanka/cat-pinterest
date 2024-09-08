import { FC } from 'react';
import { Cat } from '../../types/cat.ts';
import Like from '../like/Like.tsx';
interface CardProps {
  cat: Cat;
}

const Card: FC<CardProps> = ({ cat }) => {
  return (
    <div
      className={
        'relative group bg-white ' +
        'hover:transition-all hover:shadow-box hover:scale-105 sm:hover:scale-110 duration-150'
      }>
      <img
        className={'w-full h-[225px] object-cover object-center'}
        src={cat.url}
        alt={cat.url}
      />

      <Like />
    </div>
  );
};

export default Card;

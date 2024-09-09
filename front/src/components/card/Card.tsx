import { FC, useMemo } from 'react';
import { Cat } from '../../types/cat.ts';
import { Like } from '../../features';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { useActions } from '../../hooks/useActions.ts';

interface CardProps {
  cat: Cat;
}

const Card: FC<CardProps> = ({ cat }) => {
  const { addToFavorites, deleteFromFavorites } = useActions();
  const { user } = useTypedSelector((state) => state.user);
  const { favoritesIDs } = useTypedSelector((state) => state.favorites);

  const isActive = useMemo(() => {
    return cat && favoritesIDs.some((favorite) => favorite.catID === cat.id);
  }, [favoritesIDs]);

  const onActive = () => {
    user && addToFavorites({ token: user.token, cat });
  };

  const onInactive = () => {
    const favorite = favoritesIDs.find((favorite) => favorite.catID === cat.id);

    if (user && favorite)
      deleteFromFavorites({ token: user.token, favoriteID: favorite.id });
  };

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

      <Like isActive={isActive} onActive={onActive} onInactive={onInactive} />
    </div>
  );
};

export default Card;

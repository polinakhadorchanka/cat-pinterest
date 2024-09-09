import { FC, useMemo, useState } from 'react';
import { Cat } from '../../types/cat.ts';
import { Like } from '../../features';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { useActions } from '../../hooks/useActions.ts';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface CardProps {
  cat: Cat;
}

const Card: FC<CardProps> = ({ cat }) => {
  const { addToFavorites, deleteFromFavorites } = useActions();
  const { user } = useTypedSelector((state) => state.user);
  const { favoritesIDs } = useTypedSelector((state) => state.favorites);

  const [isImgLoaded, setIsImgLoaded] = useState<Boolean>(false);

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

  const onLoadImg = () => {
    setIsImgLoaded(true);
  };

  return (
    <div className={'relative'}>
      <Skeleton
        baseColor={'#f4f4f4'}
        highlightColor={'#fafafa'}
        containerClassName={'absolute -top-[3px] left-0 w-full'}
        className={`w-full h-full sm:h-[184px] md:h-[203px] lg:h-[189px] xl:h-[253px] 2xl:h-[225px] ${isImgLoaded ? 'hidden' : 'block'}`}
      />
      <div
        className={
          'group relative w-full h-full sm:h-[184px] md:h-[203px] lg:h-[189px] xl:h-[253px] 2xl:h-[225px] bg-white ' +
          'hover:transition-all hover:shadow-box hover:scale-105 md:hover:scale-110 duration-1000 ' +
          `transition-opacity duration-150 ${isImgLoaded ? 'opacity-100' : 'opacity-0'}`
        }>
        <LazyLoadImage
          className={
            'w-full h-full sm:h-[184px] md:h-[203px] lg:h-[189px] xl:h-[253px] 2xl:h-[225px] object-cover object-center'
          }
          src={cat.url}
          alt={cat.url}
          onLoad={onLoadImg}
        />
        <Like
          className={
            'absolute hidden group-hover:block cursor-pointer bottom-5 right-5 xl:bottom-6 xl:right-6'
          }
          isActive={isActive}
          onActive={onActive}
          onInactive={onInactive}
        />
      </div>
    </div>
  );
};

export default Card;

import Layout from '../../layouts/Layout.tsx';
import { useActions } from '../../hooks/useActions.ts';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { useEffect, useMemo, useState } from 'react';
import CatList from '../../components/catList/CatList.tsx';

const Favorites = () => {
  const LIMIT = 15;
  const [currentLength, setCurrentLength] = useState<number>(0);

  const { getFavorites, favoritePageInc } = useActions();
  const { user } = useTypedSelector((state) => state.user);
  const { favorites, page, pageCount, isProcessing } = useTypedSelector(
    (state) => state.favorites,
  );

  const cats = useMemo(() => {
    return favorites.map((favorite) => favorite.cat);
  }, [favorites]);

  useEffect(() => {
    if (user) getFavorites({ token: user.token, page: page, limit: LIMIT });
  }, [user, page]);

  useEffect(() => {
    if (
      cats.length > 0 &&
      cats.length >= currentLength &&
      document.documentElement.scrollHeight <= screen.height
    ) {
      setCurrentLength(cats.length);
      nextPage();
    } else setCurrentLength(cats.length);
  }, [cats.length]);

  const nextPage = () => {
    favoritePageInc();
  };

  return (
    <Layout>
      <div className={'container px-8 lg:px-[62px]'}>
        <CatList
          cats={cats}
          isProcessing={isProcessing}
          nextPage={nextPage}
          hasNextPage={!!(pageCount && page < pageCount)}
        />
      </div>
    </Layout>
  );
};

export default Favorites;

import Layout from '../../layouts/Layout.tsx';
import { useActions } from '../../hooks/useActions.ts';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { useEffect, useMemo, useState } from 'react';
import CatList from '../../components/catList/CatList.tsx';
import { LIMIT } from '../../types/constants.ts';

const Favorites = () => {
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
    if (cats.length !== currentLength) {
      setCurrentLength(cats.length);
    } else if (user && page === 0 && cats.length === 0) {
      getFavorites({ token: user.token, page: page, limit: LIMIT });
    }
  }, [user]);

  useEffect(() => {
    if (page === 0 && cats.length === 0) return;

    if (cats.length !== currentLength) {
      setCurrentLength(cats.length);
      return;
    }

    if (
      user &&
      page < pageCount - 1 &&
      document.documentElement.scrollHeight <= screen.height
    ) {
      nextPage();
    }
  }, [cats.length, currentLength]);

  const nextPage = () => {
    if (user) {
      getFavorites({ token: user.token, page: page + 1, limit: LIMIT });
      favoritePageInc();
    }
  };

  return (
    <Layout>
      <div className={'container px-8 lg:px-[62px]'}>
        <CatList
          cats={cats}
          isProcessing={isProcessing}
          nextPage={nextPage}
          hasNextPage={page < pageCount - 1}
        />
      </div>
    </Layout>
  );
};

export default Favorites;

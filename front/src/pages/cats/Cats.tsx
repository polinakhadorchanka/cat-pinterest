import Layout from '../../layouts/Layout.tsx';
import { useActions } from '../../hooks/useActions.ts';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { useEffect } from 'react';
import CatList from '../../components/catList/CatList.tsx';
import useScreenSize from '../../hooks/useScreenSize.ts';
import { LIMIT } from '../../types/constants.ts';

const Cats = () => {
  const screen = useScreenSize();

  const { getCats, getFavorites, catPageInc } = useActions();
  const { user } = useTypedSelector((state) => state.user);
  const { cats, ...catsState } = useTypedSelector((state) => state.cats);
  const { favorites, ...favoritesState } = useTypedSelector(
    (state) => state.favorites,
  );

  useEffect(() => {
    if (cats.length === 0) getCats({ page: catsState.page, limit: LIMIT });
  }, []);

  useEffect(() => {
    if (user && favorites.length === 0)
      getFavorites({
        token: user.token,
        page: favoritesState.page,
        limit: LIMIT,
      });
  }, [user]);

  useEffect(() => {
    if (
      cats.length > 0 &&
      document.documentElement.scrollHeight <= screen.height
    )
      nextPage();
  }, [cats.length]);

  const nextPage = () => {
    if (user) {
      getCats({ page: catsState.page + 1, limit: LIMIT });
      catPageInc();
    }
  };

  return (
    <Layout>
      <div className={'container px-8 lg:px-[62px]'}>
        <CatList
          cats={cats}
          isProcessing={catsState.isProcessing}
          nextPage={nextPage}
        />
      </div>
    </Layout>
  );
};

export default Cats;

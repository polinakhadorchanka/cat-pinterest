import Layout from '../../layouts/Layout.tsx';
import { useActions } from '../../hooks/useActions.ts';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { useEffect } from 'react';
import CatList from '../../components/catList/CatList.tsx';

const Cats = () => {
  const { getCats, getFavorites } = useActions();
  const { user } = useTypedSelector((state) => state.user);
  const { cats, ...catsState } = useTypedSelector((state) => state.cats);
  const { favorites, ...favoritesState } = useTypedSelector(
    (state) => state.favorites,
  );

  useEffect(() => {
    if (cats.length === 0) getCats({ page: catsState.page });
  }, []);

  useEffect(() => {
    if (user) getFavorites({ token: user.token, page: favoritesState.page });
  }, [user]);

  return (
    <Layout>
      <div className={'container'}>
        <CatList cats={cats} isProcessing={catsState.isProcessing} />
      </div>
    </Layout>
  );
};

export default Cats;

import Layout from '../../layouts/Layout.tsx';
import { useActions } from '../../hooks/useActions.ts';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { useEffect, useMemo } from 'react';
import CatList from '../../components/catList/CatList.tsx';

const Favorites = () => {
  const { getFavorites } = useActions();
  const { user } = useTypedSelector((state) => state.user);
  const { favorites, page, isProcessing } = useTypedSelector(
    (state) => state.favorites,
  );

  const cats = useMemo(() => {
    return favorites.map((favorite) => favorite.cat);
  }, [favorites]);

  useEffect(() => {
    if (user) getFavorites({ token: user.token, page: page });
  }, [user]);

  return (
    <Layout>
      <div className={'container'}>
        <CatList cats={cats} isProcessing={isProcessing} />
      </div>
    </Layout>
  );
};

export default Favorites;

import Layout from '../../layouts/Layout.tsx';
import { useActions } from '../../hooks/useActions.ts';
import { useTypedSelector } from '../../hooks/useTypedSelector.ts';
import { useEffect } from 'react';
import { Card } from '../../features';

const AllCats = () => {
  const { getCats } = useActions();
  const { cats, page, isProcessing, error } = useTypedSelector(
    (state) => state.cats,
  );

  useEffect(() => {
    getCats({ page });
  }, [page]);

  return (
    <Layout>
      <div className={'container mt-8 sm:mt-12'}>
        {isProcessing ? (
          <div className={'text-center font-roboto text-xs md:text-sm'}>
            ...загружаем еще котиков...
          </div>
        ) : (
          <div
            className={
              'grid grid-cols-1 px-8 gap-8 sm:grid-cols-2 sm:px-0 sm:gap-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
            }>
            {cats.map((cat) => (
              <Card key={cat.id} cat={cat} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllCats;

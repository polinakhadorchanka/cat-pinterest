import { Cat } from '../../types/cat.ts';
import { FC } from 'react';
import { Card } from '../index.ts';

interface CatListProps {
  cats: Cat[];
  isProcessing: boolean;
}

const CatList: FC<CatListProps> = ({ cats, isProcessing }) => {
  return (
    <>
      <div
        className={
          `pt-8 sm:pt-12 ${cats.length === 0 ? '' : 'pb-8 sm:pb-12 '} grid grid-cols-1 px-8 gap-8 ` +
          'sm:grid-cols-2 sm:px-0 sm:gap-12 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
        }>
        {cats.map((cat) => (
          <Card key={cat.id} cat={cat} />
        ))}
      </div>

      {isProcessing && (
        <div className={'text-center text-xs md:text-sm font-roboto'}>
          {cats.length === 0
            ? '...загружаем котиков...'
            : '...загружаем еще котиков...'}
        </div>
      )}
    </>
  );
};

export default CatList;

import { Cat } from '../../types/cat.ts';
import { FC } from 'react';
import { Card } from '../index.ts';
import InfiniteScroll from 'react-infinite-scroll-component';

interface CatListProps {
  cats: Cat[];
  isProcessing: boolean;
  nextPage?: () => void;
  hasNextPage?: boolean;
}

const CatList: FC<CatListProps> = ({
  cats,
  isProcessing,
  nextPage = () => {},
  hasNextPage = true,
}) => {
  return (
    <>
      <InfiniteScroll
        className={'overflow-visible-important'}
        dataLength={cats.length}
        next={nextPage}
        hasMore={hasNextPage}
        loader={<></>}
        refreshFunction={() => {}}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}>
        <div
          className={
            `pt-8 sm:pt-12 ${cats.length === 0 ? '' : 'pb-8 sm:pb-12 '} grid grid-cols-1 gap-8 ` +
            'sm:grid-cols-2 sm:px-0 sm:gap-12 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5'
          }>
          {cats.map((cat, index) => (
            <Card key={index + cat.id} cat={cat} />
          ))}
        </div>
      </InfiniteScroll>
      {isProcessing && (
        <div
          className={
            'mb-8 md:mb-12 text-center text-xs md:text-sm font-roboto'
          }>
          {cats.length === 0
            ? '...загружаем котиков...'
            : '...загружаем еще котиков...'}
        </div>
      )}
    </>
  );
};

export default CatList;

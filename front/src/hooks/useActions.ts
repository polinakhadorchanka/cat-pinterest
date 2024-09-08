import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actions as catsSliceActions } from '../store/cats/cats.slice.ts';
import * as catsActions from '../store/cats/cat.action.ts';

const rootActions = {
  ...catsSliceActions,
  ...catsActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};

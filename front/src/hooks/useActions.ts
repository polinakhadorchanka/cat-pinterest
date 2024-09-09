import { useDispatch } from 'react-redux';
import { useMemo } from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actions as catsSliceActions } from '../store/cats/cats.slice.ts';
import * as catsActions from '../store/cats/cat.action.ts';
import { actions as favoritesSliceActions } from '../store/favorites/favorites.slice.ts';
import * as favoritesActions from '../store/favorites/favorites.action.ts';
import { actions as userSliceActions } from '../store/user/user.slice.ts';
import * as userActions from '../store/user/user.action.ts';

const rootActions = {
  ...catsSliceActions,
  ...catsActions,
  ...favoritesSliceActions,
  ...favoritesActions,
  ...userSliceActions,
  ...userActions,
};

export const useActions = () => {
  const dispatch = useDispatch();

  return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
};

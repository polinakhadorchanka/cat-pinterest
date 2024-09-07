import { Route, Routes } from 'react-router-dom';
import AllCats from '../pages/allCats/AllCats.tsx';
import Favorites from '../pages/favorites/Favorites.tsx';

const RouteManager = () => {
  return (
    <Routes>
      <Route path={'/'} element={<AllCats />} />
      <Route path={'/favorites'} element={<Favorites />} />
    </Routes>
  );
};

export default RouteManager;

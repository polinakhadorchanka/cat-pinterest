import { Route, Routes } from 'react-router-dom';
import Cats from '../pages/cats/Cats.tsx';
import Favorites from '../pages/favorites/Favorites.tsx';

const RouteManager = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Cats />} />
      <Route path={'/favorites'} element={<Favorites />} />
    </Routes>
  );
};

export default RouteManager;

import RouteManager from '../router/RouteManager.tsx';
import { useActions } from '../hooks/useActions.ts';
import { useTypedSelector } from '../hooks/useTypedSelector.ts';
import { useEffect } from 'react';

function App() {
  const { setUser, getUser } = useActions();
  const { user } = useTypedSelector((state) => state.user);

  useEffect(() => {
    const storageToken = localStorage.getItem('token');

    if (!user && storageToken) setUser({ token: storageToken });

    if (!user && !storageToken) getUser();

    if (user && !storageToken) localStorage.setItem('token', user.token);
  }, [user]);

  return <RouteManager />;
}

export default App;

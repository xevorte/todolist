import * as PAGE from './pages';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import WebFont from 'webfontloader';
import Layout from './layout';
import './styles/_global.css';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const states = useSelector((state: any) => state);
  const isAuth = states.auth !== undefined || states.authLocked !== undefined;

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Poppins:400,500,600,700,800'],
      },
    });
  }, []);

  useEffect(() => {
    if (isAuth && location.pathname === '/login') {
      navigate('/');
    }

    if (!isAuth && location.pathname !== '/login') {
      navigate('/login');
    }
  }, [isAuth]);

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<PAGE.Home />} />
        <Route path='activity/:id' element={<PAGE.Activity />} />
      </Route>
      <Route path='/login' element={<PAGE.Login />} />
      <Route path='*' element={<PAGE.NotFound />} />
    </Routes>
  );
}

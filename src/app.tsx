import * as PAGE from './pages';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import WebFont from 'webfontloader';
import Layout from './layout';

import './styles/_global.css';
import { setAlertFailed } from './bootstraps/bootstrapActions';

function NotFound() {
  const dispatch = useDispatch();

  dispatch(setAlertFailed('Error'));
  setTimeout(() => {
    window.location.replace('/');
  }, 1000);

  return <></>;
};

export default function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Poppins:400,500,600,700,800']
      }
    })
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<PAGE.Home />} />
          <Route path='activity/:id' element={<PAGE.Activity />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

import * as COMPONENT from '../components';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <main className='font-poppins'>
      <COMPONENT.Header />
      <COMPONENT.AlertMessage />
      <div className='bg-light'>
        <Outlet />
      </div>
    </main>
  );
}

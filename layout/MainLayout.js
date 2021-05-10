import { Fragment } from 'react';
import Sidebar from '../components/Sidebar';

const MainLayout = ({ children }) => {
  return (
    <>
      <div className="w-full flex font-inter">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default MainLayout;

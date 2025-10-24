import React, { ReactNode } from 'react';
import SideMenu from './SideMenu';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <SideMenu />
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default Layout;

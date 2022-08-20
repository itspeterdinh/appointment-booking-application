import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import ToolBar from './ToolBar';

function PageLayout({ business }) {
  return (
    <>
      <Header business={business} />
      <ToolBar business={business} />
      <Outlet />
    </>
  );
}

export default PageLayout;

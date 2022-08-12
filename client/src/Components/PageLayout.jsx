import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import ToolBar from './ToolBar';

function PageLayout({ name, avatar }) {
  return (
    <>
      <Header name={name} avatar={avatar} />
      <ToolBar />
      <Outlet />
    </>
  );
}

export default PageLayout;

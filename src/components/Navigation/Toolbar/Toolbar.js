import React from 'react';
import Classes from './Toolbar.css';
// import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = props => (
  <header className={Classes.Toolbar}>
    <div onClick={props.showMenu} className={Classes.Menu}>
      Menu
    </div>
    {/* <nav className={Classes.DesktopOnly}>
      <NavigationItems />
    </nav> */}
  </header>
);

export default toolbar;

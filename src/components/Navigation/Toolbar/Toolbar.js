import React from 'react';
import Classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = props => (
  <header className={Classes.Toolbar}>
    <div>Menu</div>
    <div>Logo</div>
    <nav>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;

import React, { Fragment } from 'react';
import Classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = props => (
  <Fragment>
    <Toolbar />
    <main className={Classes.main}>{props.children}</main>
  </Fragment>
);

export default layout;

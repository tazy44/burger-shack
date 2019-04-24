import React, { Fragment } from 'react';
import Classes from './Layout.css';

const layout = props => (
  <Fragment>
    <div>Toolbar, Sidebar, Backdrop</div>
    <main className={Classes.main}>{props.children}</main>
  </Fragment>
);

export default layout;

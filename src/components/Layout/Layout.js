import React, { Fragment, Component } from 'react';
import Classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Sidedrawer from '../Navigation/SideDrawer/SideDrawer';
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <Fragment>
        <Toolbar showMenu={this.sideDrawerOpenHandler} />
        <Sidedrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={Classes.main}><BurgerBuilder /></main>
      </Fragment>
    );
  }
}

export default Layout;

import React from 'react';
import {
  CssBaseline,
} from '@material-ui/core';

import styles from './Rss.module.css';
import Sidebar from '../Sidebar/Sidebar';
import SourceView from '../../containers/SourceView/SourceView';
import Header from '../Header/Header';

interface State {
  isDrawerOpen: boolean;
}

export default class Rss extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      isDrawerOpen: true,
    };

    this.handleToggleDrawer = this.handleToggleDrawer.bind(this);
  }

  handleToggleDrawer() {
    this.setState((prevState) => ({ isDrawerOpen: !prevState.isDrawerOpen }));
  }

  render() {
    const { isDrawerOpen } = this.state;

    return (
      <>
        <CssBaseline />
        <Header isDrawerOpen={isDrawerOpen} onToggleDrawer={this.handleToggleDrawer} />
        <div className={styles.container}>
          <nav className={styles.nav} hidden={!isDrawerOpen}>
            <Sidebar onToggleDrawer={this.handleToggleDrawer} />
          </nav>
          <main className={styles.main}>
            <SourceView />
          </main>
        </div>
      </>
    );
  }
}

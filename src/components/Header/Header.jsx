import React from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core';
import { Menu as MenuIcon, PersonSharp as PersonSharpIcon } from '@material-ui/icons';

import styles from './Header.module.css';

export default class Header extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { isDrawerOpen, onToggleDrawer } = this.props;

    return (
      <AppBar position="fixed" className={`${isDrawerOpen ? `${styles.appBarShift} containerSidebarOffest` : ''} ${styles.appBar}`}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onToggleDrawer}
            edge="start"
            className={isDrawerOpen ? styles.hidden : ''}
          >
            <MenuIcon />
          </IconButton>
          <div className="grow" />
          <Typography variant="body1" className={styles.toolbarText}>
            Guest
          </Typography>
          <IconButton
            color="inherit"
            // aria-label="open drawer"
            // onClick={this.handleToggleDrawer}
            // className={isDrawerOpen ? styles.hidden : ''}
            edge="end"
          >
            <PersonSharpIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

import React from 'react';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Popper,
  Paper,
  ClickAwayListener,
} from '@material-ui/core';
import { Menu as MenuIcon, PersonSharp as PersonSharpIcon } from '@material-ui/icons';

import styles from './Header.module.css';

export default class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      anchorEl: null,
    };

    this.handlePopperOpen = this.handlePopperOpen.bind(this);
    this.handlePopperClose = this.handlePopperClose.bind(this);
  }

  handlePopperOpen(event) {
    this.setState({ anchorEl: event.currentTarget });
  }

  handlePopperClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { isDrawerOpen, onToggleDrawer } = this.props;
    const { anchorEl } = this.state;

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
            onClick={this.handlePopperOpen}
          >
            <PersonSharpIcon />
          </IconButton>
        </Toolbar>
        <Popper
          open={!!anchorEl}
          anchorEl={anchorEl}
          modifiers={{
            preventOverflow: {
              enabled: true,
              boundariesElement: 'scrollParent',
            },
          }}
          disablePortal
        >
          <ClickAwayListener onClickAway={this.handlePopperClose}>
            <Paper className={styles.popper}>
              <Typography>The content of the Popper.</Typography>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </AppBar>
    );
  }
}

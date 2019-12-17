/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Popper,
  Paper,
  ClickAwayListener,
  Link,
  Button,
} from '@material-ui/core';
import { Menu as MenuIcon, PersonSharp as PersonSharpIcon } from '@material-ui/icons';

import styles from './Header.module.css';

interface Props {
  isDrawerOpen: boolean;
  onToggleDrawer: React.MouseEventHandler<any>;
  isAuthorized: boolean;
  onLogout(): void;
  userEmail: string;
}

interface State {
  anchorEl: any;
}

export default class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      anchorEl: null,
    };

    this.handlePopperOpen = this.handlePopperOpen.bind(this);
    this.handlePopperClose = this.handlePopperClose.bind(this);
  }

  handlePopperOpen(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    this.setState({ anchorEl: event.currentTarget });
  }

  handlePopperClose() {
    this.setState({ anchorEl: null });
  }

  render() {
    const { isDrawerOpen, onToggleDrawer, isAuthorized, onLogout, userEmail } = this.props;
    const { anchorEl } = this.state;

    const signInLink = React.forwardRef((props, ref: React.Ref<HTMLAnchorElement>) => (
      <RouterLink innerRef={ref} to="/signin" {...props} />
    ));

    const signUpLink = React.forwardRef((props, ref: React.Ref<HTMLAnchorElement>) => (
      <RouterLink innerRef={ref} to="/signup" {...props} />
    ));

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
            {userEmail}
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
              {!isAuthorized ? (
                <>
                  <Typography gutterBottom>
                    You are not logged in. Please log in to keep your data.
                  </Typography>
                  <div className="flexBetween">
                    <Link component={signInLink}>Sign in</Link>
                    <Link component={signUpLink}>Sign Up</Link>
                  </div>
                </>
              ) : (
                  <div className="flexEnd">
                    <Button
                      onClick={() => { onLogout() }}
                      color="primary"
                    >
                      Logout
                  </Button>
                  </div>
                )}
            </Paper>
          </ClickAwayListener>
        </Popper>
      </AppBar>
    );
  }
}

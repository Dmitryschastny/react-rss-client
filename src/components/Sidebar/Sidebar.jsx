import React from 'react';
import {
  Drawer,
  IconButton,
  Divider,
} from '@material-ui/core';
import {
  ChevronLeft as ChevronLeftIcon,
} from '@material-ui/icons';

import SourcesList from '../../containers/SourcesList/SourcesList';
import styles from './Sidebar.module.css';

export default function Sidebar({ toggleDrawer, }) {
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      classes={{
        paper: styles.drawer,
      }}
    >
      <div className={`${styles.header} ${styles.materialToolbar}`}>
        <IconButton onClick={toggleDrawer} classes={{ root: styles.arrow }}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <SourcesList />
    </Drawer>
  );
}

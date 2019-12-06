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

interface Props {
  onToggleDrawer: React.MouseEventHandler<any>;
}

const Sidebar: React.FC<Props> = ({ onToggleDrawer, }) => {
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      classes={{
        paper: styles.drawer,
      }}
    >
      <div className={`${styles.header} ${styles.materialToolbar}`}>
        <IconButton onClick={onToggleDrawer} classes={{ root: styles.arrow }}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <SourcesList />
    </Drawer>
  );
}

export default Sidebar;

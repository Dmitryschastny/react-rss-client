import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@material-ui/core';
import {
  Add as AddIcon,
} from '@material-ui/icons';

import styles from './Sidebar.module.css';

export default function Sidebar({ sources, toggleDialog, selectedSourceId, onSourceClick }) {
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      classes={{
        paper: styles.drawer,
      }}
    >
      <List>
        <ListItem divider>
          <ListItemText primary="Your subscriptions" />
        </ListItem>
        <ListItem button selected={selectedSourceId === null} onClick={() => onSourceClick(null)}>
          <ListItemText primary="Show all" />
        </ListItem>
        {sources.map((item) => (
          <ListItem button key={item.id} selected={selectedSourceId === item.id} onClick={() => onSourceClick(item.id)}>
            <ListItemText primary={item.title} />
          </ListItem>
        ))}
        <ListItem button onClick={toggleDialog}>
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary="Add" />
        </ListItem>
      </List>
    </Drawer>
  );
}

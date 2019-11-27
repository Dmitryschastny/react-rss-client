import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Close as DeleteIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@material-ui/icons';

import styles from './Sidebar.module.css';

export default function Sidebar({
  sources,
  toggleAddDialog,
  toggleDeleteDialog,
  selectedSourceId,
  onSourceClick,
  toggleDrawer,
}) {
  return (
    <Drawer
      anchor="left"
      variant="permanent"
      classes={{
        paper: styles.drawer,
      }}
    >
      <div className={`${styles.header} ${styles.materialToolbar}`}>
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem divider>
          <ListItemText primary="Your subscriptions" />
        </ListItem>
        <ListItem button selected={selectedSourceId === null} onClick={() => onSourceClick(null)}>
          <ListItemText primary="Show all" />
        </ListItem>
        {sources.map((item) => (
          <ListItem
            button
            key={item.id}
            selected={selectedSourceId === item.id}
            onClick={() => onSourceClick(item.id)}
            classes={{
              container: styles.listItem,
            }}
          >
            <ListItemText primary={item.title} />
            <ListItemSecondaryAction onClick={() => toggleDeleteDialog(item.id)}>
              <DeleteIcon className={styles.deleteIcon} />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
        <ListItem button onClick={toggleAddDialog}>
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary="Add" />
        </ListItem>
      </List>
    </Drawer>
  );
}

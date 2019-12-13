import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@material-ui/core';
import {
  Add as AddIcon,
  Close as DeleteIcon,
} from '@material-ui/icons';

import styles from './SourcesList.module.css';
import { Source } from '../../store/sources/types';

interface Props {
  itemsById: {
    [key: string]: Source
  }
  selectedSourceId: number | null;
  onSourceClick(item: Source | null): void;
  toggleSourceAddDialog(): void;
  toggleSourceDeleteDialog(id: null | number): void;
}

const SourcesList: React.FC<Props> = ({
  itemsById,
  selectedSourceId,
  onSourceClick,
  toggleSourceAddDialog,
  toggleSourceDeleteDialog,
}) => (
    <>
      <List>
        <ListItem divider>
          <ListItemText primary="Your subscriptions" />
        </ListItem>
        <ListItem
          button
          selected={selectedSourceId === null}
          onClick={() => onSourceClick(null)}
        >
          <ListItemText primary="Show all" />
        </ListItem>
        {Object.keys(itemsById).map((key) => {
          const item = itemsById[key];

          return (
            <ListItem
              button
              key={key}
              selected={selectedSourceId === item.id}
              onClick={() => onSourceClick(item)}
              classes={{
                container: styles.listItem,
              }}
            >
              <ListItemText primary={item.title} />
              <ListItemSecondaryAction onClick={() => toggleSourceDeleteDialog(parseInt(key))}>
                <DeleteIcon className={styles.deleteIcon} />
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
        <ListItem button onClick={toggleSourceAddDialog}>
          <ListItemIcon><AddIcon /></ListItemIcon>
          <ListItemText primary="Add" />
        </ListItem>
      </List>
    </>
  );

export default SourcesList;

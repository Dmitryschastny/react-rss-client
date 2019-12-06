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

import Service from '../../Service';
import AddSourceDialog from '../AddSourceDialog';
import DeleteSourceDialog from '../DeleteSourceDialog';

import styles from './SourcesList.module.css';
import { Source } from '../../store/sources/types';

interface Props {
  itemsById: {
    [key: string]: Source
  }
  selectedSourceId: number | null;
  onSourceClick(item: Source | null): void;
  onSourceDelete(id: number): void;
  onSourceAdd(title: string, url: string): void;
}

interface State {
  isAddDialog: boolean;
  isDeleteDialog: boolean;
  deleteSourceId: null | number;
  sourceAddError: string;
  isLoading: boolean;
}

class SourcesList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isAddDialog: false,
      isDeleteDialog: false,
      deleteSourceId: null,
      sourceAddError: '',
      isLoading: false,
    };

    this.toggleSourceAddDialog = this.toggleSourceAddDialog.bind(this);
    this.toggleSourceDeleteDialog = this.toggleSourceDeleteDialog.bind(this);

    this.handleSourceAdd = this.handleSourceAdd.bind(this);
  }

  async handleSourceAdd(url: string) {
    const { onSourceAdd } = this.props;
    let error = null;

    this.setState({ isLoading: true });

    const rss = await Service.getFeed(url);

    if (!rss) {
      error = 'Error occured while parsing RSS, try a new one.';
    }

    if (!error) {
      onSourceAdd(rss.title, url);

      this.setState({
        isAddDialog: false,
        isLoading: false,
      });

      return;
    }

    this.setState({
      sourceAddError: error,
      isLoading: false,
    });
  }

  handleSourceDelete(id: number | null) {
    if (id !== null) {
      const { onSourceDelete } = this.props;
      onSourceDelete(id);

      this.setState({ isDeleteDialog: false });
    }
  }

  toggleSourceAddDialog() {
    this.setState((prevState) => ({
      isAddDialog: !prevState.isAddDialog,
      sourceAddError: ''
    }));
  }

  toggleSourceDeleteDialog(id?: number) {
    this.setState((prevState) => {
      return {
        isDeleteDialog: !prevState.isDeleteDialog,
        deleteSourceId: id !== undefined ? id : null
      }
    });
  }

  render() {
    const { itemsById, selectedSourceId, onSourceClick } = this.props;
    const {
      isAddDialog,
      isDeleteDialog,
      deleteSourceId,
      isLoading,
      sourceAddError,
    } = this.state;

    const deleteSourceItem = deleteSourceId !== null ? itemsById[deleteSourceId] : null;
    return (
      <>
        <AddSourceDialog
          isAddDialog={isAddDialog}
          onSourceAdd={!isLoading ? this.handleSourceAdd : () => false}
          toggleDialog={!isLoading ? this.toggleSourceAddDialog : () => false}
          error={sourceAddError}
          loading={isLoading}
        />
        <DeleteSourceDialog
          isOpen={isDeleteDialog}
          onSourceDelete={() => this.handleSourceDelete(deleteSourceId)}
          toggleDialog={this.toggleSourceDeleteDialog}
          rssTitle={deleteSourceItem ? deleteSourceItem.title : ''}
        />
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
                <ListItemSecondaryAction onClick={() => this.toggleSourceDeleteDialog(item.id)}>
                  <DeleteIcon className={styles.deleteIcon} />
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
          <ListItem button onClick={this.toggleSourceAddDialog}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary="Add" />
          </ListItem>
        </List>
      </>
    );
  }
}

export default SourcesList;

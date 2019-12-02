import React from 'react';
import { connect } from 'react-redux';
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
import AddSourceDialog from '../../components/AddSourceDialog/AddSourceDialog';
import DeleteSourceDialog from '../../components/DeleteSourceDialog/DeleteSourceDialog';
import { addSource, deleteSource, setSelectedSource } from '../../actions/sources';
import { fetchFeed } from '../../actions/feed';
import styles from './SourcesList.module.css';

class SourceList extends React.Component {
  constructor() {
    super();

    this.state = {
      isAddDialog: false,
      isDeleteDialog: false,
      deleteSourceId: null,
      sourceAddErrors: {},
      isLoading: false,
    };

    this.toggleSourceAddDialog = this.toggleSourceAddDialog.bind(this);
    this.toggleSourceDeleteDialog = this.toggleSourceDeleteDialog.bind(this);

    this.handleSourceAdd = this.handleSourceAdd.bind(this);
  }

  async handleSourceAdd(url) {
    const { items, onSourceAdd } = this.props;
    const errors = {};
    const isAlreadyExists = items.find((source) => source.url === url);

    this.setState({ isLoading: true });

    if (isAlreadyExists) {
      errors.url = 'Rss with this source has already been added.';
    }

    const rss = await Service.getFeed(url);

    if (!rss) {
      errors.url = 'Error occured while parsing RSS, try a new one.';
    }

    if (!Object.getOwnPropertyNames(errors).length) {
      onSourceAdd(rss.title, url);

      this.setState({
        isAddDialog: false,
        isLoading: false,
      });

      return;
    }

    this.setState({
      sourceAddErrors: errors,
      isLoading: false,
    });
  }

  handleSourceDelete(id) {
    const { onSourceDelete } = this.props;
    onSourceDelete(id);

    this.setState({ isDeleteDialog: false });
  }

  toggleSourceAddDialog() {
    this.setState((prevState) => ({ isAddDialog: !prevState.isAddDialog, sourceAddErrors: {} }));
  }

  toggleSourceDeleteDialog(id) {
    this.setState((prevState) => {
      const newState = { isDeleteDialog: !prevState.isDeleteDialog };

      if (id !== undefined) {
        newState.deleteSourceId = id;
      }

      return newState;
    });
  }

  render() {
    const { items, selectedSourceId, onSourceClick } = this.props;
    const {
      isAddDialog,
      isDeleteDialog,
      deleteSourceId,
      isLoading,
      sourceAddErrors,
    } = this.state;

    const deleteSourceItem = items.find((item) => item.id === deleteSourceId);
    return (
      <>
        <AddSourceDialog
          isAddDialog={isAddDialog}
          onSourceAdd={!isLoading ? this.handleSourceAdd : () => false}
          toggleDialog={!isLoading ? this.toggleSourceAddDialog : () => false}
          errors={sourceAddErrors}
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
          {items.map((item) => (
            <ListItem
              button
              key={item.id}
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
          ))}
          <ListItem button onClick={this.toggleSourceAddDialog}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary="Add" />
          </ListItem>
        </List>
      </>
    );
  }
}

export default connect((state) => ({
  items: state.sources.items,
  selectedSourceId: state.sources.selectedSourceId,
}), (dispatch) => ({
  onSourceClick: (item) => {
    dispatch(setSelectedSource(item ? item.id : null));

    if (item !== null) {
      dispatch(fetchFeed(item.url));
    }
  },
  onSourceDelete: (id) => dispatch(deleteSource(id)),
  onSourceAdd: (title, url) => dispatch(addSource(title, url)),
}))(SourceList);

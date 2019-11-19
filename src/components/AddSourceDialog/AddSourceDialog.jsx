import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  LinearProgress,
} from '@material-ui/core';

export default class AddSourceDialog extends React.Component {
  constructor(props) {
    super(props);

    this.urlInputRef = React.createRef();
  }

  render() {
    const {
      isAddDialog, toggleDialog, onSourceAdd, errors, loading
    } = this.props;

    return (
      <Dialog
        open={isAddDialog}
        onClose={toggleDialog}
        fullWidth
      >
        {loading && (<LinearProgress />)}
        <DialogTitle>Add new rss source</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Rss link"
            fullWidth
            inputRef={this.urlInputRef}
            error={!!errors.url}
            helperText={errors.url}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => onSourceAdd(this.urlInputRef.current ? this.urlInputRef.current.value : null)}
            color="primary"
          >
            Add
          </Button>
          <Button onClick={toggleDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

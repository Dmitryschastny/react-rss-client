import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  LinearProgress
} from '@material-ui/core';

export default class AddSourceDialog extends React.Component {
  constructor(props) {
    super(props);
    
    this.inputRef = React.createRef()
  }

  render() {
    const { isAddDialog, toggleDialog, onSourceAdd, error, loading } = this.props;

    return (
      <Dialog open={isAddDialog}
        onClose={toggleDialog}
        fullWidth={true}
      >
        {loading && (<LinearProgress />)}
        <DialogTitle>Add new rss source</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Rss link'
            type='email'
            fullWidth
            inputRef={this.inputRef}
            error={!!error}
            helperText={error}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => onSourceAdd(this.inputRef.current ? this.inputRef.current.value : null)}
            color='primary'
          >
            Add
          </Button>
          <Button onClick={toggleDialog} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog >
    )
  }
}
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

interface Props {
  isOpen: boolean;
  toggleDialog(): void;
  onSourceAdd(url: string): void;
  error: null | string;
  loading: boolean;
}

export default class AddSourceDialog extends React.Component<Props> {
  private urlInputRef: React.RefObject<any>;

  constructor(props: Props) {
    super(props);

    this.urlInputRef = React.createRef();
  }

  render() {
    const {
      isOpen, toggleDialog, onSourceAdd, error, loading,
    } = this.props;

    return (
      <Dialog
        open={isOpen}
        onClose={loading ? () => false : () => toggleDialog()}
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
            error={!!error}
            helperText={error || ''}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={
              () => onSourceAdd(this.urlInputRef.current ? this.urlInputRef.current.value : null)
            }
            color="primary"
          >
            Add
          </Button>
          <Button onClick={loading ? () => false : () => toggleDialog()} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

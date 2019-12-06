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
  isAddDialog: boolean;
  toggleDialog(): void;
  onSourceAdd(url: string): void;
  error: string;
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
      isAddDialog, toggleDialog, onSourceAdd, error, loading,
    } = this.props;

    return (
      <Dialog
        open={isAddDialog}
        onClose={() => toggleDialog()}
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
          <Button onClick={() => toggleDialog()} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

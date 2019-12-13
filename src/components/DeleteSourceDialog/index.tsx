import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@material-ui/core';

interface Props {
  isOpen: boolean;
  toggleDialog(): void;
  onSourceDelete(): void;
  rssTitle: string;
}

const AddSourceDialog: React.FC<Props> = ({
  isOpen, toggleDialog, onSourceDelete, rssTitle
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => toggleDialog()}
      fullWidth
    >
      <DialogTitle>Delete rss source</DialogTitle>
      <DialogContent>
        {`Are you sure you want to unsubscribe from "${rssTitle}?"`}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onSourceDelete}
          color="primary"
        >
          Yes
        </Button>
        <Button onClick={() => toggleDialog()} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSourceDialog;

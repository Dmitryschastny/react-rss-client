import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  LinearProgress,
} from '@material-ui/core';

export default function AddSourceDialog({
 isDeleteDialog, toggleDialog, onSourceDelete, loading, rssTitle
}) {
  return (
    <Dialog
      open={isDeleteDialog}
      onClose={() => toggleDialog()}
      fullWidth
    >
      {loading && (<LinearProgress />)}
      <DialogTitle>Delete rss source</DialogTitle>
      <DialogContent>
        {`Are you sure you want to unsubscribe from "${rssTitle}?"`}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => onSourceDelete()}
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

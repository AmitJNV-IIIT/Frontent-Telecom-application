import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ setOnDelete, confirmDeleteItem }) {
  // const [open, setOpen] = React.useState(onDelete);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = (confirmation) => {
    confirmDeleteItem(confirmation);
    setOnDelete(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Are you sure you want to delete this plan?'}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('no')}>No</Button>
          <Button onClick={() => handleClose('yes')} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

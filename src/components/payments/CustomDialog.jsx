import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide } from '@mui/material';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});

const CustomDialog = ({ open, onClose,title, children }) => {
    return (
        <Dialog
        TransitionComponent={Transition}
        keepMounted
         open={open}
          onClose={onClose} 
          fullWidth 
          maxWidth="lg"
          sx={{ '& .MuiDialog-paper': { width: '80%', maxWidth: 'none' } }}
          >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CustomDialog
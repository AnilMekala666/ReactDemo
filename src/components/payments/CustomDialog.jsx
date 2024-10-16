import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Slide } from '@mui/material';
import {Typography } from '@mui/material';
import { LeftOutlined } from '@ant-design/icons';


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
            <DialogTitle><Typography variant='h4'> {title}</Typography></DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color="success"
                    className='back-btn'
                    onClick={onClose}><LeftOutlined style={{ fontSize: '17px', padding: '12px', marginRight: '15px', borderRadius: '100%', background: 'rgb(174 219 152 / 55%)' }} />Back 
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default CustomDialog
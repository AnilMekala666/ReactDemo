import * as React from 'react';
import { Box, Drawer, Typography, CircularProgress, Button } from '@mui/material';
import { borderRadius, styled } from '@mui/system';

const CustomDrawer = ({ open, onClose, children,borderRadius, anchor = 'right', width = 250, leftOffset = 0, top, title,
    content,
    button, }) => {

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: width,
                    height: 'auto',
                    position: 'fixed', // Fix the position
                    right: `${leftOffset}px`,
                    top: top,
                    transform: 'translateY(-50%)',
                    transition: 'transform 0.3s ease, right 0.3s ease', // Smooth transition
                    maxHeight: '100vh', // Optional: limit max height
                    // zIndex: 1300,
                    borderRadius:borderRadius,
                    minHeight:'100vh',
                    borderRadius:'15px',marginRight:'10px',border:'1px solid #ddd'
                }
            }}
        >
            <Box role="presentation" sx={{ p: 2 }}>
                <Typography variant="h6" className='popupheader'>{title}</Typography>
                <Box>{content}</Box>
                {button}
            </Box>
        </Drawer>
    );
}

export default CustomDrawer

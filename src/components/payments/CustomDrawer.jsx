import * as React from 'react';
import { Box, Drawer, Typography, CircularProgress, Button } from '@mui/material';
import { borderRadius, styled } from '@mui/system';

const CustomDrawer = ({ open, onClose, children,borderRadius, anchor = 'right', width = 300, leftOffset = 0, top, title,
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
                    right: `${leftOffset}px`, // Offset to move the drawer to the left
                    top: top,
                    transform: 'translateY(-50%)',
                    transition: 'transform 0.3s ease, right 0.3s ease', // Smooth transition
                    maxHeight: '100vh', // Optional: limit max height
                    // zIndex: 1300,
                    borderRadius:borderRadius,
                    minHeight:'100vh'
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

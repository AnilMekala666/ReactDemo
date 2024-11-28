import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const LinearProgressBar = ({ title, value, ...others }) => {
    const getColorForValue = (value) => {
        if (value >= 90) {
            return 'green'; 
        } else if (value >= 40) {
            return 'orange'; 
        } else {
            return 'red'; 
        }
    };
    return (

        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', marginBottom: "10px", width: '100%' }}>

            <Typography
                variant="h5"
                sx={{
                    width: '250px',
                    marginRight: "10px",
                    whiteSpace: "nowrap",
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {title}:
            </Typography>


            <LinearProgress
                variant="determinate"
                value={value}
                sx={{
                    flexGrow: 1,
                    height: 30,
                    borderRadius: 5,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                        background: getColorForValue(value),
                    },
                }}
                {...others}
            />


            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontWeight: 'bold',
                    color: value < 50 ? 'black' : 'white',
                    width: '80px',
                    textAlign: 'center',
                }}
            >
                {`${Math.round(value)}%`}
            </Typography>
        </Box>

    );
}

LinearProgressBar.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired, 
    others: PropTypes.any,
};

export default LinearProgressBar
import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const LinearProgressBar = ({ title, value, maxValue = 100, ...others }) => {
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
        <Box sx={{ width: '100%', margin: 'auto', marginBottom: '10px', textAlign: 'center' }}>
            {/* Label and Percentage */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 'bold',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`${value}/${maxValue}`}
                </Typography>
            </Box>

            {/* Progress Bar */}
            <LinearProgress
                variant="determinate"
                value={(value / maxValue) * 100}
                sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                        background: getColorForValue((value / maxValue) * 100),
                    },
                }}
                {...others}
            />
        </Box>
    );
};

LinearProgressBar.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    maxValue: PropTypes.number, // Maximum value for percentage calculation
    others: PropTypes.any,
};

export default LinearProgressBar;

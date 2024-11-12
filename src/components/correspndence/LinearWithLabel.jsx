import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

// ==============================|| PROGRESS - LINEAR WITH LABEL INSIDE ||============================== //

export default function LinearWithLabel({ value, ...others }) {
  return (
    <Box sx={{ position: 'relative', width: '100%' }}>
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          width: '100%',
          height: 10,
          borderRadius: 5,
          backgroundColor: '#e0e0e0', // Light background for the progress bar track
          '& .MuiLinearProgress-bar': {
            backgroundColor: value >= 70 ? 'green' : value >= 40 ? 'orange' : 'red', // Color based on value
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
          transform: 'translate(-50%, -50%)', // Centers the text
          fontWeight: 'bold',
          color: 'white', // White text for contrast inside the progress bar
        }}
      >
        {`${Math.round(value)}%`}
      </Typography>
    </Box>
  );
}

LinearWithLabel.propTypes = {
  value: PropTypes.number.isRequired, // Ensure the value is a number
  others: PropTypes.any,
};

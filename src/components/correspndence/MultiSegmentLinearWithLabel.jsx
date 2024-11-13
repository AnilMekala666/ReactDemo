/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function MultiSegmentLinearWithLabel({ processedWidth, inProgressWidth, needAttentionWidth, processedWithoutPercentage, inProgressWithoutPercentage, needAttentionWithoutPercentage }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      {/* Linear bar with segments */}
      <Box sx={{ width: '100%', display: 'flex', mr: 1, height: 10, borderRadius: 5, overflow: 'hidden' }}>
        {/* Processed Segment (Green) */}
        <Box sx={{ width: `${processedWidth}%`, backgroundColor: 'green' }} />
        {/* In Progress Segment (Orange) */}
        <Box sx={{ width: `${inProgressWidth}%`, backgroundColor: 'orange' }} />
        {/* Need Attention Segment (Red) */}
        <Box sx={{ width: `${needAttentionWidth}%`, backgroundColor: 'red' }} />
      </Box>
      
      {/* Display combined percentage labels */}
      <Box sx={{ minWidth: 90, display: 'flex', flexDirection: 'column', position:'absolute',top:'50px',right:'20px' }}>
      {/* <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}> */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ width: '12px', height: '12px', backgroundColor: 'green', mr: 0.5 }} />
          <Typography className='card-linear1'>
            Processed: ({processedWithoutPercentage})
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
          <Box sx={{ width: '12px', height: '12px', backgroundColor: 'orange', mr: 0.5 }} />
          <Typography className='card-linear1'>
            Ready to Progress: ({inProgressWithoutPercentage})
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
          <Box sx={{ width: '12px', height: '12px', backgroundColor: 'red', mr: 0.5 }} />
          <Typography className='card-linear1'>
            Need Attention: ({needAttentionWithoutPercentage})
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

MultiSegmentLinearWithLabel.propTypes = {
  processedWidth: PropTypes.number.isRequired,
  inProgressWidth: PropTypes.number.isRequired,
  needAttentionWidth: PropTypes.number.isRequired,
};
import React from 'react';
import { Box } from '@mui/material';
export const AiInterPretation = ({docTypes}) => {
  return (
    <Box sx={{ padding: 2 }}>
      <Box className="card-box" sx={{ padding: 2, marginBottom: '2' }}>
        AI Model suggested below 4 documents should be collected from EMR, and too be submitted.
      </Box>
      <Box className="doc-list">
        <ul>
          {docTypes?.map(item=><li>{item}</li>)}
        </ul>
      </Box>
    </Box>
  );
};

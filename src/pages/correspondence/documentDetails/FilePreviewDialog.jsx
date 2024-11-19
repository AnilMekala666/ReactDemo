import React, { useState } from 'react';
import CustomDialog from 'components/correspndence/CustomDialog';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const FilePreviewDialog = ({ dialogOpen, setDialogOpen, title = '', sourceUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <CustomDialog
      open={dialogOpen}
      onClose={() => {
        setDialogOpen(false);
      }}
      title={title}
      maxWidth="md"
    >
      {/* <iframe src={sourceUrl} title="file" width="100%" height="600" ></iframe> */}
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '600',
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <iframe
        src={sourceUrl}
        title="file"
        width="100%"
        height="600"
        style={{
          border: 'none',
          display: isLoading ? 'none' : 'block',
        }}
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </CustomDialog>
  );
};

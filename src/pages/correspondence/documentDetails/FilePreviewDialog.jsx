import React from 'react';
import CustomDialog from 'components/correspndence/CustomDialog';

export const FilePreviewDialog = ({ dialogOpen, setDialogOpen, title = '', sourceUrl }) => {
  return (
    <CustomDialog
      open={dialogOpen}
      onClose={() => {
        setDialogOpen(false);
      }}
      title={title}
      maxWidth="md"
    >
      <iframe src={sourceUrl} title="file" width="100%" height="600" ></iframe>
    </CustomDialog>
  );
};

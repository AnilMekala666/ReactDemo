import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import pdfIcon from '../../../../src/assets/images/icons/pdf_icon.png';

export const FileResponse = ({ mailContent, attachments }) => {
  // Group attachments by document type
  const groupedAttachments = attachments.reduce((acc, attachment) => {
    const { documentType } = attachment;
    if (!acc[documentType]) {
      acc[documentType] = [];
    }
    acc[documentType].push(attachment);
    return acc;
  }, {});
  const handleDownload = async (fileName) => {
    console.log("fileName",fileName)
    const filePath =  `/pdfs/${fileName}.pdf`;
    const link = document.createElement('a');
    link.href = filePath;
    link.setAttribute('download', `${fileName}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box dangerouslySetInnerHTML={{ __html: mailContent }}></Box>
      <Box sx={{ fontWeight: 700, marginBottom: 4 }}>Attachments:</Box>

      <Grid container spacing={4}>
        {Object.entries(groupedAttachments).map(([documentType, files]) => (
          <Grid item xs={12} sm={6} md={3} key={documentType}>
            <Box>
              {/* <Typography sx={{ fontWeight: 600, marginBottom: 4 }}>{documentType}</Typography> */}
              <Grid container spacing={2}>
                {files.map((file, index) => (
                  <Grid item xs={12} key={`${file.id}-${index}`}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #E0E0E0',
                        borderRadius: 4,
                        padding: 2,
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        marginBottom: 2,
                        cursor:"pointer"
                      }}
                      onClick={() => handleDownload(documentType)}
                    >
                      <img src={pdfIcon} alt="pdf icon" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {documentType}.pdf
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

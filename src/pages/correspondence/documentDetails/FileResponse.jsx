import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import pdfIcon from '../../../../src/assets/images/icons/pdf_icon.png';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import QueueIcon from '@mui/icons-material/Queue';
import IconButton from '@mui/material/IconButton';
import { CORRESPONDENCE_ENDPOINTS } from 'pages/rest/api';
import axios from 'axios';

export const FileResponse = ({ mailContent, attachments, setUserValidation, setUserProcess, userProcess, userValidation, statusId,status,setStatus,docId }) => {
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
    const filePath = `/pdfs/${fileName}.pdf`;
    const link = document.createElement('a');
    link.href = filePath;
    link.setAttribute('download', `${fileName}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const updateStatus = async () => {
    console.log('UPDATESTATUS')
    try {
      console.log("USERINPUT");
      const response = await axios.post(CORRESPONDENCE_ENDPOINTS.UPDATE_STATUS,{id: docId});
      console.log(response,"USERINPUT1")
      if(response.status===200){
        setStatus('Success')
      }
      else{
        setStatus('')
      }
      //SetPatientsData(response.data);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      {statusId === '2' && status !== 'Success'  && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <IconButton
            sx={{
              backgroundColor: '#6ac5fe',
              color: 'white',
              '&:hover': { backgroundColor: '#6ac5fe', color: 'white' },
              padding: '10px 16px',
              width: '11.5rem',
              height: '2.5rem',
              border: '1px solid #6ac5fe',
              borderRadius: '.5rem'
            }}
            onClick={() => {
              setUserValidation(true);
              setUserProcess(false);
            }}
          >
            <HowToRegIcon /> User Validation
          </IconButton>

          <IconButton
  sx={{
    backgroundColor: !userValidation ? '#656565' : '#6ac5fe',
    color: 'white',
    '&:hover': {
      backgroundColor: !userValidation ? '#656565' : '#6ac5fe',
      color: 'white',
    },
    padding: '10px 16px',
    width: '11.5rem',
    height: '2.5rem',
    border: '1px solid #6ac5fe',
    borderRadius: '.5rem',
  }}
  disabled={!userValidation}
  onClick={updateStatus}  // Direct reference
>
  <QueueIcon /> Submit
</IconButton>
        </Box>
      )}

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
                        cursor: 'pointer'
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

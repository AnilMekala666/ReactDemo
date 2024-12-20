/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  Box, Button, Grid, Typography, Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@mui/material';
import { styled } from '@mui/material/styles';
import pdfIcon from '../../../../src/assets/images/icons/pdf_icon.png';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import QueueIcon from '@mui/icons-material/Queue';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { CORRESPONDENCE_ENDPOINTS } from 'pages/rest/api';
import axios from 'axios';
import CustomDialog from 'components/correspndence/CustomDialog';
import {
  ShareAltOutlined
} from '@ant-design/icons';

import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import { openSnackbar } from 'api/snackbar';
import LinearProgress from '@mui/material/LinearProgress';
import Editor from './Editor';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1.25),
    paddingRight: theme.spacing(2)
  }
}));

function BootstrapDialogTitle({ children, onClose, ...other }) {
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          color="white"
          sx={{
            position: 'absolute',
            right: 10,
            top: 10
          }}
        >
          <CloseOutlined sx={{ color: "white" }} />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export const FileResponse = ({ mailContent, attachments, setUserValidation, setUserProcess, userProcess, userValidation, statusId, status, setStatus, uId ,fileId,customAttachments,setCustomAttachments,onDelete,fetchMedicalRequestData}) => {
  // Group attachments by document type
  console.log("statusResponse", statusId)
  const [editorContent, setEditorContent] = useState(mailContent || '');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loader,setLoader] = useState(false);
  const [fileLinks, setFileLinks] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [isEditButtonVisible, setIsEditButtonVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [validationDialogOpen, setValidationDialogOpen] = useState(false)
  const [customFiles,setCustomFiles] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteFileId,setDeleteFileId] = useState("");


  const [fileNames, setFileNames] = useState([]);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles(selectedFiles);
    setFileNames(selectedFiles);
    const previews = selectedFiles.map((file) => URL.createObjectURL(file));
    setFilePreviews(previews);
  };


  const showPdf = async (fileName) => {
    try {
      const response = await axios.get(`${CORRESPONDENCE_ENDPOINTS.SHOW_MEDICAL_FILE_PDF}${fileName}`,{ responseType: 'blob' });
      // Create a URL for the downloaded file
      const fileURL = window.URL.createObjectURL(new Blob([response.data],{ type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', `${fileName}`); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.remove(); // Clean up the link element
  
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

   const uploadFiles = async () => {
     const formData = new FormData();

     //Append each file to the formData object
     Array.from(files).forEach((file) => {
       formData.append('file', file);
     });

    //formData.append("file",files[0]);

     // Add other fields
    formData.append('id', fileId);
    setFileNames(formData);
     try {
      setLoader(true);
       const response = await axios.post(CORRESPONDENCE_ENDPOINTS.UPLOAD_MEDICAL_REQ_PDF, formData, {
         headers: {
           'Content-Type': 'multipart/form-data'
         }
       });
       if(response.status==200){
        fetchMedicalRequestData();
        openSnackbar({
          open: true,
          message: 'File Uploaded Success',
          variant: 'alert',
          close: true,
        });
        setDialogOpen(false);
        setFiles([])
        setLoader(false);
       }
     } catch (error) {
       setLoader(false);
       console.error('Error uploading files:', error);
     }
   };

   const FileCard = ({ file ,index , handleDeleteClick,id}) => {
    return (
      <Grid item xs={12} key={index}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent:'space-between',
            border: '1px solid #E0E0E0',
            borderRadius: 4,
            padding: 2,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            marginBottom: 2,
            cursor: 'pointer'
          }}
          
        >
          <Box sx={{display:"flex",alignItems:"center",width:"90%",overflow:"hidden"}}>
            <img src={pdfIcon} alt="pdf icon" style={{ width: '24px', height: '24px', marginRight: '10px' }} />
            <Box  onClick={() =>showPdf(file.documentType) }>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {file.documentType}
              </Typography>
            </Box>
          </Box>
          <IconButton aria-label="delete" onClick={()=>handleDeleteClick(file.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </Grid>
    );
  };


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
      const response = await axios.post(CORRESPONDENCE_ENDPOINTS.UPDATE_STATUS, { id: uId });
      console.log(response, "USERINPUT1")
      if (response.status == 200) {
        setStatus('Success')
        setValidationDialogOpen(false)
        setIsEditButtonVisible(false);
      }
      else {
        setStatus('')
      }
      //SetPatientsData(response.data);
    } catch (err) {
      console.log(err);
    } 
    // finally {

    // }
  };

  const handleEditToggle = () => {
    console.log()
    console.log("handleEditToggle click")
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  const handleClose = () => {
    console.log("close drawwer")
    setValidationDialogOpen(false)
  }

    // Open the confirmation dialog
    const handleDeleteClick = (id) => {
      setDeleteFileId(id)
      setOpenDeleteDialog(true);
    };
  
    // Close the confirmation dialog
    const handleCloseDeleteDialog = () => {
      setOpenDeleteDialog(false);
    };
  
    // Confirm delete and trigger the callback
    const handleConfirmDelete = () => {
      onDelete(deleteFileId); // Pass the file's unique identifier to the parent
      setOpenDeleteDialog(false);
    };
  
const updatePatientLevelData = async () => {
  try {
   setLoader(true);
    const response = await axios.post(CORRESPONDENCE_ENDPOINTS.UPDATE_MEDICAL_REQUEST_RESPONSE_DATA, {
      "confScoreId" :Number(fileId),
      "summary":[editorContent]
  },);
    if(response.status==200){
     openSnackbar({
       open: true,
       message: 'Updated Successfully',
       variant: 'alert',
       close: true,
     });
     setLoader(false);
    }
  } catch (error) {
    setLoader(false);
    console.error('Error updatign the content', error);
  }
};


  return (
    <Box sx={{ padding: 2 }}>

      {statusId === '2' && status !== 'Success' && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2,marginBottom:4  }}>
              {/* <Button
            variant='outlined'  sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#2f2f2f' }}
            onClick={() => {
              console.log('Edited Content:', editorContent);
            }}
          >
            <HowToRegIcon /> OK
          </Button> */}
          {/* <Button
            variant="outlined"
            // startIcon={<UploadIcon />}
            sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#2f2f2f' }}
            // onClick={handleCancelEdit}
          >
            Upload doccument
          </Button> */}
          <Button
            variant="outlined"
            startIcon={<AppRegistrationOutlinedIcon />}
            sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#2f2f2f' }}
            // onClick={handleEditToggle}
            onClick={isEditing ? () => updatePatientLevelData() : handleEditToggle}
          >
            {isEditing ? 'Save' : 'Edit Response'}
          </Button>

          {isEditing && isEditButtonVisible && (
            <Button
              variant="outlined"
              startIcon={<AppRegistrationOutlinedIcon />}
              sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#2f2f2f' }}
              onClick={handleCancelEdit}
            >
              Cancel
            </Button>
          )}
          <Button variant='outlined'  sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#2f2f2f' }} onClick={() => setDialogOpen(true)}>Upload document</Button>
          <Button
            variant='outlined'  sx={{ borderRadius: '8px', fontSize: '14px', border: '1px solid #d5d7da', color: '#2f2f2f' }}
            // sx={{
            //   backgroundColor: '#6ac5fe',
            //   color: 'white',
            //   '&:hover': { backgroundColor: '#6ac5fe', color: 'white' },
            //   padding: '10px 16px',
            //   width: '11.5rem',
            //   height: '2.5rem',
            //   border: '1px solid #6ac5fe',
            //   borderRadius: '.5rem'
            // }}
            onClick={() => {
              setUserValidation(true);
              setUserProcess(false);
              setValidationDialogOpen(true)
            }}
            disabled={isEditing}
          >
            <HowToRegIcon /> Submit
          </Button>

          {/* <IconButton
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
          </IconButton> */}
        </Box>
      )}

<Editor content={mailContent} onContentChange={(newContent) => setEditorContent(newContent)} />
      <Box sx={{ fontWeight: 700, marginBottom: 4,marginTop:4 }}>Attachments:</Box>

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
                        marginBottom: 0,
                        cursor: 'pointer',
                        height:'60px'
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

      <Box sx={{ fontWeight: 700, marginBottom: 4, marginTop:3 }}>Custom Documents:</Box>
      <Grid container spacing={4}>
      <Grid item xs={12} sm={6} md={3}>
        <Box>
          <Grid container spacing={2}>
            {customAttachments.map((file, index) => {
              return <FileCard file={file} index={index} handleDeleteClick={handleDeleteClick}/>;
            })}
          </Grid>
        </Box>
      </Grid>
      </Grid>

      <CustomDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setFiles([])
        }}
        title="Upload Document"
       
      >
        <Box sx={{ mb: 2 }}>
          <Grid container spacing={2} alignItems="center" sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>

            {/* <Grid item xs={12} sm={4}>
              <Typography variant="body1" style={{ color: '#1677ff' }}>Choose Files:</Typography>
              <input type="file" multiple onChange={handleFileChange} />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" style={{ color: '#1677ff' }}>Choose Files:</Typography>


              {/* Custom button */}
              {/* <div
                onClick={() => document.getElementById("customFileInput").click()}
                style={{
                  display: "inline-block",
                  padding: "9px",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  color: "#1677ff",
                  cursor: "pointer",
                  fontSize: "14px",
                  textAlign: "center",
                  width: "100%",
                  marginTop: "0px",
                }}
              >
                Upload Files
              </div> */}
              <button
    onClick={() => document.getElementById("customFileInput").click()}
    style={{
        display: "inline-block",
        padding: "9px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        color: "#1677ff",
        cursor: "pointer",
        fontSize: "14px",
        textAlign: "center",
        width: "100%",
        marginTop: "0px",
        background: "none", // Optional: Remove default button background
        outline: "none", // Optional: Remove default button outline
    }}
>
    Upload Files
</button>
              <input
                id="customFileInput"
                type="file"
                multiple
                onChange={handleFileChange}
                style={{ display: "none" }} // Hides the default input
              />
              <div style={{ marginTop: "8px", color: "#1677ff" }}>
                {fileNames.length > 0 ? `${fileNames.length} files selected` : "No files selected"}
              </div>


            </Grid>


            {/* Run Prediction Button */}
            <Grid item xs={12} sm={6}>
              <Button
                disabled={files.length == 0}
                variant="contained"
                onClick={uploadFiles}
                sx={{ mt: 2, width: '100%', mb: 2 }}
                startIcon={<ShareAltOutlined />}
              >
                upload file
              </Button>
              {loader && <LinearProgress />}
            </Grid>


          </Grid>
        </Box>


      </CustomDialog>

      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={validationDialogOpen}>
        <BootstrapDialogTitle id="customized-dialog-title" className="dialog-header" onClose={handleClose}>
          User validation
        </BootstrapDialogTitle>
        <DialogContent dividers sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
          Do you want to confirm moving this item to the posting queue?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" autoFocus
            // onClick={updateStatus}
            onClick={() => {
              console.log("Yes clicked, calling updateStatus");
              updateStatus();
            }}
          >
            Yes
          </Button>
          <Button variant='outlined' onClick={handleClose}>No</Button>
        </DialogActions>
      </BootstrapDialog>


         {/* Confirmation Dialog  for delete*/}
         <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Delete File</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this file? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

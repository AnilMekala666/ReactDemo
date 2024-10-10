import React, {useState} from 'react';
import { CircularProgress, Button } from '@mui/material';

const FileUploader = ({ onFileUpload }) => {
    const [showSpinner, setShowSpinner] = useState(false);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          setShowSpinner(true);
    
          setTimeout(() => {
            setShowSpinner(false);
            onFileUpload();  // Notify parent about file upload success
          }, 4000);  // 4 seconds delay to simulate file processing
        }
      };

  return (
    <div>
      <p>Please upload a file to proceed.</p>
      <input type="file" onChange={handleFileUpload} />
    
      {showSpinner && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
          <CircularProgress size={24} />
          <p style={{ marginLeft: '10px' }}>Processing...</p>
        </div>
      )}
    </div>
  )
}

export default FileUploader
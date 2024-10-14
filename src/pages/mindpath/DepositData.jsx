import React from 'react'
import { Grid, Button, Typography, } from '@mui/material';
import { UploadOutlined } from '@ant-design/icons';

function DepositData() {
  return (
    <div>
        <Button variant="contained" color='primary'  component="label" sx={{ borderRadius: '40px', marginTop: '20px' }}>
            Upload File
            <input type="file" multiple hidden/>
            <UploadOutlined style={{ fontSize: '20px', paddingLeft: '10px' }} />
        </Button>
    </div>
  )
}

export default DepositData
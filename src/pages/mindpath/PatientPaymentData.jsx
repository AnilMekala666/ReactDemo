import React, { useState, useMemo } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomTable from 'components/payments/CustomTable';
import CustomDialog from 'components/payments/CustomDialog';
import * as XLSX from 'xlsx'; 
import { UploadOutlined } from '@ant-design/icons';
import { LeftOutlined } from '@ant-design/icons';

const initialStaticData = [
  { 'Payment ID': '001', 'Transaction Number': 'TN001', 'Patient ID': 'PID001', 'Amount': '100.00', 'State Name': 'New York' },
  { 'Payment ID': '002', 'Transaction Number': 'TN002', 'Patient ID': 'PID002', 'Amount': '200.00', 'State Name': 'California' },
  
];

function PatientPaymentData() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState(initialStaticData);
  const [patientPaymentDataDialogOpen, setPatientPaymentDataDialogOpen] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [showFileContent, setShowFileContent] = useState(false);

  const handlePatientPaymentDataDataDialogClose = () => {
    navigate('/patient/payment');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert the sheet to JSON format
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        setFileContent(jsonData); // Save parsed data for displaying
        setParsedData(jsonData); // Save parsed data for the dialog
        setLoading(false);
        setShowFileContent(true); // Show uploaded content
      };
      reader.readAsArrayBuffer(file); // Read file as ArrayBuffer
    }
  };

  const tableColumns = useMemo(
    () => [
      { header: 'Payment ID', accessorKey: 'Payment ID' },
      { header: 'Transaction Number', accessorKey: 'Transaction Number' },
      { header: 'Patient ID', accessorKey: 'Patient ID' },
      { header: 'Amount', accessorKey: 'Amount' },
      { header: 'State Name', accessorKey: 'State Name' },
    ],
    []
  );

  return (
    <div>
      <Grid mt={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Grid >
          <Typography variant="h4">Patient Payments</Typography>
        </Grid>
        <Grid >
          <Button
            variant="contained"
            color="primary"
            component="label"sx={{ borderRadius: '40px', marginTop: '20px', padding: '0px 0 0px 30px' }}
            >
              Get File
            <input type="file" hidden onChange={handleFileUpload} sx={{ padding: '0px 10px 10px 0px' }}/>
            <UploadOutlined style={{ fontSize: '20px',padding: '12px', marginLeft: '15px', borderRadius: '100%', background: 'rgb(85 145 243)' }} />
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <div style={{ position: 'absolute', top: '10%', left: '50%' }}>
          <h3 style={{ margin: 'auto' }}>Loading...</h3>
        </div>
      ) : (
        <>
          {showFileContent ? (
            <>
              <Grid container spacing={2} sx={{ marginTop: '20px', margin: 'auto' }}>
                <div style={{
                  backgroundColor: '#f0f0f0',
                  padding: '10px',
                  borderRadius: '8px',
                  width: "70%",
                  fontSize: "20px",
                  overflow: 'auto',
                  height: '400px',
                  overflowY: 'auto',
                  margin: "auto"
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Payment ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Transaction Number</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Patient ID</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>Amount</th>
                        <th style={{ border: '1px solid #ddd', padding: '8px' }}>State Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fileContent.map((row, index) => (
                        <tr key={index}>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row['Payment ID']}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row['Transaction Number']}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row['Patient ID']}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row['Amount']}</td>
                          <td style={{ border: '1px solid #ddd', padding: '8px' }}>{row['State Name']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Grid>
              <Button
                variant="contained"
                color="success"
                component="label"
                className='back-btn'
                onClick={() => navigate('/patient/payment')}
                style={{ margin: '20px 0 10px 20px' }}
              >
                <LeftOutlined style={{ fontSize: '17px', padding: '12px', marginRight: '15px', borderRadius: '100%', background: 'rgb(174 219 152 / 55%)' }} />Back 
              </Button>
              <Button
                variant="contained"
                color="primary"
                 className='btn-border'
                onClick={() => setPatientPaymentDataDialogOpen(true)}
              >
                Process
              </Button>
            </>
          ) : (
            <CustomTable data={parsedData} datacolumns={tableColumns} />
          )}
        </>
      )}

      <CustomDialog
        open={patientPaymentDataDialogOpen}
        onClose={handlePatientPaymentDataDataDialogClose}
        title={"Patient Payments Data"}
      >
        <CustomTable data={parsedData} datacolumns={tableColumns} />
      </CustomDialog>
    </div>
  );
}

export default PatientPaymentData;
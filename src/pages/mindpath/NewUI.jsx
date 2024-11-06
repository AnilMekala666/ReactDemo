import React, { useState, useMemo, useEffect } from 'react';
import { Grid, Button, Typography, Tabs, Tab, TableCell, Card, CardHeader, CardContent } from '@mui/material';
import { UploadOutlined } from '@ant-design/icons';
import CustomDialog from 'components/payments/CustomDialog';
import CustomTable from 'components/payments/CustomTable';
import { useNavigate } from 'react-router';
import { LeftOutlined } from '@ant-design/icons';
import { Box } from '@mui/system';
import CustomExpandableTableColumn from 'components/payments/CustomExpandableTableColumn';
import { currencyFormat } from 'components/mindpath';
import AnimatedProcess from './AnimatedProcess';
import { flexRender } from '@tanstack/react-table';
import moment from 'moment';
import { ChevronRight } from '@mui/icons-material';

const remittance = new URL('src/assets/data/remittance.csv', import.meta.url).href;
const remittanceDemo = new URL('src/assets/data/remittance.demo.csv', import.meta.url).href;

const initialStaticData = [
  {
    "File Process Date": "28-01-2024",
    "# files received": "3",
    "# files processed": "3",
    "# Total Transactions": "1100",
    "# transactions recorded": "636",
    "subRows": [
      {
        "File Name": "EDI3.edi",
        "# total transactions": "356",
        "# total transactions recorded": "203",
        "File Status": "Processed",
      },
      {
        "File Name": "EDI2.edi",
        "# total transactions": "370",
        "# total transactions recorded": "215",
        "File Status": "Processed",
      },
      {
        "File Name": "EDI1.edi",
        "# total transactions": "374",
        "# total transactions recorded": "218",
        "File Status": "Processed",
      },
    ],
  },
  {
    "File Process Date": "27-01-2024",
    "# files received": "4",
    "# files processed": "4",
    "# Total Transactions": "1454",
    "# transactions recorded": "636",
    "subRows": [
      {
        "File Name": "EDI4.edi",
        "# total transactions": "356",
        "# total transactions recorded": "203",
        "File Status": "Processed",
      },
      {
        "File Name": "EDI3.edi",
        "# total transactions": "370",
        "# total transactions recorded": "215",
        "File Status": "Processed",
      },
      {
        "File Name": "EDI2.edi",
        "# total transactions": "374",
        "# total transactions recorded": "218",
        "File Status": "Processed",
      },
      {
        "File Name": "EDI1.edi",
        "# total transactions": "354",
        "# total transactions recorded": "208",
        "File Status": "Processed",
      },
    ],
  },
  {
    "File Process Date": "28-01-2024",
    "# files received": "5",
    "# files processed": "5",
    "# Total Transactions": "1100",
    "# transactions recorded": "636",
    "subRows": [
      {
        "File Name": "EDI3.edi",
        "# total transactions": "356",
        "# total transactions recorded": "203",
        "File Status": "Processed",
      },
      {
        "File Name": "EDI2.edi",
        "# total transactions": "370",
        "# total transactions recorded": "215",
        "File Status": "Processed",
      },
      {
        "File Name": "EDI1.edi",
        "# total transactions": "374",
        "# total transactions recorded": "218",
        "File Status": "Processed",
      },
    ],
  },
];

const claimEnum = {
  1: "Processed as Primary",
  2: "Processed as Secondary",
  3: "Processed as Tertiary",
  4: "Denied",
  19: "Processed as Primary, Forwarded to Additional Payer",
  20: "Processed as Secondary, Forwarded to Additional Payer",
  21: "Processed as Tertiary, Forwarded to Additional Payer",
  22: "Reversal of Previous Payment",
  23: "Not our Claim, Forwarded to Additional Payer",
  25: "Predetmination Pricing only - No Payment"
}

function NewUI() {
  const navigate = useNavigate();


  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 0 }}>{children}</Box>}
      </div>
    );
  }

  // const tableColumns = useMemo(
  //   () => [
  //     { header: 'Transaction Number', accessorKey: 'transaction_number' },
  //     // { header: 'EFT', accessorKey: 'account_name' },
  //     { header: 'Bank Name', accessorKey: 'bank_name' },
  //     { header: 'Payment Type', accessorKey: 'payment_type' },
  //     { header: 'Payer', accessorKey: 'payer' },
  //     { header: 'Deposit Date', accessorKey: 'deposit_date' },
  //     { header: 'Amount', accessorKey: 'amounts' },
  //   ],
  //   []
  // );



  return (
    // <div>
    //   <Button
    //     variant="contained"
    //     color="primary"
    //     component="label"
    //     sx={{ borderRadius: '40px', marginTop: '20px', padding: '0px 0 0px 30px' }}
    //   >
    //     Get File
    //     <input type="file" multiple hidden onChange={handleFileUpload} sx={{ padding: '0px 10px 10px 0px' }} />
    //     <UploadOutlined style={{ fontSize: '20px', padding: '12px', marginLeft: '15px', borderRadius: '100%', background: 'rgb(85 145 243)' }} />
    //   </Button>

    //   {loading ? (
    //     <div style={{ position: 'absolute', top: '10%', left: '50%' }}>
    //       <h3 style={{ margin: 'auto' }}>Loading...</h3>
    //     </div>
    //   ) : (
    //     showFileContent && (
    //       <>
    //       <Grid container spacing={2} sx={{ marginTop: '20px', margin: 'auto' }}>
    //         <pre
    //           style={{
    //             whiteSpace: 'pre-wrap',
    //             wordWrap: 'break-word',
    //             height: '330px',
    //             overflowY: 'auto',
    //             backgroundColor: '#f0f0f0',
    //             padding: '10px',
    //             borderRadius: '15px',
    //             margin: 'auto',
    //             padding: '25px',
    //             borderRadius: '8px',
    //             width: "70%",
    //             fontSize: "16px",
    //             marginTop: '30px',
    //             border: '1px solid #ddd'

    //           }}
    //         >
    //           {fileContent}
    //         </pre>
    //       </Grid>
    //       <Button
    //       variant="contained"
    //       color="primary"
    //       component="label"
    //       className='btn-border'
    //       onClick={() => setDepositDataDialogOpen(true)}
    //     >
    //       Processing
    //     </Button>
    //     </>
    //     )
    //     : (

    //       <CustomTable data={parsedData} datacolumns={tableColumns} />
    //     )
    //   )}

    //   <Button
    //     variant="contained"
    //     component="label"
    //     className='back-btn'
    //     color='success'
    //     onClick={() => navigate('/patient/payment')}> <LeftOutlined style={{ fontSize: '17px', padding: '12px', marginRight: '15px', borderRadius: '100%', background: 'rgb(174 219 152 / 55%)' }} />Cancel</Button>
    //   {/* {fileContent && */}
    //   {/* } */}



    //   <CustomDialog
    //     open={depositDataDialogOpen}
    //     onClose={handleDepositDataDialogClose}
    //     title={"Deposit Data"}
    //   >
    //     <CustomTable data={parsedData} datacolumns={tableColumns} />
    //   </CustomDialog>
    // </div>

    <Grid container mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Grid md={2}>
        <ul className="MuiList-root MuiList-padding MuiList-subheader css-1dzu48i-MuiList-root">
          <div className="MuiButtonBase-root MuiListItemButton-root MuiListItemButton-gutters MuiListItemButton-root MuiListItemButton-gutters css-1l447zp-MuiButtonBase-root-MuiListItemButton-root"
            tabindex="0" role="button" id="dashboard-button">
            <div className="MuiListItemIcon-root css-s9qt9o-MuiListItemIcon-root">
              <span role="img" aria-label="dashboard" className="anticon anticon-dashboard" style={{fontSize: "1rem"}}>
                <svg viewBox="64 64 896 896" focusable="false" data-icon="dashboard" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                  <path d="M924.8 385.6a446.7 446.7 0 00-96-142.4 446.7 446.7 0 00-142.4-96C631.1 123.8 572.5 112 512 112s-119.1 11.8-174.4 35.2a446.7 446.7 0 00-142.4 96 446.7 446.7 0 00-96 142.4C75.8 440.9 64 499.5 64 560c0 132.7 58.3 257.7 159.9 343.1l1.7 1.4c5.8 4.8 13.1 7.5 20.6 7.5h531.7c7.5 0 14.8-2.7 20.6-7.5l1.7-1.4C901.7 817.7 960 692.7 960 560c0-60.5-11.9-119.1-35.2-174.4zM761.4 836H262.6A371.12 371.12 0 01140 560c0-99.4 38.7-192.8 109-263 70.3-70.3 163.7-109 263-109 99.4 0 192.8 38.7 263 109 70.3 70.3 109 163.7 109 263 0 105.6-44.5 205.5-122.6 276zM623.5 421.5a8.03 8.03 0 00-11.3 0L527.7 506c-18.7-5-39.4-.2-54.1 14.5a55.95 55.95 0 000 79.2 55.95 55.95 0 0079.2 0 55.87 55.87 0 0014.5-54.1l84.5-84.5c3.1-3.1 3.1-8.2 0-11.3l-28.3-28.3zM490 320h44c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8h-44c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8zm260 218v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8zm12.7-197.2l-31.1-31.1a8.03 8.03 0 00-11.3 0l-56.6 56.6a8.03 8.03 0 000 11.3l31.1 31.1c3.1 3.1 8.2 3.1 11.3 0l56.6-56.6c3.1-3.1 3.1-8.2 0-11.3zm-458.6-31.1a8.03 8.03 0 00-11.3 0l-31.1 31.1a8.03 8.03 0 000 11.3l56.6 56.6c3.1 3.1 8.2 3.1 11.3 0l31.1-31.1c3.1-3.1 3.1-8.2 0-11.3l-56.6-56.6zM262 530h-80c-4.4 0-8 3.6-8 8v44c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8v-44c0-4.4-3.6-8-8-8z">
                  </path>
                </svg>
              </span>
            </div>
            <div className="MuiListItemText-root css-tlelie-MuiListItemText-root">
              <h6 className="MuiTypography-root MuiTypography-h6 css-1sx7tm3-MuiTypography-root">Medical Records</h6>
            </div>
            <span role="img" aria-label="down" className="anticon anticon-down" style={{fontSize: "0.625rem", marginLeft: "1px" }}>
              <ChevronRight />
            </span>
          </div>
        </ul>
      </Grid>
      <Grid md={10}>
        <Card>
          <CardContent>
            <Typography variant='h4'>Medical Record Summary</Typography>

              <div className="section">
                  <h2>Patient Information</h2>
                  <p><strong>Name:</strong> John Doe</p>
                  <p><strong>Date of Birth:</strong> 05/14/1985</p>
                  <p><strong>Gender:</strong> Male</p>
                  <p><strong>Date of Summary:</strong> 11/06/2024</p>
              </div>

              <div className="section">
                  <h2>Chief Complaint</h2>
                  <p>Chronic back pain and recent episodes of shortness of breath.</p>
              </div>

              <div className="section">
                  <h2>Medical History</h2>
                  <ul>
                      <li><strong>Hypertension</strong> – Diagnosed in 2018, well-controlled with medication.</li>
                      <li><strong>Type 2 Diabetes</strong> – Diagnosed in 2020, managed with diet, exercise, and metformin.</li>
                      <li><strong>Chronic Lower Back Pain</strong> – Present since 2019 due to a work-related injury. Managed with physical therapy and occasional pain relief medication.</li>
                  </ul>
              </div>

              <div className="section">
                  <h2>Surgical History</h2>
                  <ul>
                      <li><strong>Appendectomy</strong> – 2006</li>
                      <li><strong>Knee Arthroscopy</strong> (Right Knee) – 2015 due to a sports injury.</li>
                  </ul>
              </div>

              <div className="section">
                  <h2>Allergies</h2>
                  <ul>
                      <li><strong>Penicillin</strong> – Rash, itching</li>
                      <li><strong>Shellfish</strong> – Mild anaphylaxis</li>
                  </ul>
              </div>

              <div className="section">
                  <h2>Current Medications</h2>
                  <ul>
                      <li><strong>Lisinopril</strong> 10 mg daily (for hypertension)</li>
                      <li><strong>Metformin</strong> 500 mg twice daily (for diabetes)</li>
                      <li><strong>Ibuprofen</strong> 200 mg as needed for pain</li>
                  </ul>
              </div>

              <div className="section">
                  <h2>Recent Test Results</h2>
                  <ul>
                      <li><strong>HbA1c:</strong> 6.8% (09/2024) – Slightly above target; diabetes management adjustments recommended.</li>
                      <li><strong>Blood Pressure:</strong> 130/85 mmHg (10/2024) – Within acceptable range with current treatment.</li>
                      <li><strong>Lipid Panel:</strong> Elevated LDL cholesterol (140 mg/dL), considering dietary and medication adjustments.</li>
                  </ul>
              </div>

              <div className="section">
                  <h2>Social History</h2>
                  <ul>
                      <li><strong>Smoking:</strong> Former smoker, quit in 2018.</li>
                      <li><strong>Alcohol:</strong> Occasional, moderate intake.</li>
                      <li><strong>Occupation:</strong> Office Worker</li>
                  </ul>
              </div>

              <div className="section">
                  <h2>Treatment Plan</h2>
                  <ol>
                      <li>Continue Lisinopril and Metformin as prescribed.</li>
                      <li>Begin cholesterol-lowering diet; consider adding statin if levels do not improve by next visit.</li>
                      <li>Physical therapy referral for back pain management.</li>
                      <li>Schedule follow-up in 3 months to reassess blood glucose and lipid levels.</li>
                  </ol>
              </div>

              <div className="section">
                  <h2>Notes</h2>
                  <p>Patient advised to monitor blood sugar levels and maintain a regular exercise routine.</p>
              </div>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default NewUI;

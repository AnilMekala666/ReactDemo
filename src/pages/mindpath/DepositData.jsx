import React, { useState, useMemo } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import { UploadOutlined } from '@ant-design/icons';
import CustomDialog from 'components/payments/CustomDialog';
import CustomTable from 'components/payments/CustomTable';
import { useNavigate } from 'react-router';


const initialStaticData = [
  {
    transaction_number: "00000000",
    account_name: "Static Account 1",
    bank_name: "Bank of America",
    payment_type: "Static Payment Type",
    payer: "Static Payer 1",
    deposit_date: "2024-10-01",
    amounts: "1000.00",
    indn: "Static INDN 1",
    des: "Static DES 1",
    additional_info: "Static additional info 1",
  },
  {
    transaction_number: "11111111",
    account_name: "Static Account 2",
    bank_name: "Bank of America",
    payment_type: "Static Payment Type",
    payer: "Static Payer 2",
    deposit_date: "2024-10-02",
    amounts: "2000.00",
    indn: "Static INDN 2",
    des: "Static DES 2",
    additional_info: "Static additional info 2",
  },
];

function DepositData() {
  const navigate = useNavigate();
  const [rawData, setRawData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [parsedData, setParsedData] = useState(initialStaticData);
  const [depositDataDialogOpen, setDepositDataDialogOpen] = useState(false);
  // const [fileContent, setFileContent] = useState('');
  const [fileContent, setFileContent] = useState(`01,BANKOFAMERICA,yal82231,240328,0501,1,80,1,2/
    02,yal82231,011900571,1,240328,0501,,3/
    03,000000820772,USD/
    16,164,99860168,Z,87008524078,000000000000/
    88,ANTHEM BCBS OF C DES:E-PAYMENT  ID:EE52770016               
    88,INDN:LAWRENCE & MEMOR        CO ID:1352145715 CTX           
    88,ADDITIONAL INFORMATION IS AVAILABLE FOR THIS PMT.           
    88,CONTACT A TREASURY SALES OFFICER FOR ASSISTANCE.
    16,164,1017382,Z,87007838148,000000000000/
    88,STATE OF CT      DES:VENDOR ACH ID:57437888                 
    88,INDN:LAWRENCE AND MEM        CO ID:5066000798 CTX           
    88,ADDITIONAL INFORMATION IS AVAILABLE FOR THIS PMT.           
    88,CONTACT A TREASURY SALES OFFICER FOR ASSISTANCE.
    16,164,16815,Z,87007845071,000000000000/`);
    

  const handleDepositDataDialogClose = () => {
    // setDepositDataDialogOpen(false);
    navigate('/patient/payment')
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target.result;


        setTimeout(() => {
          setFileContent(text);
          parseBaiFile(text);
          setLoading(false);
        }, 2000);
      };
      reader.readAsText(file);
    }
  };

  // const parseBaiFile = (content) => {
  //   const lines = content.split('\n');
  //   const parsedData = [];
  //   let currentTransaction = null;

  //   // lines.forEach((line) => {
  //   //   // Split the line by commas to get parts
  //   //   const parts = line.split(',');

  //   //   // Check if the first part starts with '16' indicating a transaction record
  //   //   if (parts[0].trim() === '16') {
  //   //     currentTransaction = {
  //   //       transaction_number: parts[2] ? parts[2].trim() : '', 
  //   //       account_name: parts[1] ? parts[1].trim() : '', 
  //   //       bank_name: 'Bank of America', 
  //   //       payment_type: parts[3] ? parts[3].trim() : '', 
  //   //       payer: parts[4] ? parts[4].trim() : '',
  //   //       deposit_date: '2024-10-10', 
  //   //       amounts: parts[5] ? parts[5].trim() : '0',
  //   //       additional_info: '', 
  //   //     };
  //   //     parsedData.push(currentTransaction); // Add the new transaction to parsedData
  //   //   } else if (parts[0].trim() === '88' && currentTransaction) {
  //   //     // Append the additional information from type 88 to the current transaction
  //   //     currentTransaction.additional_info += parts.slice(1).join(',').trim() + ' '; // Append info and join rest of the line
  //   //   }
  //   // });

  //   // Update the state with the parsed transactions

  //   lines.forEach((line) => {
  //     // Split the line by commas to get parts
  //     const parts = line.split(',');

  //     // Check if the first part starts with '16' indicating a transaction record
  //     if (parts[0].trim() === '16') {
  //       currentTransaction = {
  //         transaction_number: parts[2] ? parts[2].trim() : '',
  //         account_name: parts[1] ? parts[1].trim() : '',
  //         bank_name: 'Bank of America', // Assuming a static bank name
  //         payment_type: parts[3] ? parts[3].trim() : '',
  //         payer: parts[4] ? parts[4].trim() : '',
  //         deposit_date: '2024-10-10', // Static date, you may modify as needed
  //         amounts: '0', // Amount not provided, set to a default or parse accordingly
  //         additional_info: '', // To hold combined additional info
  //         indn: '', // To hold INDN value
  //         des: '', // To hold DES value
  //       };
  //       parsedData.push(currentTransaction); // Add the new transaction to parsedData
  //     } else if (parts[0].trim() === '88' && currentTransaction) {
  //       // Extract INDN and DES from the line
  //       const indnMatch = line.match(/INDN:([^ ]+)/);
  //       const desMatch = line.match(/DES:([^ ]+)/);

  //       if (indnMatch) {
  //         currentTransaction.indn = indnMatch[1].trim();
  //       }

  //       if (desMatch) {
  //         currentTransaction.des = desMatch[1].trim();
  //       }

  //       // Append any additional information to the current transaction's additional_info
  //       currentTransaction.additional_info += parts.slice(1).join(',').trim() + ' '; // Append rest of the line
  //     }
  //   });


  //   setParsedData(parsedData);
  // };

  const parseBaiFile = (content) => {
    const lines = content.split('\n');
    const newParsedData = [];
    let currentTransaction = null;

    lines.forEach((line) => {
      const parts = line.split(',');
      if (parts[0].trim() === '16') {

        const transactionDate = parts[1] ? parts[1].trim() : ''; // Assuming parts[1] contains the transaction date
        const year = `20${transactionDate.slice(0, 2)}`; // Extracting year (e.g., "24" becomes "2024")
        const month = transactionDate.slice(2, 4); // Extracting month (e.g., "03")
        const day = transactionDate.slice(4, 6); // Extracting day (e.g., "28")
        const formattedDate = `${month}/${day}/${year}`;

        currentTransaction = {
          transaction_number: parts[2] ? parts[2].trim() : '',
          account_name: parts[1] ? parts[1].trim() : '',
          bank_name: 'Bank of America',
          payment_type: parts[3] ? parts[3].trim() : '',
          payer: parts[4] ? parts[4].trim() : '',
          deposit_date: formattedDate,
          amounts: '0',
          additional_info: '',
          indn: '',
          des: '',
        };
        newParsedData.push(currentTransaction);
      } else if (parts[0].trim() === '88' && currentTransaction) {
        const indnMatch = line.match(/INDN:([^ ]+)/);
        const desMatch = line.match(/DES:([^ ]+)/);

        if (indnMatch) {
          currentTransaction.indn = indnMatch[1].trim();
        }

        if (desMatch) {
          currentTransaction.des = desMatch[1].trim();
        }

        currentTransaction.additional_info += parts.slice(1).join(',').trim() + ' ';
      }
    });

    setParsedData(newParsedData); 
  };


  const tableColumns = useMemo(
    () => [
      { header: 'Transaction Number', accessorKey: 'transaction_number' },
      { header: 'EFT', accessorKey: 'account_name' },
      { header: 'Bank Name', accessorKey: 'bank_name' },
      { header: 'Payment Type', accessorKey: 'payment_type' },
      { header: 'Payer', accessorKey: 'payer' },
      { header: 'Deposit Date', accessorKey: 'deposit_date' },
      { header: 'Amount', accessorKey: 'amounts' },
      // { header: 'INDN', accessorKey: 'indn' }, 
      // { header: 'DES', accessorKey: 'des' },    
      // { header: 'Additional Info', accessorKey: 'additional_info' },
    ],
    []
  );


  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        component="label"
        sx={{ borderRadius: '40px', marginTop: '20px' }}
      >
        Upload File
        <input type="file" multiple hidden onChange={handleFileUpload} />
        <UploadOutlined style={{ fontSize: '20px', paddingLeft: '10px' }} />
      </Button>
      <Button 
       variant="contained"
       color="success"
       component="label"
       sx={{ borderRadius: '40px', marginTop: '20px',float:"right" }}
      onClick={() => navigate('/patient/payment')}>Back</Button>

      {loading ? (
        <div style={{ position: 'absolute', top: '10%', left: '50%' }}>
          <h3 style={{ margin: 'auto' }}>Loading...</h3>
        </div>
      ) : (
        fileContent && (
          <Grid container spacing={2} sx={{ marginTop: '20px', margin: 'auto' }}>
            <pre
              style={{
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                height: '400px',
                overflowY: 'auto',
                backgroundColor: '#f0f0f0',
                padding: '10px',
                borderRadius: '4px',
                margin: 'auto',
                padding: '25px',
                borderRadius: '8px',
                width: "70%",
                fontSize: "20px"
              }}
            >
              {fileContent}
            </pre>
          </Grid>
        )
      )}

      {/* {fileContent && */}
        <Button
          variant="contained"
          color="primary"
          component="label"
          sx={{ borderRadius: '40px', marginTop: '20px', float: "right" }}
          onClick={() => setDepositDataDialogOpen(true)}
        >
          Processing
        </Button>
      {/* } */}


      <CustomDialog
        open={depositDataDialogOpen}
        onClose={handleDepositDataDialogClose}
        title={"Deposit Data"}
      >
        <CustomTable data={parsedData} datacolumns={tableColumns} />
      </CustomDialog>
    </div>
  );
}

export default DepositData;

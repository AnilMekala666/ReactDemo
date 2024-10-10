import React, {useMemo} from 'react';
import { Button } from '@mui/material';
import ReusableTable from 'components/tableComponent/Table';


const CustomTable = ({ data }) => {
    const columns = useMemo(
        () => [
          {
            header: 'File Name',
            accessorKey: 'file_name',
            cell: ({ getValue }) => (
              <Button style={{ color: 'black' }} onClick={() => alert(`File clicked: ${getValue()}`)}>
                {getValue()}
              </Button>
            ),
          },
          {
            header: 'Classification Type',
            accessorKey: 'classification_type',
          },
          {
            header: 'Batch Date',
            accessorKey: 'batch_date',
          },
          {
            header: 'Payor',
            accessorKey: 'payer',
          },
          {
            header: 'Payment Amount',
            accessorKey: 'payment_amount',
            cell: ({ getValue }) => `$${getValue().toFixed(2)}`,
          },
        ],
        []
      );
    
      return <ReusableTable data={data} columns={columns} />;
}

export default CustomTable
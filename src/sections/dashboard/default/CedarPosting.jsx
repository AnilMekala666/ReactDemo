import PropTypes from 'prop-types';
// material-ui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';

// third-party
import { NumericFormat } from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';
import CustomTable from 'components/payments/CustomTable';


const tableColumns = [
  {
    header: 'Location', accessorKey: 'location'
  },
  {
    header: 'Total Processed', accessorKey: 'total_processed'
  },
  {
    header: 'Cedar Postings', accessorKey: 'cedar_postings'
  },
  {
    header: 'Total $ Posted', accessorKey: 'total_posted'
  },
  {
    header: '# of Exceptions', accessorKey: 'no_of_exceptions'
  },
  {
    header: '$ of Exceptions', accessorKey: 'amount_of_exceptions'
  },
  {
    header: '% of Exceptions', accessorKey: 'per_of_exceptions'
  }
];

const initialStaticData = [
  {
    "location": "AZ",
    "total_processed": "102",
    "cedar_postings": "658",
    "total_posted": "98",
    "no_of_exceptions": "658",
    "amount_of_exceptions": "$35,567",
    "per_of_exceptions": "23%",
  },
  {
    "location": "NY",
    "total_processed": "0",
    "cedar_postings": "0",
    "total_posted": "0",
    "no_of_exceptions": "0",
    "amount_of_exceptions": "$0",
    "per_of_exceptions": "0%",
  },
  {
    "location": "CH",
    "total_processed": "458",
    "cedar_postings": "565",
    "total_posted": "5667",
    "no_of_exceptions": "565",
    "amount_of_exceptions": "$24,556",
    "per_of_exceptions": "15%",
  },
  {
    "location": "MC",
    "total_processed": "445",
    "cedar_postings": "187",
    "total_posted": "568",
    "no_of_exceptions": "187",
    "amount_of_exceptions": "$4,888",
    "per_of_exceptions": "48%",
  },
  {
    "location": "FL",
    "total_processed": "65",
    "cedar_postings": "05",
    "total_posted": "884",
    "no_of_exceptions": "05",
    "amount_of_exceptions": "$58,788",
    "per_of_exceptions": "42%",
  },
  {
    "location": "AZ",
    "total_processed": "102",
    "cedar_postings": "658",
    "total_posted": "98",
    "no_of_exceptions": "658",
    "amount_of_exceptions": "$35,567",
    "per_of_exceptions": "23%",
  },
  {
    "location": "MN",
    "total_processed": "78",
    "cedar_postings": "499",
    "total_posted": "45",
    "no_of_exceptions": "499",
    "amount_of_exceptions": "$5,102",
    "per_of_exceptions": "12%",
  },
  {
    "location": "AZ",
    "total_processed": "102",
    "cedar_postings": "658",
    "total_posted": "98",
    "no_of_exceptions": "658",
    "amount_of_exceptions": "$35,567",
    "per_of_exceptions": "23%",
  },
  {
    "location": "NY",
    "total_processed": "0",
    "cedar_postings": "0",
    "total_posted": "0",
    "no_of_exceptions": "0",
    "amount_of_exceptions": "$0",
    "per_of_exceptions": "0%",
  },
  {
    "location": "CH",
    "total_processed": "458",
    "cedar_postings": "565",
    "total_posted": "5667",
    "no_of_exceptions": "565",
    "amount_of_exceptions": "$24,556",
    "per_of_exceptions": "15%",
  },
];

// ==============================|| ORDER TABLE ||============================== //

export default function CedarPosting() {
  const order = 'asc';
  const orderBy = 'tracking_no';
  return (
    <Box mt={2}>
      <CustomTable data={initialStaticData} datacolumns={tableColumns} />
      {/* <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table aria-labelledby="tableTitle">
          <EFTPostingHead order={order} orderBy={orderBy} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.tracking_no}
                >
                  <TableCell component="th" id={labelId} scope="row">
                    <Link color="secondary"> {row.tracking_no}</Link>
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell>
                    <OrderStatus status={row.carbs} />
                  </TableCell>
                  <TableCell align="right">
                    <NumericFormat value={row.protein} displayType="text" thousandSeparator prefix="$" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Box>
  );
}


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
    header: '# of Checks', accessorKey: 'no_of_checks'
  },
  {
    header: 'Total TRN', accessorKey: 'total_trn'
  },
  {
    header: 'Poster TRN', accessorKey: 'posted_trn'
  },
  {
    header: '$ of Posted TRN', accessorKey: 'amount_of_posted_trn'
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
    "no_of_checks": "102",
    "total_trn": "658",
    "posted_trn": "98",
    "amount_of_posted_trn": "$35,567",
    "no_of_exceptions": "658",
    "amount_of_exceptions": "$35,567",
    "per_of_exceptions": "23%",
  },
  {
    "location": "NY",
    "no_of_checks": "0",
    "total_trn": "0",
    "posted_trn": "0",
    "amount_of_posted_trn": "$0",
    "no_of_exceptions": "0",
    "amount_of_exceptions": "$0",
    "per_of_exceptions": "0%",
  },
  {
    "location": "CH",
    "no_of_checks": "458",
    "total_trn": "565",
    "posted_trn": "5667",
    "amount_of_posted_trn": "$24,556",
    "no_of_exceptions": "565",
    "amount_of_exceptions": "$24,556",
    "per_of_exceptions": "15%",
  },
  {
    "location": "MC",
    "no_of_checks": "445",
    "total_trn": "187",
    "posted_trn": "568",
    "amount_of_posted_trn": "$4,888",
    "no_of_exceptions": "187",
    "amount_of_exceptions": "$4,888",
    "per_of_exceptions": "48%",
  },
  {
    "location": "FL",
    "no_of_checks": "65",
    "total_trn": "05",
    "posted_trn": "884",
    "amount_of_posted_trn": "$58,788",
    "no_of_exceptions": "05",
    "amount_of_exceptions": "$58,788",
    "per_of_exceptions": "42%",
  },
  {
    "location": "AZ",
    "no_of_checks": "102",
    "total_trn": "658",
    "posted_trn": "98",
    "amount_of_posted_trn": "$35,567",
    "no_of_exceptions": "658",
    "amount_of_exceptions": "$35,567",
    "per_of_exceptions": "23%",
  },
  {
    "location": "MN",
    "no_of_checks": "78",
    "total_trn": "499",
    "posted_trn": "45",
    "amount_of_posted_trn": "$5,102",
    "no_of_exceptions": "499",
    "amount_of_exceptions": "$5,102",
    "per_of_exceptions": "12%",
  },
  {
    "location": "AZ",
    "no_of_checks": "102",
    "total_trn": "658",
    "posted_trn": "98",
    "amount_of_posted_trn": "$35,567",
    "no_of_exceptions": "658",
    "amount_of_exceptions": "$35,567",
    "per_of_exceptions": "23%",
  },
  {
    "location": "NY",
    "no_of_checks": "0",
    "total_trn": "0",
    "posted_trn": "0",
    "amount_of_posted_trn": "$0",
    "no_of_exceptions": "0",
    "amount_of_exceptions": "$0",
    "per_of_exceptions": "0%",
  },
  {
    "location": "CH",
    "no_of_checks": "458",
    "total_trn": "565",
    "posted_trn": "5667",
    "amount_of_posted_trn": "$24,556",
    "no_of_exceptions": "565",
    "amount_of_exceptions": "$24,556",
    "per_of_exceptions": "15%",
  },
];

const headCells = [
  {
    id: 'location',
    align: 'left',
    disablePadding: false,
    label: 'Location'
  },
  {
    id: 'no_of_checks',
    align: 'left',
    disablePadding: true,
    label: '# of Checks'
  },
  {
    id: 'total_trn',
    align: 'right',
    disablePadding: false,
    label: 'Total TRN'
  },
  {
    id: 'posted_trn',
    align: 'left',
    disablePadding: false,
    label: 'Poster TRN'
  },
  {
    id: 'amt_of_posted_trn',
    align: 'right',
    disablePadding: false,
    label: '$ of Posted TRN'
  },
  {
    id: 'no_of_exceptions',
    align: 'left',
    disablePadding: false,
    label: '# of Exceptions'
  },
  {
    id: 'amt_of_exceptions',
    align: 'left',
    disablePadding: false,
    label: '$ of Exceptions'
  },
  {
    id: 'per_of_exceptions',
    align: 'left',
    disablePadding: false,
    label: '% of Exceptions'
  }
];

// ==============================|| ORDER TABLE ||============================== //

export default function EFTPosting() {
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

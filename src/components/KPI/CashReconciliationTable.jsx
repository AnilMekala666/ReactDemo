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

function createData(location, no_deposits, amt_deposits, no_jpm, amt_jpm, no_cbt, amt_cbt, no_remits, amt_remits, no_acc, amt_acc, no_variance, amt_variance, no_ac, amt_ac, no_reconciled, amt_reconciled) {
  return { location, no_deposits, amt_deposits, no_jpm, amt_jpm, no_cbt, amt_cbt, no_remits, amt_remits, no_acc, amt_acc, no_variance, amt_variance, no_ac, amt_ac, no_reconciled, amt_reconciled };
}

const rows = [
  createData("AZ", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", "%", "%"),
  createData("AZ", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", "%", "%"),
  createData("AZ", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", "%", "%"),
  createData("AZ", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", "%", "%"),
  createData("AZ", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", "%", "%"),
  createData("AZ", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", "%", "%"),
  createData("AZ", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", "%", "%"),
  createData("AZ", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", "%", "%"),
  createData("AZ", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", 24, "$129,8890", "%", "%"),
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'tracking_no',
    align: 'left',
    disablePadding: false,
    label: 'Tracking No.'
  },
  {
    id: 'name',
    align: 'left',
    disablePadding: true,
    label: 'Product Name'
  },
  {
    id: 'fat',
    align: 'right',
    disablePadding: false,
    label: 'Total Order'
  },
  {
    id: 'carbs',
    align: 'left',
    disablePadding: false,

    label: 'Status'
  },
  {
    id: 'protein',
    align: 'right',
    disablePadding: false,
    label: 'Total Amount'
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function CashReconciliationTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        <TableCell rowSpan={2} className='table-head-cell' sx={{ minWidth: 108 }}>
          <Typography>Location</Typography>
        </TableCell>
        <TableCell colSpan={2} className='table-head-cell' sx={{ minWidth: 213 }}>
          <Typography>Bank Deposits</Typography>
        </TableCell>
        <TableCell colSpan={2} className='table-head-cell' sx={{ minWidth: 213 }}>
          <Typography>JPM Bank Deposits</Typography>
        </TableCell>
        <TableCell colSpan={2} className='table-head-cell' sx={{ minWidth: 213 }}>
          <Typography>CBT Bank Deposits</Typography>
        </TableCell>
        <TableCell colSpan={2} className='table-head-cell' sx={{ minWidth: 213 }}>
          <Typography>Remittances</Typography>
        </TableCell>
        <TableCell colSpan={2} className='table-head-cell' sx={{ minWidth: 213 }}>
          <Typography>A/C of Fully Reconciled</Typography>
        </TableCell>
        <TableCell colSpan={2} className='table-head-cell' sx={{ minWidth: 213 }}>
          <Typography>Variance</Typography>
        </TableCell>
        <TableCell colSpan={2} className='table-head-cell' sx={{ minWidth: 213 }}>
          <Typography>A/C Not Posted</Typography>
        </TableCell>
        <TableCell colSpan={2} className='table-head-cell' sx={{ minWidth: 213 }}>
          <Typography># Fully Reconciled</Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell className='table-head-cell' sx={{ minWidth: 107 }}>
          <Typography>#</Typography>
        </TableCell>
        <TableCell className='table-head-cell' sx={{ minWidth: 107 }}>
          <Typography className='amount'>Amount</Typography>
        </TableCell>
        <TableCell className='table-head-cell' sx={{ minWidth: 107 }}>
          <Typography>#</Typography>
        </TableCell>
        <TableCell className='table-head-cell' sx={{ minWidth: 107 }}>
          <Typography className='amount'>Amount</Typography>
        </TableCell>
        <TableCell className='table-head-cell' sx={{ minWidth: 107 }}>
          <Typography>#</Typography>
        </TableCell>
        <TableCell className='table-head-cell' sx={{ minWidth: 107 }}>
          <Typography className='amount'>Amount</Typography>
        </TableCell>
        <TableCell className='table-head-cell' sx={{ minWidth: 107 }}>
          <Typography>#</Typography>
        </TableCell>
        <TableCell className='table-head-cell' sx={{ minWidth: 107 }}>
          <Typography className='amount'>Amount</Typography>
        </TableCell>
        <TableCell className='table-head-cell' sx={{ minWidth: 107 }}>
          <Typography>#</Typography>
        </TableCell>
        <TableCell className='table-head-cell' sx={{ minWidth: 107 }}>
          <Typography className='amount'>Amount</Typography>
        </TableCell>
        <TableCell className='table-head-cell' sx={{ minWidth: 107 }}>
          <Typography>#</Typography>
        </TableCell>
        <TableCell className='table-head-cell' sx={{ minWidth: 107 }}>
          <Typography className='amount'>Amount</Typography>
        </TableCell>
        <TableCell className='table-head-cell' sx={{ minWidth: 107 }}>
          <Typography>#</Typography>
        </TableCell>
        <TableCell className='table-head-cell' sx={{ minWidth: 107 }}>
          <Typography className='amount'>Amount</Typography>
        </TableCell>
        <TableCell className='table-head-cell' sx={{ minWidth: 107 }}>
          <Typography>Count</Typography>
        </TableCell>
        <TableCell className='table-head-cell' sx={{ minWidth: 107 }}>
          <Typography className='amount'>%</Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

// ==============================|| CashReconciliation TABLE ||============================== //

export default function CashReconciliationTable() {
  const order = 'asc';
  const orderBy = 'location';

  return (
    <Box mt={2}>
      <TableContainer
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
          <CashReconciliationTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {rows.map((row, index) => {
              return (<TableRow
                hover
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                tabIndex={-1}
                key={index}
              >
                {Object.keys(row).map((cell, i) => {
                  return (
                    <TableCell className="table-body-cell" key={i}>
                      <Typography>{row[cell]}</Typography>
                    </TableCell>
                  )
                })}
              </TableRow>);
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

CashReconciliationTableHead.propTypes = { order: PropTypes.any, orderBy: PropTypes.string };

import PropTypes from 'prop-types';
// material-ui
import { useMemo } from 'react';
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
import LinearProgressBar from '../../pages/KPIs/Charts/LinearProgessBar';
import { useSelector } from 'react-redux';
import ReUsableTable from 'components/correspndence/ReUsableTable';
import { KPI_ENDPOINTS } from 'pages/rest/api';
import useAxios from 'hooks/useAxios';
import { kpiReconciliationColumns } from 'pages/KPIs/kpiTableHeaderData';
import { Skeleton, CircularProgress } from '@mui/material';
// import LinearProgressBar from 'pages/KPIs/Charts/LinearProgressBar';

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
    header: 'Total Processed', accessorKey: 'total_processed'
  },
  {
    header: 'Non Payment Postings', accessorKey: 'non_payment_postings'
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
    "no_of_checks": "102",
    "total_processed": "658",
    "non_payment_postings": "98",
    "total_posted": "$35,567",
    "no_of_exceptions": "658",
    "amount_of_exceptions": "$35,567",
    "per_of_exceptions": "23%",
  },
  {
    "location": "NY",
    "no_of_checks": "0",
    "total_processed": "0",
    "non_payment_postings": "0",
    "total_posted": "$0",
    "no_of_exceptions": "0",
    "amount_of_exceptions": "$0",
    "per_of_exceptions": "0%",
  },
  {
    "location": "CH",
    "no_of_checks": "458",
    "total_processed": "565",
    "non_payment_postings": "5667",
    "total_posted": "$24,556",
    "no_of_exceptions": "565",
    "amount_of_exceptions": "$24,556",
    "per_of_exceptions": "15%",
  },
  {
    "location": "MC",
    "no_of_checks": "445",
    "total_processed": "187",
    "non_payment_postings": "568",
    "total_posted": "$4,888",
    "no_of_exceptions": "187",
    "amount_of_exceptions": "$4,888",
    "per_of_exceptions": "48%",
  },
  {
    "location": "FL",
    "no_of_checks": "65",
    "total_processed": "05",
    "non_payment_postings": "884",
    "total_posted": "$58,788",
    "no_of_exceptions": "05",
    "amount_of_exceptions": "$58,788",
    "per_of_exceptions": "42%",
  },
  {
    "location": "AZ",
    "no_of_checks": "102",
    "total_processed": "658",
    "non_payment_postings": "98",
    "total_posted": "$35,567",
    "no_of_exceptions": "658",
    "amount_of_exceptions": "$35,567",
    "per_of_exceptions": "23%",
  },
  {
    "location": "MN",
    "no_of_checks": "78",
    "total_processed": "499",
    "non_payment_postings": "45",
    "total_posted": "$5,102",
    "no_of_exceptions": "499",
    "amount_of_exceptions": "$5,102",
    "per_of_exceptions": "12%",
  },
  {
    "location": "AZ",
    "no_of_checks": "102",
    "total_processed": "658",
    "non_payment_postings": "98",
    "total_posted": "$35,567",
    "no_of_exceptions": "658",
    "amount_of_exceptions": "$35,567",
    "per_of_exceptions": "23%",
  },
  {
    "location": "NY",
    "no_of_checks": "0",
    "total_processed": "0",
    "non_payment_postings": "0",
    "total_posted": "$0",
    "no_of_exceptions": "0",
    "amount_of_exceptions": "$0",
    "per_of_exceptions": "0%",
  },
  {
    "location": "CH",
    "no_of_checks": "458",
    "total_processed": "565",
    "non_payment_postings": "5667",
    "total_posted": "$24,556",
    "no_of_exceptions": "565",
    "amount_of_exceptions": "$24,556",
    "per_of_exceptions": "15%",
  },
];

// ==============================|| ORDER TABLE ||============================== //

export default function NonPaymentPosting() {
  const {showTable,payloadDate} = useSelector(state=>state.kpi);
  const reconciliationConfig = useMemo(() => ({
      url: KPI_ENDPOINTS.GET_RECONCILIATION_STATUS_KPI,
      method: "POST",
      data: payloadDate,
    }), [payloadDate])
  const { data:reconciliationData, loading:reconciliationLoading, error:reconciliationisError } = useAxios(reconciliationConfig, true); 
  //const denialChartData=denialKpiData?.kpiResponse;
  const order = 'asc';
  const orderBy = 'tracking_no';
  const progressData = reconciliationData?.kpiResponse;
  // const progressData = [
  //   { title: 'Fully Reconciled', value: 92 },
  //   { title: 'Pending Reconciliation', value: 8 },
  //   { title: 'Manual Intervention Required', value: 5 },
  //   { title: 'Automated Reconciliation', value: 85 },
  //   { title: 'Unreconciled', value: 10 },
  // ];
  return (
    <Box mt={2} mb={6} sx={{ minHeight: '10rem' }}>
      {reconciliationLoading && (
        <Box width={'100%'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress width={'100%'} />
        </Box>
      )}
      {!reconciliationLoading && progressData && (
        <Box sx={{ width: '90%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ width: '45%', marginRight: '1rem' }}>
            {progressData?.map((data, index) => (
              <LinearProgressBar key={index} value={data.percentage} title={data.reconciliationStatus} />
            ))}
          </Box>
          <Box sx={{ width: '45%' }}>
            <ReUsableTable columns={kpiReconciliationColumns} rows={progressData} />
          </Box>
        </Box>
      )}
    </Box>
  );
}

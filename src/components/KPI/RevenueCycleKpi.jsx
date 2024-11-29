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
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import React,{useMemo} from 'react';
import { useSelector } from 'react-redux';
import ReUsableTable from 'components/correspndence/ReUsableTable';
import Download from 'components/KPI/Download';
import { KPI_ENDPOINTS } from 'pages/rest/api';
import useAxios from 'hooks/useAxios';
import GaugeChart from 'pages/KPIs/Charts/GaugeChart';
import { revenueCycleKpiColumns } from 'pages/KPIs/kpiTableHeaderData';


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

export default function RevenueCycleKpi() {
  const {showTable,payloadDate} = useSelector(state=>state.kpi);
  const revenueCycleKpiConfig = useMemo(() => ({
      url: KPI_ENDPOINTS.GET_REVENUE_CYCLE_KPI,
      method: "POST",
      data: payloadDate,
    }), [payloadDate])
  const { data:revenueCycleKpiData, loading:revenueCycleKpiIsLoading, error:revenueCycleKpiIsError } = useAxios(revenueCycleKpiConfig, true); 
  const gaugeChartGraph = revenueCycleKpiData?.kpiResponse;
  console.log(revenueCycleKpiData,"inside the revenueCycleKpi")
  const order = 'asc';
  const orderBy = 'tracking_no';
  return (
    <Box mt={2} sx={{width:"50%"}}>
      
      <Box>
        {!showTable && gaugeChartGraph ? <Box sx={{display:'flex',flexWrap:"wrap",gap:"2rem"}}>
        {gaugeChartGraph?.map(gaugeData=><GaugeChart gaugeData={gaugeData}/>)}
        </Box> : showTable && gaugeChartGraph ? <ReUsableTable columns={revenueCycleKpiColumns} rows={gaugeChartGraph}/> :<h5>Loading....</h5>}
      </Box>
    </Box>
  );
}


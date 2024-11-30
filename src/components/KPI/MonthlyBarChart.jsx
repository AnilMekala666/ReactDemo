// material-ui
import React, { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts';
import { Stack, Typography, Tooltip,Box, Skeleton,CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { KPI_ENDPOINTS } from 'pages/rest/api';
import useAxios from 'hooks/useAxios';
import ReUsableTable from 'components/correspndence/ReUsableTable';
import { claimStatusColumns } from 'pages/KPIs/kpiTableHeaderData';
const valueFormatter = (item) => `${item.value}%`;

export const LegendItem = ({ color, label }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="12"
        viewBox="0 0 9 9"
        fill="none"
        style={{ marginTop: 10 }}
      >
        <circle cx="4.5" cy="4.8689" r="4" fill={color} />
      </svg>
      <span style={{ marginLeft: 10 }}>{label}</span>
    </>
  );
};

// ==============================|| MONTHLY PIE CHART ||============================== //

export default function MonthlyBarChart() {
  const { showTable, payloadDate } = useSelector((state) => state.kpi);
  const claimsStatusConfig = useMemo(
    () => ({
      url: KPI_ENDPOINTS.GET_CLAIMS_STATUS,
      method: 'POST',
      data: payloadDate
    }),
    [payloadDate]
  );
  const { data: claimsStatusData, loading: claimsStatusLoading, error: claimsStatusError } = useAxios(claimsStatusConfig, true);
  console.log(claimsStatusData, 'inside the claimsStatus');
  const claimsStatusPieChart = claimsStatusData?.kpiResponse
  // const claimsStatusPieChart = claimsStatusData?.kpiResponse.map((item,index)=>{
  //   return {...item,color:generateColor(index,claimsStatusData?.kpiResponse.length)};
  // })
  const theme = useTheme();
  const axisFontStyle = { fontSize: 10, fill: theme.palette.text.secondary };
  const [radius, setRadius] = React.useState(120);
  const [itemNb, setItemNb] = React.useState(5);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  const statusData = [
    { label: 'Paid', value: 150, percentage: 30, color: '#4CAF50' }, // Green for paid
    { label: 'Denied', value: 50, percentage: 10, color: '#F44336' }, // Red for denied
    { label: 'In Progress', value: 100, percentage: 20, color: '#FFC107' }, // Yellow for in progress
    { label: 'Pending', value: 70, percentage: 14, color: '#FF9800' }, // Orange for pending
    { label: 'Resubmitted', value: 60, percentage: 12, color: '#2196F3' }, // Blue for resubmitted
    { label: 'Partially Paid', value: 70, percentage: 14, color: '#9C27B0' } // Purple for partially paid
  ];

  const totalValue = useMemo(() => {
    if(claimsStatusPieChart){
      let sum = claimsStatusPieChart?.reduce((acc, item) => {
        return acc + item.count;
      }, 0);
      return sum;
    }
    
  }, [claimsStatusPieChart]);


  return (
    <>
      <Box sx={{ minHeight: `${!showTable?'20rem':'10rem' }`}}>
        {claimsStatusLoading && (
          <Box width={'100%'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress width={'100%'} />
          </Box>
        )}
        {!claimsStatusLoading && !showTable && (
          <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <Box direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 0, md: 4 }} sx={{ width: '100%'}}>
              <Box direction="column" sx={{ width: { xs: '100%', md: '50%' } }}>
                <span
                  style={{
                    position: 'relative',
                    top: 190,
                    textAlign: 'center',
                    left: -50
                  }}
                >
                  <Typography color={'#656565'} fontSize={16} fontWeight={600}>
                    Total
                  </Typography>
                  <Typography color={'#2F2F2F'} fontSize={32} fontWeight={700}>
                    {totalValue}
                  </Typography>
                </span>
                {claimsStatusData && (
                  <PieChart
                    height={300}
                    series={[
                      {
                        data: claimsStatusPieChart?.map(({ status, percentage }) => ({
                          label: status,
                          value: percentage
                        })),
                        innerRadius: radius,
                        valueFormatter: (v, { dataIndex }) => {
                          const { status, count, percentage } = claimsStatusPieChart[dataIndex];
                          return `${percentage}% (${count})`;
                        }
                      }
                    ]}
                    //skipAnimation={skipAnimation}
                    slotProps={{
                      legend: {
                        direction: 'column',
                        position: { vertical: 'middle', horizontal: 'right' }
                        //padding:20,
                      }
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        )}
        {showTable && <Box sx={{maxWidth:"40%",margin:"auto",display:"flex",justifyContent:"center",alignItems:"center"}}><ReUsableTable columns={claimStatusColumns} rows={claimsStatusPieChart || []} /></Box>}
      </Box>
    </>
  );
}

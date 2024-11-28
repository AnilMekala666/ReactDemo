// material-ui
import React, { useMemo } from 'react';
import { useTheme } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts';
import { Stack, Typography, Tooltip } from '@mui/material';

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
    { label: 'Partially Paid', value: 70, percentage: 14, color: '#9C27B0' }, // Purple for partially paid
  ];

  const totalValue=useMemo(()=>{
    let sum=statusData.reduce((acc,item)=>{
      return acc+item.value
    },0)
    return sum;
  },[])

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 0, md: 4 }}
      sx={{ width: '100%' }}
    >
      <Stack direction="column" sx={{ width: { xs: '100%', md: '50%' } }}>
        <span
          style={{
            position: 'relative',
            top: 190,
            textAlign: 'center',
            left: -50,
          }}
        >
          <Typography color={'#656565'} fontSize={16} fontWeight={600}>
            Total
          </Typography>
          <Typography color={'#2F2F2F'} fontSize={32} fontWeight={700}>
            {totalValue}
          </Typography>
        </span>
        <PieChart
          height={300}
          series={[
            {
              data: statusData.map(({ label, percentage, color }) => ({
                label,
                value: percentage,
                color,
              })),
              innerRadius: radius,
              valueFormatter: (v, { dataIndex }) => {
                const { label,value,percentage } = statusData[dataIndex];
                return `${percentage}% (${value})`;
              },
            },
          ]}
          skipAnimation={skipAnimation}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 0, md: 4 }}
          sx={{
            width: '100%',
            marginTop: 1,
            textAlign: 'center',
            display: 'block',
          }}
        >
          {statusData.map((series) => (
            <LegendItem color={series.color} label={series.label} />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

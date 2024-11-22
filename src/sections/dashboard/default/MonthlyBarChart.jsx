// material-ui
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { PieChart } from '@mui/x-charts';
import { Stack, Typography } from '@mui/material';

const data = [80, 95, 70, 42, 65, 55, 78];
const xLabels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
const valueFormatter = (item) => `${item.value}%`;

export const LegendItem = ({ color, label}) => {
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
}

// ==============================|| MONTHLY BAR CHART ||============================== //

export default function MonthlyBarChart() {
  const theme = useTheme();
  const axisFonstyle = { fontSize: 10, fill: theme.palette.text.secondary };
  const [radius, setRadius] = React.useState(120);
  const [itemNb, setItemNb] = React.useState(5);
  const [skipAnimation, setSkipAnimation] = React.useState(false);
  
  const chart1 = [
    {
      label: 'Cleared Payments',
      value: 50,
      color: '#EB7724'
    },
    {
      label: 'Reconciled Discrepancies',
      value: 50,
      color: '#3A63D2'
    },
  ];

  const chart2 = [
    {
      label: 'Variance',
      value: 20,
      color: '#3A63D2'
    },
    {
      label: 'Bai Expections',
      value: 20,
      color: '#EB7724'
    },
    {
      label: 'Waiting for Pasting',
      value: 25,
      color: '#478E30'
    },
    {
      label: 'Remit Missing',
      value: 15,
      color: "#B2493A"
    },
    {
      label: 'Remit Not Matching Deposit',
      value: 18,
      color: "#9967B6"
    },
  ];

  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setItemNb(newValue);
  };
  const handleRadius = (event, newValue) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setRadius(newValue);
  };

  return (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      spacing={{ xs: 0, md: 4 }}
      sx={{ width: '100%' }}
    >
      <Stack direction="column" sx={{ width: { xs: '100%', md: '50%' } }}>
        <span style={{ position: 'relative', top: 190, textAlign: 'center', left: -50 }}>
          <Typography color={"#656565"} fontSize={16} fontWeight={600}>
            Total
          </Typography>
          <Typography color={"#2F2F2F"} fontSize={32} fontWeight={700}>
            $99M
          </Typography>
        </span>
        <PieChart
          height={300}
          series={[
            {
              data: chart1,
              innerRadius: radius,
              valueFormatter,
            },
          ]}
          skipAnimation={skipAnimation}
          slotProps={{
            legend: {
              hidden: true
            },
          }}
        />
        
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 0, md: 4 }}
          sx={{ width: '100%', marginTop: 1, textAlign: 'center', display: 'block' }}
        >
          {chart1.map((series) => (
            <LegendItem
              color={series.color}
              label={series.label}
              />
          ))}
        </Stack>
      </Stack>
      <Stack direction="column" sx={{ width: { xs: '100%', md: '50%' } }}>
        <span style={{ position: 'relative', top: 190, textAlign: 'center', left: 0 }}>
          <Typography color={"#656565"} fontSize={16} fontWeight={600}>
            Total
          </Typography>
          <Typography color={"#2F2F2F"} fontSize={32} fontWeight={700}>
            $656M
          </Typography>
        </span>
        <PieChart
          height={300}
          series={[
            {
              data: chart2,
              innerRadius: radius,
              valueFormatter,
            },
          ]}
          skipAnimation={skipAnimation}
          margin={{ right: 0, top: 0 }}
          slotProps={{
            legend: {
              hidden: true
            },
          }}
        />
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 0, md: 4 }}
          sx={{ width: '100%', marginTop: 1, textAlign: 'center', display: 'block' }}
        >
          {chart2.map((series) => (
            <LegendItem
              color={series.color}
              label={series.label}
              />
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
}

import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { BarPlot, ChartsXAxis, ChartsYAxis, ChartsGrid, ChartsTooltip, LineChart, LinePlot, MarkPlot } from '@mui/x-charts';

// project import
import MainCard from 'components/MainCard';
import InvoiceWidgetCard from './InvoiceWidgetCard';

const datasets = [
  {
    name: 'Total',
    data: [
      { data1: 23, data2: 30, month: 'Jan' },
      { data1: 11, data2: 25, month: 'Feb' },
      { data1: 22, data2: 36, month: 'Mar' },
      { data1: 27, data2: 30, month: 'Apr' },
      { data1: 13, data2: 45, month: 'May' },
      { data1: 22, data2: 35, month: 'Jun' },
      { data1: 37, data2: 64, month: 'Jul' },
      { data1: 21, data2: 52, month: 'Aug' },
      { data1: 44, data2: 59, month: 'Sep' },
      { data1: 22, data2: 36, month: 'Oct' },
      { data1: 30, data2: 39, month: 'Nov' },
      { data1: 25, data2: 35, month: 'Dec' }
    ]
  },
  {
    name: 'Dataset 2',
    data: [
      { data1: 10, data2: 12, month: 'Jan' },
      { data1: 15, data2: 18, month: 'Feb' },
      { data1: 8, data2: 15, month: 'Mar' },
      { data1: 12, data2: 17, month: 'Apr' },
      { data1: 11, data2: 12, month: 'May' },
      { data1: 7, data2: 10, month: 'Jun' },
      { data1: 10, data2: 14, month: 'Jul' },
      { data1: 13, data2: 16, month: 'Aug' },
      { data1: 22, data2: 25, month: 'Sep' },
      { data1: 10, data2: 17, month: 'Oct' },
      { data1: 18, data2: 20, month: 'Nov' },
      { data1: 4, data2: 8, month: 'Dec' }
    ]
  },

  {
    name: 'Dataset 3',
    data: [
      { data1: 12, data2: 17, month: 'Jan' },
      { data1: 11, data2: 25, month: 'Feb' },
      { data1: 22, data2: 36, month: 'Mar' },
      { data1: 27, data2: 30, month: 'Apr' },
      { data1: 13, data2: 45, month: 'May' },
      { data1: 22, data2: 35, month: 'Jun' },
      { data1: 37, data2: 64, month: 'Jul' },
      { data1: 21, data2: 52, month: 'Aug' },
      { data1: 44, data2: 59, month: 'Sep' },
      { data1: 22, data2: 36, month: 'Oct' },
      { data1: 30, data2: 39, month: 'Nov' },
      { data1: 25, data2: 35, month: 'Dec' }
    ]
  },

  {
    name: 'Dataset 4',
    data: [
      { data1: 1, data2: 5, month: 'Jan' },
      { data1: 2, data2: 3, month: 'Feb' },
      { data1: 3, data2: 5, month: 'Mar' },
      { data1: 5, data2: 6, month: 'Apr' },
      { data1: 1, data2: 7, month: 'May' },
      { data1: 0, data2: 0, month: 'Jun' },
      { data1: 2, data2: 3, month: 'Jul' },
      { data1: 0, data2: 1, month: 'Aug' },
      { data1: 6, data2: 7, month: 'Sep' },
      { data1: 1, data2: 3, month: 'Oct' },
      { data1: 5, data2: 5, month: 'Nov' },
      { data1: 3, data2: 4, month: 'Dec' }
    ]
  }
];

// ==============================|| INVOICE - CHART CARD ||============================== //

export default function InvoiceChartCard() {
  const theme = useTheme();
  const [activeChart, setActiveChart] = useState(0);

  const widgetData = [
    { title: 'Total', count: '£5678.09', percentage: 20.3, isLoss: true, invoice: '3', color: theme.palette.warning },
    { title: 'Paid', count: '£5678.09', percentage: -8.73, isLoss: true, invoice: '5', color: theme.palette.error },
    { title: 'Pending', count: '£5678.09', percentage: 1.73, isLoss: false, invoice: '20', color: theme.palette.success },
    { title: 'Overdue', count: '£5678.09', percentage: -4.7, isLoss: true, invoice: '5', color: theme.palette.primary }
  ];

  const series = [
    { type: 'bar', id: 'teamA', dataKey: 'data1', color: theme.palette.warning.main, label: 'Team A' },
    { type: 'line', id: 'teamB', dataKey: 'data2', color: theme.palette.warning.main, label: 'Team B' }
  ];

  const handleDatasetChange = (index) => {
    setActiveChart(index);
  };

  const axisFonstyle = { fontSize: 10, fill: theme.palette.text.secondary };

  return (
    <MainCard>
      <Grid container spacing={2}>
        {widgetData.map((data, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box onClick={() => handleDatasetChange(index)} sx={{ cursor: 'pointer' }}>
              <InvoiceWidgetCard
                title={data.title}
                count={data.count}
                percentage={data.percentage}
                isLoss={data.isLoss}
                invoice={data.invoice}
                color={data.color.main}
                isActive={index === activeChart}
              />
            </Box>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ width: 1 }}>
        <LineChart
          series={series}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'month',
              disableLine: true,
              tickPlacement: 'middle',
              tickLabelStyle: { ...axisFonstyle, fontSize: 12 }
            }
          ]}
          yAxis={[{ id: 'leftAxis', min: 0, disableLine: true, disableTicks: true, tickLabelStyle: axisFonstyle, tickMaxStep: 10 }]}
          slotProps={{ legend: { hidden: true } }}
          dataset={datasets[activeChart].data}
          height={274}
          margin={{ right: 20, left: 30, bottom: 20 }}
          sx={{
            '& .MuiBarElement-series-teamA': { fill: "url('#barGradient')" },
            '& .MuiChartsAxis-directionX .MuiChartsAxis-tick': { stroke: theme.palette.divider }
          }}
        >
          <ChartsGrid horizontal />
          <BarPlot />
          <LinePlot />
          <MarkPlot />
          <ChartsXAxis />
          <ChartsYAxis />
          <ChartsTooltip />
        </LineChart>
        <svg width="0" height="0">
          <defs>
            <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={theme.palette.background.default} stopOpacity={0.1} />
              <stop offset="100%" stopColor={theme.palette.warning.main} stopOpacity={0.1} />
            </linearGradient>
          </defs>
        </svg>
      </Box>
    </MainCard>
  );
}

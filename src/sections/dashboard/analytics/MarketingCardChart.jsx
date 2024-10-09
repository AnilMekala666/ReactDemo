// material-ui
import { alpha, useTheme } from '@mui/material/styles';

import { LineChart } from '@mui/x-charts';

// Define the data points for the line chart
const data = [100, 140, 100, 240, 115, 125, 90, 100, 80, 150, 160, 150, 170, 155, 150, 160, 145, 200, 140, 160];

// ==============================|| ANALYTICS - MARKETING ||============================== //

export default function MarketingCardChart() {
  const theme = useTheme();

  return (
    <LineChart
      height={100}
      leftAxis={null}
      bottomAxis={null}
      margin={{ top: -49, bottom: 0, left: 0, right: 0 }}
      series={[
        {
          curve: 'linear',
          data,
          showMark: false,
          area: true,
          id: 'MarketingChart',
          color: theme.palette.primary.main,
          label: 'Marketing',
          valueFormatter: (value) => `$ ${value}`
        }
      ]}
      slotProps={{
        legend: { hidden: true },
        popper: { sx: { thead: { display: 'none' }, '& .MuiChartsTooltip-root': { border: '1px solid ', borderColor: 'grey.200' } } }
      }}
      sx={{
        '& .MuiLineElement-root': { strokeWidth: 1.5 },
        '& .MuiAreaElement-series-MarketingChart': { fill: `url('#myGradient3')`, paintOrder: 'stroke' }
      }}
    >
      <defs>
        <linearGradient id="myGradient3" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor={alpha(theme.palette.primary.main, 0.2)} />
          <stop offset="100%" stopColor={alpha(theme.palette.background.default, 0.4)} />
        </linearGradient>
      </defs>
    </LineChart>
  );
}

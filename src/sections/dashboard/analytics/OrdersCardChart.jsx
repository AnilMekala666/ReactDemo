// material-ui
import { alpha, useTheme } from '@mui/material/styles';

import { LineChart } from '@mui/x-charts';

// Define data for the chart
const data = [1800, 1500, 1800, 1700, 1400, 1200, 1000, 800, 600, 500, 600, 800, 500, 700, 400, 600, 500, 600];

// ==============================|| ANALYTICS - ORDERS ||============================== //

export default function OrdersCardChart() {
  const theme = useTheme();

  return (
    <LineChart
      height={100}
      leftAxis={null}
      bottomAxis={null}
      margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
      series={[{ type: 'line', label: 'Orders', data, showMark: false, area: true, id: 'Order', color: theme.palette.error.main }]}
      slotProps={{
        legend: { hidden: true },
        popper: {
          sx: {
            '& .MuiChartsTooltip-root': { border: '1px solid ', borderColor: 'grey.200' },
            thead: { display: 'none' }
          }
        }
      }}
      sx={{
        '& .MuiLineElement-root': { strokeWidth: 4 },
        '& .MuiAreaElement-series-Order': { fill: "url('#orderGradient')" }
      }}
    >
      <defs>
        <linearGradient id="orderGradient" gradientTransform="rotate(90)">
          <stop offset="10%" stopColor={alpha(theme.palette.error.main, 0.4)} />
          <stop offset="110%" stopColor={alpha(theme.palette.background.default, 0.4)} />
        </linearGradient>
      </defs>
    </LineChart>
  );
}

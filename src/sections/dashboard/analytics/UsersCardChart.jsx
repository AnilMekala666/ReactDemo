// material-ui
import { alpha, useTheme } from '@mui/material/styles';

import { BarChart } from '@mui/x-charts/BarChart';

const data = [
  220, 230, 240, 220, 225, 215, 205, 195, 185, 150, 185, 195, 80, 205, 215, 225, 240, 225, 215, 205, 80, 215, 225, 240, 215, 210, 190
];

// ==============================|| ANALYTICS - USERS ||============================== //

export default function UsersCardChart() {
  const theme = useTheme();

  return (
    <BarChart
      height={100}
      series={[{ data, label: 'Users', color: alpha(theme.palette.primary.main, 0.85) }]}
      leftAxis={null}
      bottomAxis={null}
      axisHighlight={{ x: 'none' }}
      tooltip={{ trigger: 'item' }}
      slotProps={{
        legend: { hidden: true },
        popper: { sx: { '& .MuiChartsTooltip-root': { border: '1px solid ', borderColor: 'grey.200' } } }
      }}
      margin={{ top: -49, bottom: 0, left: 5, right: 5 }}
      sx={{ '& .MuiBarElement-root:hover': { opacity: 0.6 } }}
    />
  );
}

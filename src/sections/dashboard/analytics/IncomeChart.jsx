import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts';

const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const byWeekVolume = [100, 20, 60, 20, 20, 80, 20];
const byWeekMargin = [51, 40, 28, 51, 42, 109, 100];
const byWeekSales = [21, 40, 28, 51, 42, 109, 100];

const byMonthVolume = [100, 40, 60, 40, 40, 40, 80, 40, 40, 50, 40, 40];
const byMonthSales = [90, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35];
const byMonthMargin = [120, 85, 101, 98, 87, 105, 91, 114, 94, 86, 115, 35];

// ==============================|| ANALYTICS - INCOME ||============================== //

export default function IncomeChart({ slot, quantity }) {
  const theme = useTheme();

  const [data, setData] = useState(byMonthVolume);
  const [labels, setLabels] = useState(monthLabels);

  useEffect(() => {
    switch (slot) {
      case 'week':
        setData(quantity === 'By margin' ? byWeekMargin : quantity === 'By sales' ? byWeekSales : byWeekVolume);
        setLabels(weekLabels);
        break;
      case 'month':
        setData(quantity === 'By margin' ? byMonthMargin : quantity === 'By sales' ? byMonthSales : byMonthVolume);
        setLabels(monthLabels);
        break;
    }
  }, [slot, quantity]);

  const axisFonstyle = { fontSize: 10, fill: theme.palette.text.secondary };
  const line = theme.palette.divider;

  return (
    <LineChart
      grid={{ horizontal: true, vertical: true }}
      xAxis={[{ data: labels, scaleType: 'point', disableLine: true, tickLabelStyle: { ...axisFonstyle, fontSize: 12 } }]}
      yAxis={[{ disableLine: true, disableTicks: true, tickLabelStyle: axisFonstyle, tickMaxStep: 10 }]}
      series={[
        {
          curve: 'linear',
          data,
          showMark: false,
          area: true,
          id: 'IncomeChart',
          color: theme.palette.primary.main,
          label: 'Income',
          valueFormatter: (value) => `$ ${value}`
        }
      ]}
      slotProps={{ legend: { hidden: true } }}
      height={355}
      margin={{ top: 30, bottom: 50, left: 45, right: 22 }}
      sx={{
        '& .MuiLineElement-root': { strokeDasharray: '0', strokeWidth: 1 },
        '& .MuiAreaElement-series-IncomeChart': { fill: `url('#myGradient3')`, paintOrder: 'stroke' },
        '& .MuiChartsAxis-directionX .MuiChartsAxis-tick': { stroke: line }
      }}
    >
      <defs>
        <linearGradient id="myGradient3" gradientTransform="rotate(90)">
          <stop offset="10%" stopColor={alpha(theme.palette.primary.main, 0.2)} />
          <stop offset="80%" stopColor={alpha(theme.palette.background.default, 0.4)} />
        </linearGradient>
      </defs>
    </LineChart>
  );
}

IncomeChart.propTypes = { slot: PropTypes.oneOf(['week', 'month']), quantity: PropTypes.oneOf(['By margin', 'By sales', 'By volume']) };

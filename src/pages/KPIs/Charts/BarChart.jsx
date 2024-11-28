import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { BarChart } from '@mui/x-charts/BarChart';

// ==============================|| REUSABLE BAR CHART COMPONENT ||============================== //

const ReusableChart = ({
  graphData,
  xAxisKey = 'month',
  seriesKeys = [
    { key: 'totalClaims', label: 'Total Claims', color: '#3A63D2' },
    { key: 'totalRemittances', label: 'Total Remittance', color: '#EB7724' },
    { key: 'reconciliationRate', label: 'Reconciliation Rate', color: 'yellow' },
  ],
  axisFontStyle = { fontSize: 10, fill: '#6b7280' }, // Default font style
  chartHeight = 380,
  valueFormatter = (value) => `${value}`,
  checkboxes = [
    { label: 'Monthly', key: 'showMonthly' },
    { label: 'Today', key: 'showToday' },
  ],
  showCheckboxes = true,
}) => {
  const theme = useTheme();
  const [checkboxStates, setCheckboxStates] = useState(
    checkboxes.reduce((acc, checkbox) => ({ ...acc, [checkbox.key]: true }), {})
  );

  const handleCheckboxChange = (key) => {
    setCheckboxStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const xAxisLabels = graphData.map((item) => item[xAxisKey]);
  const chartSeries = seriesKeys.map((series) => ({
    data: graphData.map((item) => item[series.key]),
    label: series.label,
    color: series.color,
    valueFormatter,
  }));

  return (
    <Grid sx={{ mt: 1 }} content={false}>
      <Grid sx={{ p: 2.5, pb: 0 }}>
        {/* <Stack direction="row" justifyContent="space-between" alignItems="center">
          <FormGroup>
            <Stack direction="row">
              {showCheckboxes &&
                checkboxes.map((checkbox) => (
                  <FormControlLabel
                    key={checkbox.key}
                    control={
                      <Checkbox
                        checked={checkboxStates[checkbox.key]}
                        onChange={() => handleCheckboxChange(checkbox.key)}
                        sx={{
                          '&.Mui-checked': { color: seriesKeys[0].color },
                          '&:hover': { backgroundColor: theme.palette.action.hover },
                        }}
                      />
                    }
                    label={checkbox.label}
                  />
                ))}
            </Stack>
          </FormGroup>
        </Stack> */}

        <BarChart
          height={chartHeight}
          grid={{ horizontal: true }}
          xAxis={[
            {
              data: xAxisLabels,
              scaleType: 'band',
              categoryGapRatio: 0.5,
              barGapRatio: 0.05,
              tickLabelStyle: { ...axisFontStyle, fontSize: 12 },
            },
          ]}
          yAxis={[
            {
              disableLine: true,
              disableTicks: true,
              tickMaxStep: 20,
              tickLabelStyle: axisFontStyle,
            },
          ]}
          series={chartSeries.map((series) => ({ ...series, type: 'bar' }))}
          slotProps={{
            legend: { hidden: true },
            bar: { rx: 5, ry: 5, style: { width: 24 } },
          }}
          axisHighlight={{ x: 'none' }}
          margin={{ top: 30, left: 40, right: 10 }}
          tooltip={{ trigger: 'item' }}
          sx={{
            '& .MuiBarElement-root:hover': { opacity: 0.6 },
            '& .MuiChartsAxis-directionX .MuiChartsAxis-tick, & .MuiChartsAxis-root line': {
              stroke: theme.palette.divider,
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default ReusableChart;

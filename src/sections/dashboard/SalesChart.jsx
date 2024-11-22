import { useState } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { BarChart } from '@mui/x-charts/BarChart';

// project import
import MainCard from 'components/MainCard';
import { Grid } from '@mui/material';

// ==============================|| SALES COLUMN CHART ||============================== //

export default function SalesChart() {
  const theme = useTheme();

  const [showIncome, setShowIncome] = useState(true);
  const [showCostOfSales, setShowCostOfSales] = useState(true);

  const handleIncomeChange = () => {
    setShowIncome(!showIncome);
  };

  const handleCostOfSalesChange = () => {
    setShowCostOfSales(!showCostOfSales);
  };

  const valueFormatter = (value) => `$ ${value} Thousands`;
  const primaryColor = "#3A63D2";
  const warningColor = "#EB7724";

  const lables = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
  const data = [
    { data: [180, 90, 135, 114, 120], label: 'Income', color: primaryColor, valueFormatter },
    { data: [120, 45, 78, 150, 168], label: 'Cost of Sales', color: warningColor, valueFormatter }
  ];

  const axisFonstyle = { fontSize: 10, fill: theme.palette.text.secondary };

  return (
    <Grid sx={{ mt: 1 }} content={false}>
      <Grid sx={{ p: 2.5, pb: 0 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {/* <Box>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Net Profit
            </Typography>
            <Typography variant="h4">$1560</Typography>
          </Box> */}

          {/* <FormGroup>
            <Stack direction="row">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showIncome}
                    onChange={handleIncomeChange}
                    sx={{ '&.Mui-checked': { color: warningColor }, '&:hover': { backgroundColor: alpha(warningColor, 0.08) } }}
                  />
                }
                label="Income"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={showCostOfSales}
                    onChange={handleCostOfSalesChange}
                    sx={{ '&.Mui-checked': { color: primaryColor } }}
                  />
                }
                label="Cost of Sales"
              />
            </Stack>
          </FormGroup> */}
        </Stack>

        <BarChart
          height={380}
          grid={{ horizontal: true }}
          xAxis={[{ data: lables, scaleType: 'band', categoryGapRatio: 0.8,
            barGapRatio: 0.05, tickLabelStyle: { ...axisFonstyle, fontSize: 12 } }]}
          yAxis={[{ disableLine: true, disableTicks: true, tickMaxStep: 20, tickLabelStyle: axisFonstyle }]}
          series={data
            .filter((series) => (series.label === 'Income' && showIncome) || (series.label === 'Cost of Sales' && showCostOfSales))
            .map((series) => ({ ...series, type: 'bar' }))}
          slotProps={{ legend: { hidden: true }, bar: { rx: 5, ry: 5, style: { width: 24 } } }}
          axisHighlight={{ x: 'none' }}
          margin={{ top: 30, left: 40, right: 10 }}
          tooltip={{ trigger: 'item' }}
          sx={{
            // '.MuiBarElement-series-auto-generated-id-1': { transform: "translate3d(90.63px, 130px, 0px) !important" },
            '& .MuiBarElement-root:hover': { opacity: 0.6 },
            '& .MuiChartsAxis-directionX .MuiChartsAxis-tick, & .MuiChartsAxis-root line': { stroke: theme.palette.divider }
          }}
        />
        <Grid container mt={1} >
          <Grid item xs={12} textAlign="center">
            <FormControlLabel
              control={
                <Checkbox
                  checked={showIncome}
                  onChange={handleIncomeChange}
                  sx={{ '&.Mui-checked': { color: warningColor }, '&:hover': { backgroundColor: alpha(warningColor, 0.08) } }}
                />
              }
              label="Monthly"
            />
            <FormControlLabel
              control={
                <Checkbox

                  checked={showCostOfSales}
                  onChange={handleCostOfSalesChange}
                  sx={{ '&.Mui-checked': { color: primaryColor } }}
                />
              }
              label="Today"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

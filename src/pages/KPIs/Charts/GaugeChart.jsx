import React from 'react';
import { Box } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

const GaugeChart = ({ gaugeData }) => {
  const { value, kpi } = gaugeData;
  const formattedValue= value<=100 ? value : 100;
  return (
    <Box sx={{ width: '200px' }}>
      <Gauge
        valueMax={kpi=='Days in A/R'?35:100}
        width={200}
        height={150}
        value={Number(formattedValue.toFixed(2))}
        startAngle={-110}
        endAngle={110}
        sx={{
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 20,
            transform: 'translate(0px, 0px)'
          }
        }}
        text={({ value, valueMax }) => `${value} / ${valueMax}`}
      />
      <h4 style={{ textAlign: 'center', marginTop: '0' }}>{kpi}</h4>
    </Box>
  );
};

export default GaugeChart;

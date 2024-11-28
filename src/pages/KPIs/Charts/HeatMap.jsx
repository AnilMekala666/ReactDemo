import React from 'react';
import { Tooltip, Box, Typography } from '@mui/material';

// Props: scatterData, xStep, yStep
const HeatMap = ({ scatterData, xStep = 5, yStep = 500000 }) => {
  // Determine boundaries for the chart
  const xMax = Math.max(...scatterData.map((d) => d.x)) + xStep;
  const yMax = Math.max(...scatterData.map((d) => d.y)) + yStep;

  // Generate color intensity based on value
  const getIntensityColor = (value) => {
    const maxY = Math.max(...scatterData.map((d) => d.y));
    const intensity = value / maxY; // Normalize the value to range [0, 1]
    const red = Math.round(255 * (1 - intensity));
    const green = Math.round(255 * intensity);
    const blue = 150; // Fixed blue component for a cooler tone
    return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column-reverse',
        position: 'relative',
        width: '100%',
        height: '500px',
        padding: '40px',
      }}
    >
      {/* Y-Axis Labels */}
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          bottom: 40,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          zIndex: 1,
        }}
      >
        {Array.from({ length: yMax / yStep + 1 }).map((_, idx) => (
          <Typography
            key={idx}
            sx={{
              fontSize: 12,
              color: '#666',
            }}
          >
            {idx * yStep}
          </Typography>
        ))}
      </Box>

      {/* Heatmap Grid */}
      <Box
        sx={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: `repeat(${xMax / xStep}, 1fr)`,
          gridTemplateRows: `repeat(${yMax / yStep}, 1fr)`,
          border: '1px solid #ddd',
          backgroundColor: '#f9f9f9',
        }}
      >
        {/* Render grid cells */}
        {Array.from({ length: (xMax / xStep) * (yMax / yStep) }).map((_, idx) => {
          const cellIntensityValue = ((idx % (xMax / xStep)) + 1) * yStep;
          return (
            <Box
              key={idx}
              sx={{
                border: '1px solid #e0e0e0',
                backgroundColor: getIntensityColor(cellIntensityValue),
              }}
            />
          );
        })}

        {/* Render data points */}
        {scatterData.map(({ x, y, label }, idx) => (
          <Tooltip key={idx} title={<Typography>{label}</Typography>} arrow>
            <Box
              sx={{
                position: 'absolute',
                left: `${(x / xMax) * 100}%`,
                bottom: `${(y / yMax) * 100}%`,
                transform: 'translate(-50%, 50%)',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#ff5722',
                border: '2px solid #fff',
                '&:hover': {
                  backgroundColor: '#e64a19',
                },
              }}
            />
          </Tooltip>
        ))}
      </Box>

      {/* X-Axis Labels */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 1,
        }}
      >
        {Array.from({ length: xMax / xStep + 1 }).map((_, idx) => (
          <Typography
            key={idx}
            sx={{
              fontSize: 12,
              color: '#666',
            }}
          >
            {idx * xStep}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default HeatMap;

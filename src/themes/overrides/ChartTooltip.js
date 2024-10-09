// ==============================|| OVERRIDES - CHART TOOLTIP ||============================== //

export default function ChartTooltip(theme) {
  return {
    MuiChartsTooltip: {
      styleOverrides: {
        container: {
          overflow: 'hidden'
        },
        table: {
          '& thead tr td': {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.default
          }
        },
        mark: {
          border: 'none'
        }
      }
    }
  };
}

export const remittanceSummaryColumns = [
    { id: 'month', label: 'Month' },
    { id: 'totalClaims', label: 'Total Claims' },
    {
      id: 'totalRemittances',
      label: 'Total Remittances',
      align: 'right',
      format: (value) => value.toLocaleString(),
    },
    {
      id: 'reconciliationRate',
      label: 'Reconciliation Rate',
      align: 'right',
      format: (value) => value.toLocaleString(),
    },
  ];
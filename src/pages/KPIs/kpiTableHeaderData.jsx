export const remittanceSummaryColumns = [
    { id: 'month', label: 'Month' },
    { id: 'totalClaims', label: 'Total Claims' },
    {
      id: 'totalRemittances',
      label: 'Total Remittances',
      format: (value) => value.toLocaleString(),
    },
    {
      id: 'reconciliationRate',
      label: 'Reconciliation Rate',
      format: (value) => value.toFixed(2)
    },
  ];



  export const claimStatusColumns = [
    { id: 'status', label: 'Status' },
    { id: 'count', label: 'Count' },
    {
      id: 'percentage',
      label: 'Percentage %',
     // align: 'right',
     format: (value) => `${value.toFixed(2)}%`
    },
  ];


  export const remittanceAnalysisColumns = [
    { id: 'payer', label: 'Payer', headerStyle: { fontWeight: 'bold' } },
    { id: 'avgProcessingTime', label: 'Avg. Processing Time', align: 'right' },
    {
      id: 'totalRemittanceAmount',
      label: 'Total Remittance Amount',
      align: 'right',
      format: (value) => `$${value.toFixed(2)}`,
      cellStyle: { color: 'green', fontWeight: 'bold' },
    },
  ];


export const denialKpiColumns = [
  { id: 'denialReason', label: 'Denial Reason' },
  { id: 'count', label: 'Count' },
  {
    id: 'percentage',
    label: 'Percentage %',
    align: 'center',
    format: (value) => value.toFixed(2)
  },
  { id: 'potentialRevenueLoss', label: 'Potential Revenue Loss',align:"center" },
];



export const kpiReconciliationColumns = [
  { id: 'reconciliationStatus', label: 'Reconciliation Status' },
  { id: 'percentage', label: 'Percentage %',format: (value) => value.toFixed(2) },
];


export const ageBucketColumns = [
  { id: 'ageBucket', label: 'Age Bucket' },
  { id: 'claimCount', label: 'Claims Count' },
  { id: 'remittanceAmount', label: 'Remittance Amount',format: (value) => value.toFixed(2) },
];



export const revenueCycleKpiColumns = [
  { id: 'kpi', label: 'KPI' },
  { id: 'value', label: 'Value',format: (value) => value.toFixed(2), },
  { id: 'target', label: 'Target' },
];

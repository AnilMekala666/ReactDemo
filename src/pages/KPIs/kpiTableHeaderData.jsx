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



  export const claimStatusColumns = [
    { id: 'label', label: 'Status' },
    { id: 'value', label: 'Count' },
    {
      id: 'percentage',
      label: 'Percentage %',
     // align: 'right',
      format: (value) => value.toLocaleString(),
    },
  ];


  export const remmitanceAnalysisColumns = [
    { id: 'payer', label: 'Payer' },
    { id: 'avgProcessingTime', label: 'Avg.Processing Time' },
    {
      id: 'totalRemittanceAmount',
      label: 'Total Remittance Amount',
     // align: 'right',
      format: (value) => value.toLocaleString(),
    },
  ];


export const denialKpiColumns = [
  { id: 'denialReason', label: 'Denial Reason' },
  { id: 'count', label: 'Count' },
  {
    id: 'percentage',
    label: 'Percentage %',
    align: 'center',
    format: (value) => value.toLocaleString(),
  },
  { id: 'potentialRevenueLoss', label: 'Potential Revenue Loss',align:"center" },
];



export const kpiReconciliationColumns = [
  { id: 'reconciliationStatus', label: 'Reconciliation Status' },
  { id: 'percentage', label: 'Percentage %' },
];


export const ageBucketColumns = [
  { id: 'ageBucket', label: 'Age Bucket' },
  { id: 'claimCount', label: 'Claims Count' },
  { id: 'remittanceAmount', label: 'Remittance Amount' },
];



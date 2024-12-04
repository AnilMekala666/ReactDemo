export const remittanceSummaryColumns = [
  { id: 'month', label: 'Month', align: 'left', headerStyle: { fontWeight: 'bold' }, cellStyle: { color: 'black' } },
  { id: 'totalClaims', label: 'Total Claims', align: 'right', headerStyle: { fontWeight: 'bold' } },
  {
    id: 'totalRemittances',
    label: 'Total Remittances',
    align: 'right',
    headerStyle: { fontWeight: 'bold' },
    cellStyle: { color: 'blue' },
    format: (value) => value,
  },
  {
    id: 'reconciliationRate',
    label: 'Reconciliation Rate',
    align: 'right',
    headerStyle: { fontWeight: 'bold' },
    cellStyle: { color: 'green', },
    format: (value) => `${value.toFixed(2)}%`,
  },
]



export const claimStatusColumns = [
  {
    id: 'status',
    label: 'Status',
    align: 'left', // Alignment for the column
    headerStyle: { fontWeight: 'bold', color: '#555' }, // Optional header styling
    cellStyle: { color: '#333' }, // Optional cell styling
  },
  {
    id: 'count',
    label: 'Count',
    align: 'right', // Right-aligned column
    headerStyle: { fontWeight: 'bold', color: '#555' }, // Optional header styling
    cellStyle: { color: '#333' }, // Optional cell styling
  },
  {
    id: 'percentage',
    label: 'Percentage (%)',
    align: 'right', // Right-aligned column
    headerStyle: { fontWeight: 'bold', color: '#555' }, // Optional header styling
    cellStyle: { color: '#0073e6' }, // Optional cell styling for percentage
    format: (value) => `${value.toFixed(2)}%`, // Formatting function
  },
];



  export const remittanceAnalysisColumns = [
    { id: 'payer', label: 'Payer', headerStyle: { fontWeight: 'bold' } },
    { id: 'avgProcessingTime', label: 'Avg. Processing Time', align: 'right' },
    {
      id: 'totalRemittanceAmount',
      label: 'Total Remittance Amount',
      align: 'right',
      format: (value) => `$${value.toLocaleString()}`,
      cellStyle: { color: 'green', fontWeight: 'bold' },
    },
  ];


  export const denialKpiColumns = [
    {
      id: 'denialReason',
      label: 'Denial Reason',
      align: 'left', // Default alignment for text
      headerStyle: { fontWeight: 'bold', color: '#555' }, // Optional header styling
      cellStyle: { color: '#333' }, // Optional cell styling
    },
    {
      id: 'count',
      label: 'Count',
      align: 'right', // Right-aligned for numeric values
      headerStyle: { fontWeight: 'bold', color: '#555' }, // Optional header styling
      cellStyle: { color: '#333' }, // Optional cell styling
    },
    {
      id: 'percentage',
      label: 'Percentage (%)',
      align: 'right', // Center-aligned column
      headerStyle: { fontWeight: 'bold', color: '#555' }, // Optional header styling
      cellStyle: { color: '#0073e6' }, // Optional cell styling for percentage
      format: (value) => `${value.toFixed(2)}%`, // Formatting function
    },
    {
      id: 'potentialRevenueLoss',
      label: 'Potential Revenue Loss',
      align: 'right', // Center-aligned column
      headerStyle: { fontWeight: 'bold', color: '#555' }, // Optional header styling
      cellStyle: { color: '#d32f2f' }, // Optional cell styling for emphasis
      format: (value) => `${value.toLocaleString()}`
    },
  ];
  



  export const kpiReconciliationColumns = [
    {
      id: 'reconciliationStatus',
      label: 'Reconciliation Status',
      align: 'left', // Default alignment for text
      headerStyle: { fontWeight: 'bold', color: '#555' }, // Optional header styling
      cellStyle: { color: '#333' }, // Optional cell styling
    },
    {
      id: 'percentage',
      label: 'Percentage (%)',
      align: 'right', // Right-aligned for numerical values
      headerStyle: { fontWeight: 'bold', color: '#555' }, // Optional header styling
      cellStyle: { color: '#00796b' }, // Optional cell styling for percentage
      format: (value) => `${value.toFixed(2)}%`, // Formatting function for percentage with two decimal places and a "%" sign
    },
  ];
  


  export const ageBucketColumns = [
    {
      id: 'ageBucket',
      label: 'Age Bucket',
      align: 'left', // Default alignment for text
      headerStyle: { fontWeight: 'bold', color: '#555' }, // Optional header styling
      cellStyle: { color: '#333' }, // Optional cell styling
    },
    {
      id: 'claimCount',
      label: 'Claims Count',
      align: 'right', // Right-aligned for numerical values
      headerStyle: { fontWeight: 'bold', color: '#555' }, // Optional header styling
      cellStyle: { color: '#333' }, // Optional cell styling
    },
    {
      id: 'remittanceAmount',
      label: 'Remittance Amount',
      align: 'right', // Right-aligned for numerical values
      headerStyle: { fontWeight: 'bold', color: '#555' }, // Optional header styling
      cellStyle: { color: '#00796b' }, // Optional cell styling for emphasis
      format: (value) => `$${value.toFixed(2)}`, // Formatting function for remittance amount with two decimal places and a "$" sign
    },
  ];
  



export const revenueCycleKpiColumns = [
  {
    id: 'kpi',
    label: 'KPI',
    align: 'left', // Default alignment for text
    headerStyle: { fontWeight: 'bold', color: '#555' }, // Optional header styling
    cellStyle: { color: '#333', }, // Optional cell styling
  },
  {
    id: 'value',
    label: 'Value',
    align: 'right', // Right-aligned for numerical values
    headerStyle: { fontWeight: 'bold', color: '#555' }, // Optional header styling
    cellStyle: { color: '#00796b' }, // Optional cell styling for value emphasis
    format: (value) => value.toFixed(2), // Formatting function for numerical values
  },
  {
    id: 'target',
    label: 'Target',
    align: 'right', // Right-aligned for consistency with numerical data
    headerStyle: { fontWeight: 'bold', color: '#555' }, // Optional header styling
    cellStyle: { color: '#333' }, // Optional cell styling
  },
];

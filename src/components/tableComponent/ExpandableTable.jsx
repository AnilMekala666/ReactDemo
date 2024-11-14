
import React from 'react';


import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';

// third-party
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable,
  getExpandedRowModel
} from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';

// project-import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import IconButton from 'components/@extended/IconButton';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import InvoiceCard from 'components/cards/invoice/InvoiceCard';
import InvoiceChart from 'components/cards/invoice/InvoiceChart';
import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import EmptyReactTable from 'pages/tables/react-table/empty';
import AlertColumnDelete from 'sections/apps/kanban/Board/AlertColumnDelete';
import { ImagePath, getImageUrl } from 'utils/getImageUrl';

import { APP_DEFAULT_PATH } from 'config';

import { handlerDelete, deleteInvoice, useGetInvoice, useGetInvoiceMaster } from 'api/invoice';
import { openSnackbar } from 'api/snackbar';

import {
  CSVExport,
  DebouncedInput,
  HeaderSort,
  IndeterminateCheckbox,
  RowSelection,
  SelectColumnSorting,
  TablePagination,
} from 'components/third-party/react-table';

// assets
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';


export const fuzzyFilter = (row, columnId, value, addMeta) => {
  // rank the item
  const itemRank = rankItem(row.getValue(columnId), value);
  

  // store the ranking info
  addMeta(itemRank);

  // return if the item should be filtered in/out
  return itemRank.passed;
};

function TableCellWithFilterComponent({ filterComponent, children, ...props }) {
  return (
    <TableCell {...props}>
      {children}
      {filterComponent && typeof filterComponent === 'object' && <Box mt={1}>{filterComponent}</Box>}
    </TableCell>
  );
}

const exactValueFilter = (row, columnId, filterValue) => {
  return String(row.getValue(columnId)) === String(filterValue);
};

function ExactValueFilter({ column: { filterValue, setFilter } }) {
  return (
    <input value={filterValue || ''} onChange={(e) => setFilter(e.target.value || undefined)} placeholder="Filter by exact value..." />
  );
}

// ==============================|| REACT TABLE - LIST ||============================== //

function ReactTable({ data, columns, expandedColumns }) {
  const navigation = useNavigate();
  const theme = useTheme();
  // const groups = ['All', ...new Set(data.map((item) => item.status))];

  const countGroup = data?.map((item) => item.status);
  const counts = countGroup?.reduce(
    (acc, value) => ({
      ...acc,
      [value]: (acc[value] || 0) + 1
    }),
    {}
  );

  // const [activeTab, setActiveTab] = useState(groups[0]);
  const [sorting, setSorting] = useState([{}]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [expanded, setExpanded] = React.useState({});
  const [tableData, setTableData] = useState(data);

  useEffect(()=>{
    setTableData((data) => data.map((row) => {
      return({...row, active: false})
    }));
  }, [])

  const handleClick = (id) => {
    console.log("Called", data.map((row, index) => index === id ? {...row, active: !row.active} : row), id);
    setTableData((data) => data.map((row, index) => index === id ? {...row, active: !row.active} : row));
  };

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      columnFilters,
      sorting,
      rowSelection,
      globalFilter,
      expanded
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getRowCanExpand: () => true,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: fuzzyFilter,
    debugTable: true,
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: row => row.subRows,
  });

  let headers = [];
  columns.map(
    (columns) =>
      // @ts-ignore
      columns.accessorKey &&
      headers.push({
        label: typeof columns.header === 'string' ? columns.header : '#',
        // @ts-ignore
        key: columns.accessorKey
      })
  );

// const jsonData = [
//   {
//       "state_name": "AZ",
//       "batch_date": "2024-01-02",
//       "payer": "Unknown or Mixed",
//       "payment_amount": 0.0,
//       "file_name": "671_1",
//       "classification_type": "Correspondence"
//   },
//   {
//       "state_name": "AZ",
//       "batch_date": "2024-01-02",
//       "payer": "HealthEquity Inc",
//       "payment_amount": 52.76,
//       "file_name": "10010945",
//       "classification_type": "Payments"
//   },
//   {
//       "state_name": "AZ",
//       "batch_date": "2024-01-02",
//       "payer": "Unknown or Mixed",
//       "payment_amount": 0.0,
//       "file_name": "669_1",
//       "classification_type": "Correspondence"
//   },
//   {
//       "state_name": "AZ",
//       "batch_date": "2024-01-04",
//       "payer": "Unknown or Mixed",
//       "payment_amount": 0.0,
//       "file_name": "674_1",
//       "classification_type": "Correspondence"
//   },
//   {
//       "state_name": "AZ",
//       "batch_date": "2024-01-04",
//       "payer": "Unknown or Mixed",
//       "payment_amount": 91.29,
//       "file_name": "1720",
//       "classification_type": "Payments"
//   },
//   {
//       "state_name": "AZ",
//       "batch_date": "2024-01-04",
//       "payer": "Unknown or Mixed",
//       "payment_amount": 0.0,
//       "file_name": "674_2",
//       "classification_type": "Correspondence"
//   },
//   {
//       "state_name": "AZ",
//       "batch_date": "2024-01-08",
//       "payer": "Unknown or Mixed",
//       "payment_amount": 0.0,
//       "file_name": "676_1",
//       "classification_type": "Correspondence"
//   },
//   {
//       "state_name": "AZ",
//       "batch_date": "2024-01-08",
//       "payer": "ComPsych",
//       "payment_amount": 462.74,
//       "file_name": "8291352",
//       "classification_type": "Payments"
//   },
//   {
//       "state_name": "AZ",
//       "batch_date": "2024-01-09",
//       "payer": "Unknown or Mixed",
//       "payment_amount": 0.0,
//       "file_name": "678_1",
//       "classification_type": "Correspondence"
//   },
//   {
//       "state_name": "AZ",
//       "batch_date": "2024-01-10",
//       "payer": "Unknown or Mixed",
//       "payment_amount": 0.0,
//       "file_name": "680_2",
//       "classification_type": "Correspondence"
//   }
// ]


  function getKey(arr, val) {
    return [...arr].find(([key, value]) => val === value)[0];
  }

  const renderHeaderRow = (header, index) => {
    // console.log(header)

    return (
      <TableCellWithFilterComponent
        key={index}
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Box>{flexRender(header.header)}</Box>
        </Stack>
      </TableCellWithFilterComponent>
    );
  }

  return (
    <MainCard content={false}>
      <ScrollX>
        <Stack sx={{padding:'0'}}>
          <RowSelection selected={Object.keys(rowSelection).length} />
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead 
                sx={{
                  '& th': { borderTop: '1px solid ', borderTopColor: 'divider', borderBottom: `2px solid ${theme.palette.divider} !important` },
                  position: 'sticky',
                  top: 0,
                  zIndex: 1,
                  backgroundColor: theme.palette.background.paper, // Ensure the header has a background
                }}
              >
                <TableRow>
                <TableCellWithFilterComponent
                >

                </TableCellWithFilterComponent>
                  {columns.map((header, index) => renderHeaderRow(header, index))}
                </TableRow>
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row, index) => (
                  <>
                    <TableRow key={index}>
                      <TableCellWithFilterComponent onClick={() => handleClick(index)}>
                        {!row.original.active &&
                          <ChevronRightIcon />
                        }
                        {row.original.active &&
                          <ExpandMoreRounded />
                        }
                      </TableCellWithFilterComponent>
                      {Object.keys(row.original).filter(k => k != "subRows" && k != "active" && k != "id").map((cell, i) => (
                        <TableCellWithFilterComponent onClick={() => handleClick(index)} key={i}>
                          {flexRender(row.original[cell])}
                        </TableCellWithFilterComponent>
                      ))}
                    </TableRow>
                    {row.original.active &&
                      <>
                        {row.originalSubRows && row.originalSubRows.map((row, ix) => {
                          console.log("Row expanded")
                          return (
                            <>
                              <TableRow key={ix}>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                {Object.keys(row).map((key, xi) => {
                                  return (
                                    <>
                                      <TableCell sx={{border: `1px solid #999`,
                                                borderBottom: "1px solid !important"}}>{key}:</TableCell>
                                      <TableCell sx={{
                                        border: `1px solid #999`,
                                        borderBottom: "1px solid !important"
                                      }}>{row[key]}</TableCell>
                                    </>
                                  )})
                                }
                               </TableRow>
                            </>
                            )
                          })
                        }
                      </>
                    }
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <>
            <Divider />
            <Box sx={{ p: 2 }}>
              <TablePagination
                {...{
                  setPageSize: table.setPageSize,
                  setPageIndex: table.setPageIndex,
                  getState: table.getState,
                  getPageCount: table.getPageCount
                }}
              />
            </Box>
          </>
        </Stack>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| INVOICE LIST ||============================== //

export default function ReusableExpandableTable({data, columns, expandedColumns}) {
  const theme = useTheme();
  const navigation = useNavigate();
  const { invoiceLoading, invoice: list } = useGetInvoice();
  const { invoiceMaster } = useGetInvoiceMaster();

  const [invoiceId, setInvoiceId] = useState(0);
  const [getInvoiceId, setGetInvoiceId] = useState(0);

  return (
    <>
      <Grid spacing={2}>
   
        <Grid item xs={12}>
          <Grid item xs={12}>
            {data && data.length > 0 ? (
              <ReactTable data={data} columns={columns} expandedColumns={expandedColumns} />
            ) : (
              <Typography>No data available</Typography>
            )}
          </Grid> 
        </Grid>
      </Grid>
    </>
  );
}

TableCellWithFilterComponent.propTypes = { filterComponent: PropTypes.any, props: PropTypes.any };

ExactValueFilter.propTypes = { column: PropTypes.object };

ReactTable.propTypes = { data: PropTypes.array, columns: PropTypes.array };


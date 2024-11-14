/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
// import React, { useState } from 'react';
// import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Divider, Stack } from '@mui/material';
// import { useReactTable, getCoreRowModel, getPaginationRowModel } from '@tanstack/react-table';

// import {
//   CSVExport,
//   DebouncedInput,
//   HeaderSort,
//   IndeterminateCheckbox,
//   RowSelection,
//   SelectColumnSorting,
//   TablePagination
// } from'components/third-party/react-table';

// function ReusableTable({ data, columns }) {
//   const [sorting, setSorting] = useState([]);
//   const [pagination, setPagination] = useState({ pageSize: 10, pageIndex: 0 });


//   const table = useReactTable({
//     data,
//     columns,
//     state: { sorting, pagination },
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onPaginationChange: setPagination,
//   });

//   return (
//     <Box>
//       {/* Table */}
//       <TableContainer>
//         <Table>
//           <TableHead>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <TableCell key={header.id}>
//                     {header.isPlaceholder ? null : header.column.columnDef.header}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHead>
//           <TableBody>
//             {table.getRowModel().rows.map((row) => (
//               <TableRow key={row.id}>
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id}>
//                     {cell.column.columnDef.cell(cell.getContext())}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
//         <Pagination
//           sx={{ '& .MuiPaginationItem-root': { my: 0.5 } }}
//           count={getPageCount()}
//           page={getState().pagination.pageIndex + 1}
//           onChange={handleChangePagination}
//           color="primary"
//           variant="combined"
//           showFirstButton
//           showLastButton
//         />
//       </Grid>
//     </Box>
//   );
// }

// export default ReusableTable;



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

function ReactTable({ data, columns }) {
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
  const [expanded, setExpanded] = React.useState({})

  const table = useReactTable({
    data,
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
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
                        Object.assign(header.column.columnDef.meta, {
                          className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
                        });
                      }

                      return (
                        <TableCellWithFilterComponent
                          key={header.id}
                          {...header.column.columnDef.meta}
                          onClick={header.column.getToggleSortingHandler()}
                          {...(header.column.getCanSort() &&
                            header.column.columnDef.meta === undefined && {
                            className: 'cursor-pointer prevent-select'
                          })}
                        >
                          {header.isPlaceholder ? null : (
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                              {header.column.getCanSort() && <HeaderSort column={header.column} />}
                            </Stack>
                          )}
                        </TableCellWithFilterComponent>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody>
                {table.getRowModel().rows.map((row, index) => (
                  <TableRow key={index}  >
                    {row.getVisibleCells().map((cell, i) => (
                      <TableCellWithFilterComponent key={i} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCellWithFilterComponent>
                    ))}
                  </TableRow>
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

export default function ReusableTable({data, columns}) {
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
              <ReactTable data={data} columns={columns} />
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


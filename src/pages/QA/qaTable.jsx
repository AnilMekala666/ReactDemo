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
import Paper from '@mui/material/Paper';
// third-party
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  useReactTable
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
  TablePagination
} from 'components/third-party/react-table';

// assets
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';
import EditOutlined from '@ant-design/icons/EditOutlined';
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import QaTablePagination from './qaTablePagination';

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

function QaReactTable({ data, columns, totalCount, pageCount, fetchData, pageIndex, setPageIndex, refreshTable, saveFile  }) {
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
  const [sorting, setSorting] = useState([
    {
      id: 'customer_name',
      desc: false
    }
  ]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  const handlePaginationChange = (pageIndex, pageSize) => {
    fetchData(pageIndex, pageSize); // Call the API with new pagination parameters
};




  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      sorting,
      rowSelection,
      globalFilter
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
    debugTable: true
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


  return (
    <MainCard content={false}>
      <ScrollX>
        <Stack sx={{padding:'0'}}>
          <RowSelection selected={Object.keys(rowSelection).length} />
          <TableContainer sx={{ maxHeight: 310 }}>
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
              {/* <TableBody>
                {table.getRowModel().rows.map((row, index) => (
                  <TableRow key={row.id}  sx={{ backgroundColor: index % 2 === 0 ? theme.palette.action.hover : 'inherit' }}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCellWithFilterComponent key={cell.id} {...cell.column.columnDef.meta}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCellWithFilterComponent>
                    ))}
                  </TableRow>
                ))}
              </TableBody> */}
              <TableBody>
            {data.length > 0 ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 0 ? theme.palette.action.hover : 'inherit' }}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCellWithFilterComponent key={cell.id} {...cell.column.columnDef.meta}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCellWithFilterComponent>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} align="center">
                  <Typography>No data available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
            </Table>
          </TableContainer>
          <>
            <Divider />
            <Box sx={{ p: 2 }}>
             <QaTablePagination
              totalCount={totalCount}
              pageCount={pageCount} // Pass pageCount to TablePagination
              setPageSize={table.setPageSize}
              setPageIndex={table.setPageIndex}
              getState={table.getState}
              onPaginationChange={handlePaginationChange} // Pass the function
              refreshTable = {refreshTable}
              saveFile = {saveFile}
            />
            </Box>
          </>
        </Stack>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| INVOICE LIST ||============================== //

export default function QaReusableTable({data, columns, pageCount, totalCount, fetchData, pageIndex, setPageIndex, refreshTable, saveFile}) {
  const theme = useTheme();
  const navigation = useNavigate();
  const { invoiceLoading, invoice: list } = useGetInvoice();
  const { invoiceMaster } = useGetInvoiceMaster();

  const [invoiceId, setInvoiceId] = useState(0);
  const [getInvoiceId, setGetInvoiceId] = useState(0);




  return (
    <>
      <Grid container spacing={2}>
   
        <Grid item xs={12}>
          <Grid item xs={12}>
            {data && data.length > 0 ? (
              <QaReactTable data={data} columns={columns} totalCount={totalCount} pageCount={pageCount} fetchData={fetchData}  pageIndex={pageIndex} // Pass pageIndex
            setPageIndex={setPageIndex} refreshTable = {refreshTable} saveFile={saveFile} />
            ) : (
              // <Typography>No data available</Typography>
              <QaReactTable data={[]} columns={columns} totalCount={0}  pageCount={0} fetchData={fetchData} /> 
            )}
          </Grid> 
        </Grid>
      </Grid>
    </>
  );
}

TableCellWithFilterComponent.propTypes = { filterComponent: PropTypes.any, props: PropTypes.any };

ExactValueFilter.propTypes = { column: PropTypes.object };

QaReactTable.propTypes = { data: PropTypes.array, columns: PropTypes.array,   totalCount: PropTypes.number.isRequired,  fetchData: PropTypes.func.isRequired, pageCount: PropTypes.number.isRequired,  };

/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// Define a custom class for striped rows
const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .even-row': {
    backgroundColor: theme.palette.grey[50], // Light color for even rows
  },
  '& .odd-row': {
    backgroundColor: theme.palette.grey[0], // Light color for odd rows
  },
}));

const ReusableDataGrid = ({ rows, columns }) => {
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 3 });

  const handlePaginationChange = (newPagination) => {
    setPaginationModel(newPagination);
  };

  return (
    <StyledDataGrid
      style={{ minHeight: '600px', maxHeight: '800px' }}
      rows={rows}
      columns={columns}
      checkboxSelection
      disableRowSelectionOnClick
      pageSizeOptions={[3, 5, 10, 15]}
      pagination
      paginationModel={paginationModel}
      onPaginationModelChange={handlePaginationChange}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
      }
      sx={{
        '& .MuiDataGrid-columnHeader': {
          bgcolor: 'grey.200',
        },
        '& .MuiCheckbox-root': {
          color: 'grey.500',
          '&.Mui-checked': { color: 'grey.700' },
        },
        '& .MuiDataGrid-footerContainer': {
          justifyContent: 'center',
        },
      }}
    />
  );
};

export default ReusableDataGrid;
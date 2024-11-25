/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// ==============================|| TABLE PAGINATION ||============================== //

export default function QaTablePagination({ pageCount, setPageIndex, saveFile,  refreshTable, setPageSize, getState, initialPageSize, onPaginationChange }) {
  const [open, setOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  let options = [10, 25, 50, 100];

  if (initialPageSize) {
    options = [...options, initialPageSize]
      .filter((item, index) => [...options, initialPageSize].indexOf(item) === index)
      .sort(function (a, b) {
        return a - b;
      });
  }

  // eslint-disable-next-line
  // useEffect(() => setPageSize(initialPageSize || 10), []);


  useEffect(() => {
    setPageSize(initialPageSize || 10);
  }, [initialPageSize, setPageSize]);


  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  // const handleChangePagination = (event, value) => {
  //   setPageIndex(value - 1);
  //   onPaginationChange(value - 1, getState().pagination.pageSize); // Trigger API call
  // };


  const handleChangePagination = (event, value) => {
    const newPageIndex = value - 1; // Convert to 0-based index
    setPageIndex(newPageIndex);
    setPageNumber(newPageIndex)
    onPaginationChange(newPageIndex, getState().pagination.pageSize); // Trigger API call
  };


  const handleChange = (event) => {
    const newSize = Number(event.target.value);
    setPageSize(newSize);
    setCurrentPageSize(newSize);
    setPageIndex(0); // Reset to first page
    setPageNumber(0);
    onPaginationChange(0, newSize); // Trigger API call
  };

useEffect(() => {
setPageNumber(0);
setPageSize(10);
}, [refreshTable, saveFile,  setPageSize ])



  // const pageCount = Math.ceil(totalCount / getState().pagination.pageSize);


  return (
    <Grid spacing={1} container alignItems="center" justifyContent="space-between" sx={{ width: 'auto' }}>
      <Grid item>
        <Stack direction="row" spacing={1} alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography variant="caption" color="secondary">
              Rows per page
            </Typography>
            <FormControl sx={{ m: 1 }}>
              <Select
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={getState().pagination.pageSize}
                // value={currentPageSize} // Use the currentPageSize variable
                onChange={handleChange}
                size="small"
                sx={{ '& .MuiSelect-select': { py: 0.75, px: 1.25 } }}
              >
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Typography variant="caption" color="secondary">
            Go to
          </Typography>
          <TextField
            size="small"
            type="number"
            // value={getState().pagination.pageIndex + 1}
            value={pageNumber + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              setPageIndex(page);
              setPageNumber(page);
              onPaginationChange(page, getState().pagination.pageSize); // Trigger API call
            }}
            sx={{ '& .MuiOutlinedInput-input': { py: 0.75, px: 1.25, width: 36 } }}
          />
        </Stack>
      </Grid>
      <Grid item sx={{ mt: { xs: 2, sm: 0 } }}>
        <Pagination
          sx={{ '& .MuiPaginationItem-root': { my: 0.5 } }}
          count={pageCount}
          // page={getState().pagination.pageIndex + 1}
          page={pageNumber + 1} // Ensure this reflects the current page index
          onChange={handleChangePagination}
          color="primary"
          variant="combined"
          showFirstButton
          showLastButton
        />
      </Grid>
    </Grid>
  );
}

QaTablePagination.propTypes = {
  // totalCount: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired, // Update prop type
  getPageCount: PropTypes.func,
  setPageIndex: PropTypes.func,
  setPageSize: PropTypes.func,
  getState: PropTypes.func,
  initialPageSize: PropTypes.number,
  onPaginationChange: PropTypes.func.isRequired ,// New prop for API call
  saveFile: PropTypes.any, // Ensure saveFile is defined in prop types
};

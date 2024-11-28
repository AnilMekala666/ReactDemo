import React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const ReUsableTable = ({ columns, rows, clickableColumns = [], onClickHandler }) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead className="table-title">
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className="body-text">
                        {rows.length > 0 ? (
                            rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                const isClickable = clickableColumns.includes(column.id);
                                                const isDocumentNameColumn = column.id === 'name';

                                                // Determine if the cell should be clickable based on the document name
                                                const shouldBeClickable = isClickable && 
                                                    (row.name === 'EOB' || row.name === 'Medical records request');
                                                return (
                                                    // <TableCell
                                                    //     key={column.id}
                                                    //     align={column.align}
                                                    //     onClick={isClickable ? () => onClickHandler(column.id, row) : null}
                                                    //     style={{
                                                    //         cursor: isClickable ? 'pointer' : 'default',
                                                    //         color: isClickable ? '#1677ff' : '',
                                                    //         fontWeight: isDocumentNameColumn ? 'bold' : 'normal',
                                                    //     }}
                                                    // >
                                                    //     {column.format && typeof value === 'number' ? column.format(value) : value}
                                                    // </TableCell>
                                                    <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    onClick={shouldBeClickable ? () => onClickHandler(column.id, row) : null}
                                                    style={{
                                                        cursor: shouldBeClickable ? 'pointer' : 'default',
                                                        color: shouldBeClickable ? '#1677ff' : 'black', // Set color to black for non-clickable
                                                        fontWeight: isDocumentNameColumn ? 'bold' : 'normal',
                                                    }}
                                                >
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} align="center">
                                    No Data
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[ 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default ReUsableTable;

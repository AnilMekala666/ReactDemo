import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import MainCard from 'components/MainCard';
import { CSVExport } from 'components/third-party/react-table';

const ReusableTable = ({ columns, rows, title, exportFilename }) => {
  return (
    <MainCard
      content={false}
      title={title}
      secondary={<CSVExport data={rows} headers={columns.map((col) => col.label)} filename={exportFilename} />}
    >
      <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label={title}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || 'left'}
                  sx={column.headerStyle || {}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => (
              <TableRow hover key={rowIndex}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align || 'left'}
                    sx={column.cellStyle || {}}
                  >
                    {column.format ? column.format(row[column.id]) : row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
};

ReusableTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      align: PropTypes.string,
      format: PropTypes.func,
      headerStyle: PropTypes.object,
      cellStyle: PropTypes.object,
    })
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string.isRequired,
  exportFilename: PropTypes.string.isRequired,
};

export default ReusableTable;

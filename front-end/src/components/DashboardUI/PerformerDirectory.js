import React from 'react';
import Paper from '@mui/material/Paper';

import { DataGrid } from '@mui/x-data-grid';

import { performersData as rows } from '../../data/index';
import { Box } from '@mui/material';

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 200,
  },
  {
    field: 'srcode',
    headerName: 'SR-Code',
    type: 'string',
  },
  {
    field: 'campus',
    headerName: 'Campus',
    type: 'string',
  },
  {
    field: 'department',
    headerName: 'Department',
    type: 'string',
  },
  {
    field: 'program',
    headerName: 'Program',
    type: 'string',
    width: 180,
  },
]

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  return (
    <Box sx={{ width: '90%' }}>
      <h1>Performers Directory</h1>
      <Paper >
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        checkboxSelection
        sx={{ border: 0}}
      />
    </Paper>
    </Box>
  );
}
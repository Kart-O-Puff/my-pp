import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { Button } from '@mui/material/Button';

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'srcode', headerName: 'SR-Code', type: 'string' },
  { field: 'cgroup', headerName: 'Cultural Group', width: 150 },
  { field: 'campus', headerName: 'Campus', type: 'string' },
  { field: 'department', headerName: 'Department', type: 'string' },
  { field: 'program', headerName: 'Program', type: 'string', width: 180 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [rows, setRows] = useState([]); // State to store API data
  const [loading, setLoading] = useState(true); // Loading state for the DataGrid

  useEffect(() => {
    const fetchPerformers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/all-users'); // Replace with your actual API URL
        setRows(response.data);
        setLoading(false); // Turn off loading indicator
      } catch (error) {
        console.error('Error fetching performers data:', error);
        setLoading(false);
      }
    };

    fetchPerformers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/details/${id}`);
      // Update the rows state to reflect the deleted performer
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting performer:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <Box sx={{ width: '90%' }}>
      <h1>Performers Directory</h1>
      <Paper>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading} // DataGrid loading indicator
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
      <Button variant="contained" color="error" onClick={() => handleDelete(selectedRowId)}>
        Delete
      </Button>
    </Box>
  );
}

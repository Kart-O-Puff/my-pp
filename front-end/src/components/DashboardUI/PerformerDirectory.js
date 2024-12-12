import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export default function DataTable() {
  const [rows, setRows] = useState([]); // State to store API data
  const [loading, setLoading] = useState(true); // Loading state for the DataGrid

  // Assuming you have additional column definitions (replace with your actual data)
  const columns = [
    { field: 'uiId', headerName: 'ID', width: 50 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'srcode', headerName: 'SR-Code', type: 'string' },
    { field: 'cgroup', headerName: 'Cultural Group', width: 150 },
    { field: 'campus', headerName: 'Campus', type: 'string' },
    { field: 'department', headerName: 'Department', type: 'string' },
    { field: 'program', headerName: 'Program', type: 'string', width: 180 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <Button variant="text" color="error" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </Button>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    const fetchPerformers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/users'); // Replace with your actual API URL
        const dataWithUiId = response.data.map((item, index) => ({
          ...item,
          uiId: index + 1,
        }));
        setRows(dataWithUiId);
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
      await axios.delete(`http://localhost:4000/api/admin/user/${id}`);
      // Update the rows state to reflect the deleted performer
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error('Error deleting performer:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  // pedeng wala nang edit, let performer lang mag edit, just a suggestion
  // const handleEdit = async (id) => {
  //   try {
  //     await axios.put(`/details/${id}`);
  //     // Update the rows state to reflect the edited performer
  //     setRows(rows.map((row) => (row.id === id)))
  //   } catch (error) { 
  //     console.error('Error updating performer details.', error);
  //   }
  // };

  return (
    <Box sx={{ width: '90%' }}>
      <h1>Performers Directory</h1>
      <Paper>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10, 25, 50, 100]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </Box>
  );
}
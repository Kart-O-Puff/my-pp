import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { culturalgroups, campuses, departments, programs, fetchRegistrationValues } from '../../../data/registrationValues';
import { useState, useEffect, useContext } from 'react';
import { Divider, Typography } from '@mui/material';
import axios from 'axios'; // Import Axios for API calls
import { UserContext } from '../../../_context/UserContext';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function PersonalInformation() {
  const { user } = useContext(UserContext); // Get user from context
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    culturalGroup: '',
    campus: '',
    department: '',
    program: '',
    srCode: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      await fetchRegistrationValues();
      if (user) {
        try {
          const response = await axios.get(`http://localhost:4000/api/performers/details/${user._id}`);
          const data = response.data.performerDetails;
          
          setFormData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            culturalGroup: data.culturalGroup._id,
            campus: data.campus._id,
            department: data.department._id,
            program: data.program._id,
            srCode: data.srCode,
          });
          
          const initialDepartmentLabel = departments.find(dept => dept._id === data.department._id)?.label;
          setFilteredPrograms(programs[initialDepartmentLabel] || []);
          setSelectedDepartment(data.department);
        } catch (error) {
          console.error('Error fetching user details:', error);
        }
      }
    };
  
    fetchData();
  }, [user]);

  // Filter the programs based on the selected department
  const handleDepartmentChange = (event, value) => {
    setSelectedDepartment(value);
    if (value) {
      setFilteredPrograms(program[value.label] || []);
      setFormData({ ...formData, department: value._id });
    } else {
      setFilteredPrograms([]);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    console.log("Form Data:", formData);
    try {
      const response = await axios.post('/save-profile', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the JWT token
        },
      });
      alert(response.data.message || 'Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error.response?.data || error.message);
      alert(error.response?.data.message || 'An error occurred while saving the profile.');
    }
  };

  return (
    <Box id="personal-info">
      <Grid container spacing={3} padding={3}>
        <FormGrid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
          <Typography>
            <h1>Personal Information</h1>
          </Typography>
        </FormGrid>
        <FormGrid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
          <FormLabel htmlFor="first-name" required>
            First name
          </FormLabel>
          <OutlinedInput
            id="first-name"
            name="firstName"
            type="text"
            placeholder="Juan"
            required
            size="small"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
          <FormLabel htmlFor="last-name" required>
            Last name
          </FormLabel>
          <OutlinedInput
            id="last-name"
            name="lastName"
            type="text"
            placeholder="Dela Cruz"
            required
            size="small"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
          <FormLabel htmlFor="email" required>
            Email address
          </FormLabel>
          <OutlinedInput
            id="email"
            name="email"
            type="email"
            placeholder="20-12345@g.batstate-u.edu.ph"
            required
            size="small"
            value={formData.email}
            onChange={handleInputChange}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
          <FormLabel htmlFor="cgroup" required>
            Cultural Group
          </FormLabel>
          <Autocomplete
            id="cgroup"
            name="culturalGroup"
            required
            size="small"
            disablePortal
            options={culturalgroups}
            getOptionLabel={(option) => option.label}
            value={culturalgroups.find(group => group._id === formData.culturalGroup) || null}
            onChange={(event, value) => setFormData({ ...formData, culturalGroup: value ? value._id : '' })}
            renderInput={(params) => <TextField {...params} />}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
          <FormLabel htmlFor="campus" required>
            Campus
          </FormLabel>
          <Autocomplete
            id="campus"
            name="campus"
            required
            size="small"
            disablePortal
            options={campuses}
            getOptionLabel={(option) => option.label}
            value={campuses.find(campus => campus._id === formData.campus) || null}
            onChange={(event, value) => setFormData({ ...formData, campus: value ? value._id : '' })}
            renderInput={(params) => <TextField {...params} />}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
          <FormLabel htmlFor="department" required>
            Department
          </FormLabel>
          <Autocomplete
            id="department"
            name="department"
            required
            size="small"
            disablePortal
            options={departments}
            getOptionLabel={(option) => option.label}
            value={departments.find(department => department._id === formData.department) || null}
            onChange={handleDepartmentChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
        <FormLabel htmlFor="program" required>
          Program
        </FormLabel>
        <Autocomplete
          id="program"
          name="program"
          required
          size="small"
          disablePortal
          options={filteredPrograms}
          getOptionLabel={(option) => option.label}
          value={filteredPrograms.find(program => program._id === formData.program) || null}
          onChange={(event, value) => setFormData({ ...formData, program: value ? value._id : '' })}
          renderInput={(params) => <TextField {...params} />}
        />
      </FormGrid>;
        <FormGrid size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
          <FormLabel htmlFor="srcode" required>
            SR-Code
          </FormLabel>
          <OutlinedInput
            id="srcode"
            name="srCode"
            type="text"
            placeholder="20-12345"
            required
            size="small"
            value={formData.srCode}
            onChange={handleInputChange}
          />
        </FormGrid>
      </Grid>
      <Grid sx={{ pb: { xs: 3, sm: 3, md: 3, lg: 3 } }}>
        <Button variant="outlined" size="medium" onClick={handleSave}>
          Save
        </Button>
      </Grid>
      <Divider />
    </Box>
  );
}
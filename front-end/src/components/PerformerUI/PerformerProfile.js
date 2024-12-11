import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Grid,
  Typography,
  Button,
  Avatar,
  Divider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
} from "@mui/material";
import { styled } from "@mui/system";
import { UserContext } from "../../_context/UserContext";

// Styled components for consistent UI styling
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const ProfileHeader = styled("div")(({ theme }) => ({
  backgroundColor: "#3f51b5",
  padding: theme.spacing(4),
  textAlign: "center",
  color: "#fff",
}));

const DisplayField = styled("div")(({ theme }) => ({
  fontSize: theme.typography.body1.fontSize,
  padding: theme.spacing(1, 0),
  backgroundColor: "#f4f4f4",
  borderRadius: theme.shape.borderRadius,
  textAlign: "left",
  paddingLeft: theme.spacing(2),
  color: "#333",
}));

// Constants for dropdown options
const culturalgroups = [];
const campuses = [];
const departments = [];
const programs = {};

// Function to fetch registration values
export const fetchRegistrationValues = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/performers/registration-values');
    const data = response.data;

    // Clear existing data to avoid duplicates
    culturalgroups.length = 0;
    campuses.length = 0;
    departments.length = 0;
    Object.keys(programs).forEach(key => delete programs[key]);

    // Update the exported constants
    culturalgroups.push(...data.culturalgroups);
    campuses.push(...data.campuses);
    departments.push(...data.departments);
    Object.assign(programs, data.programs);
  } catch (error) {
    console.error('Error fetching registration values:', error);
  }
};

export default function PerformerProfile() {
  const { user } = useContext(UserContext); // Use user context to get user
  const [editable, setEditable] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    image: "",
    culturalGroup: "",
    campus: "",
    department: "",
    program: "",
    srCode: "",
  });
  const [editableUserData, setEditableUserData] = useState({ ...userData });
  const [achievements, setAchievements] = useState([]);
  const [editableAchievements, setEditableAchievements] = useState([]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/performers/${user._id}`);

      if (response.status === 200) {
        const data = response.data;
        console.log("Profile fetched:", data);
        const performerDetails = data.performerDetails[0] || {};
        setUserData({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          image: data.user.image,
          culturalGroup: performerDetails.culturalGroup?.label || "",
          campus: performerDetails.campus?.label || "",
          department: performerDetails.department?.label || "",
          program: performerDetails.program?.label || "",
          srCode: performerDetails.srCode || "",
        });
        setEditableUserData({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          image: data.user.image,
          culturalGroup: performerDetails.culturalGroup?._id || "",
          campus: performerDetails.campus?._id || "",
          department: performerDetails.department?._id || "",
          program: performerDetails.program?._id || "",
          srCode: performerDetails.srCode || "",
        });
        setSelectedDepartment(performerDetails.department?._id || "");
        setSelectedProgram(performerDetails.program?._id || "");
        setAchievements(data.performerAchievements || []);
        setEditableAchievements(data.performerAchievements || []);
      } else {
        console.error("Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const saveProfile = async () => {
    try {
      const response = await axios.put(`http://localhost:4000/api/performers/${user._id}`, {
        ...editableUserData,
        achievements: editableAchievements,
      });

      if (response.status === 200) {
        const data = response.data;
        const performerDetails = data.performerDetails[0] || {};
        setUserData({
          firstName: data.user.firstName,
          lastName: data.user.lastName,
          email: data.user.email,
          image: data.user.image,
          culturalGroup: performerDetails.culturalGroup?.label || "",
          campus: performerDetails.campus?.label || "",
          department: performerDetails.department?.label || "",
          program: performerDetails.program?.label || "",
          srCode: performerDetails.srCode || "",
        });
        setAchievements(data.performerAchievements || []);
        setEditable(false);
        console.log("Profile updated:", data);
      } else {
        console.error("Failed to save profile");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "department") {
      setSelectedDepartment(value);
      setSelectedProgram(""); // Reset program when department changes
    }
  };

  const handleAchievementChange = (index, field, value) => {
    const updatedAchievements = [...editableAchievements];
    updatedAchievements[index][field] = value;
    setEditableAchievements(updatedAchievements);
  };

  const addAchievement = () => {
    setEditableAchievements([...editableAchievements, { title: "", description: "", date: "" }]);
  };

  useEffect(() => {
    fetchProfile();
    fetchRegistrationValues();
  }, [user]);

  const renderField = (label, name, options = null) => (
    <Grid item xs={12} sm={6}>
      <Typography variant="subtitle2">{label}</Typography>
      {editable ? (
        options ? (
          <FormControl fullWidth>
            <InputLabel>{label}</InputLabel>
            <Select name={name} value={editableUserData[name]} onChange={handleInputChange}>
              {options.map((option, index) => (
                <MenuItem key={index} value={option._id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ) : (
          <TextField fullWidth variant="outlined" name={name} value={editableUserData[name]} onChange={handleInputChange} />
        )
      ) : (
        <DisplayField>
          {options
            ? options.find(option => option._id === userData[name])?.label || "N/A"
            : userData[name] || "N/A"}
        </DisplayField>
      )}
    </Grid>
  );

  const renderAchievements = () => (
    <StyledCard>
      <Typography variant="h6">Achievements</Typography>
      <Divider sx={{ my: 2 }} />
      {editable ? (
        <>
          {editableAchievements.map((achievement, index) => (
            <Grid container spacing={2} key={index}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Title"
                  fullWidth
                  value={achievement.title}
                  onChange={(e) => handleAchievementChange(index, "title", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Description"
                  fullWidth
                  value={achievement.description}
                  onChange={(e) => handleAchievementChange(index, "description", e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Date"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  value={achievement.date}
                  onChange={(e) => handleAchievementChange(index, "date", e.target.value)}
                />
              </Grid>
            </Grid>
          ))}
          <Button variant="outlined" sx={{ marginTop: 2 }} onClick={addAchievement}>
            Add Achievement
          </Button>
        </>
      ) : (
        achievements.length > 0 ? (
          achievements.map((achievement, index) => (
            <DisplayField key={index}>
              <strong>Title:</strong> {achievement.title || "N/A"} <br />
              <strong>Description:</strong> {achievement.description || "N/A"} <br />
              <strong>Date:</strong> {achievement.date || "N/A"}
            </DisplayField>
          ))
        ) : (
          <Typography>No achievements added yet.</Typography>
        )
      )}
    </StyledCard>
  );

  return (
    <Grid container spacing={3} padding={3}>
      <Grid item xs={12}>
        <ProfileHeader>
          <Avatar
            sx={{
              width: 150,
              height: 150,
              margin: "0 auto",
              border: "3px solid white",
            }}
            src={userData.image || "/path-to-placeholder-image.jpg"}
          />
          <Typography variant="h5" sx={{ marginTop: 2 }}>
            {userData.firstName || ""} {userData.lastName || ""}
          </Typography>
          <Button
            variant="outlined"
            sx={{ marginTop: 2 }}
            onClick={() => {
              if (editable) setEditableUserData(userData);
              setEditable(!editable);
            }}
          >
            {editable ? "Cancel" : "Edit Profile"}
          </Button>
        </ProfileHeader>
      </Grid>

      <Grid item xs={12}>
        <StyledCard>
          <Typography variant="h6">Profile Details</Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={2}>
            {renderField("First Name", "firstName")}
            {renderField("Last Name", "lastName")}
            {renderField("Email Address", "email")}
            {renderField("SR Code", "srCode")}
            {renderField("Cultural Group", "culturalGroup", culturalgroups)}
            {renderField("Campus", "campus", campuses)}
            {renderField("Department", "department", departments)}
            {renderField("Program", "program", programs[selectedDepartment] || [])}
          </Grid>
        </StyledCard>
      </Grid>

      <Grid item xs={12}>
        {renderAchievements()}
      </Grid>

      {editable && (
        <Grid item xs={12} container justifyContent="center" alignItems="center">
          <Button variant="contained" color="primary" sx={{ marginTop: 3 }} onClick={saveProfile}>
            Save
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

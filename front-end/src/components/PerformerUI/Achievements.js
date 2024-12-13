import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import achievementsData from '../../../data/achievementsData.json';

export default function Achievements() {
  const [showAll, setShowAll] = useState(false);
  const [achievements, setAchievements] = useState(achievementsData);
  const [isEditing, setIsEditing] = useState(false);  // Tracks if we are in edit mode
  const [editedAchievements, setEditedAchievements] = useState(
    achievementsData.map((item) => ({
      title: item.title,
      description: item.description,
    }))
  );

  // Display either all achievements or only the first 6
  const displayedAchievements = showAll ? achievements : achievements.slice(0, 6);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
  };

  const handleInputChange = (index, field, value) => {
    const updatedAchievements = [...editedAchievements];
    updatedAchievements[index] = {
      ...updatedAchievements[index],
      [field]: value,
    };
    setEditedAchievements(updatedAchievements);
  };

  const handleSaveChanges = () => {
    setAchievements(editedAchievements);  // Save the changes to the achievements state
    setIsEditing(false);  // Exit edit mode
    console.log('Updated achievements:', editedAchievements);
  };

  const handleCancelChanges = () => {
    setEditedAchievements(
      achievementsData.map((item) => ({
        title: item.title,
        description: item.description,
      }))
    );
    setIsEditing(false);  // Exit edit mode
  };

  const handleAddAchievement = () => {
    setEditedAchievements([
      ...editedAchievements,
      { title: '', description: '' },
    ]);
  };

  const handleDeleteAchievement = (index) => {
    const updatedAchievements = editedAchievements.filter((_, i) => i !== index);
    setEditedAchievements(updatedAchievements);
  };

  return (
    <Box
      id="achievements"
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '100%',
            textAlign: { xs: 'center', sm: 'left', md: 'left', lg: 'left' },
          }}
        >
          <Typography>
            <h1>Achievements</h1>
          </Typography>
          <Box 
            display="flex"
            alignItems="center"
            gap={1}>
              
            <Typography variant="h5">{achievements.length}</Typography>
            <Typography variant="h6">
              Total number of awards
            </Typography>
          </Box>
        </Box>

        {/* Editor for all achievements in tabular form */}
        {isEditing && (
          <Box sx={{ width: '100%', mb: 2 }}>
            <Typography sx={{ mb: 2 }} variant="h6">Edit Achievements</Typography>
            <TableContainer component={Paper}>
              <Table aria-label="achievement table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {editedAchievements.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <TextField
                          variant="outlined"
                          fullWidth
                          value={item.title}
                          onChange={(e) =>
                            handleInputChange(index, 'title', e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          variant="outlined"
                          fullWidth
                          value={item.description}
                          onChange={(e) =>
                            handleInputChange(index, 'description', e.target.value)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDeleteAchievement(index)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddAchievement}
              >
                Add Achievement
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveChanges}
              >
                Save Changes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancelChanges}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        )}

        {/* Display the achievements */}
        {!isEditing && (
          <Grid container spacing={2} sx={{ maxWidth: '100%' }}>
            {displayedAchievements.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} lg={4} key={index}>
                <Stack
                  direction="column"
                  component={Card}
                  spacing={1}
                  sx={{
                    color: 'inherit',
                    p: 3,
                    height: '100%',
                  }}
                >
                  <Box sx={{ opacity: '50%' }}>
                    <EmojiEventsIcon />
                  </Box>
                  <div>
                    <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2">
                      {item.description}
                    </Typography>
                  </div>
                </Stack>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Buttons to toggle view */}
        {!isEditing && (
          <Box sx={{ py: 3 }}>
            <Button
              aria-label="show-all"
              variant="contained"
              color="primary"
              size="small"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Show Less' : 'Show All'}
            </Button>
            <Button
              aria-label="edit"
              variant="outlined"
              color="primary"
              size="small"
              sx={{ ml: 2 }}
              onClick={handleEditToggle}
            >
              Edit All Achievements
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}

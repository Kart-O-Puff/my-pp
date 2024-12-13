import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import Footer from '../components/Footer';
import Divider from '@mui/material/Divider';

export function Forms() {
  const forms = [
    { name: 'Audience Evaluation Form', file: 'Audience-Evaluation-Form.pdf' },
    { name: 'Audition Criteria', file: '02_Audition-Criteria.pdf' },
    { name: 'Certificate of Membership', file: '01_Certificate-of-Membership.pdf' },
    { name: 'Performers Profile Form', file: '03_Performers-Profile-Form.pdf' },
    { name: 'Property Borrowing Form', file: '06_Property-Borrowing-Form.pdf' },
    { name: 'Request for Presentation Intermission', file: '04_Request-for-Presentation-Intermission.pdf' },
    { name: 'Trainer Evaluation Form', file: '05_Trainer-Evaluation-Form.pdf' },
  ];  

  return (
    <Box sx={{ px: 4, pt:2, textAlign: 'center' }}>
      <Typography>
        <h1>Downloadable Forms</h1>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          pb: 4,
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
        }}
      >
        {forms.map((form, index) => (
          <Card
            key={index}
            sx={{
              width: 300,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              textAlign: 'center',
              p: 2,
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {form.name}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href={`/assets/${form.file}`}
                download={form.file}
                startIcon={<DownloadIcon />}
                sx={{ mt: 2, textTransform: 'none' }}
              >
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Divider />
      <Footer />
    </Box>
  );
}

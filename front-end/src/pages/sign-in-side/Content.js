import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const items = [
  {
    title: 'Office of The Culture and Arts',
    description:
      'BatStateU Office of Culture and Arts - Performer’s Profile Management Platform ',
  },
];

export default function Content() {
  return (
    <Stack
      sx={{
        flexDirection: 'column',
        alignSelf: 'center',
        gap: 4,
        maxWidth: 450,
        alignItems: 'center', // Center-align the content
        textAlign: 'center', // Center the text
      }}
    >
      {/* Logo */}
      <Box>
        <img
          src={"/assets/OCA-Logo.png"}
          alt="Office of the Culture and Arts Logo"
          style={{
            maxWidth: '100px', // Adjust width as needed
            height: 'auto',
            marginBottom: '16px', // Add spacing below the logo
          }}
        />
      </Box>

      {/* Content */}
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography
              gutterBottom
              sx={{
                fontWeight: 'medium',
                fontSize: '1.5rem', // Adjust font size
              }}
            >
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}

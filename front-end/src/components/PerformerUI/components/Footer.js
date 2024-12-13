import * as React from 'react';
import { Box } from '@mui/material';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright() {
  return (
    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
      <Link color="text.secondary" href="https://www.facebook.com/CultureandArtsBatStateU" target="blank">
        Office of Culture and Arts
      </Link>
      &nbsp;
      {' © '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: { xs: 2, sm: 2 , md: 2, lg: 2},
        textAlign: { sm: 'center', md: 'center' },
      }}
    >
      <Copyright/>
    </Box>
  );
}

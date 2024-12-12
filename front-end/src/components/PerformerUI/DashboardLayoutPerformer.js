
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import PortraitIcon from '@mui/icons-material/Portrait';
import SimCardDownload from '@mui/icons-material/SimCardDownload';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { Forms } from '../../pages/Forms';
import PerformerProfile from './PerformerProfile';
import WelcomeDialog from './components/WelcomeDialog';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

        
const NAVIGATION = [
  {
    segment: 'dashboard',
    title: 'My Profile',
    icon: <PortraitIcon />,
    component: PerformerProfile,
  },
  {
    segment: 'downloadableForms',
    title: 'Downloadable Forms',
    icon: <SimCardDownload />,
    component: Forms,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 800,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardPageSwitcher({ pathname }) {
  const currentNavItem = NAVIGATION.find(item => pathname.includes(item.segment));

  const ContentComponent = currentNavItem?.component || (() => (
    <Typography>Page not found</Typography>
  ));

  return (
    <Box
      sx={{
        py: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <ContentComponent/>
    </Box>
  );
}

function DashboardLayoutPerformer() {
  const navigate = useNavigate();
  const [session, setSession] = useState({ user: null });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Ensure you're authenticated
        const userId = jwtDecode(token).userId; // Decode JWT to get user ID

        const response = await axios.get(`http://localhost:4000/api/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSession({ user: response.data });
      } catch (error) {
        console.error('Failed to fetch user data:', error.message);
        navigate('/sign-in'); // Redirect to sign-in if session fails
      }
    };

    fetchUserData();
  }, [navigate]);

  const [pathname, setPathname] = React.useState('/dashboard');

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    // preview-start
    <AppProvider
      session={session}
      authentication={{
        signOut: () => {
          setSession({ user: null });
          localStorage.removeItem('authToken');
          navigate('/sign-in');
        },
      }}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      branding={{
        logo: <img src={"/assets/OCA-Logo.png"}/>,
        title: 'Office of Culture and Arts',
      }}
    >
      <DashboardLayout>
        <WelcomeDialog />
        <DashboardPageSwitcher pathname={pathname} />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}



export default DashboardLayoutPerformer;

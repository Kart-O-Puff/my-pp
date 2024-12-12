import * as React from 'react';
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
  
  const initialUserData = JSON.parse(localStorage.getItem('userData')) || {
    name: '',
    email: '',
    image: '',
  };
  
  const [session, setSession] = React.useState({
    user: initialUserData
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: (userData) => {
        setSession({
          user: {
            name: userData.name,
            email: userData.email,
            image: userData.image || '',
          },
        });
        localStorage.setItem('userData', JSON.stringify(userData));
      },
      signOut: () => {
        setSession(null);
        localStorage.removeItem('authToken');
        navigate('/sign-in');
      },
    };
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
      authentication={authentication}
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

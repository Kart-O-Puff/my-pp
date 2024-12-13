import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Forms } from './pages/Forms';
import { NotFoundPage } from './pages/NotFoundPage';
import SignInSide from './pages/sign-in-side/SignInSide';
import SignUp from './pages/sign-up/SignUp';
import { ProfileRoutes } from './components/PerformerUI/ProfileRoutes';
import DashboardLayoutAdmin from './components/DashboardUI/DashboardLayoutAdmin';
import { UserProvider } from './_context/UserContext';
import ProtectedRoute from './_util/ProtectedRoute';

function App() {
  return (
    <UserProvider>
      <main>
        <Routes>
          <Route path='/' element={<SignInSide />} />
          <Route path='/sign-in' element={<SignInSide />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='*' element={<NotFoundPage />} />
          <Route
            path='/admin'
            element={
              <ProtectedRoute
                element={DashboardLayoutAdmin}
                allowedRoles={['admin']}
              />
            }
          />
          <Route
            path='/forms'
            element={
              <ProtectedRoute element={Forms} allowedRoles={['admin']} />
            }
          />
          <Route
            path='/profile/*'
            element={
              <ProtectedRoute
                element={ProfileRoutes}
                allowedRoles={['performer']}
              />
            }
          />
        </Routes>
      </main>
    </UserProvider>
  );
};

export default App

import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Forms } from './pages/Forms';
import { NotFoundPage } from './pages/NotFoundPage';
import SignInSide from './pages/sign-in-side/SignInSide';
import SignUp from './pages/sign-up/SignUp';
import { ProfileRoutes } from './components/PerformerUI/ProfileRoutes';
import DashboardLayoutAdmin from './components/DashboardUI/DashboardLayoutAdmin';
import { UserProvider } from './_context/UserContext';

function App() {
  return (
    <UserProvider>
      <main>
        <Routes>
          <Route path = '/' element = {<SignInSide/>} />
          <Route path = '/sign-in' element = {<SignInSide/>} />
          <Route path = '/admin' element = {<DashboardLayoutAdmin/>} />
          <Route path = '/profile/*' element={<ProfileRoutes/>} />
          <Route path = '/forms' element = {<Forms/>} />
          <Route path = '/sign-up' element = {<SignUp/>} />
          <Route path = '*' element = {<NotFoundPage/>} />
        </Routes>
      </main>
    </UserProvider>
  );
};

export default App

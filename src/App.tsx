import './App.css';
import Login from 'src/pages/LogIn/Login';
import Dashboard from 'src/pages/Main/Main';
import Patients from 'src/pages/Patients/Patients';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import Register from './pages/Register/Register';
import FormPatient from './components/FormPatient/FormPatient';
import Sessions from './pages/Sessions/Sessions';
import FormSession from './components/FormSession/FormSession';
import UpdatePassword from './components/UpdatePassword/UpdatePassword';
import { queryClient } from './services/queryClient';
import { isAuthenticated } from './services/Auth/service';

interface IPrivateRouteProps {
  children: ReactNode;
  redirectTo: string;
}

function PrivateRoute({ children, redirectTo }: IPrivateRouteProps) {
  return isAuthenticated() ? <> {children} </> : <Navigate to={redirectTo} />;
}

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute redirectTo="/">
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/patients"
            element={
              <PrivateRoute redirectTo="/">
                <Patients />
              </PrivateRoute>
            }
          />

          <Route
            path="/register-patient"
            element={
              <PrivateRoute redirectTo="/">
                <FormPatient />
              </PrivateRoute>
            }
          />

          <Route
            path="/sessions"
            element={
              <PrivateRoute redirectTo="/">
                <Sessions />
              </PrivateRoute>
            }
          />

          <Route
            path="/register-session"
            element={
              <PrivateRoute redirectTo="/">
                <FormSession />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-session"
            element={
              <PrivateRoute redirectTo="/">
                <FormSession />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

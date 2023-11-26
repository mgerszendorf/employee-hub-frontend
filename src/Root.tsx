import { Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Login from './pages/authentication/Login';
import Unauthorized from './pages/authentication/Unauthorized';
import UserHomePage from './pages/UserHomePage';
import SuperVisorHomePage from './pages/superVisor/SuperVisorHomePage';
import AdminHomePage from './pages/AdminHomePage';
import NotFound from './pages/NotFound';
import RequireAuth from './components/RequireAuth';
import RegisterStep1 from './pages/authentication/register/RegisterStep1';
import EmployeeSessions from './pages/superVisor/EmployeeSessions';

const ROLES = {
  'Admin': 'Admin',
  'SuperVisor': 'SuperVisor',
  'User': 'User'
}

const Root = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<RegisterStep1 />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<UserHomePage />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.SuperVisor]} />}>
          <Route path="super-visor" element={<SuperVisorHomePage />} />
          <Route path="/employee-sessions/:id" element={<EmployeeSessions />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<AdminHomePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Root
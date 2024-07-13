import React from 'react';
import AdminNavbar from './AdminNavbar';
import { AppBar } from '@mui/material';

import './css/AdminHeader.css'; // Import your CSS file

const AdminHeader = ({ settingPlanType }) => {
  return (
    <AppBar
      position="static"
      className="admin-appbar"
      data-testid="admin-header"
    >
      <AdminNavbar settingPlanType={settingPlanType} />
    </AppBar>
  );
};

export default AdminHeader;

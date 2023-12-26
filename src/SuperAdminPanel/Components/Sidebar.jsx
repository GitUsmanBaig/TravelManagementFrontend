import React from 'react';
import { Link } from 'react-router-dom'; // assuming you are using react-router
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Sidebar = () => {
  const navigate = useNavigate();
  const sidebarStyle = {
    backgroundColor: '#1f2937', // Dark grey background
    color: '#9ca3af', // Light grey text
    minHeight: '100vh',
    width: '200px',
    position: 'fixed',
    top: 0,
    left: 0,
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  };

  const linkStyle = {
    color: '#9ca3af',
    textDecoration: 'none',
    padding: '10px 15px',
    margin: '5px 0',
    display: 'block',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  };

  const linkHoverStyle = {
    ...linkStyle,
    backgroundColor: '#374151', // Darker grey background on hover
    color: '#fff', // White text on hover
  };

  const bottomLinkStyle = {
    ...linkStyle,
    marginTop: 'auto', // push the logout to the bottom
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/super-admin/logout', {
        method: 'POST', // or 'GET', depending on your API setup
        credentials: 'include', // Needed to include the cookie
      });

      if (response.ok) {
        navigate('/admin/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <div style={sidebarStyle}>
      <div>
        <Link to="/admin/admin-dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/admin/manage-users" style={linkStyle}>Manage Users</Link>
        <Link to="/admin/manage-agencies" style={linkStyle}>Manage Agencies</Link>
        <Link to="/admin/manage-packages" style={linkStyle}>Manage Packages</Link>
        <Link to="/admin/manage-queries" style={linkStyle}>Manage Queries</Link>
      </div>
      <div style={bottomLinkStyle} onClick={handleLogout}>Logout</div>
    </div>
  );
};

export default Sidebar;

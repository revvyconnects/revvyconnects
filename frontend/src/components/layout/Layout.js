import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Link as LinkIcon,
  Campaign as CampaignIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

function Layout({ role = '', children }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  // Enhanced children validation
  const validChildren = React.isValidElement(children) ? children : null;
  if (!validChildren) {
    console.error('Layout: Invalid children prop provided. Expected a valid React element.');
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">
          Error: Invalid content provided to layout
        </Typography>
      </Box>
    );
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = role === 'creator' 
    ? [
        { text: 'Dashboard', icon: DashboardIcon, path: '/creator' },
        { text: 'My Links', icon: LinkIcon, path: '/creator/links' },
      ]
    : [
        { text: 'Dashboard', icon: DashboardIcon, path: '/sponsor' },
        { text: 'Campaigns', icon: CampaignIcon, path: '/sponsor/campaigns' },
      ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" component="div">
          {typeof role === 'string' ? (role.charAt(0).toUpperCase() + role.slice(1)) : 'Menu'}
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const menuText = typeof item.text === 'string' ? item.text : 'Menu Item';
          return (
            <ListItem 
              button 
              key={menuText} 
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={menuText} />
            </ListItem>
          );
        })}
        <ListItem button onClick={() => navigate('/login')}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  const title = role === 'creator' ? 'Creator Dashboard' : 'Sponsor Dashboard';

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            {typeof role === 'string' ? (role === 'creator' ? 'Creator Dashboard' : 'Sponsor Dashboard') : 'Dashboard'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: '64px',
        }}
      >
        {console.log('Layout CHILDREN TYPE:', typeof children, children)}
        {React.isValidElement(children) ? children : (
          <Typography color="error">Invalid children in Layout</Typography>
        )}
      </Box>
    </Box>
  );
}

export default Layout; 
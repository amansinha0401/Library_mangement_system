import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import Link from "@mui/material/Link";
import Box from "@mui/material/Box"; 
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Nav1() {
  const navigate = useNavigate();
  return (
    <AppBar position="static" sx={{ backgroundColor: '#000', color: '#fff' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LIBRARY MANGEMENT SYSTEM
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, marginLeft: 'auto' }}> {/* Use marginLeft: 'auto' */}
            <List
              sx={{
                display: 'flex', // Display the List horizontally
                "& a": {
                  borderRadius: 40,
                  textDecorationColor: (theme) => theme.palette.divider,
                },
              }}
            >
             
             
             
              <ListItem>
                <ListItemButton component={Link} href="/register">
                 Login/Register
                </ListItemButton>
              </ListItem>
              <ListItem>
              </ListItem>
            </List>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav1;

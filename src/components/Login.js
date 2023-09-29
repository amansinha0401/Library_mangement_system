import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react'; // Import useState here
import { useNavigate } from 'react-router-dom'; // Import useNavigate here
import axios from 'axios'; // Import axios here
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';

import Nav1 from './Nav1';
function Copyright(props) {
  return (

    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate(); // Use useNavigate for navigation

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const sendRequest = async () => {
    try {
      const response = await axios.post("https://bookstore-c9sx.onrender.com/members/login", {
        email: inputs.email,
        password: inputs.password,
      });
      toast.success("Login Successful");
      Cookies.set('userToken', inputs.email);
      return response.data;
    } 
    catch (error) {
      console.error(error);
      toast.error("Login Unsuccessful");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await sendRequest();
    if (result) {
      console.log("Form submitted successfully");
      navigate('/books'); // Navigate to "/books" route
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Nav1/>
      <Grid
        container
        component="main"
        sx={{
          height: '75vh', // Set height to 100% of the viewport
          justifyContent: 'center', // Center horizontally
          alignItems: 'center', // Center vertically
        }}
      >
        <CssBaseline />

        <Grid item xs={12} sm={8} md={5}>
          <Paper
            elevation={6}
            square
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              p: 4, // Add padding to the Paper component
              borderRadius: '12px', // Add border radius
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3, width: '100%' }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                value={inputs.email}
                onChange={handleChange}
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                value={inputs.password}
                onChange={handleChange}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                </Grid>
                <Grid item>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

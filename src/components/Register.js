import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { toast } from 'react-hot-toast';
import Nav1 from './Nav1';
const customTheme = createTheme({
  // Theme configuration
  
});

export default function SignUp() {
  const navigate = useNavigate(); // Use useNavigate for navigation

  const [inputs, setInputs] = useState({
    name: '',
    roll: '',
    college: '',
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
      const response = await axios.post("https://bookstore-c9sx.onrender.com/members/register", {
        name: inputs.name,
        roll: inputs.roll,
        college: inputs.college,
        email: inputs.email,
        password: inputs.password,
      });
      toast.success("Register Successful");
      return response.data;
    } catch (error) {
      // Handle error
      console.error(error);
      toast.error("Register Unsuccessful");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await sendRequest();
    if (result) {
      // Handle success and navigation
      console.log("Form submitted successfully");
      navigate('/books'); // Navigate to "/books" route
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Nav1/>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
  sx={{
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white', // Set the background color to white
    borderRadius: '8px', // Add border radius
    padding: '20px', // Add padding for spacing
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Add a subtle box shadow
  }}
>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  value={inputs.name}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  value={inputs.roll}
                  onChange={handleChange}
                  id="roll"
                  label="Roll"
                  name="roll"
                  autoComplete="family-name"
                />
              </Grid>

              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="college"
                  value={inputs.college}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="college"
                  label="College"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={inputs.email}
                  onChange={handleChange}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={inputs.password}
                  onChange={handleChange}
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
           
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/login" variant="body2"> {/* Use Link component */}
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

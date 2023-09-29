import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Nav from "./Nav";
import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";

const MemberDetail = () => {
  const history = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState({
    name: "",
    roll: "",
    college: "",
  });

  // Function to handle form field changes
  const handleChange = (e) => {
    setInputs({
      ...inputs, // Copy the existing state
      [e.target.name]: e.target.value,
    });
  };

  const sendRequest = async () => {
    try {
      const response = await axios.put(`https://bookstore-c9sx.onrender.com/members/${id}`, {
        name: inputs.name,
        roll: inputs.roll,
        college: inputs.college,
      });
      console.log("Update Response:", response.data);

      // After successful update, you can navigate to a different page
      history("/members");
    } catch (error) {
      console.error("Update Error:", error);
    }
  };
  
  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`https://bookstore-c9sx.onrender.com/members/${id}`);
        const memberData = response.data;
        console.log("Fetched Data:", memberData);

        setInputs({
          name: memberData.member.name || "",
          roll: memberData.member.roll || "",
          college: memberData.member.college || "",
        });
      } catch (error) {
        console.error("Fetch Error:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Nav/>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent={"center"}
        maxWidth={700}
        alignContent={"center"}
        alignSelf="center"
        marginLeft={"auto"}
        marginRight="auto"
        marginTop={0}
        backgroundColor="white"
        padding={3}
        borderRadius={8}
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
      >
        <FormLabel>Name</FormLabel>
        <TextField
          value={inputs.name}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="name"
        />
        <FormLabel>Roll</FormLabel>
        <TextField
          value={inputs.roll}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="roll"
        />
        <FormLabel>College</FormLabel>
        <TextField
          value={inputs.college}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="college"
        />
        <Button variant="contained" type="submit">
          Update Member
        </Button>
      </Box>
    </form>
  );
};

export default MemberDetail;

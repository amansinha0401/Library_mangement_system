// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Button,
//   FormControlLabel,
//   FormLabel,
//   TextField,
// } from "@mui/material";

// const BookDetail = () => {
//   const history = useNavigate();
//   const { id } = useParams();

//   const [inputs, setInputs] = useState({
//     name: "",
//     description: "",
//     price: "",
//     author: "",
//     image: "",
//   });

//   // Function to handle form field changes
//   const handleChange = (e) => {
//     setInputs({
//       [e.target.name]: e.target.value,
//     });
//   };


//   const sendRequest = async () => {
//     try {
//       const response = await axios.put(`https://bookstore-c9sx.onrender.com/books/${id}`, {
//         name: inputs.name,
//         author: inputs.author,
//         description: inputs.description,
//         price: inputs.price,
//         image: inputs.image,
//       });
//       console.log("Update Response:", response.data);

//       // After successful update, you can navigate to a different page
//       history("/books");
//     } catch (error) {
//       console.error("Update Error:", error);
//     }
//   };
  
//   useEffect(() => {
//     const fetchHandler = async () => {
//       try {
//         const response = await axios.get(`https://bookstore-c9sx.onrender.com/books/${id}`);
//         const bookData = response.data;
//         console.log("Fetched Data:", bookData);

//         setInputs({
//           name: bookData.book.name || "",
//           author: bookData.book.author || "",
//           description: bookData.book.description || "",
//           price: bookData.book.price || "", // Convert price to string
//           image: bookData.book.image || "",
//         });
//       } catch (error) {
//         console.error("Fetch Error:", error);
//       }
//     };
//     fetchHandler();
//   }, [id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     sendRequest();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Box
//         display="flex"
//         flexDirection="column"
//         justifyContent={"center"}
//         maxWidth={700}
//         alignContent={"center"}
//         alignSelf="center"
//         marginLeft={"auto"}
//         marginRight="auto"
//         marginTop={0}
//         backgroundColor="white"
//         padding={3}
//         borderRadius={8}
//         boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
//       >
//         <FormLabel>Name</FormLabel>
//         <TextField
//           value={inputs.name}
//           onChange={handleChange}
//           margin="normal"
//           fullWidth
//           variant="outlined"
//           name="name"
//         />
//         <FormLabel>Author</FormLabel>
//         <TextField
//           value={inputs.author}
//           onChange={handleChange}
//           margin="normal"
//           fullWidth
//           variant="outlined"
//           name="author"
//         />
//         <FormLabel>Description</FormLabel>
//         <TextField
//           value={inputs.description}
//           onChange={handleChange}
//           margin="normal"
//           fullWidth
//           variant="outlined"
//           name="description"
//         />
//         <FormLabel>Price</FormLabel>
//         <TextField
//           value={inputs.price}
//           onChange={handleChange}
//           type="number"
//           margin="normal"
//           fullWidth
//           variant="outlined"
//           name="price"
//         />
//         <FormLabel>Image</FormLabel>
//         <TextField
//           value={inputs.image}
//           onChange={handleChange}
//           margin="normal"
//           fullWidth
//           variant="outlined"
//           name="image"
//         />

//         <Button variant="contained" type="submit">
//           Update Book
//         </Button>
//       </Box>
//     </form>
//   );
// };

// export default BookDetail;



import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

const BookDetail = () => {
  const history = useNavigate();
  const { id } = useParams();

  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    price: "",
    author: "",
    image: "",
    issuedTo: "",
  });

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [open, setOpen] = useState(false); // Dialog state

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleUserSelect = (e) => {
    setSelectedUser(e.target.value);
  };

  const sendRequest = async () => {
    try {
      const response = await axios.put(`https://bookstore-c9sx.onrender.com/books/${id}`, {
        ...inputs,
      });
      console.log("Update Response:", response.data);

      history("/books");
    } catch (error) {
      console.error("Update Error:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://bookstore-c9sx.onrender.com/members");
        const userList = response.data.members;
        setUsers(userList);
      } catch (error) {
        console.error("Fetch Users Error:", error);
      }
    };
    fetchUsers();

    const fetchHandler = async () => {
      try {
        const response = await axios.get(`https://bookstore-c9sx.onrender.com/books/${id}`);
        const bookData = response.data.book;
        console.log("Fetched Data:", bookData);

        setInputs({
          name: bookData.name || "",
          author: bookData.author || "",
          description: bookData.description || "",
          price: bookData.price || "",
          image: bookData.image || "",
          issuedTo: bookData.issuedTo || "",
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

  const handleAssignClick = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  const handleAssignBook = () => {
    setOpen(false);
    setInputs({
      ...inputs,
      issuedTo: selectedUser,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <FormLabel>Author</FormLabel>
        <TextField
          value={inputs.author}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="author"
        />
        <FormLabel>Description</FormLabel>
        <TextField
          value={inputs.description}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="description"
        />
        <FormLabel>Price</FormLabel>
        <TextField
          value={inputs.price}
          onChange={handleChange}
          type="number"
          margin="normal"
          fullWidth
          variant="outlined"
          name="price"
        />
        <FormLabel>Image</FormLabel>
        <TextField
          value={inputs.image}
          onChange={handleChange}
          margin="normal"
          fullWidth
          variant="outlined"
          name="image"
        />
  
        <FormLabel>Issued To</FormLabel>
        <Select
          value={selectedUser}
          onChange={handleUserSelect}
          fullWidth
          variant="outlined"
          name="issuedTo"
        >
          <MenuItem value="">Select User</MenuItem>
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
  
        <Button variant="contained" type="submit">
          Update Book
        </Button>
  
        <Button
          variant="outlined"
          onClick={handleAssignClick}
          style={{ marginTop: "16px" }}
        >
          Assign Book
        </Button>
      </Box>
  
      {/* Dialog for assigning the book */}
      <Dialog open={open} onClose={handleDialogClose}>
        <DialogTitle>Assign Book to User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Select a user to assign the book.
          </DialogContentText>
          <Select
            value={selectedUser}
            onChange={handleUserSelect}
            fullWidth
            variant="outlined"
            name="issuedTo"
          >
            <MenuItem value="">Select User</MenuItem>
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.name}
              </MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAssignBook} color="primary">
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
  
};

export default BookDetail;

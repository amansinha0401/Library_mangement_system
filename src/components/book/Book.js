import React, { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardCover from "@mui/joy/CardCover";
import CardOverflow from "@mui/joy/CardOverflow";
import Typography from "@mui/joy/Typography";
import { Link, useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import {toast} from 'react-hot-toast'

export default function CardAppleArcade(props) {
  const { _id, image, name, author, description, price, img } = props.book;
  const navigate = useNavigate();

  // State variables
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [users, setUsers] = useState([]); // List of users

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
  }, []);
  
  // Function to open the dialog
  const handleAssignClick = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleDialogClose = () => {
    setOpen(false);
  };

  // Function to handle user selection from the dropdown
  const handleUserSelect = (event) => {
    setSelectedUser(event.target.value);
  };

  // Function to assign the book to the selected user
  const handleAssignBook = async () => {
    try {
      const response = await axios.post(
        "https://bookstore-c9sx.onrender.com/books/issue",
        {
          bookId: _id,
          memberId: selectedUser,
        }
      );

      toast.success("Book Issued Successfully");
      console.log(response);
      setOpen(false);
    } catch (error) {
      console.error("Assign Book Error:", error);
    }
  };

  return (
    <div className="ak">
      <Card className="aman" sx={{ minHeight: 325, borderRadius: "xl", width: "300px" }}>
        <CardCover>
          <img alt="" src={image} />
        </CardCover>
        <CardContent
          sx={{
            m: -1,
            p: 1,
            backdropFilter: "blur(20px)",
            borderRadius: "md",
            flex: "initial",
            mb: "auto",
            width: "max-content",
          }}
        >
          {/* Rest of your card content */}
          
        </CardContent>
        
        <CardOverflow sx={{ bgcolor: "background.surface" }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
  <div>
    <Typography level="title-md">Book: {name}</Typography>
    <Typography level="title-md">Author: {author}</Typography>
  </div>
  <Typography level="title-md" sx={{ textAlign: 'right' }}>₹{price}</Typography>
</Box>

          <CardContent orientation="horizontal" sx={{ alignItems: "center" }}>
           
            <Button onClick={handleAssignClick}  sx={{ marginRight: 0 }}>
              Assign Book
            </Button>
            <Link to={`/update/${_id}`}>
              <Button>Update</Button>
            </Link>
            <Link to={`/del/${_id}`}>
              <Button onClick={()=>{toast.success('Book Deleted Successfully')}}>DELETE</Button>
            </Link>
          </CardContent>
        </CardOverflow>
      </Card>

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
    </div>
  );
}

import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import './m.css'
const URL = "https://bookstore-c9sx.onrender.com/members";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data.members; // Assuming the data structure has a 'members' property
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default function CardDashboardStat5() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => setMembers(data));
  }, []);

  return (
    
     
      <div className="card-grid">
      <Nav />
        {members.map((member) => (
          <div key={member.id} className="card-item">
            <Card sx={{ width: "95%", margin: "20px", padding: "10px" }}>
              <CardContent>
                <Typography variant="h4" component="div">
                  {member.name}
                </Typography>
                <Divider />
                <Typography
                  color="success"
                  variant="body2"
                  sx={{ flex: "auto" }}
                >
                  Roll: {member.roll}
                </Typography>
                <Typography variant="body2" sx={{ flex: "auto" }}>
                  College: {member.college}
                </Typography>
              </CardContent>
              <div className="card-actions">
                <Link to={`/memberupdate/${member._id}`}>
                  <Button variant="contained" color="primary">
                    Update
                  </Button>
                </Link>
                <Link to={`/delmember/${member._id}`}>
                  <Button variant="contained" color="error">
                    DELETE
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        ))}
      </div>
   
  );
}

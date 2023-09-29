import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
const Delmember = () => {


    const history = useNavigate();
    const { id } = useParams();
  
    const sendRequest = async () => {
      try {
        await axios.delete(`https://bookstore-c9sx.onrender.com/members/${id}`);
        console.log('member deleted successfully.');
        history('/members');
      } catch (error) {
        console.error('Delete Error:', error);
      }
    };
    
    useEffect(() => {
      sendRequest();
    }, [id]);


  return (
    <div>
      
    </div>
  )
}

export default Delmember

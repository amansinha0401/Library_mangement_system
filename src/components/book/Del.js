import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Del = () => {
  const history = useNavigate();
  const { id } = useParams();

  const sendRequest = async () => {
    try {
      await axios.delete(`https://bookstore-c9sx.onrender.com/books/${id}`);
      console.log('Book deleted successfully.');
      history('/books');
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
  );
};

export default Del;

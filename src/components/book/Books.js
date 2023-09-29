import React, { useEffect, useState } from "react";
import axios from "axios";
import Book from "./Book";
import "./Book.css"
import Nav from '../Nav';

const URL = "https://bookstore-c9sx.onrender.com/books";

const fetchHandler = async () => {
  
  return await axios.get(URL).then((res) => res.data);
};
const Books = () => {
  const [books, setBooks] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setBooks(data.books));
  }, []);
  console.log(books);
  return (
    <div className="card-container">
      <Nav />
        {books &&
          books.map((book, i) => (
            <div key={i}>
              <Book book={book} />
            </div>
          ))}
    </div>
  );
};

export default Books;




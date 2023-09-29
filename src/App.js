import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import AddBook from './components/AddBook';
import Books from './components/book/Books';
import Members from './components/Members';
import Book from './components/book/Book';
import BookDetail from './components/book/BookDetail';
import Del from './components/book/Del';
import Delmember from './components/Delmember';
import MemberDetail from './components/MemberDetail';
import {Toaster} from 'react-hot-toast';
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Router>
      <React.Fragment>
          
          <Toaster />
        <main>
          <Routes>
          <Route path="/" element={<ProtectedRoute component={Home} />} />
            <Route path="/add" element={<ProtectedRoute component={AddBook} />} />
            <Route path="/update/:id" element={<ProtectedRoute component={BookDetail} />} />
            <Route path="/memberupdate/:id" element={<ProtectedRoute component={MemberDetail} />} />
            <Route path="/del/:id" element={<ProtectedRoute component={Del} />} />
            <Route path="/delmember/:id" element={<ProtectedRoute component={Delmember} />} />
            <Route path="/books" element={<ProtectedRoute component={Books} />} />
            <Route path="/members" element={<ProtectedRoute component={Members} />} />
            <Route path="/book" element={<ProtectedRoute component={Book} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </React.Fragment>
    </Router>
  );
};

export default App;

import React from 'react';
import { Link } from 'react-router-dom';
import Nav1 from './Nav1';
const Home = () => {
  const mainStyle = {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Adjusted to space between
    minHeight: '80vh',
    padding: '0 20px',
  };

  const textContainerStyle = {
    flex: 1,
    paddingRight: '30px',
    textAlign: 'left', // Align text to the left
  };

  const buttonStyle = {
    background: 'white',
    fontSize: '1.5rem', // Increased font size
    color: 'black',
    padding: '15px 30px', // Increased padding
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
  };

  return (
    <div className="min-h-screen">
      <Nav1/>
      <main className="relative overflow-hidden" style={mainStyle}>
        <div className="z-10 relative" style={{ maxWidth: '800px' }}>
          <div style={textContainerStyle}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>Hey ADMIN</h1> {/* Increased font size */}
            <h2 className="text-5xl font-semibold mb-4">Welcome to LIBRARY MANAGEMENT SYSTEM</h2> {/* Increased font size */}
            <p className="text-lg mb-6">
              LET'S GET STARTED TO ENTER IN THE WORLD OF BOOKS
            </p>
          </div>
          <div>
            <Link to="/books">
              <button className="px-4 py-2 rounded hover:bg-gray-600" style={buttonStyle}>
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;

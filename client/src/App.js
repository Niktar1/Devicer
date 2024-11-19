import React, { useEffect } from 'react';
import Users from './components/Users';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import './App.css';
import SignUp from './components/signup';



function App() {

  // Add | change later to a better logic | implementation.
  useEffect(() => {
    // Extract token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      // Store token in Storage or state management // Change for more secure method of stroring jwt token
      // encrypt token or user http only coockies to store it safely
      localStorage.setItem("jwtToken", token);
      // Redirect to main page
      window.location.href = "http://localhost:3001";
    }
  }, []);


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/users",
      element: <Users />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  return (
    <div className="App">
      <div className="content">
        <RouterProvider router={router} />
      </div>

    </div>
  );
}

export default App;

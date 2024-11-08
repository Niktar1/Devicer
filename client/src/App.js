import React from 'react';
import Users from './components/Users';
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import './App.css';
import SignUp from './components/signup';



function App() {

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

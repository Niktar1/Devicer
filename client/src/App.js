import React from 'react';
// import Users from './components/Users';
import { createBrowserRouter, Link, RouterProvider} from "react-router-dom";


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Link to={'/users'}>Hello</Link>,
    },
    // {
    //   path: "/users",
    //   element: <Users />,
    // },
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

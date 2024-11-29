import { useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from './components/Users';
import Login from './components/Login';
import SignUp from './components/signup';
import Home from './components/Home';
// import { useDispatch, useSelector } from 'react-redux';
// import { AppDispath, RootState } from './state/store';
// import { fetchBasket } from './state/auth/authSlice'

function App() {
  // auth = anonymousId, accessToken  => through state. fetch or 
  //- other reducers that called in dispatch can modify that state = auth
  // const auth = useSelector((state: RootState) => state.auth)
  // const dispatch = useDispatch<AppDispath>()

  // useEffect(() => {
  //   // check basket first time called here to load existing basket 
  //   dispatch(fetchBasket())
  // }, [dispatch])


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

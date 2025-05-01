import Body from "./components/Body"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Userlist from "./components/Userlist"
import NavBar from "./components/Navbar"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/",
    element: <><NavBar /><Body /></>,
    children: [
      {path: "/dashboard", element: <Dashboard />},
      {path: "/userlist", element: <Userlist />}
    ]
  }
])

function App() {

  

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App

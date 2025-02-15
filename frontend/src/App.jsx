import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

function App() {

  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>} > /* Main Route */
            <Route path="/login" element={<Login/>} />   /* Children Route */
            <Route path="/profile" element={<Profile />} />  /* Children Route */
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

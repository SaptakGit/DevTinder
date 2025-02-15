import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./Profile";
import { Provider } from "react-redux";
import appStore from "./utlis/appStore";
import Feed from "./components/Feed";

function App() {

  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body/>} > /* Main Route */
              <Route path="/" element={<Feed/>} />   /* Children Route */
              <Route path="/login" element={<Login/>} />   /* Children Route */
              <Route path="/profile" element={<Profile />} />  /* Children Route */
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App;

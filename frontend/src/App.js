import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Home } from "./pages/home page/Home";
import { Login } from "./pages/Login page/Login";
import { Profile } from "./pages/Profile/Profile";
import { useSelector } from "react-redux";
import { NotFound } from "./pages/not found/NotFound";
import { Activate } from "./pages/home page/Activate";
import { Reset } from "./pages/reset/Reset";
import { AnimatePresence } from "framer-motion";

function App() {
  const user = useSelector((state) => state.userReducer.userData);
  const location = useLocation();

  const whereToGoFromHome = user ? (
    <Home title="Facebook" />
  ) : (
    <Navigate replace to="/welcome" />
  );

  const whereToGoFromWelcome = user ? (
    <Navigate replace to="/" />
  ) : (
    <Login title="Facebook | welcome" />
  );

  const whereToGoFromActivate = user ? (
    <Activate title="Facebook | Activate" />
  ) : (
    <Navigate replace to="/welcome" />
  );

  return (
    <>
      {/* FOR FRAMER_MOTION
    location,
    key
    */}
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          {/* <Routes > */}
          <Route path="/" element={whereToGoFromHome} />
          <Route path="/activate/:token" element={whereToGoFromActivate} />
          <Route path="/welcome/*" element={whereToGoFromWelcome} />
          <Route
            path="/profile"
            element={<Profile title="Facebook | Profile" />}
          />
          <Route
            path="/reset"
            element={<Reset title="Facebook | Reset password" />}
          />

          {/* Not Found Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;

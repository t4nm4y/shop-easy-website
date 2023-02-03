import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Fav from "./pages/Fav";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useEffect } from "react";
import {UserAuthContextProvider} from "./context/auth"
import ProtectedRoute from "./pages/ProtectedRoute";


function App() {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/fav":
        title = "";
        metaDescription = "";
        break;
      case "/login":
        title = "";
        metaDescription = "";
        break;
      case "/signup":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);
  return (
    <UserAuthContextProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/fav" element={
        <ProtectedRoute>
      <Fav />
      </ProtectedRoute>
      } />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
    </UserAuthContextProvider>
  );
}
export default App;

import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/authentication/login";
import Register from "./pages/authentication/register";
import UserDashboard from "./pages/userDashboard";
import ListView from "./components/ListView";
import PostForm from "./components/PostForm";

function App() {
  return (
    <>
      <div className="main">
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/list-view" element={<ListView />} />
            <Route path="/add-post" element={<PostForm />} />
            <Route path="/edit/:id" element={<PostForm />} />
          </Routes>
        </Router>
      </div>
    </>
  );
}

export default App;

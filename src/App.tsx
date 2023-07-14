import Header from './components/Header';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/authentication/login'
import Register from './pages/authentication/register';
import UserDashboard from './pages/userDashboard';
import ListView from './components/ListView';

function App() {
  return (
    <>
    <div className='main'>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<UserDashboard/>}/>
          <Route path='list-view' element={<ListView />} />
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App

import { Container } from "react-bootstrap";
import SignUp from "./SignUp";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import UpdateProfile from "./UpdateProfile"
import ForgotPassword from "./ForgotPassword";

function App() {
  return (
    
    <Container className="d-flex align-items-center justify-content-center " style={{minHeight:'100vh'}}>
      <div className="w-100" style={{maxWidth:'400px'}}>
      <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<Dashboard/>}/>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
          <Route path="/update-profile" element={<UpdateProfile/>}></Route>
        </Routes>
      </AuthProvider>
      </Router>
      </div>
      
    </Container>

  );
}

export default App;

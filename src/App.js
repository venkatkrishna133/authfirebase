import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route,useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./pages/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Dashboard from "./pages/Dashboard";
import {Typography} from "antd";
import SideMenu from "./components/SideMenu";
import PageContent from "./components/PageContent";
import AppHeader from "./components/AppHeader";
import AppFotter from "./components/AppFotter";
import AppRoutes from "./components/AppRoutes";


function App() {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  return (
    
    <>
    <UserAuthContextProvider>
      <Routes>
      <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AppHeader/>
                  
                  <SideMenu/>
                  <Container style={{marginTop:-180,marginRight:90}}>
                  <Dashboard/>
                  </Container>
                  
                </ProtectedRoute>
              }
              />
      </Routes>
    </UserAuthContextProvider>
    
    <Container >
      <Row>
        <Col>
          <UserAuthContextProvider>
          
            <Routes>
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/details"
                element={
                  <ProtectedRoute>
                    <Details />
                  </ProtectedRoute>
                }
              />
              


              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default App;

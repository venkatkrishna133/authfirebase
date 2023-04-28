import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./pages/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import Dashboard from "./pages/Dashboard";
import { Typography } from "antd";
import SideMenu from "./components/SideMenu";
import PageContent from "./components/PageContent";
import AppHeader from "./components/AppHeader";
import AppFotter from "./components/AppFotter";
import AppRoutes from "./components/AppRoutes";
import Bill from "./pages/Bill";
import Transactions from "./pages/Transactions";
import Requests from "./pages/Requests";
import EditProfile from "./pages/EditProfile";
import Check from "./pages/Check";


function App() {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get("email");

  return (

    <>
    <UserAuthContextProvider>
        <Routes>
          <Route
            path="/check"
            element={
              <ProtectedRoute>
                
                  <Check/>
               
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AppHeader />
                <container style={{ display: 'flex', }} >
                  <SideMenu />
                  <Dashboard />
                </container>
              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/bill"
            element={
              <ProtectedRoute>
                <AppHeader />

                <container style={{ display: 'flex', }}>
                  <SideMenu />
                  <Bill />
                </container>

              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <AppHeader />

                <container style={{ display: 'flex', }}>
                  <SideMenu />
                  <Transactions />
                </container>

              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <AppHeader />

                <container style={{ display: 'flex', }}>
                  <SideMenu />
                  <Requests />
                </container>

              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
      <UserAuthContextProvider>
        <Routes>
          <Route
            path="/editProfile"
            element={
              <ProtectedRoute>
                <AppHeader />

                <container style={{ display: 'flex', }}>
                  <SideMenu />
                  <EditProfile />
                </container>

              </ProtectedRoute>
            }
          />
        </Routes>
      </UserAuthContextProvider>
      <UserAuthContextProvider>
        <Routes>
          <Route

            path="/details"
            element={
              <ProtectedRoute>
                <AppHeader />

                
                  <Details />
                
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

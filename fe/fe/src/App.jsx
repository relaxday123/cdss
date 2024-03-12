/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./pages/requireAuth/RequireAuth";
import { ROLE } from "./util/enum";
import Layout from "./layouts/Layout";
import LoginPage from "./pages/login/LoginPage";
import UnauthorizedPage from "./pages/unauthorized/UnauthorizedPage";
import PatientRecord from "./pages/record/PatientRecord";
import HomePage from "./pages/home/HomePage";
import PrognosisPage from "./pages/prognosis/PrognosisPage";
import RegisterPage from "./pages/register/RegisterPage";
import DiseasePage from "./pages/disease/DiseasePage";
import ChatPage from "./pages/websocket/ChatPage";
import ContactPage from "./pages/contact/ContactPage";
import EditRecord from "./pages/record/EditRecord";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
      <AuthProvider>
        <Routes>
          <Route path="/">
            <Route
              element={
                <RequireAuth
                  allowedRoles={[ROLE.STAFF, ROLE.PATIENT]}
                ></RequireAuth>
              }
            >
              {/* <Redirect to="/home" /> */}
              <Route
                index
                element={
                  <Layout title="Home">
                    <PatientRecord>
                      <DiseasePage />
                    </PatientRecord>
                  </Layout>
                }
              />
            </Route>

            <Route path="prognosis">
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLE.PATIENT]}></RequireAuth>
                }
              >
                <Route
                  index
                  element={
                    <Layout title="Prognosis">
                      <PrognosisPage />
                    </Layout>
                  }
                />
                <Route
                  path="create"
                  element={
                    <Layout title="Manage User > Create User">
                      {/* <CreateUser /> */}
                    </Layout>
                  }
                />
                <Route
                  path="edit/:staffCode"
                  element={
                    <Layout title="Manage User > Edit User">
                      {/* <EditUser /> */}
                    </Layout>
                  }
                />
              </Route>
            </Route>

            <Route path="record">
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLE.STAFF, ROLE.PATIENT]}></RequireAuth>
                }
              >
                <Route
                  index
                  element={
                    <Layout title="Record History">
                      <HomePage />
                    </Layout>
                  }
                />
                <Route
                  path="edit/:recordId"
                  element={
                    <Layout title="Record History > Edit Record">
                      <EditRecord />
                    </Layout>
                  }
                />
              </Route>
            </Route>

            <Route path="chat">
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLE.PATIENT]}></RequireAuth>
                }
              >
                <Route
                  index
                  element={
                    <Layout title="Chat">
                      <ChatPage />
                    </Layout>
                  }
                />
              </Route>
            </Route>

            <Route path="contact">
              <Route
                element={
                  <RequireAuth allowedRoles={[ROLE.PATIENT, ROLE.STAFF]}></RequireAuth>
                }
              >
                <Route
                  index
                  element={
                    <Layout title="Contact">
                      <ContactPage />
                    </Layout>
                  }
                />
              </Route>
            </Route>
            <Route path="report">
              <Route
                index
                element={<Layout title="Report">{/* <ReportPage /> */}</Layout>}
              ></Route>
            </Route>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

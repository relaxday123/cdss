/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthProvider';
import RequireAuth from './pages/requireAuth/RequireAuth';
import { ROLE } from './util/enum';
import Layout from './layouts/Layout';
import LoginPage from './pages/login/LoginPage';
import UnauthorizedPage from './pages/unauthorized/UnauthorizedPage';
import PatientRecord from './pages/record/PatientRecord';
import HomePage from './pages/home/HomePage';
import PrognosisPage from './pages/prognosis/PrognosisPage';
import RegisterPage from './pages/register/RegisterPage';
import DiseasePage from './pages/disease/DiseasePage';

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
          <Route element={<RequireAuth allowedRoles={[ROLE.ADMIN, ROLE.PATIENT]}></RequireAuth>}>
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
            <Route element={<RequireAuth allowedRoles={[ROLE.PATIENT]}></RequireAuth>}>
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
            <Route element={<RequireAuth allowedRoles={[ROLE.PATIENT]}></RequireAuth>}>
              <Route
                index
                element={
                  <Layout title="Record History">
                    <HomePage />
                  </Layout>
                }
              /></Route>
          </Route>

          <Route path="asset">
            <Route
              index
              element={
                <Layout title="Manage Asset">
                  {/* <ManageAsset /> */}
                </Layout>
              }
            ></Route>
            <Route
              path="create"
              element={
                <Layout title="Manage Asset > Create Asset">
                  {/* <CreateAsset /> */}
                </Layout>
              }
            ></Route>
            <Route path="edit"></Route>
          </Route>

          <Route path="assignment">
            <Route element={<RequireAuth allowedRoles={[ROLE.ADMIN]}></RequireAuth>}>
              <Route
                index
                element={
                  <Layout title="Manage Assignment">
                    {/* <AdminAssignList /> */}
                  </Layout>
                }
              ></Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLE.ADMIN, ROLE.PATIENT]}></RequireAuth>}>
              <Route
                path="create"
                element={
                  <Layout title="Manage Assignment > Create New Assignment">
                    {/* <CreateAssignmentPage /> */}
                  </Layout>
                }
              ></Route>
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLE.ADMIN]}></RequireAuth>}>
              <Route
                path="edit"
                element={
                  <Layout title="Manage Assignment > Edit Assignment">
                    {/* <EditAssignmentPage /> */}
                  </Layout>
                }
              ></Route>
            </Route>
          </Route>
          <Route path="RequestForReturning">
            <Route
              index
              element={
                <Layout title="Request For Returning">
                  {/* <ViewReturningRequest /> */}
                </Layout>
              }
            ></Route>
          </Route>
          <Route path="report">
            <Route
              index
              element={
                <Layout title="Report">
                  {/* <ReportPage /> */}
                </Layout>
              }
            ></Route>
          </Route>
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
  )
}

export default App

import { Fragment, useContext } from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import MessagePage from "./pages/MessagePage";
import CompanyTablePage from "./pages/CompanyTablePage"
import AuthContext from "./context/auth-context";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {!isLoggedIn && <Route path="/login" element={<LoginPage />} />}
        {isLoggedIn && (
          <Fragment>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/companies" element={<CompanyTablePage />} />
            <Route path="/message" element={<MessagePage />} />
          </Fragment>
        )}
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;

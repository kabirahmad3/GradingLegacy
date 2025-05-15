// import Login from "./components/Login/login";
// import Admin from "./components/dashboard/admin";
// import Employee from "./components/dashboard/employee/employee";
// import Leader from "./components/dashboard/leader/leader";
import { BrowserRouter, Route, Routes , Navigate } from "react-router";
import Assessment from "./components/assessment/assessment";
import Login from "./components/Login";
import { UserContext } from "./ContextApi";
import { useState } from "react";
import Admin from "./components/Dashboard/Admin/Admin";
import Employee from "./components/Dashboard/Employee/Employee";
import ProtectedRoute from "./ProtectedRoute";
import Signup from "./components/Signup/Signup";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="" element={<ProtectedRoute />}>
              {/* <Route path="/login" element={<Navigate to={"/"}/>}/> */}
              <Route path="/">
                {user?.role === "admin" && (
                  <Route path="/" element={<Admin />} />
                )}
                {user?.role === "employe" && (
                  <Route path="/" element={<Employee />} />
                )}
                {user?.role === "leader" && (
                  <Route path="/" element={<Admin />} />
                )}
              </Route>
              <Route path="assessment/:id" element={<Assessment />} />
              {/* <Assessment /> */}
            </Route>
            {/* <Route path="signup" element={<Login />} /> */}
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;

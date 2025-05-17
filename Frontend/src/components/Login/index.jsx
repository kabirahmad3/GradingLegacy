import axios from "axios";
import appstyle from "./login.module.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../ContextApi";
const { VITE_API_URL="" }=import.meta.env; 



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  // const MOCK_USERS = [
  //   { email: "employee@company.com", role: "employee" },
  //   { email: "leader@company.com", role: "leader" },
  //   { email: "head@company.com", role: "head" },
  //   { email: "kabirahmad@gmail.com", role: "admin" },
  // ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    axios.post(`${VITE_API_URL}/api/login`, {
      username: email,
      password
    },{
      withCredentials: true,
      headers:{
        'Access-Control-Allow-Origin':"*",
      }
    })
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(err?.message || err)
      })
      .finally(() => {
        setIsSubmitting(false);
      })

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     return () => {
//         document.body.style.overflow = "scroll";
//     };
// }, []);

    // setTimeout(() => {
    //   if (!email || !password) {
    //     setErrorMessage("Please enter both email and password");
    //   } else {
    //     const foundUser = MOCK_USERS.find(
    //       (u) => u.email.toLowerCase() === email.toLowerCase()
    //     );

    //     if (!foundUser) {
    //       setErrorMessage("Invalid email or password");
    //     } else if (
    //       email.toLowerCase() === "kabirahmad@gmail.com" &&
    //       password !== "kabira"
    //     ) {
    //       setErrorMessage("Invalid email or password");
    //     } else if (password.length < 6) {
    //       setErrorMessage("Password must be at least 6 characters");
    //     } else {
    //       alert("Login successful! You would be redirected to the dashboard.");
    //       // window.location.href = 'dashboard.html';
    //     }
    //   }

    //   setIsSubmitting(false);
    // }, 1000);
  };

  return (
    <div className={appstyle.body}>
    <div className={appstyle.container}>
      {/* Left Panel */}
      <div className={appstyle["left-panel"]}>
        <div className={appstyle.branding}>
          <h1>Grading Legacy</h1>
          <p>
            Streamline your employee performance reviews with our comprehensive
            appraisal system.
          </p>
        </div>

        <div className={appstyle.features}>
          {["Self Assessment", "Leader Review", "Head Approval"].map((title, i) => (
            <div className={appstyle["feature-item"]} key={i}>
              <div className={appstyle["feature-icon"]}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className={appstyle["feature-text"]}>
                <h3>{title}</h3>
                <p>
                  {title === "Self Assessment"
                    ? "Employees assess their own performance against key competencies"
                    : title === "Leader Review"
                      ? "Direct managers provide feedback and ratings"
                      : "Department heads review and finalize appraisals"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel (Form) */}
      <div className={appstyle["right-panel"]}>
        <form className={appstyle["login-form"]} onSubmit={handleSubmit}>
          <h2>Sign in to Grading Legacy</h2>

          {errorMessage && <div className={appstyle["error-message"]}>{errorMessage}</div>}

          <div className={appstyle["form-group"]}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              // type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={appstyle["form-group"]}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={appstyle["sign-in-button"]} disabled={isSubmitting}>
            {isSubmitting ? "Signing In..." : "Sign In"}
          </button>
          <div className={appstyle.change}>
            <p>Don't have an account? </p>
            <p className={appstyle.a} onClick={()=>{navigate('/signup', {replace:true})}}>Signup</p>
          </div>
          {/* <div className={appstyle["demo-credentials"]}>
            <p className={appstyle["demo-title"]}>Demo credentials:</p>
            <div className={appstyle["credential-list"]}>
              <p>Employee: employee@company.com</p>
              <p>Leader: leader@company.com</p>
              <p>Head: head@company.com</p>
              <p>Admin: admin@company.com</p>
              <p>Test User: kabirahmad@gmail.com (password: kabira)</p>
              <p className={appstyle["password-note"]}>
                For other emails, use any password (min 6 chars)
              </p>
            </div>
          </div> */}
        </form>
      </div>
    </div>
  </div>
  );
}

export default Login;

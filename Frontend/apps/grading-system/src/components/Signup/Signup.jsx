import appstyle from "./signup.module.css";
import { useState } from 'react';
import { useNavigate } from "react-router";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    username: '',
    email: '',
    password: '',
    role: '',
    leaderName: '',
    headName: ''
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const { name, username, email, password, role, leaderName, headName } = formData;

    if (name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters.';
    if (username.trim().length < 3) newErrors.username = 'Username must be at least 3 characters.';
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Please enter a valid email address.';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (!role) newErrors.role = 'Role is required.';

    if (role === 'employee') {
      if (!leaderName.trim()) newErrors.leaderName = 'Leader name is required for employees.';
      if (!headName.trim()) newErrors.headName = 'Head name is required.';
    } else if (role === 'leader') {
      if (!headName.trim()) newErrors.headName = 'Head name is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('Account created successfully!');
      setFormData({
        name: '',
        age: '',
        username: '',
        email: '',
        password: '',
        role: '',
        leaderName: '',
        headName: ''
      });
      setErrors({});
    }
  };

  return (
    <div className={appstyle.body}>
    <div className={appstyle.container}>
      <div className={appstyle["left-panel"]}>
        <div className={appstyle.branding}>
          <h1>Grading Legacy</h1>
          <p>Streamline your employee performance reviews with our comprehensive appraisal system.</p>
        </div>
        <div className={appstyle.features}>
          {["Self Assessment", "Leader Review", "Head Approval"].map((title, idx) => (
            <div key={idx} className={appstyle["feature-item"]}>
              <div className={appstyle["feature-icon"]}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className={appstyle["feature-text"]}>
                <h3>{title}</h3>
                <p>
                  {title === 'Self Assessment' && 'Employees assess their own performance against key competencies'}
                  {title === 'Leader Review' && 'Direct managers provide feedback and ratings'}
                  {title === 'Head Approval' && 'Department heads review and finalize appraisals'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={appstyle["right-panel"]}>
        <div className={appstyle["login-form"]}>
          <div className={appstyle["form-header"]}>
            <h2>Sign up to Grading Legacy</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={appstyle["form-group"]}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" />
              <span className={appstyle.error}>{errors.name}</span>
            </div>

            <div className={appstyle["form-group"]}>
              <label htmlFor="age">Age</label>
              <input type="number" id="age" value={formData.age} onChange={handleChange} placeholder="Enter Age" />
              <span className={appstyle.error}>{errors.age}</span>
            </div>

            <div className={appstyle["form-group"]}>
              <label htmlFor="username">Username</label>
              <input type="text" id="username" value={formData.username} onChange={handleChange} placeholder="Enter Username" />
              <span className={appstyle.error}>{errors.username}</span>
            </div>

            <div className={appstyle["form-group"]}>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
              <span className={appstyle.error}>{errors.email}</span>
            </div>

            <div className={appstyle["form-group"]}>
              <label htmlFor="password">Password</label>
              <input type="password" id="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" />
              <span className={appstyle.error}>{errors.password}</span>
            </div>

            <div className={appstyle["form-group"]}>
              <label htmlFor="role">Role</label>
              <select id="role" value={formData.role} onChange={handleChange}>
                <option value="" disabled>Select your role</option>
                <option value="employee">Employee</option>
                <option value="leader">Leader</option>
                <option value="head">Head</option>
              </select>
              <span className={appstyle.error}>{errors.role}</span>
            </div>

            {formData.role === 'employee' && (
              <div className={appstyle["form-group"]}>
                <label htmlFor="leaderName">Leader's Name</label>
                <input type="text" id="leaderName" value={formData.leaderName} onChange={handleChange} placeholder="Your leader's name" />
                <span className={appstyle.error}>{errors.leaderName}</span>
              </div>
            )}

            {(formData.role === 'employee' || formData.role === 'leader') && (
              <div className={appstyle["form-group"]}>
                <label htmlFor="headName">Head's Name</label>
                <input type="text" id="headName" value={formData.headName} onChange={handleChange} placeholder="Your head's name" />
                <span className={appstyle.error}>{errors.headName}</span>
              </div>
            )}

            <button type="submit" className={appstyle.btn}>Sign Up</button>
            <div className={appstyle.change}>
                        <p>Already have an account? </p>
                        <p className={appstyle.a} onClick={()=>{navigate('/login', {replace:true})}}>Login</p>
                      </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Signup;

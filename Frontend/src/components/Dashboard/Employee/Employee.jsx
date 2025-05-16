import { useContext, useEffect, useState } from 'react';
import appstyle from'./employee.module.css';
import axios from 'axios';
import Card from '../../Card';
import { UserContext } from '../../../ContextApi';
import Login from '../../Login';
import { isCookie, useNavigate } from 'react-router';
const { VITE_API_URL="" } = import.meta.env;




function Employee() {
  const [statusOptions, setStatusOptions] = useState([]);
  const [cycleOptions, setCycleOptions] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [forms, setForms] = useState([]);

  const {user , setUser} = useContext(UserContext);

  const navigate= useNavigate();
  
  useEffect(() => {
    // Populate dropdowns on mount
    setStatusOptions(['All Statuses', 'Draft', 'Submitted', 'Leader Review', 'Head Review', 'Completed']);
    setCycleOptions(['All Cycles', 'Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025']);
    // console.log('Employee Dashboard loaded');

    axios.get(`${VITE_API_URL}/api/get-form`)
      .then(({data}) => {
        setForms(data)
      })
      .catch();
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    console.log('Searching for:', e.target.value);
  };
  const previous=()=>{
    setUser({});
    localStorage.removeItem("user");
    alert("You have successfully logged out.");
    navigate('login');
  }

  return (
    <>
    {/* <div className={appstyle.body}> */}
      <header className={appstyle.header}>
        <div className={[appstyle.container, appstyle["header-container"]].join(' ')} >
          <div className={appstyle.logo}>
            <a href="#">Grading Legacy</a>
          </div>
          <div className={appstyle["user-section"]}>
            <span className={appstyle["user-name"]}>{user.name} ({user.role})</span>
            <div className={appstyle["user-avatar"]}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                   fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <button className={appstyle["logout-link"]} onClick={previous}>Logout</button>
          </div>
        </div>
      </header>

      <main className={appstyle.main}>
        <div className={appstyle.container}>
          <div className={appstyle["dashboard-header"]}>
            <h1>Appraisal Dashboard</h1>
            <p className={appstyle["dashboard-subtitle"]}>Manage and view your performance appraisals</p>
          </div>

          <div className={appstyle["filters-section"]}>
            <div className={appstyle["filter-group"]}>
              <label htmlFor="status-filter">Status</label>
              <select id="status-filter" className={appstyle["filter-control"]}>
                {statusOptions.map((status, idx) => (
                  <option key={idx}>{status}</option>
                ))}
              </select>
            </div>

            <div className={appstyle["filter-group"]}>
              <label htmlFor="cycle-filter">Cycle</label>
              <select id="cycle-filter" className={appstyle["filter-control"]}>
                {cycleOptions.map((cycle, idx) => (
                  <option key={idx}>{cycle}</option>
                ))}
              </select>
            </div>

            <div className={appstyle["filter-group"]}>
              <label htmlFor="search-filter">Search</label>
              <input
                id="search-filter"
                type="text"
                className={appstyle["filter-control"]}
                placeholder="Search by employee name"
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Section: Pending Your Action */}
          {
            forms.map((form) => <Card form={form} key={form._id} />)
          }
          {/* /* Section: In Progress & Completed */
          /* <section className="appraisal-section">
            <h2 className="section-title">In Progress & Completed</h2>
            <div className="appraisal-cards">
              <div className="appraisal-card">
                <div className="card-header">
                  <h3 className="card-title">Q1 2023 Appraisal</h3>
                  <span className="status-badge completed">Completed</span>
                </div>
                <p className="employee-info">Employee: John Employee</p>
                <div className="card-details">
                  <div className="due-date">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    Due: 3/31/2023
                  </div>
                  <div className="competencies completed-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                      <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    3 competencies
                  </div>
                </div>
                <a href="#" className="card-action">
                  View Final Appraisal
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                       viewBox="0 0 24 24" fill="none" stroke="currentColor"
                       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </a>
              </div>
            </div>
          </section> */} 
        </div>
      </main>
      {/* </div> */}
    </>
  );
}

export default Employee;

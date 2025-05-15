// import './admin.css'




// function Admin(){

//     document.addEventListener('DOMContentLoaded', function() {
//         // This would contain any JavaScript functionality
//         // Currently the page is static as shown in the image
//         console.log('Dashboard loaded');
//       });


//     return(
//         <>
//             <header class="header">
//     <div class="container header-container">
//       <div class="logo">
//         <a href="#">AppraisalFlow</a>
//       </div>
//       <div class="user-section">
//         <div class="user-info">
//           <span>Kabir Ahmad (admin)</span>
//           <div class="user-avatar">
//             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
//           </div>
//         </div>
//         <a href="#" class="logout-link">Logout</a>
//       </div>
//     </div>
//   </header>
  
//   <main class="main">
//     <div class="container">
//       <div class="dashboard-header">
//         <div class="dashboard-title">
//           <h1>Appraisal Dashboard</h1>
//           <p>Manage all appraisal activities</p>
//         </div>
//         <div class="dashboard-actions">
//           <button class="primary-button">Manage Appraisals</button>
//         </div>
//       </div>
      
//       <div class="filters-section">
//         <div class="filter-group">
//           <label for="status-filter">Status</label>
//           <select id="status-filter" class="filter-control">
//             <option>All Statuses</option>
//           </select>
//         </div>
        
//         <div class="filter-group">
//           <label for="cycle-filter">Cycle</label>
//           <select id="cycle-filter" class="filter-control">
//             <option>All Cycles</option>
//           </select>
//         </div>
        
//         <div class="filter-group">
//           <label for="search-filter">Search</label>
//           <input
//             id="search-filter"
//             type="text"
//             class="filter-control"
//             placeholder="Search by employee name"
//           />
//         </div>
//       </div>
      
//       {/* <!-- The content area would typically have appraisal cards here --> */}
//       <div class="content-area">
//         {/* <!-- This is where the appraisal cards would be displayed --> */}
//         {/* <!-- Empty in the screenshot --> */}
//       </div>
//     </div>
//   </main>

//         </>
//     );
// }






import React, { useEffect } from 'react';
import appstyle from './admin.module.css';
import axios from 'axios';
import Login from '../../Login';

function Admin() {
  useEffect(() => {
    console.log('Dashboard loaded');
  }, []);

  const createAppraisal = () => {
    axios.post("/api/create-form", {})
    .then(() => {
      alert("form created");
    })
    .catch(() => {
      alert("somthing went wrong");
    })
  }

  return (
    <>
    {/* <div className={appstyle.body}> */}
      <header className={appstyle.header}>
        <div className={[appstyle.container, appstyle['header-container']].join(' ')} >
          <div className={appstyle.logo}>
            <a href="#">AppraisalFlow</a>
          </div>
          <div className={appstyle["user-section"]}>
            <div className={appstyle["user-info"]}>
              <span>Kabir Ahmad (admin)</span>
              <div className={appstyle["user-avatar"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            </div>
            <button className={appstyle["logout-link"]} onClick={'./Login'}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className={appstyle.main}>
        <div className={appstyle.container}>
          <div className={appstyle["dashboard-header"]}>
            <div className={appstyle["dashboard-title"]}>
              <h1>Appraisal Dashboard</h1>
              <p>Manage all appraisal activities</p>
            </div>
            <div className={appstyle["dashboard-actions"]}>
              <button className={appstyle["primary-button"]} onClick={createAppraisal}>Manage Appraisals</button>
            </div>
          </div>

          <div className={appstyle["filters-section"]}>
            <div className={appstyle["filter-group"]}>
              <label htmlFor="status-filter">Status</label>
              <select id="status-filter" className={appstyle["filter-control"]}>
                <option>All Statuses</option>
              </select>
            </div>

            <div className={appstyle["filter-group"]}>
              <label htmlFor="cycle-filter">Cycle</label>
              <select id="cycle-filter" className={appstyle["filter-control"]}>
                <option>All Cycles</option>
              </select>
            </div>

            <div className={appstyle["filter-group"]}>
              <label htmlFor="search-filter">Search</label>
              <input
                id="search-filter"
                type="text"
                className={appstyle["filter-control"]}
                placeholder="Search by employee name"
              />
            </div>
          </div>

          <div className={appstyle["content-area"]}>
            {/* Appraisal cards would be rendered here */}
          </div>
        </div>
      </main>
      {/* </div> */}
    </>
  );
}

export default Admin;

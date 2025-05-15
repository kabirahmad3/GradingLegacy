import React, { useEffect } from 'react';
import appstyle from './leader.module.css';

function Leader() {
  useEffect(() => {
    console.log('Dashboard loaded');

    // Toast notification automatically disappears after 5 seconds
    const toastTimeout = setTimeout(() => {
      const toast = document.querySelector('.toast');
      if (toast) {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(1rem)';
        toast.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out';

        setTimeout(() => {
          toast.style.display = 'none';
        }, 300);
      }
    }, 5000);

    // Filter functionality
    const filters = document.querySelectorAll('.filter-control');
    const handleFilterChange = (event) => {
      console.log(`Filter changed: ${event.target.id} = ${event.target.value}`);
      // Implement actual filtering logic here
    };

    filters.forEach((filter) => {
      filter.addEventListener('change', handleFilterChange);
    });

    // Cleanup function
    return () => {
      clearTimeout(toastTimeout);
      filters.forEach((filter) => {
        filter.removeEventListener('change', handleFilterChange);
      });
    };
  }, []);

  return (
    <>
      <header className={appstyle.header}>
        <div className={[appstyle["header-container"],appstyle.container].join(" ")}>
          <div className={appstyle.logo}>
            <a href="#">Grading Legacy</a>
          </div>
          <div className={appstyle["user-section"]}>
            <div className={appstyle["user-info"]}>
              <span>Kabir (leader)</span>
              <div className={appstyle["user-avatar"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
            <a href="#" className={appstyle["logout-link"]}>
              Logout
            </a>
          </div>
        </div>
      </header>

      <main className={appstyle.main}>
        <div className={appstyle.container}>
          <div className={appstyle["dashboard-header"]}>
            <div className={appstyle["dashboard-title"]}>
              <h1>Appraisal Dashboard</h1>
              <p>Review team members assessment</p>
            </div>
          </div>

          <div className={appstyle["filters-section"]}>
            <div className={appstyle["filter-group"]}>
              <label htmlFor={appstyle["status-filter"]}>Status</label>
              <select id="status-filter" className={appstyle["filter-control"]}>
                <option>All Statuses</option>
                <option>Draft</option>
                <option>Completed</option>
                <option>Leader Review</option>
                <option>Head Review</option>
              </select>
            </div>

            <div className={appstyle["filter-group"]}>
              <label htmlFor="cycle-filter">Cycle</label>
              <select id="cycle-filter" className={appstyle["filter-control"]}>
                <option>All Cycles</option>
                <option>Q1 2023</option>
                <option>Q2 2023</option>
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
            <h2>In Progress & Completed</h2>

            <div className={appstyle["appraisal-cards"]}>
              {/* Card 1: Completed */}
              <div className={appstyle["appraisal-card"]}>
                <div className={appstyle["card-header"]}>
                  <div>
                    <h3>Q1 2023 Appraisal</h3>
                    <p className={appstyle["employee"]}>Employee: John Employee</p>
                  </div>
                  <span className={[appstyle["status-badge"],appstyle["status-completed"]].join(" ")}>Completed</span>
                </div>
                <div className={appstyle["card-due-date"]}>
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
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>Due: 3/31/2023</span>
                </div>
                <div className={appstyle["card-footer"]}>
                  <div className={appstyle.competencies}>
                    <svg
                      className={appstyle["icon-green"]}
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
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>5 competencies</span>
                  </div>
                  <a href="#" className={appstyle["action-link"]}>
                    View Final Appraisal
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
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Additional cards can be added here following the same structure */}

            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Leader;


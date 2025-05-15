import React from 'react'
import { Link } from 'react-router'
import appstyle from './card.module.css';

function Card({form}) {
    return (
        <section className={appstyle["appraisal-section"]}>
            <h2 className={appstyle["section-title"]}>Pending Your Action</h2>
            <div className={appstyle["appraisal-cards"]}>
                <div className={appstyle["appraisal-card"]}>
                    <div className={appstyle["card-header"]}>
                        <h3 className={appstyle["card-title"]}>Q2 2025 Appraisal</h3>
                        <span className={[appstyle["status-badge"],appstyle.draft].join(' ')}>Draft</span>
                    </div>
                    <p className={appstyle["employee-info"]}>Employee: {form.employee.name}</p>
                    <div className={appstyle["card-details"]}>
                        <div className={appstyle["due-date"]}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            Due: 6/30/2025
                        </div>
                        <div className={appstyle.competencies}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                            </svg>
                            5 competencies
                        </div>
                    </div>
                    <Link to={`/assessment/${form._id}`} className={appstyle["card-action"]}>
                        Continue Self Assessment
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Card
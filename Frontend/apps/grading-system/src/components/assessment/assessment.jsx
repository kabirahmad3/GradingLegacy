import React, { useEffect, useState } from 'react';
import appstyle from './assessment.module.css';
import { Link, useParams } from 'react-router';
import axios from 'axios';

function Assessment() {
  const {id: formId} = useParams()
  const [form, setForm] = useState();
  
  useEffect(() => {
    // Initialize rating scales
    const scales = document.querySelectorAll('.rating-scale');
    const selectedCategories = new Set();

    scales.forEach((scale) => {
      const points = scale.querySelectorAll('.rating-point');
      const fillLine = scale.querySelector('.rating-fill-line');
      const category = scale.getAttribute('data-category');

      points.forEach((point, index) => {
        point.addEventListener('click', () => {
          // Clear previous active/fill states
          points.forEach((p) => {
            const circle = p.querySelector('.point-circle');
            circle.classList.remove('active', 'filled');
          });

          // Add active/fill to current and all previous
          for (let i = 0; i <= index; i++) {
            const circle = points[i].querySelector('.point-circle');
            if (i === index) {
              circle.classList.add('active');
            } else {
              circle.classList.add('filled');
            }
          }

          // Update the line fill (based on %)
          const percent = (index / (points.length - 1)) * 100;
          fillLine.style.width = `${percent}%`;

          // Mark this category as completed
          selectedCategories.add(category);
          updateProgress();
        });
      });
    });

    axios.get(`/api/get-form/${formId}`)
      .then(({data}) => {
        setForm(data);
      })
      .catch()

    function updateProgress() {
      const percent = selectedCategories.size * 20;
      const progressFill = document.getElementById('progress-fill');
      const progressPercent = document.getElementById('progress-percent');
      if (progressFill && progressPercent) {
        progressFill.style.width = `${percent}%`;
        progressPercent.textContent = `${percent}% Complete`;
      }
    }

    // Cleanup function
    return () => {
      scales.forEach((scale) => {
        const points = scale.querySelectorAll('.rating-point');
        points.forEach((point) => {
          point.replaceWith(point.cloneNode(true));
        });
      });
    };
  }, []);

  return (
    <>
      <div className={appstyle.container}>
        <div className={appstyle.header}>
          <Link to="/" className={appstyle["back-button"]}>
            ← Back to Appraisals
          </Link>
          <div className={appstyle["employee-info"]}>Employee: {form?.employee?.name}</div>
        </div>

        <div className={appstyle["assessment-card"]}>
          <div className={appstyle["assessment-title"]}>
            <h1>Q2 2023 Self Assessment</h1>
            <span className={appstyle["draft-badge"]}>Draft</span>
          </div>

          <div className={appstyle["progress-container"]}>
            <div className={appstyle["progress-text"]}>
              <span id="progress-label">Progress</span>
              <span id="progress-percent">0% Complete</span>
            </div>
            <div className={appstyle["progress-bar"]}>
              <div className={appstyle["progress-fill"]} id="progress-fill"></div>
            </div>
          </div>

          <div className={appstyle.instructions}>
            Please rate your performance in each competency and provide specific examples to support your rating.
          </div>
        </div>

        {/* Communication */}
        <div className={appstyle["assessment-card"]}>
          <h2 className={appstyle["category-title"]}>Communication</h2>
          <p className={appstyle["category-description"]}>
            Ability to effectively exchange information with stakeholders
          </p>

          <div className={appstyle["rating-question"]}>How would you rate yourself?</div>
          <div className={appstyle["rating-scale"]} data-category="communication">
            <div className={appstyle["rating-line"]}>
              <div className={[appstyle["rating-fill-line"],appstyle["rating-line"]].join(" ")}></div>
            </div>
            <div className={appstyle["rating-points"]}>
              {[1, 2, 3, 4, 5].map((value) => (
                <div className={appstyle["rating-point"]} key={value}>
                  <div className={appstyle["point-circle"]}></div>
                  <div className={appstyle["point-value"]}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={appstyle["supporting-examples"]}>
            <div className={appstyle["examples-label"]}>Supporting examples</div>
            <textarea placeholder="Provide specific examples of your performance in this area..."></textarea>
          </div>
        </div>

        {/* Timeliness */}
        <div className={appstyle["assessment-card"]}>
          <h2 className={appstyle["category-title"]}>Timeliness</h2>
          <p className={appstyle["category-description"]}>Punctuality and ability to meet deadlines</p>

          <div className={appstyle["rating-question"]}>How would you rate yourself?</div>
          <div className={appstyle["rating-scale"]} data-category="timeliness">
            <div className={appstyle["rating-line"]}>
              <div className={[appstyle["rating-fill-line"],appstyle["rating-line"]].join(" ")}></div>
            </div>
            <div className={appstyle["rating-points"]}>
              {[1, 2, 3, 4, 5].map((value) => (
                <div className={appstyle["rating-point"]} key={value}>
                  <div className={appstyle["point-circle"]}></div>
                  <div className={appstyle["point-value"]}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={appstyle["supporting-examples"]}>
            <div className={appstyle["examples-label"]}>Supporting examples</div>
            <textarea placeholder="Provide specific examples of your performance in this area..."></textarea>
          </div>
        </div>

        {/* Technical Skills */}
        <div className={appstyle["assessment-card"]}>
          <h2 className={appstyle["category-title"]}>Technical Skills</h2>
          <p className={appstyle["category-description"]}>Proficiency in relevant technical skills</p>

          <div className={appstyle["rating-question"]}>How would you rate yourself?</div>
          <div className={appstyle["rating-scale"]} data-category="technical">
            <div className={appstyle["rating-line"]}>
              <div className={[appstyle["rating-fill-line"],appstyle["rating-line"]].join(" ")}></div>
            </div>
            <div className={appstyle["rating-points"]}>
              {[1, 2, 3, 4, 5].map((value) => (
                <div className={appstyle["rating-point"]} key={value}>
                  <div className={appstyle["point-circle"]}></div>
                  <div className={appstyle["point-value"]}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={appstyle["supporting-examples"]}>
            <div className={appstyle["examples-label"]}>Supporting examples</div>
            <textarea placeholder="Provide specific examples of your performance in this area..."></textarea>
          </div>
        </div>

        {/* Teamwork */}
        <div className={appstyle["assessment-card"]}>
          <h2 className={appstyle["category-title"]}>Teamwork</h2>
          <p className={appstyle["category-description"]}>Collaboration and contribution to team objectives</p>

          <div className={appstyle["rating-question"]}>How would you rate yourself?</div>
          <div className={appstyle["rating-scale"]} data-category="teamwork">
            <div className={appstyle["rating-line"]}>
              <div className={[appstyle["rating-fill-line"],appstyle["rating-line"]].join(" ")}></div>
            </div>
            <div className={appstyle["rating-points"]}>
              {[1, 2, 3, 4, 5].map((value) => (
                <div className={appstyle["rating-point"]} key={value}>
                  <div className={appstyle["point-circle"]}></div>
                  <div className={appstyle["point-value"]}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={appstyle["supporting-examples"]}>
            <div className={appstyle["examples-label"]}>Supporting examples</div>
            <textarea placeholder="Provide specific examples of your performance in this area..."></textarea>
          </div>
        </div>

        {/* Behavior */}
        <div className={appstyle["assessment-card"]}>
          <h2 className={appstyle["category-title"]}>Behavior</h2>
          <p className={appstyle["category-description"]}>Professional conduct and interpersonal interactions</p>

          <div className={appstyle["rating-question"]}>How would you rate yourself?</div>
          <div className={appstyle["rating-scale"]} data-category="behavior">
            <div className={appstyle["rating-line"]}>
              <div className={[appstyle["rating-fill-line"],appstyle["rating-line"]].join(" ")}></div>
            </div>
            <div className={appstyle["rating-points"]}>
              {[1, 2, 3, 4, 5].map((value) => (
                <div className={appstyle["rating-point"]} key={value}>
                  <div className={appstyle["point-circle"]}></div>
                  <div className={appstyle["point-value"]}>{value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={appstyle["supporting-examples"]}>
            <div className={appstyle["examples-label"]}>Supporting examples</div>
            <textarea placeholder="Provide specific examples of your performance in this area..."></textarea>
          </div>
        </div>

        {/* Save Button */}
        <button className={appstyle["save-button"]}>
          <svg
            className={appstyle["save-icon"]}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
          Save Assessment
        </button>
      </div>
    </>
  );
}

export default Assessment;

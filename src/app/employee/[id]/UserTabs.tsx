'use client';

import React, { useState } from 'react';

type Performance = {
  period: string;
  rating: number;
};

type Props = {
  performanceHistory: Performance[];
};

function starRating(rating: number) {
  return (
    <>
      <span style={{ color: '#ffc107' }}>{'★'.repeat(rating)}</span>
      <span style={{ color: '#ced4da' }}>{'★'.repeat(5 - rating)}</span>
    </>
  );
}

export default function UserTabs({ performanceHistory }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'feedback'>('overview');

  return (
    <>
      <ul className="nav nav-tabs mb-3" role="tablist">
        {['overview', 'projects', 'feedback'].map((tab) => (
          <li className="nav-item" role="presentation" key={tab}>
            <button
              className={`nav-link ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab as typeof activeTab)}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`tab-${tab}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      <div id={`tab-${activeTab}`}>
        {activeTab === 'overview' && (
          <div>
            <h5>Performance History</h5>
            <ul className="list-group">
              {performanceHistory.map((p) => (
                <li
                  key={p.period}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {p.period}
                  {starRating(p.rating)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            <h5>Projects</h5>
            <ul>
              <li>Project Alpha – Completed</li>
              <li>Project Beta – In Progress</li>
              <li>Project Gamma – Upcoming</li>
            </ul>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div>
            <h5>Feedback</h5>
            <p>No feedback available yet.</p>
          </div>
        )}
      </div>
    </>
  );
}

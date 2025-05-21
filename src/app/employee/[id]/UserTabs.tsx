'use client';

import React, { useState } from 'react';

type Performance = {
  period: string;
  rating: number;
};

function starRating(rating: number) {
  return (
    <>
      <span style={{ color: '#ffc107' }}>{'★'.repeat(rating)}</span>
      <span style={{ color: '#e4e5e9' }}>{'★'.repeat(5 - rating)}</span>
    </>
  );
}

export default function UserTabs({ performanceHistory }: { performanceHistory: Performance[] }) {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'feedback'>('overview');

  return (
    <>
      <ul className="nav nav-tabs mb-3" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
            type="button"
            role="tab"
          >
            Overview
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
            type="button"
            role="tab"
          >
            Projects
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'feedback' ? 'active' : ''}`}
            onClick={() => setActiveTab('feedback')}
            type="button"
            role="tab"
          >
            Feedback
          </button>
        </li>
      </ul>

      <div>
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
              <li>Project Alpha - Completed</li>
              <li>Project Beta - In Progress</li>
              <li>Project Gamma - Upcoming</li>
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
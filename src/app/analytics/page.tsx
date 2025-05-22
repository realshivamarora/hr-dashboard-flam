'use client';

import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useBookmarkStore } from '@/store/bookmarkStore';
import Link from 'next/link';

Chart.register(...registerables);

type User = {
  id: number;
  department: string;
  rating: number;
};

export default function AnalyticsPage() {
  const bookmarks = useBookmarkStore((state) => state.bookmarks);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=20')
      .then((res) => res.json())
      .then((data) => {
        const departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance'];
        const usersWithExtras = data.users.map((u: { id: number }): User => ({
          id: u.id,
          department: departments[Math.floor(Math.random() * departments.length)],
          rating: Math.floor(Math.random() * 5) + 1,
        }));
        setUsers(usersWithExtras);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading analytics...</p>;

  const deptRatings: Record<string, { total: number; count: number }> = {};
  users.forEach(({ department, rating }) => {
    if (!deptRatings[department]) deptRatings[department] = { total: 0, count: 0 };
    deptRatings[department].total += rating;
    deptRatings[department].count += 1;
  });

  const departments = Object.keys(deptRatings);
  const avgRatings = departments.map(
    (d) => deptRatings[d].total / deptRatings[d].count
  );

  const bookmarkTrendLabels = ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];
  const bookmarkTrendData = bookmarkTrendLabels.map(
    () => Math.floor(Math.random() * bookmarks.length)
  );

  const barData = {
    labels: departments,
    datasets: [
      {
        label: 'Average Performance Rating',
        data: avgRatings,
        backgroundColor: 'rgba(13, 110, 253, 0.7)', 
      },
    ],
  };

  const lineData = {
    labels: bookmarkTrendLabels,
    datasets: [
      {
        label: 'Bookmarks Over Time',
        data: bookmarkTrendData,
        fill: false,
        borderColor: 'rgba(220, 53, 69, 0.7)', 
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="container mt-4">
      <h2>Analytics Dashboard</h2>

      <div className="mb-5">
        <h4>Department-wise Average Ratings</h4>
        <Bar data={barData} options={{ responsive: true, scales: { y: { min: 0, max: 5 } } }} />
      </div>

      <div>
        <h4>Bookmark Trends (last 6 months)</h4>
        <Line data={lineData} options={{ responsive: true }} />
      </div>

      <Link href="/" className="btn btn-secondary mt-4">
        Back to Dashboard
      </Link>
    </div>
  );
}

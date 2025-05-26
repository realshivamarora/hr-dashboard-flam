'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useBookmarkStore } from '@/store/bookmarkStore';

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  rating: number;
};

const departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance'];

const getRandomDepartment = () =>
  departments[Math.floor(Math.random() * departments.length)];

const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=20')
      .then((res) => res.json())
      .then((data) => {
        const enrichedUsers = data.users.map((user: {
          id: number;
          firstName: string;
          lastName: string;
          email: string;
          age: number;
        }): User => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          age: user.age,
          department: getRandomDepartment(),
          rating: getRandomRating(),
        }));
        setUsers(enrichedUsers);
      });
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-center">Employee Dashboard</h2>

      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search employees..."
        />
      </div>

      <div className="mb-4">
        <div className="mb-3">
          <label htmlFor="filterDepartment" className="form-label fw-semibold">
            Filter by Department
          </label>
          <select id="filterDepartment" className="form-select">
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filterRating" className="form-label fw-semibold">
            Filter by Rating
          </label>
          <select id="filterRating" className="form-select">
            <option value="">All Ratings</option>
            {[5, 4, 3, 2, 1].map((rating) => (
              <option key={rating} value={rating}>
                {rating} star{rating > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {users.map((user) => (
          <div className="col-md-4 mb-4" key={user.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">
                  {user.firstName} {user.lastName}
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                <p className="mb-1">
                  <strong>Age:</strong> {user.age}
                </p>
                <p className="mb-1">
                  <strong>Department:</strong> {user.department}
                </p>
                <p className="mb-2">
                  <strong>Rating:</strong>{' '}
                  <span style={{ color: '#ffc107' }}>
                    {'★'.repeat(user.rating)}
                    {'☆'.repeat(5 - user.rating)}
                  </span>
                </p>
                <div className="d-flex gap-2">
                  <Link href={`/employee/${user.id}`} className="btn btn-sm btn-primary">
                    View
                  </Link>
                  {isBookmarked(user.id) ? (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeBookmark(user.id)}
                    >
                      Remove Bookmark
                    </button>
                  ) : (
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => addBookmark(user)}
                    >
                      Bookmark
                    </button>
                  )}
                  <button className="btn btn-sm btn-success">Promote</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

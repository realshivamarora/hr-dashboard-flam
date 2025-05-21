'use client';

import React, { useEffect, useState, useMemo } from 'react';
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
const ratings = [1, 2, 3, 4, 5];

const getRandomDepartment = () =>
  departments[Math.floor(Math.random() * departments.length)];

const getRandomRating = () => Math.floor(Math.random() * 5) + 1;

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const { bookmarks, addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();

  useEffect(() => {
    fetch('https://dummyjson.com/users?limit=20')
      .then((res) => res.json())
      .then((data) => {
        const enrichedUsers = data.users.map((u: any) => ({
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          age: u.age,
          department: getRandomDepartment(),
          rating: getRandomRating(),
        }));
        setUsers(enrichedUsers);
      });
  }, []);

  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const searchText = searchTerm.toLowerCase();
      const matchesSearch =
        user.firstName.toLowerCase().includes(searchText) ||
        user.lastName.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.department.toLowerCase().includes(searchText);

      const matchesDept =
        selectedDepartments.length === 0 || selectedDepartments.includes(user.department);

      const matchesRating =
        selectedRatings.length === 0 || selectedRatings.includes(user.rating);

      return matchesSearch && matchesDept && matchesRating;
    });
  }, [users, searchTerm, selectedDepartments, selectedRatings]);

  // Toggle department selection
  const toggleDepartment = (dept: string) => {
    setSelectedDepartments((prev) =>
      prev.includes(dept) ? prev.filter((d) => d !== dept) : [...prev, dept]
    );
  };

  // Toggle rating selection
  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  return (
    <div>
      <h2 className="mb-4">Employee Dashboard</h2>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="search"
          className="form-control"
          placeholder="Search by name, email, or department"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="mb-4 d-flex flex-wrap gap-3">
        {/* Department Filter */}
        <div>
          <label className="form-label fw-bold">Filter by Department:</label>
          <div>
            {departments.map((dept) => (
              <div className="form-check form-check-inline" key={dept}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`dept-${dept}`}
                  checked={selectedDepartments.includes(dept)}
                  onChange={() => toggleDepartment(dept)}
                />
                <label className="form-check-label" htmlFor={`dept-${dept}`}>
                  {dept}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="form-label fw-bold">Filter by Rating:</label>
          <div>
            {ratings.map((r) => (
              <div className="form-check form-check-inline" key={r}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`rating-${r}`}
                  checked={selectedRatings.includes(r)}
                  onChange={() => toggleRating(r)}
                />
                <label className="form-check-label" htmlFor={`rating-${r}`}>
                  {r} Star{r > 1 ? 's' : ''}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Cards */}
      <div className="row">
        {filteredUsers.length === 0 ? (
          <p>No users match your criteria.</p>
        ) : (
          filteredUsers.map((user) => (
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
          ))
        )}
      </div>
    </div>
  );
}

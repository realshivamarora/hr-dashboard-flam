'use client';

import React from 'react';
import Link from 'next/link';
import { useBookmarkStore } from '../../store/bookmarkStore';

export default function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarkStore();

  return (
    <div>
      <h2 className="mb-4">Bookmarked Employees</h2>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="row">
          {bookmarks.map((user) => (
            <div className="col-md-4 mb-4" key={user.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    {user.firstName} {user.lastName}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted">{user.email}</h6>
                  <p className="mb-1"><strong>Age:</strong> {user.age}</p>
                  <p className="mb-1"><strong>Department:</strong> {user.department}</p>
                  <p className="mb-2">
                    <strong>Rating:</strong>{' '}
                    <span style={{ color: '#ffc107' }}>
                      {'★'.repeat(user.rating)}{'☆'.repeat(5 - user.rating)}
                    </span>
                  </p>
                  <div className="d-flex gap-2">
                    <Link href={`/employee/${user.id}`} className="btn btn-sm btn-primary">
                      View
                    </Link>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeBookmark(user.id)}
                    >
                      Remove Bookmark
                    </button>
                    <button className="btn btn-sm btn-outline-success">
                      Assign to Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

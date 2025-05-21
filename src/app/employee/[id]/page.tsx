import Link from 'next/link';
import UserTabs from './UserTabs'; // Client component for tabs UI

type UserDetail = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  department: string;
  phone: string;
  address: string;
  bio: string;
  rating: number;
  performanceHistory: { period: string; rating: number }[];
};

function getBadgeColor(rating: number) {
  if (rating >= 4) return 'success';
  if (rating === 3) return 'warning';
  return 'danger';
}

async function fetchUser(id: string): Promise<UserDetail> {
  const res = await fetch(`https://dummyjson.com/users/${id}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error('User not found');
  const data = await res.json();

  const getRandomRating = () => Math.floor(Math.random() * 5) + 1;
  const mockPerformanceHistory = () => [
    { period: 'Q1 2024', rating: getRandomRating() },
    { period: 'Q4 2023', rating: getRandomRating() },
    { period: 'Q3 2023', rating: getRandomRating() },
    { period: 'Q2 2023', rating: getRandomRating() },
  ];

  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    age: data.age,
    department: ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance'][Math.floor(Math.random() * 5)],
    phone: data.phone,
    address: `${data.address.address}, ${data.address.city}, ${data.address.state}, ${data.address.postalCode}`,
    bio: 'Passionate and dedicated employee with strong teamwork skills.',
    rating: getRandomRating(),
    performanceHistory: mockPerformanceHistory(),
  };
}

export default async function EmployeeDetails({ params }: { params: { id: string } }) {
  try {
    const user = await fetchUser(params.id);

    return (
      <div>
        <h2>
          {user.firstName} {user.lastName}
        </h2>
        <p>
          <strong>Email:</strong> {user.email} | <strong>Age:</strong> {user.age} |{' '}
          <strong>Department:</strong> {user.department}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
        <p>
          <strong>Bio:</strong> {user.bio}
        </p>
        <p>
          <strong>Rating:</strong>{' '}
          <span style={{ color: '#ffc107' }}>
            {'★'.repeat(user.rating)}
            {'☆'.repeat(5 - user.rating)}
          </span>{' '}
          <span className={`badge bg-${getBadgeColor(user.rating)}`}>
            {user.rating >= 4 ? 'Excellent' : user.rating === 3 ? 'Average' : 'Needs Improvement'}
          </span>
        </p>

        {/* Tabs client component */}
        <UserTabs performanceHistory={user.performanceHistory} />

        <Link href="/" className="btn btn-secondary mt-3">
          Back to Dashboard
        </Link>
      </div>
    );
  } catch {
    // Show simple error UI or redirect
    return <p>User not found. <Link href="/">Back to Dashboard</Link></p>;
  }
}

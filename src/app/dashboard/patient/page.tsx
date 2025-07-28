'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt_decode from 'jwt-decode';

interface User {
  id: string;
  email: string;
  role: string;
  name?: string;
}

export default function PatientDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login/patient');
      return;
    }
    try {
      const decoded: User = jwt_decode(token);
      setUser(decoded);
    } catch (err) {
      localStorage.removeItem('token');
      router.push('/login/patient');
    }
  }, [router]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <h1 className="text-3xl font-bold mb-2">Welcome, {user.name || user.email}!</h1>
      <p className="text-lg mb-4">Role: {user.role}</p>
      <button
        className="mb-8 px-4 py-2 rounded bg-teal-500 text-white hover:bg-teal-600 transition"
        onClick={() => {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          router.push('/login/patient');
        }}
      >
        Logout
      </button>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Upcoming Appointments</h2>
          <p className="text-gray-500">No appointments scheduled.</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-2">Health Stats</h2>
          <p className="text-gray-500">Blood Pressure: --</p>
          <p className="text-gray-500">Heart Rate: --</p>
        </div>
      </div>
    </div>
  );
}

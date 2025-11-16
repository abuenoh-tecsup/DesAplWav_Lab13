'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      return alert('Registration failed');
    }

    // Auto login después de registrarse
    const loginResult = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/dashboard',
    });

    if (!loginResult?.error) {
      router.push('/dashboard');
    } else {
      alert('Registration succeeded but login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h1 className="text-2xl text-gray-800 font-bold mb-6 text-center">
          Register
        </h1>

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            className="w-full border px-3 py-2 rounded mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border px-3 py-2 rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border px-3 py-2 rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Create Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          Already have an account?{' '}
          <a href="/signIn" className="text-blue-600 underline">
            Sign In
          </a>
        </p>

      </div>
    </div>
  );
}

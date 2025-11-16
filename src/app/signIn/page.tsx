'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaGithub } from 'react-icons/fa';

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard",
    });
  };


  const handleGoogleSignIn = async () => {
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  const handleGitHubSignIn = async () => {
    await signIn('github', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">

        <h1 className="text-2xl text-gray-800 font-bold mb-6 text-center">
          Sign In
        </h1>

        {/* Credentials */}
        <form onSubmit={handleCredentialsSignIn} className="mb-6">
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
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign in with Email
          </button>
        </form>

        {/* Google */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-black transition flex items-center justify-center gap-2 mb-3"
        >
          <FaGoogle />
          Continue with Google
        </button>

        {/* GitHub */}
        <button
          onClick={handleGitHubSignIn}
          className="w-full bg-gray-900 text-white py-2 px-4 rounded hover:bg-black transition flex items-center justify-center gap-2"
        >
          <FaGithub />
          Continue with GitHub
        </button>

        <p className="mt-6 text-center text-sm">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 underline">
            Register
          </a>
        </p>

      </div>
    </div>
  );
}

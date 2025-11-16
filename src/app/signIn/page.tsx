'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FaGoogle, FaGithub } from 'react-icons/fa';

export default function SignInPage() {
  const search = useSearchParams();
  const error = search.get("error");

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-4xl">

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10 tracking-tight">
          Welcome Back 👋
        </h1>

        {/* ERRORES */}
        {error === "AccountLocked" && (
          <p className="text-red-600 mb-4 text-center font-medium">
            Tu cuenta está bloqueada temporalmente. Intenta más tarde.
          </p>
        )}
        {error === "CredentialsSignin" && (
          <p className="text-red-600 mb-4 text-center font-medium">
            Credenciales incorrectas.
          </p>
        )}

        {/* GRID 2 COLUMNAS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

          {/* IZQUIERDA: FORM */}
          <div className="flex flex-col justify-center border-r md:pr-10 border-gray-200">
            
            <form onSubmit={handleCredentialsSignIn} className="space-y-5">
              <div>
                <label className="text-gray-800 font-medium mb-1 block">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-2 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-gray-800 font-medium mb-1 block">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 outline-none transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md"
              >
                Sign in with Email
              </button>
            </form>

            <button
              onClick={() => (window.location.href = '/register')}
              className="w-full mt-4 py-2.5 bg-gray-100 rounded-lg font-medium text-gray-800 hover:bg-gray-200 transition shadow-sm"
            >
              Create an Account
            </button>
          </div>

          {/* DERECHA: SOCIAL LOGIN */}
          <div className="flex flex-col justify-center gap-4 md:pl-10">

            <p className="text-gray-700 font-medium text-center md:text-left mb-2">
              Or continue with
            </p>

            <button
              onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
              className="w-full bg-[#4285F4] text-white py-2.5 rounded-lg flex items-center justify-center gap-3 hover:bg-[#357ae8] transition shadow-md"
            >
              <FaGoogle className="text-xl" />
              <span className="font-medium">Continue with Google</span>
            </button>

            <button
              onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
              className="w-full bg-gray-900 text-white py-2.5 rounded-lg flex items-center justify-center gap-3 hover:bg-black transition shadow-md"
            >
              <FaGithub className="text-xl" />
              <span className="font-medium">Continue with GitHub</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}

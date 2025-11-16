"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) {
      return alert("Registration failed");
    }

    // Auto login después de registrarse
    const loginResult = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (!loginResult?.error) {
      router.push("/dashboard");
    } else {
      alert("Registration succeeded but login failed");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10 tracking-tight">
          Create Your Account
        </h1>

        {/* GRID IGUAL AL LOGIN */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* IZQUIERDA - FORM */}
          <div className="flex flex-col justify-center border-r md:pr-10 border-gray-200">
            <form onSubmit={handleRegister} className="space-y-5">
              <div>
                <label className="text-gray-800 font-medium mb-1 block">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-2 
                  text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 
                  outline-none transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className="text-gray-800 font-medium mb-1 block">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-2 
                  text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 
                  outline-none transition"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="text-gray-800 font-medium mb-1 block">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full border border-gray-300 px-4 py-2 rounded-lg 
                  text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-400 
                  outline-none transition"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2.5 rounded-lg 
                font-semibold hover:bg-green-700 transition shadow-md"
              >
                Create Account
              </button>
            </form>

            <button
              onClick={() => router.push("/signIn")}
              className="w-full mt-4 py-2.5 bg-gray-100 rounded-lg font-medium 
              text-gray-800 hover:bg-gray-200 transition shadow-sm"
            >
              Already have an account? Sign In
            </button>
          </div>

          {/* DERECHA - INFO */}
          <div className="flex flex-col justify-center md:pl-10 text-gray-700">
            <p className="text-gray-600 leading-relaxed">
              Use this form to create an account and access the system with your
              personal credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

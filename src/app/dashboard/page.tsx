import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-full bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">

          <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">
            Dashboard
          </h1>

          <p className="text-gray-700 text-lg">
            Bienvenido,{" "}
            <span className="font-semibold text-gray-900">
              {session?.user?.name}
            </span>
            .
          </p>

        </div>

      </div>
    </div>
  );
}

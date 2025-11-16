import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-full bg-gray-100 p-10">
      <div className="max-w-3xl mx-auto">
        
        <div className="bg-white rounded-xl shadow-md p-8 border border-gray-200">

          {/* HEADER */}
          <div className="flex items-center gap-6 mb-8">
            {session?.user?.image && (
              <Image
                height={100}
                width={100}
                src={session.user.image}
                alt="Profile"
                className="w-20 h-20 rounded-full border border-gray-300 shadow-sm"
              />
            )}

            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Profile
              </h1>
              <p className="text-gray-500 text-sm mt-1">
                Información básica de tu cuenta
              </p>
            </div>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Name</p>
              <p className="text-gray-900 font-semibold">
                {session?.user?.name}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-gray-900 font-semibold break-words">
                {session?.user?.email}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

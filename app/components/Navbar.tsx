"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem("user");
      router.push("/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      <div className="text-lg font-bold">
        {/* ชื่อแอปหรือโลโก้ */}
        AuthTest iApp
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span>{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {" "}
            Sign in
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

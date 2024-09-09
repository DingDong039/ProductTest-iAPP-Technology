"use client";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FirebaseError } from "firebase/app";
import { toast } from "react-toastify";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword] = useState<boolean>(false);
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let res = await createUserWithEmailAndPassword(email, password);
      if (res) {
        sessionStorage.setItem("user", "true");
        toast.success("Sign-up successful!");
        router.push("/sign-in");
      }
    } catch (err: any) {
      if (err instanceof FirebaseError) {
        toast.error(err.code);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
        <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg max-w-sm w-full">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="relative mb-4">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder=" "
                className="peer w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 placeholder-transparent"
              />
              <label
                htmlFor="email"
                className="absolute top-1 left-3 text-gray-500 dark:text-gray-400 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100"
              >
                Email
              </label>
            </div>
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="off"
                placeholder=" "
                className="peer w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 placeholder-transparent"
              />
              <label
                htmlFor="password"
                className="absolute top-2 left-3 text-gray-500 dark:text-gray-400 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100"
              >
                Password
              </label>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;

"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { FirebaseError } from "firebase/app";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import Loading from "@/app/components/Loading";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(email, password);
      if (res) {
        sessionStorage.setItem("user", "true");
        
        setEmail("");
        setPassword("");
        toast.success("Login successful!");
        router.push("/");
      }
    } catch (err: any) {
        alert(err)
    } finally{
      <Loading />
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Sign In
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
              className="absolute top-2 left-3 text-gray-500 dark:text-gray-400 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100"
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
              placeholder=" "
              autoComplete="off"
              className="peer w-full px-3 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 placeholder-transparent"
            />
            <label
              htmlFor="password"
              className="absolute top-2 left-3 text-gray-500 dark:text-gray-400 transition-transform duration-300 transform -translate-y-1 scale-75 origin-top-left peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-3 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100"
            >
              Password
            </label>
            <button
              type="button"
              aria-label={showPassword ? "ซ่อนรหัสผ่าน" : "แสดงรหัสผ่าน"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <FaEyeSlash className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              ) : (
                <FaEye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          or,{" "}
          <Link
            href="/sign-up"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

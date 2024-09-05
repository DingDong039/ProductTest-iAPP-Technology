"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// components
import Loading from "./components/Loading";

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const userSession = sessionStorage.getItem("user");
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (!user && !userSession) {
      setIsRedirecting(true);
      router.push("/sign-in");
    }
  }, [user, userSession, loading, router]);

  if (loading || isRedirecting) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <h1 className="font-bold text-4xl">Welcome {user?.email}</h1>
      </div>
    </>
  )
  ;
};

export default Home;

"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loading from "@/app/components/Loading";

const Home = () => {
  const [user, loading] = useAuthState(auth);
  const [userSession, setUserSession] = useState<string | null>(null);
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionUser = sessionStorage.getItem("user");
      setUserSession(sessionUser);
    }
  }, []);

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

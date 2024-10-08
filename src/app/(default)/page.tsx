"use client";
import React, { useEffect, useState } from "react";
import UserCollaboration from "@/components/shared/collaboration/UserCollaboration";
import Link from "next/link";
import axios from "@/lib/axios";

const Page = () => {
  const [collabData, setCollabData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/collaboration");
        setCollabData(response.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <UserCollaboration collabData={collabData} />
      <Link href={"/login"}>
        <button className="px-6 py-2 font-semibold text-base rounded-2xl bg-blue-500 text-white">
          Login
        </button>
      </Link>
    </div>
  );
};

export default Page;

"use client";
import { useAuth } from "@/components/provider/AuthProvider";
import axios from "@/lib/axios";
import { Triangle } from "lucide-react";
import React, { useEffect, useState } from "react";

const HeroD = ({ subCountData, data }: any) => {
  const { authId } = useAuth();
  const [userData, setUserData] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/auth/users/${authId}`);
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [authId]);

  return (
    <section className="flex justify-between">
      <div className="flex-1">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl dark:text-white">
            Hi {userData?.username || ` there! `} 👋
          </h2>
          <p className="mt-2 md:text-lg text-gray-600 dark:text-gray-400">
            Here&#39s what&#39s happening with your projects today 👇
          </p>
        </div>
        <div className=""></div>
      </div>
      <div className="bg-white flex items-center gap-4 flex-1 rounded-3xl px-6 py-4">
        <div className="">
          <div className="">
            <div className="flex items-center gap-2">
              <img
                src={subCountData?.user?.[1]?.count}
                className="bg-gray-100 w-16 h-16 rounded-full"
                alt=""
              />
              <h2 className="text-lg font-semibold">
                {subCountData?.user?.[0]?.count}
              </h2>
            </div>
          </div>
          <div className=" items-start gap-6">
            <div className="">
              <div className="flex py-2 flex-col">
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl font-bold">
                    {subCountData?.counts?.[0]?.count}
                  </h2>
                  <UpDown count={data?.rows?.[0]?.[6]} />
                </div>
                <p className="text-sm font-medium text-gray-400">
                  {" "}
                  Subscribers{" "}
                </p>
              </div>
            </div>
          </div>
        </div>{" "}
        <div className="">
          <div className="">
            <div className="flex items-center gap-2">
              <img
                src={subCountData?.user?.[1]?.count}
                className="bg-gray-100 w-16 h-16 rounded-full"
                alt=""
              />
              <h2 className="text-lg font-semibold">
                {subCountData?.user?.[0]?.count}
              </h2>
            </div>
          </div>
          <div className=" items-start gap-6">
            <div className="">
              <div className="flex py-2 flex-col">
                <div className="flex items-center gap-2">
                  <h2 className="text-3xl font-bold">
                    {subCountData?.counts?.[1]?.count}
                  </h2>
                  <UpDown count={data?.rows?.[0]?.[2]} />
                </div>
                <p className="text-sm font-medium text-gray-400"> views </p>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </section>
  );
};

export default HeroD;

function UpDown({ count }: any) {
  return (
    <div className="bg-gray-200 flex items-center gap-1 px-2 rounded-full py-1">
      <Triangle className="w-4 h-4 fill-green-400 text-green-400" />
      <span className="text-base font-semibold">{count}</span>
    </div>
  );
}

function CountSection() {
  return (
    <div className="border bg-gray-100 rounded-xl px-2 py-1">
      <div className="flex gap-2 items-center">
        <h2 className="text-lg font-semibold">560</h2>
        <UpDown />
      </div>
      <p className="text-xs font-medium text-gray-400"> Views </p>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import React from "react";
const SelectionData = [
  { title: "Description", value: "description" },
  { title: "Company", value: "company" },
];
const JobExtra = ({ job }: any) => {
  const [isDescription, setIsDescription] = React.useState<any>("description");

  return (
    <div className="bg-gray-100 relative  py-6 px-6 w-full rounded-3xl">
      <div className="h-[50vh] pb-8  overflow-hidden overflow-y-scroll  ">
        <div className="flex capitalize items-center gap-6">
          <img
            src="https://marketplace.canva.com/EAFauoQSZtY/1/0/1600w/canva-brown-mascot-lion-free-logo-qJptouniZ0A.jpg"
            alt="logo"
            className="w-24 h-24 rounded-3xl"
          />
          <div>
            <p className="text-2xl font-semibold line-clamp-1">
              {job?.companyName}
            </p>
            <h1 className="text-base font-normal line-clamp-1">{job?.title}</h1>
            <p className="text-gray-500">{job?.company?.name}</p>
            <div className="">
              <p className="text-sm line-clamp-1 capitalize font-medium text-gray-400">
                {job?.user?.username} - online
              </p>
            </div>
          </div>
        </div>
        <div className=""></div>
        <div className="mt-4 flex items-center gap-3">
          {SelectionData.map((data: any, index: any) => (
            <div key={index} className="w-full">
              <button
                onClick={() => setIsDescription(data?.value)}
                className={`${
                  isDescription === data.value
                    ? "bg-black text-white"
                    : "bg-white text-black"
                } px-6 py-4 w-full text-base font-semibold rounded-full`}
              >
                <h1>{data?.title}</h1>
              </button>
            </div>
          ))}
        </div>
        <div className="">
          <div className="mt-4">
            <h2 className="text-2xl sm:text-3xl lg:text-2xl text-black font-semibold">
              Job Description
            </h2>
            <p className="mb-3 mt-3 text-gray-500 dark:text-gray-400">
              {job?.description}
            </p>
          </div>
          <div className="mt-4">
            <h2 className="text-2xl sm:text-3xl lg:text-2xl text-black font-semibold">
              Requirement
            </h2>
            <p className="mb-3 mt-3 text-gray-500 dark:text-gray-400">
              {job?.requirements}
            </p>
          </div>
        </div>
        <div className="px-4 py-6 flex items-center gap-4">
          <Image
            objectFit="cover"
            height={100}
            width={100}
            className="rounded-xl w-full h-full"
            src="https://thumbs.dreamstime.com/b/sheep-cheese-witj-oilve-oil-plate-i-iameg-107449452.jpg"
            alt="Image Description"
          />
          <Image
            objectFit="cover"
            height={100}
            width={100}
            className="rounded-xl w-full h-full"
            src="https://thumbs.dreamstime.com/b/sheep-cheese-witj-oilve-oil-plate-i-iameg-107449452.jpg"
            alt="Image Description"
          />
        </div>
      </div>
      <div className="w-full">
        <Link
          href={`/livechat/${job?._id}`}
          className="px-6 py-4 bg-black  text-white w-full rounded-full text-base font-semibold"
        >
          Apply Now or Contact
        </Link>
      </div>
    </div>
  );
};

export default JobExtra;

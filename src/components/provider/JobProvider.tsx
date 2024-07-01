import { createContext, useContext, ReactNode, useState } from "react";

interface JobSearchContextProps {
  searchTerm: any;
  setSearchTerm: (term: any) => void;
}

const JobSearchContext = createContext<JobSearchContextProps | undefined>(
  undefined
);

interface JobSearchProviderProps {
  children: ReactNode;
}

export const JobSearchProvider: React.FC<JobSearchProviderProps> = ({
  children,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <JobSearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </JobSearchContext.Provider>
  );
};

export const useJobSearch = (): JobSearchContextProps => {
  const context = useContext(JobSearchContext);
  if (!context) {
    throw new Error("useJobSearch must be used within a JobSearchProvider");
  }
  return context;
};

import React, { createContext, useState, useContext, ReactNode } from "react";

export interface Education {
  id: number;
  institution: string;
  degree: string;
  percentage: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  skillsUsed: string;
  description: string;
  startDate: string;
  endDate: string;
}

export interface FormData {
  name: string;
  email: string;
  phone: string;
  socialLinks: string[];
  education: Education[];
  experience: Experience[];
  skills: string[];
}

interface AppContextType {
  cvData: FormData | undefined;
  setCvData: React.Dispatch<React.SetStateAction<FormData | undefined>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within an AppProvider");
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cvData, setCvData] = useState<FormData>();

  // Load initial data from local storage
  React.useEffect(() => {
    const loadData = () => {
      const storedData = localStorage.getItem("cvData");
      if (storedData) {
        const data = JSON.parse(storedData);
        setCvData(data);
      }
    };
    loadData();
  }, []);

  return (
    <AppContext.Provider value={{ cvData, setCvData }}>
      {children}
    </AppContext.Provider>
  );
};

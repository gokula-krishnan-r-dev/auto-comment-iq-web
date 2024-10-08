"use client";
import { createContext, useContext, ReactNode } from "react";
import { useCookies } from "react-cookie";
interface AuthContextProps {
  authToken: any;
  authId: any;
  accessToken: any;
  channelId: any;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [cookie, setCookie] = useCookies<any>(["authToken"]);
  const authToken = cookie.authToken;
  const authId = cookie._YId; // Update the type of 'cookie' to include '_YId' property
  const accessToken = cookie.accessToken;
  const channelId = cookie.channelId;
  console.log(authId, cookie, "authId");

  return (
    <AuthContext.Provider value={{ authToken, authId, accessToken, channelId }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

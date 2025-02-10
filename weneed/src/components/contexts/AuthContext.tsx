import { createContext, useContext, useState, useEffect } from "react";

interface User {
  uniqueId: string;
  userType: "기업" | "개인";
  companyName?: string;
  businessNumber?: string;
  representative?: string;
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserType = localStorage.getItem("userType");
    const storedCompanyName = localStorage.getItem("companyName");
    const storedBusinessNumber = localStorage.getItem("businessNumber");
    const storedRepresentative = localStorage.getItem("representative");
    const storedEmail = localStorage.getItem("email");
    const storedUniqueId = localStorage.getItem("uniqueId");

    if (storedToken && storedUserType && storedUniqueId && storedEmail) {
      setUser({
        uniqueId: storedUniqueId,
        userType: storedUserType as "기업" | "개인",
        companyName: storedCompanyName || undefined,
        businessNumber: storedBusinessNumber || undefined,
        representative: storedRepresentative || undefined,
        email: storedEmail,
        token: storedToken,
      });
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("userType", userData.userType);
    localStorage.setItem("uniqueId", userData.uniqueId);
    localStorage.setItem("email", userData.email);
    
    if (userData.companyName) {
      localStorage.setItem("companyName", userData.companyName);
    }
    if (userData.businessNumber) {
      localStorage.setItem("businessNumber", userData.businessNumber);
    }
    if (userData.representative) {
      localStorage.setItem("representative", userData.representative);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("uniqueId");
    localStorage.removeItem("email");
    localStorage.removeItem("companyName");
    localStorage.removeItem("businessNumber");
    localStorage.removeItem("representative");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

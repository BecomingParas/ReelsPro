"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  fullName: string;
  username: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  likes: number;
  videos: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

interface SignupData {
  email: string;
  password: string;
  fullName: string;
  username: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUser: User = {
  id: "1",
  email: "sarala@example.com",
  fullName: "सरला श्रेष्ठ",
  username: "sarala_shrestha",
  bio: "नेपाली क्रिएटर 🇳🇵 • भिडियो बनाउने शौकी • काठमाडौं 📍",
  followers: 12400,
  following: 156,
  likes: 89200,
  videos: 24,
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (email && password) {
      setUser(mockUser);
      return true;
    }
    return false;
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    // Mock signup - simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (data.email && data.password && data.fullName && data.username) {
      setUser({
        ...mockUser,
        email: data.email,
        fullName: data.fullName,
        username: data.username,
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

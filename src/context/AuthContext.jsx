import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("bookstore_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    // Mock auth – any email/password works
    if (!email || !password) return { success: false, error: "Please fill all fields." };
    const mockUser = { id: 1, name: email.split("@")[0], email, avatar: null };
    setUser(mockUser);
    localStorage.setItem("bookstore_user", JSON.stringify(mockUser));
    return { success: true };
  };

  const register = (name, email, password) => {
    if (!name || !email || !password) return { success: false, error: "Please fill all fields." };
    const mockUser = { id: Date.now(), name, email, avatar: null };
    setUser(mockUser);
    localStorage.setItem("bookstore_user", JSON.stringify(mockUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("bookstore_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

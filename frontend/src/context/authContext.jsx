import { createContext, useContext, useState } from "react";


// Create authentication context
const AuthContext = createContext();


// Auth Provider
export function AuthProvider({ children }) {

  // Get existing token from localStorage
  const [token, setToken] = useState(
    localStorage.getItem("smartbook_token")
  );

  // Get existing user from localStorage
  const [user, setUser] = useState(() => {

    const storedUser =
      localStorage.getItem("smartbook_user");

    return storedUser
      ? JSON.parse(storedUser)
      : null;

  });


  // Login
  const login = (token, userData) => {

    localStorage.setItem(
      "smartbook_token",
      token
    );

    localStorage.setItem(
      "smartbook_user",
      JSON.stringify(userData)
    );

    // Keep React state updated
    setToken(token);
    setUser(userData);
  };


  // Logout
  const logout = () => {

    localStorage.removeItem(
      "smartbook_token"
    );

    localStorage.removeItem(
      "smartbook_user"
    );

    localStorage.removeItem(
      "smartbook_email"
    );

    // Keep React state updated
    setToken(null);
    setUser(null);
  };


  const isAuthenticated = !!token;


  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


// Custom hook
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {

  return useContext(AuthContext);

}
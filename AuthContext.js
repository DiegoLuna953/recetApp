// AuthContext
import React, { createContext, useState, useMemo } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const authContext = useMemo(() => ({
    signIn: (user) => {
      setUser(user);
    },
    signOut: () => {
      setUser(null);
    },
    user,
  }), [user]);

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const username = new URLSearchParams(window.location.search).get('user');

  const [user, setUser] = useState({
    username: username,
    authenticated: false,
  });
  const updateUser = (name, value) => {
    setUser({ ...user, [name]: value });
  };
  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext };

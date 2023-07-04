import { createContext, useEffect, useState, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { User } from "../models";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const sub = authUser?.attributes?.sub;

  const getCurrentUser = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser({ bypassCache: true });
      setAuthUser(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  const getUserFromDB = async (sub) => {
    try {
      const users = await DataStore.query(User, (user) => user.sub.eq(sub));
      if (users.length > 0) {
        setDbUser(users[0]); // Assuming you only want the first user (if multiple users with the same sub exist)
      } else {
        setDbUser(null); // Handle the case where the user with the given sub is not found
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (sub) {
      console.log(sub)
      getUserFromDB(sub);
    }
  }, [sub]);


  useEffect(() => {
    console.log(authUser); 
    console.log(dbUser)
  }, [authUser,dbUser]);

  return (
    <AuthContext.Provider value={{ authUser, dbUser, sub, setDbUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);

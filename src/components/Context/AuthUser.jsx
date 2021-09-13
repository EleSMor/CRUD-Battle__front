import React, { useState } from "react";
import storage from "../../services/storage";

export const UserContext = React.createContext(null);

const INITIAL_USER = storage.get("user");
console.log("initial user:", INITIAL_USER);
const INITIAL_IA = storage.get("ia");

const AuthUser = (props) => {
  const [user, setUser] = useState(INITIAL_USER);
  const [iaCharacters, setIaCharacter] = useState(INITIAL_IA.characters);

  const storeUser = (user) => {
    setUser(user);
    storage.set("user", user);
  };

  return <UserContext.Provider value={{ user: user, iaName: INITIAL_IA.name, iaCharacters: iaCharacters, setIaCharacter, storeUser }}>{props.children}</UserContext.Provider>;
};

export default AuthUser;

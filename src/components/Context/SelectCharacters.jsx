import React, { useContext, useState } from "react";
import storage from "../../services/storage";
import { UserContext } from "./AuthUser";

export const SelectCharsContext = React.createContext(null);

const SelectCharacters = (props) => {
  const { user, iaCharacters, setIaCharacter } = useContext(UserContext);
  const [userCharacters, setUserCharacter] = useState(user.characters);

  const selectCharacter = (team, character) => {
    let newCharacter = JSON.parse(JSON.stringify(character));
    if (team === "ia") {
      newCharacter.idIa = `id-ia-${iaCharacters.length + 1}`;
      setIaCharacter([...iaCharacters, newCharacter]);
      storage.setProperty(team, [...iaCharacters, newCharacter], "characters");
    } else {
      newCharacter.idUser = `id-user-${userCharacters.length + 1}`;
      setUserCharacter([...userCharacters, newCharacter]);
      storage.setProperty(team, user.characters, "characters");
    }
  };

  const unselectCharacter = (team, character) => {
    let newCharacters = [];
    if (team === "ia") {
      const index = iaCharacters.findIndex((char) => char.idIa === character.idIa);
      newCharacters.splice(index, 1);
      setIaCharacter(newCharacters);
    } else {
      const index = userCharacters.findIndex((char) => char.idUser === character.idUser);
      newCharacters.splice(index, 1);
      setUserCharacter(newCharacters);
    }
    storage.setProperty(team, newCharacters, "characters");
  };

  const updateCharacter = (team, character) => {
    let newCharacters = [];
    if (team === "ia") {
      newCharacters = iaCharacters.map((char) => (char.idIa === character.idIa ? character : char));
      setIaCharacter(newCharacters);
    } else {
      newCharacters = userCharacters.map((char) => (char.idUser === character.idUser ? character : char));
      setUserCharacter(newCharacters);
    }
    storage.setProperty(team, newCharacters, "characters");
  };

  return (
    <SelectCharsContext.Provider
      value={{
        userCharacters: userCharacters,
        iaCharacters: iaCharacters,
        selectCharacter,
        unselectCharacter,
        updateCharacter,
      }}
    >
      {props.children}
    </SelectCharsContext.Provider>
  );
};

export default SelectCharacters;

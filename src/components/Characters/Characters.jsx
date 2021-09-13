import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { SelectCharsContext } from "../Context/SelectCharacters";
import { UserContext } from "../Context/AuthUser";
import { getAllChars } from "../../api/characters.api";
import CharacterCard from "../CharacterCard/CharacterCard";

import "./Characters.scss";

const Characters = () => {
  const { user } = useContext(UserContext);
  const { userCharacters, iaCharacters, unselectCharacter } = useContext(SelectCharsContext);
  const [characters, setCharacters] = useState([]);

  const history = useHistory();

  useEffect(() => {
    getAllChars().then((res) => setCharacters(...characters, res));
  }, []);

  return (
    <>
      {!user && history.push("/")}
      <div className="characters">
        <h1 className="characters__title">Personajes</h1>
        <div className="characters__fight">
          {userCharacters.length >= 1 && iaCharacters.length >= 1 && (
            <button className="characters__button" type="button" onClick={() => history.push("/battle")}>
              ¡A luchar!
            </button>
          )}
        </div>
        <div className="characters__container">
          <div className="characters__team">
            {user.alias}
            {userCharacters &&
              userCharacters.map((character, index) => (
                <div key={`${character}-${index}`} className="characters__character">
                  <p className="characters__name">{character.name}</p>
                  <button className="button" onClick={() => unselectCharacter("user", character)}>
                    Delete
                  </button>
                </div>
              ))}
          </div>
          <CharacterCard characters={characters} />

          <div className="characters__team">
            IA
            {iaCharacters &&
              iaCharacters.map((character, index) => (
                <div key={`${character}-${index}`} className="characters__character">
                  <p className="characters__name">{character.name}</p>
                  <button className="button" onClick={() => unselectCharacter("ia", character)}>
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Characters;

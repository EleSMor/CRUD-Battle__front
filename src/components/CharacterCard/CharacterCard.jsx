import { useContext } from "react";
import { UserContext } from "../Context/AuthUser";
import { SelectCharsContext } from "../Context/SelectCharacters";

const CharacterCard = ({ characters }) => {
  const { selectCharacter } = useContext(SelectCharsContext);
  const { user } = useContext(UserContext);

  return (
    <div>
      <div className="gallery">
        {characters.map((character, index) => {
          return (
            <figure className="gallery__figure" key={`${character}-${index}`}>
              <div className="gallery__container">
                <figcaption className="gallery__name">
                  <div>{character.name}</div>
                  <img className="gallery__image" src={character.image} alt="" />
                  <div className="gallery__foot-image">
                    <p className="">Nivel: {character.level}</p>
                    <p className="">Experiencia: {character.experience}</p>
                  </div>
                </figcaption>

                <div className="gallery__atributs">
                  <div className="gallery__items">
                    <p>Health: {character.stats.healthPoints}</p>
                  </div>
                  <div className="gallery__items">
                    <p>Attack: {character.stats.attack}</p>
                  </div>
                  <div className="gallery__items">
                    <p>Defense: {character.stats.defense}</p>
                  </div>
                  <div className="gallery__items">
                    <p>Critical Rate: {character.stats.criticalRate}</p>
                  </div>
                  <div className="gallery__items">
                    <p>Critical Damage: {character.stats.criticalDamage}</p>
                  </div>
                </div>

                <div className="gallery__buttons">
                  {character.fightOptions.map((option, index) => {
                    return (
                      <div key={`${option}-${index}`}>
                        <h5 className="">{option}</h5>
                      </div>
                    );
                  })}
                  <div className="gallery">
                    <img className="gallery__sprite" src={character.imageSprite} alt="" />
                  </div>
                </div>
                <div className="gallery__buttons">
                  <div>
                    <button className="button" onClick={() => selectCharacter("user", character)}>
                      Add to {user.alias}
                    </button>
                  </div>
                  <div>
                    <button className="button" onClick={() => selectCharacter("ia", character)}>
                      Add to IA
                    </button>
                  </div>
                </div>
              </div>
            </figure>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterCard;

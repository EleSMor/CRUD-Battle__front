import React, { useContext, useState } from "react";
import { SelectCharsContext } from "../Context/SelectCharacters";
import { UserContext } from "../Context/AuthUser";
import { useHistory } from "react-router-dom";
import "./Battle.scss";

const Battle = () => {
  const { userCharacters, updateCharacter, iaCharacters } = useContext(SelectCharsContext);
  const { user, iaName } = useContext(UserContext);

  const [turnPlayer, setTurnPlayer] = useState(null);
  const [visibleAttack, setVisibleAttack] = useState(false);
  const [attackerDMG, setAttackerDMG] = useState(0);

  const history = useHistory();

  let userStats = userCharacters[0].stats;
  let iaStats = iaCharacters[0].stats;

  const fightOptions = ["basic", "special"];
  const players = [user.alias, iaName];

  const preFight = (team, fightAction) => {
    let attacker = {};
    let defensor = {};

    if (team === "user") {
      attacker = userCharacters[0];
      defensor = iaCharacters[0];
    } else {
      attacker = iaCharacters[0];
      defensor = userCharacters[0];
    }

    selectFightAction[fightAction](team, attacker, defensor);
    setVisibleAttack(true);

    setTimeout(() => {
      setVisibleAttack(false);
      setAttackerDMG(0);
      if (team === "user") {
        const randomIaAttack = fightOptions[Math.floor(Math.random() * fightOptions.length)];
        setTimeout(() => preFight("ia", randomIaAttack), 1000);
        setTurnPlayer("ia");
      } else {
        setTurnPlayer(user.alias);
      }
    }, 1000);
  };

  /**
   * Función para seleccionar aleatoriamente el jugador que comienza de la partida
   */
  const starterPlayer = () => {
    const randomPlayer = players[Math.floor(Math.random() * players.length)];
    setTurnPlayer(randomPlayer);

    if (randomPlayer === "ia") {
      const randomIaAttack = fightOptions[Math.floor(Math.random() * fightOptions.length)];
      setTimeout(() => {
        preFight("ia", randomIaAttack);
      }, 1000);
      setTurnPlayer("ia");
    }
  };

  const basicAttack = (team, attacker, defensor) => {
    const attackDamage = attacker.stats.attack;
    setAttackerDMG(attackDamage.toFixed(2));
    defensor.stats.healthPoints -= attackDamage;
    if (defensor.stats.healthPoints < 0) defensor.stats.healthPoints = 0;
    updateCharacter(team, defensor);
  };

  const specialAttack = (team, attacker, defensor) => {
    const criticalPercent = Math.random(0.0, 1.0).toFixed(2);

    let attackDamage = attacker.stats.attack;

    if (criticalPercent <= attacker.stats.criticalRate) {
      const criticalAttack = attacker.stats.attack * attacker.stats.criticalDamage;
      attackDamage = criticalAttack;
    } else {
      const failedAttack = attacker.stats.attack / attacker.stats.criticalDamage;
      attackDamage = failedAttack;
    }
    setAttackerDMG(attackDamage.toFixed(2));
    defensor.stats.healthPoints -= attackDamage;

    if (defensor.stats.healthPoints < 0) defensor.stats.healthPoints = 0;
    updateCharacter(team, defensor);
  };

  const selectFightAction = {
    basic: basicAttack,
    special: specialAttack,
  };

  return (
    <>
      {!user && history.push("/")}
      {!userCharacters && history.push("/characters")}
      <div className="battle">
        <div className="battle__player">
          <div className="battle__player-figure">
            <h3>{user.alias}</h3>
            <img className="battle__character-img battle__character-img--user" src={userCharacters[0].image} alt="" />
            <div className="battle__player-stats">
              {Object.entries(userStats).map((stat, index) => (
                <p key={`${stat}-${index}`}>
                  {stat[0]}: {stat[1].toFixed(2)}
                </p>
              ))}
              {turnPlayer === user.alias && (
                <div>
                  <button className="battle__fightOption" onClick={() => preFight("user", "basic")}>
                    Basic Attack
                  </button>
                  <button className="battle__fightOption" onClick={() => preFight("user", "special")}>
                    Special Attack
                  </button>
                </div>
              )}
              {turnPlayer !== user.alias && (
                <div>
                  <button className="battle__fightOption">Basic Attack</button>
                  <button className="battle__fightOption">Special Attack</button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="battle__container">
          <div className="battle__battleground">
            {visibleAttack && (
              <div className="battle__battleground-damage">
                {turnPlayer} makes {attackerDMG}
              </div>
            )}
            <img
              className="battle__battleground-sprite battle__battleground-sprite--user"
              src={userCharacters[0].imageSprite}
              alt=""
            />
            <img className="battle__battleground-sprite" src={iaCharacters[0].imageSprite} alt="" />
          </div>
          <div className="battle__header">
            {!turnPlayer && (
              <button className="battle__startBtn" onClick={starterPlayer}>
                START
              </button>
            )}
            {turnPlayer && <h2 className="battle__turn">Turn of {turnPlayer}</h2>}
          </div>
        </div>
        <div className="battle__player">
          <div className="battle__player-figure">
            <h3>IA</h3>
            <img className="battle__character-img" src={iaCharacters[0].image} alt="" />
            <div className="battle__player-stats">
              {Object.entries(iaStats).map((stat, index) => (
                <p key={`${stat}-${index}`}>
                  {stat[0]}: {stat[1].toFixed(2)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Battle;

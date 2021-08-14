import React from "react";
import Combat from "./Combat";
import { getMapValue, getValue } from "../../../../utils/getValue";
import { getClass, getLevel } from "../../CharacterHeader";
import Skills from "./Skills";

interface AttributesAndSkillsProps {
  character: any;
}

const getProficiencies = (proficiencylist: any, isZero: boolean): string[] => {
  let result: string[] = [];

  if (isZero) {
    return [
      "Armor: Level-0 characters wear only what they start with or can find.",
      "Weapons: All 0-level characters are trained in the one weapon they possess from their former occupation. If a 0-level character handles multiple weapons over his career, he is considered trained in the last weapon he fought with. At 1st level, a character gains training in additional weapons, based on the class he chooses.",
    ];
  }

  const proficiencies = getMapValue(proficiencylist);
  const proficienciesKeys = Object.keys(proficiencies);
  proficienciesKeys.forEach((profKey) => {
    const prof = proficiencies[profKey][0];
    const profText = getValue(prof.name);
    result.push(profText);
  });

  return result;
};

const getLanguages = (languages: any): string[] => {
  let result: string[] = [];

  if (!languages) {
    return ["Common"];
  }

  const languageList = getMapValue(languages);
  const languageListKeys = Object.keys(languageList);
  languageListKeys.forEach((langKey) => {
    const lang = languageList[langKey][0];
    const langText = getValue(lang.name);
    result.push(langText);
  });

  return result;
};

const Attributes = ({ character }: AttributesAndSkillsProps) => {
  // Basic Info
  const abilities = character.abilities[0];
  const saves = character.saves[0];

  // Stats
  const strength = abilities.strength[0].score[0]._;
  const strengthBonus = abilities.strength[0].bonus[0]._;
  const strengthBonusMod = strengthBonus.indexOf("-") === 0 ? "" : "+";

  const agility = abilities.agility[0].score[0]._;
  const agilityBonus = abilities.agility[0].bonus[0]._;
  const agilityBonusMod = agilityBonus.indexOf("-") === 0 ? "" : "+";

  const stamina = abilities.stamina[0].score[0]._;
  const staminaBonus = abilities.stamina[0].bonus[0]._;
  const staminaBonusMod = staminaBonus.indexOf("-") === 0 ? "" : "+";

  const personality = abilities.personality[0].score[0]._;
  const personalityBonus = abilities.personality[0].bonus[0]._;
  const personalityBonusMod = personalityBonus.indexOf("-") === 0 ? "" : "+";

  const intelligence = abilities.intelligence[0].score[0]._;
  const intelligenceBonus = abilities.intelligence[0].bonus[0]._;
  const intelligenceBonusMod = intelligenceBonus.indexOf("-") === 0 ? "" : "+";

  const luck = abilities.luck[0].score[0]._;
  const luckBonus = abilities.luck[0].bonus[0]._;
  const luckBonusMod = luckBonus.indexOf("-") === 0 ? "" : "+";

  const reflexSave = saves.reflex[0].total[0]._;
  const reflexSaveMod = reflexSave.indexOf("-") === 0 ? "" : "+";

  const fortSave = saves.fortitude[0].total[0]._;
  const fortSaveMod = fortSave.indexOf("-") === 0 ? "" : "+";

  const willSave = saves.willpower[0].total[0]._;
  const willSaveMod = willSave.indexOf("-") === 0 ? "" : "+";

  const ac = character.ac[0].total[0]._;
  const hp = character.hp[0].total[0]._;
  const wounds = character.hp[0].wounds[0]._;
  const initiative = character.initiative[0].total[0]._;
  const speed = character.speed[0].total[0]._;
  const critDie = getValue(character.critdie) || "d4";
  const critTable = getValue(character.crittable) || "I";
  const deedDie = getValue(character.deeddie);
  const fumbleDie = getValue(character.fumbledie) || "d4";
  const attack = getValue(character.attack);

  const isZero = getLevel(character) === 0;
  const proficiencies = getProficiencies(character.proficiencylist, isZero);

  const languages = getLanguages(character.languagelist);

  const augur = getValue(character.birthaugur);
  const senses = getValue(character.senses);
  const luckDie =
    getClass(character).toLowerCase() === "thief"
      ? getValue(character.luckdie)
      : null;
  const threatRange =
    getClass(character).toLowerCase() === "warrior"
      ? getValue(character.critrange)
      : null;

  const skills = character.skilllist;

  return (
    <>
      <div className="columns">
        <div className="stats">
          <div className="stat">
            <div className="statLabel">strength</div>
            <div className="statValue">{strength}</div>
            <div className="statBonus">
              {strengthBonusMod}
              {strengthBonus}
            </div>
          </div>
          <div className="stat">
            <div className="statLabel">agility</div>
            <div className="statValue">{agility}</div>
            <div className="statBonus">
              {agilityBonusMod}
              {agilityBonus}
            </div>
          </div>
          <div className="stat">
            <div className="statLabel">stamina</div>
            <div className="statValue">{stamina}</div>
            <div className="statBonus">
              {staminaBonusMod}
              {staminaBonus}
            </div>
          </div>
          <div className="stat">
            <div className="statLabel">personality</div>
            <div className="statValue">{personality}</div>
            <div className="statBonus">
              {personalityBonusMod}
              {personalityBonus}
            </div>
          </div>
          <div className="stat">
            <div className="statLabel">intelligence</div>
            <div className="statValue">{intelligence}</div>
            <div className="statBonus">
              {intelligenceBonusMod}
              {intelligenceBonus}
            </div>
          </div>
          <div className="stat">
            <div className="statLabel">luck</div>
            <div className="statValue">{luck}</div>
            <div className="statBonus">
              {luckBonusMod}
              {luckBonus}
            </div>
          </div>
        </div>

        <div className="proficiencies">
          <Combat
            ac={ac}
            charClass={getClass(character)}
            hp={hp}
            wounds={wounds}
            initiative={initiative}
            level={getLevel(character)}
            speed={speed}
            critDie={critDie}
            critTable={critTable}
            deedDie={deedDie}
            fumbleDie={fumbleDie}
            attackBonus={attack}
            luckDie={luckDie}
            threatRange={threatRange}
          />

          <div className="dccSaves">
            <div className="bonus">
              <div className="bonusValue">
                {reflexSaveMod}
                {reflexSave}
              </div>
              <div className="bonusLabel">Reflex</div>
            </div>
            <div className="bonus">
              <div className="bonusValue">
                {fortSaveMod}
                {fortSave}
              </div>
              <div className="bonusLabel">Fortitude</div>
            </div>
            <div className="bonus">
              <div className="bonusValue">
                {willSaveMod}
                {willSave}
              </div>
              <div className="bonusLabel">Willpower</div>
            </div>
            <div className="statLabel">Saving Throws</div>
          </div>
        </div>

        <div className="dccProficienciesCol">
          <div className="dccProficiencies">
            {proficiencies.map((prof, index) => {
              return (
                <div className="dccProficiency" key={`${index}-prof`}>
                  {prof}
                </div>
              );
            })}
            <div className="statLabel">Proficiencies</div>
          </div>

          <Skills skills={skills} />

          <div className="dccProficiencies">
            {languages.map((lang, index) => {
              return (
                <div className="dccProficiency" key={`${index}-lang`}>
                  {lang}
                </div>
              );
            })}
            <div className="statLabel">Languages</div>
          </div>
        </div>
      </div>
      <div className="rows">
        <div className="mainRow">
          <p>{senses || "None"}</p>
          <div className="statLabel">Senses</div>
        </div>
        <div className="mainRow">
          <p>{augur}</p>
          <div className="statLabel">Birth Augur and Lucky Roll</div>
        </div>
      </div>
    </>
  );
};

export default Attributes;

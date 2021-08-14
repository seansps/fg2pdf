import React from "react";
import Skill from './Skill';

interface SkillsProps {
    skillList: any;
    character: any;
    profBonus: number;
}

export const Skills = ({skillList, character, profBonus}: SkillsProps) => {

  const strength = character.abilities[0].strength[0];
  const dexterity = character.abilities[0].dexterity[0];
  const intelligence = character.abilities[0].intelligence[0]; 
  const wisdom = character.abilities[0].wisdom[0];
  const charisma = character.abilities[0].charisma[0];

  return (
    <div className='bonuses'>
        
      <Skill 
        skillList={skillList}
        skillName="Acrobatics"
        abilityShortName="Dex"
        ability={dexterity}
        profBonus={profBonus}
        />
      <Skill 
        skillList={skillList}
        skillName="Animal Handling"
        abilityShortName="Wis"
        ability={wisdom}
        profBonus={profBonus}
      />
      <Skill 
        skillList={skillList}
        skillName="Arcana"
        abilityShortName="Int"
        ability={intelligence}
        profBonus={profBonus}
      />
      <Skill 
        skillList={skillList}
        skillName="Athletics"
        abilityShortName="Str"
        ability={strength}
        profBonus={profBonus}
      />
      <Skill 
        skillList={skillList}
        skillName="Deception"
        abilityShortName="Cha"
        ability={charisma}
        profBonus={profBonus}
      />
      <Skill 
        skillList={skillList}
        skillName="History"
        abilityShortName="Int"
        ability={intelligence}
        profBonus={profBonus}
      />
      <Skill 
        skillList={skillList}
        skillName="Insight"
        abilityShortName="Wis"
        ability={wisdom}
        profBonus={profBonus}
      />
      <Skill 
        skillList={skillList}
        skillName="Intimidation"
        abilityShortName="Cha"
        ability={charisma}
        profBonus={profBonus}
      />
      <Skill 
        skillList={skillList}
        skillName="Investigation"
        abilityShortName="Int"
        ability={intelligence}
        profBonus={profBonus}
      />
      <Skill 
        skillList={skillList}
        skillName="Medicine"
        abilityShortName="Wis"
        ability={wisdom}
        profBonus={profBonus}
      />
      <Skill 
        skillList={skillList}
        skillName="Nature"
        abilityShortName="Int"
        ability={intelligence}
        profBonus={profBonus}
      />
      <Skill 
        skillList={skillList}
        skillName="Perception"
        abilityShortName="Wis"
        ability={wisdom}
        profBonus={profBonus}
      />
      <Skill 
        skillList={skillList}
        skillName="Performance"
        abilityShortName="Cha"
        ability={charisma}
        profBonus={profBonus}
      />
      <Skill 
        skillList={skillList}
        skillName="Persuasion"
        abilityShortName="Cha"
        ability={charisma}
        profBonus={profBonus}
      />
      <Skill 
        skillList={skillList}
        skillName="Religion"
        abilityShortName="Int"
        ability={intelligence}
        profBonus={profBonus}
      />
      <Skill 
        skillList={skillList}
        skillName="Sleight of Hand"
        abilityShortName="Dex"
        ability={dexterity}
        profBonus={profBonus}
      />
      <Skill 
        skillList={skillList}
        skillName="Stealth"
        abilityShortName="Dex"
        ability={dexterity}
        profBonus={profBonus}
      />
      <Skill 
        skillList={skillList}
        skillName="Survival"
        abilityShortName="Wis"
        ability={wisdom}
        profBonus={profBonus}
      />

      <div className='statLabel'>Skills</div>
    </div>
  )
}

export default Skills;
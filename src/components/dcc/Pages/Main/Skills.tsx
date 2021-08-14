import React from "react";
import { getMapValue, getValue } from "../../../../utils/getValue";

interface SkillsProps {
  skills?: Record<string, unknown>[] | null;
}

interface Skill {
  name: string;
  bonus: string;
  usesAgility: boolean;
  usesIntelligence: boolean;
  usesPersonality: boolean;
}

const getSkills = (skills: Record<string, unknown>[]): Skill[] => {
  let result: Skill[] = [];

  const skillsMap = getMapValue(skills);
  const skillsKeys = Object.keys(skillsMap);
  skillsKeys.forEach((skillKey) => {
    const skill = skillsMap[skillKey][0] || '0';
    const name = getValue(skill.name);
    const bonus = skill.class ? getValue(skill.class) : '0';
    const stat = getValue(skill.stat).toLowerCase();
    const dice = getValue(skill.dice);

    const skillMod = Number(bonus) >= 0 ? '+' : '';
    const skillStr = dice ? `${dice}` : `${skillMod}${bonus}`;

    result.push({
      name,
      bonus: skillStr,
      usesAgility: stat === "agility",
      usesIntelligence: stat === "intelligence",
      usesPersonality: stat === "personality",
    });
  });

  return result;
};

const getBonusSymbol = (skill: Skill): string => {
  if (skill.usesAgility) {
    return '*'
  }
  else if (skill.usesIntelligence) {
    return '†'
  }
  else if (skill.usesPersonality) {
    return '‡';
  }
  return '';
};

export const Skills = ({ skills }: SkillsProps) => {
  if (!skills || !skills.length) {
    return null;
  }

  const allSkills = getSkills(skills);

  if (!allSkills.length) {
    return null;
  }

  return (
    <div className="dccSkills">
      {allSkills.map((skill, index) => (
        <div className="bonus" key={`skill-${index}`}>
          <div className="bonusValue">{skill.bonus}</div>
          <div className="bonusLabel">{skill.name}{getBonusSymbol(skill)}</div>
        </div>
      ))}
      <p className='footnotes'>
        * Agility modifier also applies to these skills.<br/>
        † Intelligence modifier also applies to these skills.<br/>
        ‡ Personality modifier also applies to these skills.<br/>
      </p>
      <div className="statLabel">Skills</div>
    </div>
  );
};

export default Skills;

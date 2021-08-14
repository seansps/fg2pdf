import React from "react";

interface SkillProps {
    skillList: any;
    skillName: string;
    ability: any;
    abilityShortName: string;
    profBonus: number;
}

export const getSkill = (skillList: any, skillName: string): any => {
  const keys = Object.keys(skillList);
  let skill = null;
  keys.forEach((key) => {
    const curSkill = skillList[key][0];
    if (curSkill.name[0]._ === skillName) {
      skill = curSkill;
    }
  });
  return skill;
}

const hasHalfProf = (skill: any): boolean => {
  return parseInt(skill.prof[0]._, 10) === 3;
}

const hasDoubleProf = (skill: any): boolean => {
  return parseInt(skill.prof[0]._, 10) === 2;
}

export const getSkillBonus = (skill: any, ability: any, profBonus: number): number => {
  const skillProf = skill?.prof;
  let skillBonus = parseInt(ability.bonus[0]._, 10);
  
  if (skillProf && skillProf.length > 0) {
    const skillProf = parseInt(skill.prof[0]._, 10);
    if (skillProf === 3) {
      // This is actually half proficiency
      skillBonus += Math.floor(1/2 * profBonus);
    }
    else {
      skillBonus += skillProf * profBonus;
    }
  }

  return skillBonus;
}

const hasSkillProf = (skill: any): boolean => {
  const prof = skill?.prof;
  if (prof)
    return parseInt(skill?.prof[0]._, 10) > 0;
  return false;
}

export const Skill = ({
    skillList, 
    skillName, 
    ability, 
    abilityShortName,
    profBonus
}: SkillProps) => {

  const skill = getSkill(skillList, skillName);
  const skillBonus = getSkillBonus(skill, ability, profBonus);
  const hasSkill = hasSkillProf(skill);
  let bonusProfClassName = 'bonusNoProf';
  if (hasSkill) {
    if (hasHalfProf(skill)) {
      bonusProfClassName = 'bonusHalfProf';
    }
    else if (hasDoubleProf(skill)) {
      bonusProfClassName = 'bonusDoubleProf';
    }
    else {
      bonusProfClassName = 'bonusProf';
    }
  }

  return (
    <div className='bonus'>
      <div className={bonusProfClassName}/>
      <div className='bonusValue'>
          {skillBonus >= 0 ? '+' : ''}{skillBonus}
      </div>
      <div className='bonusLabel'>{skillName}</div>
      <div className='skillStat'>&nbsp;({abilityShortName})</div>
    </div>
  )
}

export default Skill;
import React from "react";

interface SkillProps {
    skillList: any;
    skillName: string;
    ability: any;
    abilityShortName: string;
}

export const Skill = ({
    skillList, 
    skillName, 
    ability, 
    abilityShortName
}: SkillProps) => {

  const getSkill = (skillList: any, skillName: string): any => {
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
  
  const getSkillBonus = (skill: any, ability: any): number => {
    const skillProf = skill.prof;
    let skillBonus = parseInt(ability.bonus[0]._, 10);
    
    if (skillProf && skillProf.length > 0) {
      const profBonus = parseInt(skill.prof[0]._, 10);
      skillBonus += profBonus * skillBonus;
    }
  
    return skillBonus;
  }
  
  const hasSkillProf = (skill: any): boolean => {
    return parseInt(skill.prof[0]._, 10) > 0;
  }

  const skill = getSkill(skillList, skillName);
  const skillBonus = getSkillBonus(skill, ability);
  const hasSkill = hasSkillProf(skill);

  return (
    <div className='bonus'>
      <div 
          className={
          hasSkill ? 'bonusProf' : 'bonusNoProf'} />
      <div className='bonusValue'>
          {skillBonus >= 0 ? '+' : ''}{skillBonus}
      </div>
      <div className='bonusLabel'>{skillName}</div>
      <div className='skillStat'>&nbsp;({abilityShortName})</div>
    </div>
  )
}

export default Skill;
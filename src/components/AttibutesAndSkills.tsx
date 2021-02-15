import React from "react";
import Skills from "./Skills";
import Defenses, { MaxDexBonus } from './Defenses';
import Senses from './Senses';
import { getSkillBonus, getSkill } from './Skill';

interface AttributesAndSkillsProps {
  character: any;
}

export interface HitDice {
  d6: number;
  d8: number;
  d10: number;
  d12: number;
}

const getClasses = (character: any): string => {
  let classStr = '';

  const classes = character.classes;
  classes.forEach((c: any) => {
    const curClassKeys = Object.keys(c);
    const curClass = c[curClassKeys[0]][0];
    if (curClass) {
      const name = curClass.name[0]._;
      const level = curClass.level[0]._;
      
      if (classStr.length > 0) {
        classStr = `${classStr} / ${name} ${level}`;
      }
      else {
        classStr = `${name} ${level}`;
      }
    }
  });

  return classStr;
}

const getHitDice = (character: any): HitDice => {
  let hitDice: HitDice = {
    d6: 0,
    d8: 0,
    d10: 0,
    d12: 0
  };

  const classes = character.classes;
  classes.forEach((c: any) => {
    const curClassKeys = Object.keys(c);
    const curClass = c[curClassKeys[0]][0];
    if (curClass) {
      const name = curClass.name[0]._;
      const level = parseInt(curClass.level[0]._, 10);

      if (name.toLowerCase() === 'artificer') {
        hitDice.d8 += level;
      }
      else if (name.toLowerCase() === 'barbarian') {
        hitDice.d12 += level;
      }
      else if (name.toLowerCase() === 'blood hunter' 
          || name.toLowerCase() === 'bloodhunter') {
        hitDice.d10 += level;
      }
      else if (name.toLowerCase() === 'bard') {
        hitDice.d8 += level;
      }
      else if (name.toLowerCase() === 'cleric') {
        hitDice.d8 += level;
      }
      else if (name.toLowerCase() === 'druid') {
        hitDice.d8 += level;
      }
      else if (name.toLowerCase() === 'fighter') {
        hitDice.d10 += level;
      }
      else if (name.toLowerCase() === 'monk') {
        hitDice.d8 += level;
      }
      else if (name.toLowerCase() === 'paladin') {
        hitDice.d10 += level;
      }
      else if (name.toLowerCase() === 'ranger') {
        hitDice.d10 += level;
      }
      else if (name.toLowerCase() === 'rogue') {
        hitDice.d8 += level;
      }
      else if (name.toLowerCase() === 'sorcerer') {
        hitDice.d6 += level;
      }
      else if (name.toLowerCase() === 'warlock') {
        hitDice.d8 += level;
      }
      else if (name.toLowerCase() === 'wizard') {
        hitDice.d6 += level;
      }
      else {
        console.warn('unknown class ' + name);
      }
    }
  });
  
  return hitDice;
}

const getSaveBonus = (profBonus: number, ability: any): number => {
  const saveProf = ability.saveprof;
  let saveBonus = parseInt(ability.bonus[0]._, 10);
  
  if (saveProf && saveProf.length > 0) {
    const saveProfVal = parseInt(saveProf[0]._, 10);
    if (saveProfVal === 3) {
      saveBonus += Math.floor(1/2 * profBonus);
    }
    else {
      saveBonus += profBonus * saveProfVal;
    }
  }

  return saveBonus;
}

const hasSaveBonus = (ability: any): boolean => {
  const saveProf = ability.saveprof;
  if (saveProf && saveProf.length > 0) {
    return parseInt(saveProf[0]._, 10) > 0;
  }
  return false;
}

const getExpNeeded = (character: any): string => {
  // Get character level

  let level = 0;
  const classes = character.classes;
  classes.forEach((c: any) => {
    const curClassKeys = Object.keys(c);
    const curClass = c[curClassKeys[0]][0];
    if (curClass) {
      const curLevel = curClass.level[0]._;
      level += (parseInt(curLevel, 10))
    }
  });

  switch (level) {
    case 1:
      return '/ 300';
    case 2:
      return '/ 900';
    case 3:
      return '/ 2,700';
    case 4:
      return '/ 6,500';
    case 5:
      return '/ 14,000';
    case 6:
      return '/ 23,000';
    case 7:
      return '/ 34,000';
    case 8:
      return '/ 48,000';
    case 9:
      return '/ 64,000';
    case 10:
      return '/ 85,000';
    case 11:
      return '/ 100,000';
    case 12:
      return '/ 120,000';
    case 13:
      return '/ 140,000';
    case 14:
      return '/ 165,000';
    case 15:
      return '/ 195,000';
    case 16:
      return '/ 225,000';
    case 17:
      return '/ 265,000';
    case 18:
      return '/ 305,000';
    case 19:
      return '/ 355,000';
    case 20:
      return '';
    default:
      return '';
  }
}

const getMaxDexBonus = (inventoryList: any): MaxDexBonus => {
  // If inventory, go through and look for eqipped armor
  // (Type = armor, carried = 2) 
  // Then check 'dexbonus' property

  if (!inventoryList && ! inventoryList[0]) {
    return MaxDexBonus.NoMax;
  }

  const keys = Object.keys(inventoryList[0])
  let maxDex = MaxDexBonus.NoMax;

  keys.forEach((key) => {
    const item = inventoryList[0][key][0];
    const type = item.type ? item.type[0]._.toLowerCase() : 'other';
    const carried = item.carried ? item.carried[0]._ : '0';
    const subtype = item.subtype ? item.subtype[0]._.toLowerCase() : 'other';
    if (type === 'armor' && carried === '2' && subtype !== 'shield') {
      const dexbonus = item.dexbonus ? item.dexbonus[0]._ : 'none';
      if (dexbonus.indexOf("max 2") !== -1 && maxDex !== MaxDexBonus.None) {
        maxDex = MaxDexBonus.MaxTwo;
      }
      else if (dexbonus.indexOf("-") !== -1) {
        maxDex = MaxDexBonus.None;
      }
    }
  });

  return maxDex;
}

const AttributesAndSkills = ({character}: AttributesAndSkillsProps) => {

  // Basic Info
  const name = character.name[0]._;
  const abilities = character.abilities[0];
  const classes = getClasses(character);
  const background = character.background[0]._;
  const alignment = character.alignment ? character.alignment[0]._ : '';
  const race = character.race[0]._;
  const exp = character.exp ? character.exp[0]._ : '-';
  const expNeeded = character.exp ? getExpNeeded(character) : '';

  // Stats
  const strength = abilities.strength[0].score[0]._;
  const strengthBonus = abilities.strength[0].bonus[0]._;
  const strengthBonusMod = strengthBonus.indexOf('-') === 0 ? '' : '+'; 
  const dexterity = abilities.dexterity[0].score[0]._;
  const dexterityBonus = abilities.dexterity[0].bonus[0]._;
  const dexterityBonusMod = dexterityBonus.indexOf('-') === 0 ? '' : '+'; 
  const constitution = abilities.constitution[0].score[0]._;
  const constitutionBonus = abilities.constitution[0].bonus[0]._;
  const constitutionBonusMod = constitutionBonus.indexOf('-') === 0 ? '' : '+'; 
  const intelligence = abilities.intelligence[0].score[0]._;
  const intelligenceBonus = abilities.intelligence[0].bonus[0]._;
  const intelligenceBonusMod = intelligenceBonus.indexOf('-') === 0 ? '' : '+'; 
  const wisdom = abilities.wisdom[0].score[0]._;
  const wisdomBonus = abilities.wisdom[0].bonus[0]._;
  const wisdomBonusMod = wisdomBonus.indexOf('-') === 0 ? '' : '+'; 
  const charisma = abilities.charisma[0].score[0]._;
  const charismaBonus = abilities.charisma[0].bonus[0]._;
  const charismaBonusMod = charismaBonus.indexOf('-') === 0 ? '' : '+'; 

  const profBonus = parseInt(character.profbonus[0]._, 10);

  const strengthSave = getSaveBonus(profBonus, 
      abilities.strength[0]);
  const strengthSaveMod = strengthSave >= 0 ? '+' : '';
  const hasStrengthSave = hasSaveBonus(abilities.strength[0])

  const dexteritySave = 
    getSaveBonus(profBonus, abilities.dexterity[0]);
  const dexteritySaveMod = dexteritySave >= 0 ? '+' : '';
  const hasDexteritySave = hasSaveBonus(abilities.dexterity[0])

  const constitutionSave = getSaveBonus(profBonus, 
    abilities.constitution[0]);
  const constitutionSaveMod = constitutionSave >= 0 ? '+' : '';
  const hasConstitutionSave = 
    hasSaveBonus(abilities.constitution[0]);

  const intelligenceSave = getSaveBonus(profBonus, 
    abilities.intelligence[0]);
  const intelligenceSaveMod = intelligenceSave >= 0 ? '+' : '';
  const hasIntelligenceSave = 
    hasSaveBonus(abilities.intelligence[0]);

  const wisdomSave = getSaveBonus(profBonus, 
    abilities.wisdom[0]);
  const wisdomSaveMod = wisdomSave >= 0 ? '+' : '';
  const hasWisdomSave = hasSaveBonus(abilities.wisdom[0]);

  const charismaSave = getSaveBonus(profBonus, 
    abilities.charisma[0]);
  const charismaSaveMod = wisdomSave >= 0 ? '+' : '';
  const hasCharismaSave = hasSaveBonus(abilities.charisma[0]);

  const skillList = character.skilllist[0];

  const defenses = character.defenses[0];
  const hp = character.hp[0];
  const initiative = character.initiative[0];
  const speed = character.speed[0];
  const inspiration = character.inspiration ? character.inspiration[0] : null;

  const inventory = character.inventorylist;
  const maxDexBonus = getMaxDexBonus(inventory);

  const senses = character.senses;
  const passivePerception = character.perception;
  const perception = getSkill(skillList, "Perception");
  const perceptionBonus = getSkillBonus(perception, abilities.wisdom[0], profBonus);

  return (
    <div className='characterContainer'>
      <div className='header'>
        <div className='name'>{name}</div>
        <div className='headerInfo'>
          <div className='info'>
            <div className='infoRow'>
              <div className='infoContainer'>
                <div className='infoValue'>{classes}</div>
              </div>
              <div className='infoContainer'>
                <div className='infoValue'>{race}</div>
              </div>
              <div className='infoContainer'>
                <div className='infoValue'>{background}</div>
              </div>
              <div className='infoContainer'>
                <div className='infoValue'>{alignment}</div>
              </div>
            </div>
            <div className='infoRow'>
            <div className='infoContainer'>
              <div className='label'>Class &#38; Level</div>
            </div>
            <div className='infoContainer'>
              <div className='label'>Race</div>
            </div>
            <div className='infoContainer'>
              <div className='label'>Background</div>
            </div>
            <div className='infoContainer'>
              <div className='label'>Alignment</div>
            </div>
            </div>
          </div>
          <div className='experience'>
              <div className='infoValue'>{exp} {expNeeded}</div>
              <div className='label'>Experience</div>
          </div>
        </div>
      </div>

      <div className='columns'>

        <div className='stats'>
          <div className='stat'>
            <div className='statLabel'>strength</div>
            <div className='statValue'>{strength}</div>
            <div className='statBonus'>{strengthBonusMod}{strengthBonus}</div>
          </div>
          <div className='stat'>
            <div className='statLabel'>dexterity</div>
            <div className='statValue'>{dexterity}</div>
            <div className='statBonus'>{dexterityBonusMod}{dexterityBonus}</div>
          </div>
          <div className='stat'>
            <div className='statLabel'>constitution</div>
            <div className='statValue'>{constitution}</div>
            <div className='statBonus'>{constitutionBonusMod}{constitutionBonus}</div>
          </div>
          <div className='stat'>
            <div className='statLabel'>intelligence</div>
            <div className='statValue'>{intelligence}</div>
            <div className='statBonus'>{intelligenceBonusMod}{intelligenceBonus}</div>
          </div>
          <div className='stat'>
            <div className='statLabel'>wisdom</div>
            <div className='statValue'>{wisdom}</div>
            <div className='statBonus'>{wisdomBonusMod}{wisdomBonus}</div>
          </div>
          <div className='stat'>
            <div className='statLabel'>charisma</div>
            <div className='statValue'>{charisma}</div>
            <div className='statBonus'>{charismaBonusMod}{charismaBonus}</div>
          </div>
        </div>

        <div className='proficiencies'>
          <div className='profBonusContainer'>
            <div className='profBonusValue'>{profBonus}</div>
            <div className='profBonusLabel'>Proficency Bonus</div>
          </div>

          <div className='bonuses'>
            <div className='bonus'>
              <div 
                className={
                  hasStrengthSave ? 'bonusProf' : 'bonusNoProf'} />
              <div className='bonusValue'>
                {strengthSaveMod}{strengthSave}
              </div>
              <div className='bonusLabel'>Strength</div>
            </div>
            <div className='bonus'>
              <div 
                className={
                  hasDexteritySave ? 'bonusProf' : 'bonusNoProf'} />
                            <div className='bonusValue'>
                {dexteritySaveMod}{dexteritySave}
              </div>
              <div className='bonusLabel'>Dexterity</div>
            </div>
            <div className='bonus'>
              <div 
                className={
                  hasConstitutionSave ? 'bonusProf' : 'bonusNoProf'} />
                            <div className='bonusValue'>
                {constitutionSaveMod}{constitutionSave}
              </div>
              <div className='bonusLabel'>Constitution</div>
            </div>
            <div className='bonus'>
              <div 
                className={
                  hasIntelligenceSave ? 'bonusProf' : 'bonusNoProf'} />
                            <div className='bonusValue'>
                {intelligenceSaveMod}{intelligenceSave}
              </div>
              <div className='bonusLabel'>Intelligence</div>
            </div>
            <div className='bonus'>
              <div 
                className={
                  hasWisdomSave ? 'bonusProf' : 'bonusNoProf'} />
                            <div className='bonusValue'>
                {wisdomSaveMod}{wisdomSave}
              </div>
              <div className='bonusLabel'>Wisdom</div>
            </div>
            <div className='bonus'>
              <div 
                className={
                  hasCharismaSave ? 'bonusProf' : 'bonusNoProf'} />
                            <div className='bonusValue'>
                {charismaSaveMod}{charismaSave}
              </div>
              <div className='bonusLabel'>Charisma</div>
            </div>
            <div className='statLabel'>Saving Throws</div>
          </div>

          <Skills 
            skillList={skillList} 
            character={character} 
            profBonus={profBonus}
          />
        </div>

        <Defenses 
          defenses={defenses}
          hp={hp}
          initiative={initiative}
          speed={speed}
          abilities={abilities}
          maxDexBonus={maxDexBonus}
          inspiration={inspiration}
          hitDice={getHitDice(character)}
        />
      </div>

      <Senses 
        senses={senses} 
        passivePerception={passivePerception}
        perceptionBonus={perceptionBonus}
      />
    </div>
  )
};

export default AttributesAndSkills;

import React from "react";

interface CharacterSheetProps {
  characterData: any;
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

const getSavingThrow = (profBonus: number, ability: any): number => {
  //character.abilities[0].strength[0]

  const saveProf = ability.saveprof;
  let saveBonus = parseInt(ability.bonus[0]._, 10);
  
  if (saveProf && saveProf.length > 0) {
    saveBonus += profBonus * parseInt(saveProf[0]._, 10);
  }

  return saveBonus;
}

const hasSavingThrow = (ability: any): boolean => {
  const saveProf = ability.saveprof;
  if (saveProf && saveProf.length > 0) {
    return parseInt(saveProf[0]._,10) > 0;
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

const CharacterSheet = ({characterData}: CharacterSheetProps) => {
  if (!characterData || !characterData.root || !characterData.root.character
    || !characterData.root.character[0]) {
      return (
        <div className='error'>Invalid Fantasy Grounds Character Sheet!</div>
      );
  }

  const character = characterData.root.character[0];

  console.log(character);

  // Basic Info
  const name = character.name[0]._;
  const classes = getClasses(character);
  const background = character.background[0]._;
  const alignment = character.alignment[0]._;
  const race = character.race[0]._;
  const exp = character.exp[0]._;
  const expNeeded = getExpNeeded(character);

  // Stats
  const strength = character.abilities[0].strength[0].score[0]._;
  const strengthBonus = character.abilities[0].strength[0].bonus[0]._;
  const strengthBonusMod = strengthBonus.indexOf('-') === 0 ? '' : '+'; 
  const dexterity = character.abilities[0].dexterity[0].score[0]._;
  const dexterityBonus = character.abilities[0].dexterity[0].bonus[0]._;
  const dexterityBonusMod = dexterityBonus.indexOf('-') === 0 ? '' : '+'; 
  const constitution = character.abilities[0].constitution[0].score[0]._;
  const constitutionBonus = character.abilities[0].constitution[0].bonus[0]._;
  const constitutionBonusMod = constitutionBonus.indexOf('-') === 0 ? '' : '+'; 
  const intelligence = character.abilities[0].intelligence[0].score[0]._;
  const intelligenceBonus = character.abilities[0].intelligence[0].bonus[0]._;
  const intelligenceBonusMod = intelligenceBonus.indexOf('-') === 0 ? '' : '+'; 
  const wisdom = character.abilities[0].wisdom[0].score[0]._;
  const wisdomBonus = character.abilities[0].wisdom[0].bonus[0]._;
  const wisdomBonusMod = wisdomBonus.indexOf('-') === 0 ? '' : '+'; 
  const charisma = character.abilities[0].charisma[0].score[0]._;
  const charismaBonus = character.abilities[0].charisma[0].bonus[0]._;
  const charismaBonusMod = charismaBonus.indexOf('-') === 0 ? '' : '+'; 

  const profBonus = parseInt(character.profbonus[0]._, 10);

  const strengthSave = getSavingThrow(profBonus, 
      character.abilities[0].strength[0]);
  const strengthSaveMod = strengthSave >= 0 ? '+' : '';
  const hasStrengthSave = hasSavingThrow(character.abilities[0].strength[0])

  const dexteritySave = 
    getSavingThrow(profBonus, character.abilities[0].dexterity[0]);
  const dexteritySaveMod = dexteritySave >= 0 ? '+' : '';
  const hasDexteritySave = hasSavingThrow(character.abilities[0].dexterity[0])

  const constitutionSave = getSavingThrow(profBonus, 
    character.abilities[0].constitution[0]);
  const constitutionSaveMod = constitutionSave >= 0 ? '+' : '';
  const hasConstitutionSave = 
    hasSavingThrow(character.abilities[0].constitution[0]);

  const intelligenceSave = getSavingThrow(profBonus, 
    character.abilities[0].intelligence[0]);
  const intelligenceSaveMod = intelligenceSave >= 0 ? '+' : '';
  const hasIntelligenceSave = 
    hasSavingThrow(character.abilities[0].intelligence[0]);

  const wisdomSave = getSavingThrow(profBonus, 
    character.abilities[0].wisdom[0]);
  const wisdomSaveMod = wisdomSave >= 0 ? '+' : '';
  const hasWisdomSave = hasSavingThrow(character.abilities[0].wisdom[0]);

  const charismaSave = getSavingThrow(profBonus, 
    character.abilities[0].charisma[0]);
  const charismaSaveMod = wisdomSave >= 0 ? '+' : '';
  const hasCharismaSave = hasSavingThrow(character.abilities[0].charisma[0]);

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
            <div className='profBonusLabel'>proficency bonus</div>
          </div>

          <div className='savingThrows'>
            <div className='savingThrow'>
              <div 
                className={
                  hasStrengthSave ? 'savingThrowProf' : 'savingThrowNoProf'} />
              <div className='savingThrowValue'>
                {strengthSaveMod}{strengthSave}
              </div>
              <div className='savingThrowLabel'>Strength</div>
            </div>
            <div className='savingThrow'>
              <div 
                className={
                  hasDexteritySave ? 'savingThrowProf' : 'savingThrowNoProf'} />
                            <div className='savingThrowValue'>
                {dexteritySaveMod}{dexteritySave}
              </div>
              <div className='savingThrowLabel'>Dexterity</div>
            </div>
            <div className='savingThrow'>
              <div 
                className={
                  hasConstitutionSave ? 'savingThrowProf' : 'savingThrowNoProf'} />
                            <div className='savingThrowValue'>
                {constitutionSaveMod}{constitutionSave}
              </div>
              <div className='savingThrowLabel'>Constitution</div>
            </div>
            <div className='savingThrow'>
              <div 
                className={
                  hasIntelligenceSave ? 'savingThrowProf' : 'savingThrowNoProf'} />
                            <div className='savingThrowValue'>
                {intelligenceSaveMod}{intelligenceSave}
              </div>
              <div className='savingThrowLabel'>Intelligence</div>
            </div>
            <div className='savingThrow'>
              <div 
                className={
                  hasWisdomSave ? 'savingThrowProf' : 'savingThrowNoProf'} />
                            <div className='savingThrowValue'>
                {wisdomSaveMod}{wisdomSave}
              </div>
              <div className='savingThrowLabel'>Wisdom</div>
            </div>
            <div className='savingThrow'>
              <div 
                className={
                  hasCharismaSave ? 'savingThrowProf' : 'savingThrowNoProf'} />
                            <div className='savingThrowValue'>
                {charismaSaveMod}{charismaSave}
              </div>
              <div className='savingThrowLabel'>Charisma</div>
            </div>
            <div className='statLabel'>Saving Throws</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CharacterSheet
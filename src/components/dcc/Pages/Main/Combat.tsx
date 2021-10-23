import React from "react";
import shield from "./images/shield.svg";
import d20 from "./images/d20.png";

interface DefensesProps {
  attackBonus: any;
  hp: any;
  wounds: any;
  ac: any;
  charClass: string;
  speed: any;
  initiative: any;
  level: number;
  deedDie: any;
  critDie: any;
  critTable: any;
  fumbleDie: any;
  luckDie: string | null;
  threatRange: string | null;
}

const getActionDice = (charClass: string, level: number): string => {
  if (level === 5) {
    if (charClass.toLowerCase() === 'warrior' 
      || charClass.toLowerCase() === 'dwarf'
      || charClass.toLowerCase() === 'wizard'
      || charClass.toLowerCase() === 'elf'
      || charClass.toLowerCase() === 'gnome'
      || charClass.toLowerCase() === 'paladin'
      || charClass.toLowerCase() === 'ranger'
      || charClass.toLowerCase() === 'tiefling') {
      return 'd20,d14';
    }
  }
  else if (level === 6) {
    if (charClass.toLowerCase() === 'thief'
      || charClass.toLowerCase() === 'halfling'
      || charClass.toLowerCase() === 'bard'
      || charClass.toLowerCase() === 'gnome'
      || charClass.toLowerCase().includes('cleric')) {
      return 'd20,d14'; 
    }
    return 'd20,d16';
  }
  else if (level === 7) {
    if (charClass.toLowerCase() === 'thief'
      || charClass.toLowerCase() === 'halfling'
      || charClass.toLowerCase() === 'bard'
      || charClass.toLowerCase().includes('cleric')) {
      return 'd20,d16'; 
    }
    if (charClass.toLowerCase() === 'gnome') {
      return 'd20,d14';  
    }
    return 'd20,d20';
  }
  else if (level === 8) {
    if (charClass.toLowerCase() === 'gnome') {
      return 'd20,d14';  
    }
    return 'd20,d20';
  }
  else if (level === 9) {
    if (charClass.toLowerCase() === 'gnome') {
      return 'd20,d14';  
    }
    return 'd20,d20';
  }
  else if (level >= 10) {
    if (charClass.toLowerCase() === 'thief'
      || charClass.toLowerCase() === 'halfling'
      || charClass.toLowerCase() === 'bard'
      || charClass.toLowerCase().includes('cleric')) {
      return 'd20,d20'; 
    }
    if (charClass.toLowerCase() === 'gnome') {
      return 'd20,d14';  
    }
    return 'd20,d20,d14';
  }

  return 'd20';
}

export const Combat = ({ 
  attackBonus,
  charClass,
  hp,
  wounds,
  ac,
  speed,
  initiative,
  level,
  deedDie,
  critDie,
  critTable,
  fumbleDie,
  luckDie,
  threatRange,
}: DefensesProps) => {

  const hpRemaining = Number(hp) - Number(wounds);

  const numInit = Number(initiative);
  const initMod = numInit > 0 ? '+' : '';
  const initString = `${initMod}${numInit}`;

  const numAttack = Number(attackBonus);
  const attackMod = numAttack > 0 ? '+' : '';
  const attackString = `${attackMod}${numAttack}`;

  const actionDice = getActionDice(charClass, level);

  return (
    <>
      <div className='dccDefences'>
        <div className='row2'>
          <img className='acImage' src={shield} alt='ac'></img>
          <div className='acContainer'>
            <div className='acValue'>{ac}</div>
            <div className='statLabel'>AC</div>
          </div>

          <div className='defenceContainer'>
            <div className='defenceValue'>{speed}</div>
            <div className='statLabel'>Speed</div>
          </div>
        </div>

        <div className='row'>
          <div className='wideDefenceContainer'>
            <div className='defenceValue'>{hpRemaining} / {hp}</div>
            <div className='defenceLabel'>Hit Points</div>
          </div>
        </div>
      </div>

      <div className='dccCombatBasics'>
        <div className='dccCombat'>
          <div className='dccCombatLabel'>Initiative:</div>
          <div className='dccCombatValue'>{initString}</div>
        </div>
        <div className='dccCombat'>
          <div className='dccCombatLabel'>Action Dice:</div>
          <div className='dccCombatValue'>{actionDice}</div>
        </div>
        {deedDie && (
          <div className='dccCombat'>
            <div className='dccCombatLabel'>Deed Die:</div>
            <div className='dccCombatValue'>{deedDie}</div>
          </div>
        )}
        {!deedDie && (
          <div className='dccCombat'>
            <div className='dccCombatLabel'>Attack Bonus:</div>
            <div className='dccCombatValue'>{attackString}</div>
          </div>
        )}
        <div className='dccCombat'>
          <div className='dccCombatLabel'>Crit Die:</div>
          <div className='dccCombatValue'>{critDie}</div>
        </div>
        <div className='dccCombat'>
          <div className='dccCombatLabel'>Crit Table:</div>
          <div className='dccCombatValue'>{critTable}</div>
        </div>
        <div className='dccCombat'>
          <div className='dccCombatLabel'>Fumble Die:</div>
          <div className='dccCombatValue'>{fumbleDie}</div>
        </div>
        {luckDie && (
          <div className='dccCombat'>
            <div className='dccCombatLabel'>Luck Die:</div>
            <div className='dccCombatValue'>{luckDie}</div>
          </div>
        )}
        {threatRange && (
          <div className='dccCombat'>
            <div className='dccCombatLabel'>Threat Range:</div>
            <div className='dccCombatValue'>{threatRange}-20</div>
          </div>
        )}
        <div className='statLabel'>Combat Basics</div>
      </div>
    </>
  )
}

export default Combat;
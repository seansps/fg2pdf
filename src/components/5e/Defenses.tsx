import React from "react";
import shield from "./images/shield.svg";
import d20 from "./images/d20.png";
import { HitDice } from "./AttibutesAndSkills";

export enum MaxDexBonus {
  NoMax,
  MaxTwo,
  None,
}

interface DefensesProps {
    defenses: any;
    hp: any;
    initiative: any;
    inspiration: any;
    speed: any;
    abilities: any;
    maxDexBonus: MaxDexBonus;
    hitDice: HitDice;
}

const getAc = (
  defenses: any, 
  abilities: any, 
  maxDexBonus: MaxDexBonus): number => {
  // Base AC
  let ac = 10;
  const armor = defenses.ac[0].armor;
  let hasArmor = false;
  const shield = defenses.ac[0].shield;
  const stat2 = defenses.ac[0].stat2;
  const misc = defenses.ac[0].misc;
  
  // Armor
  if (armor && armor.length > 0) {
    const armorBonus = parseInt(armor[0]._, 10);
    ac += armorBonus;
    hasArmor = armorBonus > 0;
  }

  // Shield
  if (shield && shield.length > 0) {
    ac += parseInt(shield[0]._, 10);
  }

  // Dexterity
  if (maxDexBonus !== MaxDexBonus.None) {
    let dexBonus = parseInt(abilities.dexterity[0].bonus[0]._, 10);
    
    if (maxDexBonus === MaxDexBonus.MaxTwo && dexBonus > 2) {
      dexBonus = 2;
    }

    ac += dexBonus;
  }

  // Second Stat, if no Armor (Barbarians and Monks get this w/o armor)
  if (!hasArmor && stat2 && stat2.length > 0) {
    ac += parseInt(abilities[stat2[0]._][0].bonus[0]._, 10);
  }

  // Bonuses for other sources
  if (misc && misc.length > 0) {
    ac += parseInt(misc[0]._, 10);
  }

  return ac;
}

const getInitValue = (initiative: any, dexterity: any): number => {
  let initValue = 0;

  // Add dex bonus
  const dexBonus = parseInt(dexterity.bonus[0]._, 10);
  initValue += dexBonus;

  if (initiative) {
    if (initiative.misc && initiative.misc.length > 0) {
      const miscValue = parseInt(initiative.misc[0]._, 10);
      initValue += miscValue;
    }
  }

  return initValue;
}

const getSpeedValue = (speed: any): number => {
  let speedVal = 30;

  if (speed.base && speed.base.length > 0) {
    speedVal = parseInt(speed.base[0]._, 10);
  }

  if (speed.misc && speed.misc.length > 0) {
    speedVal += parseInt(speed.misc[0]._, 10);
  }

  if (speed.armor && speed.armor.length > 0) {
    speedVal += parseInt(speed.armor[0]._, 10);
  }
  
  return speedVal;
}

const getHitDiceStr = (hitDice: HitDice): string => {
  let string = '';

  if (hitDice.d6) {
    string = `${hitDice.d6}d6`;
  }
  if (hitDice.d8) {
    if (string.length > 0) {
      string = `${string}, `
    }
    string = `${hitDice.d8}d8`;
  }
  if (hitDice.d10) {
    if (string.length > 0) {
      string = `${string}, `
    }
    string = `${hitDice.d10}d10`;
  }
  if (hitDice.d12) {
    if (string.length > 0) {
      string = `${string}, `
    }
    string = `${hitDice.d12}d12`;
  }

  return string;
}

export const Defenses = ({ 
  defenses, 
  hp,
  initiative,
  inspiration,
  speed,
  abilities,
  maxDexBonus = MaxDexBonus.NoMax,
  hitDice,
}: DefensesProps) => {

  const initValue = getInitValue(initiative, abilities.dexterity[0]);
  const speedValue = getSpeedValue(speed);

  const hitPoints = parseInt(hp.total[0]._, 10);
  const wounds = hp.wounds ? parseInt(hp.wounds[0]._, 10) : 0;
  const currentHp = hitPoints - wounds;

  const tempHp = hp.temporary ? parseInt(hp.temporary[0]._, 10) : 0;
  const hitDiceStr = getHitDiceStr(hitDice);

  const deathsavefail = hp.deathsavefail ? parseInt(hp.deathsavefail[0]._) : 0;
  const deathsavesuccess = hp.deathsavefail ? parseInt(hp.deathsavesuccess[0]._) : 0;

  const inspired = inspiration ? inspiration._ === '1' : false;

  return (
    <div className='defences'>
      <div className='row'>
        <img className='acImage' src={shield} alt='ac'></img>
        <div className='acContainer'>
          <div className='acValue'>{getAc(defenses, abilities, maxDexBonus)}</div>
          <div className='statLabel'>AC</div>
        </div>
        <div className='defenceContainer'>
          <div className='defenceValue'>{initValue >= 0 ? '+' : ''}{initValue}</div>
          <div className='statLabel'>Initiative</div>
        </div>
        <div className='defenceContainer'>
          <div className='defenceValue'>{speedValue}</div>
          <div className='statLabel'>Speed</div>
        </div>
      </div>

      <div className='row'>
        <div className='wideDefenceContainer'>
          <div className='defenceValue'>{currentHp} / {hitPoints}</div>
          <div className='defenceLabel'>Hit Points</div>
        </div>
      </div>

      <div className='row'>
        <div className='wideDefenceContainer'>
          <div className='defenceValue'>{tempHp}</div>
          <div className='defenceLabel'>Temporary Hit Points</div>
        </div>
      </div>

      <div className='row'>
        <div className='wideDefenceContainer'>
          <div className='hitDieValue'>{hitDiceStr}</div>
          <div className='defenceLabel'>Hit Dice</div>
        </div>
      </div>

      <div className='row'>
        <div className='wideDefenceContainer'>
          <div className='deathSaveContainer'>
            <div className='deathSave'>
              Successes
              <div className={deathsavesuccess > 0 
                  ? 'deathSaveBubbleFilled' : 'deathSaveBubble'}/>
              <div className={deathsavesuccess > 1
                  ? 'deathSaveBubbleFilled' : 'deathSaveBubble'}/>
              <div className={deathsavesuccess > 2
                  ? 'deathSaveBubbleFilled' : 'deathSaveBubble'}/>
            </div>
            <div className='deathSave'>
              Failures
              <div className={deathsavefail > 0 
                  ? 'deathSaveBubbleFilled' : 'deathSaveBubble'}/>
              <div className={deathsavefail > 1
                  ? 'deathSaveBubbleFilled' : 'deathSaveBubble'}/>
              <div className={deathsavefail > 2
                  ? 'deathSaveBubbleFilled' : 'deathSaveBubble'}/>
            </div>
          </div>
          <div className='defenceLabel'>Death Saves</div>
        </div>
      </div>

      <div className='row'>
        <div className='wideDefenceContainer'>
          {inspired && <img className='d20' src={d20} alt='inspired' />}
          {!inspired && <div className='notInspired' />}
          <div className='defenceLabel'>Inspiration</div>
        </div>
      </div>
    </div>
  )
}

export default Defenses;
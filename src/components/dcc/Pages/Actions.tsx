import React from "react";
import CharacterHeader, { getClass } from "../CharacterHeader";
import Page from '../../Page';
import { getValue } from "../../../utils/getValue";

interface SpellsProps {
  character: any;
}

interface Power {
  name: string;
  prepared: boolean;
  group: string;
  mercurial: string;
}

const MAX_SPELLS_LINES = 26;

const getDamage = (damagelist: any): string => {
  let damage = '';

  if (damagelist && damagelist.length) {

    const keys = Object.keys(damagelist[0]);
    keys.forEach((key)=>{
      const dice = damagelist[0][key][0].dice;
      const type = damagelist[0][key][0].type
      const bonus = damagelist[0][key][0].bonus;
      if (dice && dice.length) {
        dice.forEach((die: any) => {
          if (die._ === 'd4') {
            damage = '1d4'
          }
          else if (die._ === 'd6') {
            damage = '1d6'
          }
          else if (die._ === 'd8') {
            damage = '1d8'
          }
          else if (die._ === 'd10') {
            damage = '1d10'
          }
          else if (die._ === 'd12') {
            damage = '1d12'
          }
          else {
            if (die._) {
              damage = die._;
            }
            else {
              damage = ''
            }
          }
        });
      }

      if (bonus && bonus.length && bonus[0]._ !== '0') {
        damage = `${damage} ${damage.length ? '+' : ''} ${bonus[0]._}`
      }
  
      if (type && type.length) {
        damage = `${damage} ${type[0]._} `
      }
    })
  }

  return damage;
}

const getPowers = (powers: Record<string, unknown>[]): Power[] => {
  let allPowers: Power[] = [];

  powers.forEach((power: any) => {
    const keys = Object.keys(power);
    keys.forEach((key) => {
      const curPower = power[key][0];
      let group = curPower.group && curPower.group.length ? curPower.group[0]._ : 'Powers';
      const level = curPower.level && curPower.level.length ? curPower.level[0]._ : '';
      const name = curPower.name && curPower.name.length ? curPower.name[0]._ : '';
      const mercurial = curPower.shortdescription ? 
        getValue(curPower.shortdescription).split('.')[0] + "." : '';
      let prepared = true;
      if (level !== '0' && level !== '') {
        if (curPower.prepared && curPower.prepared.length) {
          prepared = curPower.prepared[0]._ !== '0';
        }
      }

      if (group.toLowerCase() === 'spells' && level === '1') {
        group = `1st Level ${group}`
      }
      else if (group.toLowerCase() === 'spells' && level === '2') {
        group = `2nd Level ${group}`
      }
      else if (group.toLowerCase() === 'spells' && level === '3') {
        group = `3rd Level ${group}`
      }
      else if (group.toLowerCase() === 'spells' && level === '4') {
        group = `4th Level ${group}`
      }
      else if (group.toLowerCase() === 'spells' && level === '5') {
        group = `5th Level ${group}`
      }
      else if (group.toLowerCase() === 'spells' && level === '6') {
        group = `6th Level ${group}`
      }
      else if (group.toLowerCase() === 'spells' && level === '7') {
        group = `7th Level ${group}`
      }
      else if (group.toLowerCase() === 'spells' && level === '8') {
        group = `8st Level ${group}`
      }
      else if (group.toLowerCase() === 'spells' && level === '9') {
        group = `9th Level ${group}`
      }

      allPowers.push({
        name,
        group,
        prepared,
        mercurial,
      })
    });

    // Sort powers by group and name
    allPowers.sort((p1, p2) => {
      if (p1.group === 'Cantrips') {
        return -1;
      }
      if (p2.group === 'Cantrips') {
        return 1;
      }
      if (p1.group < p2.group) {
        return -1;
      }
      else if (p1.group > p2.group) {
        return 1;
      }
      else {
        if (p1.name < p2.name) {
          return -1;
        }
        else if (p1.name > p2.name) {
          return 1;
        }
        return 0
      }
    });
  });

  return allPowers;
}

export const powerToString = (power: Power): string => {
  // Mark if lost
  return `${!power.prepared ? '❌' : ''} ${power.name} ${power.mercurial && `\n(Mercurial Magic: ${power.mercurial})`}`;
}

export const Actions = ({character}: SpellsProps) => {
  
  const {
    powers,
    powermeta: spellSlots,
    weaponlist: weaponList
  } = character;

  const allFeatures: string[] = [];

  // Add weaponlist
  allFeatures.push('TITLE:Weapons')
  allFeatures.push('TITLE:NORENDER')
  const usedWeaponStrings: Record<string, number> = {};
  if (weaponList && weaponList.length > 0) {
    weaponList.forEach((weaponKeys: any) => {
      const keys = Object.keys(weaponKeys);
      keys.forEach(key => {
        const weapon = weaponKeys[key][0];
        const name = weapon.name ? weapon.name[0]._ : '';
        const ammo = weapon.ammo ? parseInt(weapon.ammo[0]._, 10) : 0
        const maxammo = weapon.maxammo ? parseInt(weapon.maxammo[0]._, 10) : 0
        const string = `${name}${maxammo > 0 ? ` (Ammo ${ammo}/${maxammo})`:''} 
          - ${getDamage(weapon.damagelist)}`
        if (Object.keys(usedWeaponStrings).indexOf(string) === -1) {
          allFeatures.push(string)
          usedWeaponStrings[string] = 1;
        }
      });
    });
  }
  else {
    allFeatures.push('None');
  }

  if (getClass(character).toLowerCase() === 'cleric') {
    // Add disapproval range
    const disapprovalRange = getValue(character.disapprovalrange);
    allFeatures.push('TITLE:Disapproval Range');
    allFeatures.push(`1 - ${disapprovalRange || 1}`);
    allFeatures.push('TITLE:NORENDER')
  }

  const allPowers = getPowers(powers || []);

  let prevGroup = 'NONE';
  let curGroup = '';
  allPowers.forEach(power => {
    curGroup = power.group;
    // Push group title
    if (prevGroup !== curGroup) {
      prevGroup = curGroup;
      allFeatures.push(`TITLE:${curGroup}`)
      allFeatures.push('TITLE:NORENDER')
    }
    // Push power
    allFeatures.push(powerToString(power))
  })

  const pages: string[][] = [];
  // Chunk into pages
  for (let i=0; i < allFeatures.length; i += MAX_SPELLS_LINES) {
    const tempArray = allFeatures.slice(i, i + MAX_SPELLS_LINES);
    pages.push(tempArray);
  }

  return (
    <>
      {pages.map((page, index) => {
        const groups: string[][] = [[]];
        let curIndex = 0;
        // Split into groups
        for (let i=0; i < page.length; i += 1) {
          const line = page[i];
          if (i !== 0 && line.indexOf('TITLE') === 0 && line.indexOf('NORENDER') === -1) {
            // New group
            groups.push([]);
            curIndex += 1;
          }
          groups[curIndex].push(line);
        }

        return (
          <Page key={`logs-${index}`}>
            <div className = 'characterContainer'>
              <CharacterHeader character={character} />
              {groups.map((group, gindex) => {
                return (
                  <div className='listSection' key={`logsgroup-${gindex}`}>
                    {
                      group.map((string,sindex) => {
                        const isHeader = string.indexOf('TITLE:') === 0;
                        if (isHeader) {
                          if (string.indexOf('NORENDER') === -1) {
                            return (
                              <div className='listLabel' key={`logsstring-${gindex}${sindex}`}>
                                {string.split('TITLE:')[1]}
                              </div>
                            )
                          }
                          else {
                            return null;
                          }
                        }
                        else {
                          return (
                            <div className='listLine' key={`logsstring-${gindex}${sindex}`}>
                              {string}
                            </div>
                          )
                        }
                      })
                    }
                  </div>
                )
              })}
            </div>
          </Page>
        )
      })}
    </>
  )
}

export default Actions;
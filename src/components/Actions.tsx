import React from "react";
import CharacterHeader from "./CharacterHeader";
import Page from './Page';

interface SpellsProps {
  character: any;
}

interface Power {
  name: string;
  prepared: boolean;
  group: string;
}

const MAX_SPELLS_LINES = 25;

const getDamage = (damagelist: any): string => {
  let damage = '';

  if (damagelist && damagelist.length) {

    const keys = Object.keys(damagelist[0]);
    keys.forEach((key)=>{
      const dice = damagelist[0][key][0].dice;
      const type = damagelist[0][key][0].type
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
        });
      }
  
      if (type && type.length) {
        damage = `${damage} ${type[0]._} `
      }
    })
  }

  return damage;
}

const getPowers = (powers: any): Power[] => {
  let allPowers: Power[] = [];

  powers.forEach((power: any) => {
    const keys = Object.keys(power);
    keys.forEach((key) => {
      const curPower = power[key][0];
      let group = curPower.group && curPower.group.length ? curPower.group[0]._ : 'Powers';
      const level = curPower.level && curPower.level.length ? curPower.level[0]._ : '';
      const name = curPower.name && curPower.name.length ? curPower.name[0]._ : '';
      let prepared = true;
      if (level !== '0' && level !== '') {
        if (curPower.prepared && curPower.prepared.length) {
          prepared = curPower.prepared[0]._ !== '0';
        }
      }

      if (level === '0') {
        group = `Cantrips`
      }
      else if (group.toLowerCase() === 'spells' && level === '1') {
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
  return `${power.prepared ? '✓' : ''} ${power.name}`
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
        allFeatures.push(string)
      });
    });
  }
  else {
    allFeatures.push('None');
  }
  
  // Add Spell Slots
  if (spellSlots && spellSlots[0] && spellSlots[0].spellslots1
    && spellSlots[0].spellslots1[0] && spellSlots[0].spellslots1[0].max
    && parseInt(spellSlots[0].spellslots1[0].max[0]._, 10) > 0) {

    const spellSlots1 = parseInt(spellSlots[0].spellslots1[0].max[0]._, 10)
    const spellSlots2 = parseInt(spellSlots[0].spellslots2[0].max[0]._, 10)
    const spellSlots3 = parseInt(spellSlots[0].spellslots3[0].max[0]._, 10)
    const spellSlots4 = parseInt(spellSlots[0].spellslots4[0].max[0]._, 10)
    const spellSlots5 = parseInt(spellSlots[0].spellslots5[0].max[0]._, 10)
    const spellSlots6 = parseInt(spellSlots[0].spellslots6[0].max[0]._, 10)
    const spellSlots7 = parseInt(spellSlots[0].spellslots7[0].max[0]._, 10)
    const spellSlots8 = parseInt(spellSlots[0].spellslots8[0].max[0]._, 10)
    const spellSlots9 = parseInt(spellSlots[0].spellslots9[0].max[0]._, 10)

    allFeatures.push('TITLE:Spell Slots')
    allFeatures.push(`1st: ${spellSlots1} 2nd: ${spellSlots2} 3rd: ${spellSlots3} ` +
      `4th: ${spellSlots4} 5th: ${spellSlots5} 6th: ${spellSlots6} 7th: ${spellSlots7} ` +
      `8th: ${spellSlots8} 9th: ${spellSlots9}`);
  }

  // Add Pact Magic
  if (spellSlots && spellSlots[0] && spellSlots[0].pactmagicslots1
    && spellSlots[0].pactmagicslots1[0] && spellSlots[0].pactmagicslots1[0].max
    && parseInt(spellSlots[0].pactmagicslots1[0].max[0]._, 10) > 0) {

    const spellSlots1 = parseInt(spellSlots[0].pactmagicslots1[0].max[0]._, 10)
    const spellSlots2 = parseInt(spellSlots[0].pactmagicslots2[0].max[0]._, 10)
    const spellSlots3 = parseInt(spellSlots[0].pactmagicslots3[0].max[0]._, 10)
    const spellSlots4 = parseInt(spellSlots[0].pactmagicslots4[0].max[0]._, 10)
    const spellSlots5 = parseInt(spellSlots[0].pactmagicslots5[0].max[0]._, 10)
    const spellSlots6 = parseInt(spellSlots[0].pactmagicslots6[0].max[0]._, 10)
    const spellSlots7 = parseInt(spellSlots[0].pactmagicslots7[0].max[0]._, 10)
    const spellSlots8 = parseInt(spellSlots[0].pactmagicslots8[0].max[0]._, 10)
    const spellSlots9 = parseInt(spellSlots[0].pactmagicslots9[0].max[0]._, 10)

    allFeatures.push('TITLE:Pact Magic')
    if (spellSlots9 > 0) {
      allFeatures.push(`9th Level Slots: ${spellSlots9}`);
    }
    else if (spellSlots8 > 0) {
      allFeatures.push(`8th Level Slots: ${spellSlots8}`);
    }
    else if (spellSlots7 > 0) {
      allFeatures.push(`7th Level Slots: ${spellSlots7}`);
    }
    else if (spellSlots6 > 0) {
      allFeatures.push(`6th Level Slots: ${spellSlots6}`);
    }
    else if (spellSlots5 > 0) {
      allFeatures.push(`5th Level Slots: ${spellSlots5}`);
    }
    else if (spellSlots4 > 0) {
      allFeatures.push(`4th Level Slots: ${spellSlots4}`);
    }
    else if (spellSlots3 > 0) {
      allFeatures.push(`3rd Level Slots: ${spellSlots3}`);
    }
    else if (spellSlots2 > 0) {
      allFeatures.push(`2nd Level Slots: ${spellSlots2}`);
    }
    else if (spellSlots1 > 0) {
      allFeatures.push(`1st Level Slots: ${spellSlots1}`);
    }
  }

  const allPowers = getPowers(powers);

  let prevGroup = 'NONE';
  let curGroup = '';
  allPowers.forEach(power => {
    console.log(power)
    curGroup = power.group;
    // Push group title
    if (prevGroup !== curGroup) {
      prevGroup = curGroup;
      allFeatures.push(`TITLE:${curGroup}`)
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

        // Split page out into groups.
        if (page[0].indexOf('TITLE') !== 0) {
          page.unshift('TITLE:(Continued)')
        }

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
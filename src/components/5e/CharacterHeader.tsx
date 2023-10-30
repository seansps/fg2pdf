import React from "react";

interface CharacterHeaderProps {
  character: any;
}

const getClasses = (character: any): string => {
  let classStr = '';

  const classes = character.classes;
 
  classes.forEach((c: any) => {
    const curClassKeys = Object.keys(c);
    curClassKeys.forEach(classKey => {
      const curClass = c[classKey][0];
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
    })
  });

  return classStr;
}

const getExpNeeded = (character: any): string => {
  // Get character level

  let level = 0;
  const classes = character.classes;
  classes.forEach((c: any) => {
    const curClassKeys = Object.keys(c);
    if (curClassKeys.length > 0 && curClassKeys[0].length > 0) {
      const curClass = c[curClassKeys[0]][0];
      if (curClass) {
        const curLevel = curClass.level[0]._;
        level += (parseInt(curLevel, 10))
      }
    }
  });

  switch (level) {
    case 1:
      return '/ 300';
    case 2:
      return '/ 900';
    case 3:
      return '/ 2700';
    case 4:
      return '/ 6500';
    case 5:
      return '/ 14000';
    case 6:
      return '/ 23000';
    case 7:
      return '/ 34000';
    case 8:
      return '/ 48000';
    case 9:
      return '/ 64000';
    case 10:
      return '/ 85000';
    case 11:
      return '/ 100000';
    case 12:
      return '/ 120000';
    case 13:
      return '/ 140000';
    case 14:
      return '/ 165000';
    case 15:
      return '/ 195000';
    case 16:
      return '/ 225000';
    case 17:
      return '/ 265000';
    case 18:
      return '/ 305000';
    case 19:
      return '/ 355000';
    case 20:
      return '';
    default:
      return '';
  }
}

export const CharacterHeader = ({character}: CharacterHeaderProps) => {
  
  // Basic Info
  const name = character.name ? character.name[0]._ : '';
  const classes = getClasses(character);
  const background = character.background ? character.background[0]._ : '';
  const alignment = character.alignment ? character.alignment[0]._ : '';
  const race = character.race ? character.race[0]._ : '';
  const exp = character.exp ? character.exp[0]._ : '-';
  const expNeeded = character.exp ? getExpNeeded(character) : '';
  

  return (
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
  );
}

export default CharacterHeader;
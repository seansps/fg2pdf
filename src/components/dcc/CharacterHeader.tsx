import React from "react";
import { getValue } from "../../utils/getValue";

interface CharacterHeaderProps {
  character: any;
}

export const getLevel = (character: any): number => {
  const classes = character.classes;
  if (!classes) {
    return 0;
  }

  const classKeys = Object.keys(classes[0]);
  const charClass = classes[0][classKeys[0]][0];
  let level = 0;
  if (charClass) {
    level = Number(getValue(charClass.level));
  }

  return level;
}

export const getClass = (character: any): string => {
  const classes = character.classes;
  if (!classes) {
    return '';
  }

  const classKeys = Object.keys(classes[0]);
  const charClass = classes[0][classKeys[0]][0];
  let name = '';
  if (charClass) {
    name = getValue(charClass.name);
  }

  return name;
}

export const getTitle = (character: any): string => {
  const classes = character.classes;
  if (!classes) {
    return '';
  }

  const classKeys = Object.keys(classes[0]);
  const charClass = classes[0][classKeys[0]][0];
  let title = '';
  if (charClass) {
    title = getValue(charClass.title);
  }

  return title;
}

const getClassAndTitle = (character: any): [string, string] => {
  const classes = character.classes;
  if (!classes) {
    return ['Level 0', ''];
  }
  return [`${getClass(character)} ${getLevel(character)}`, getTitle(character)];
}

const getExpNeeded = (character: any): string => {
  // Get character level
  const classes = character.classes;
  const classKeys = Object.keys(classes[0]);
  const charClass = classes[0][classKeys[0]][0];
  let level = 0;
  if (classes && charClass) {
    const curLevel = charClass.level[0]._;
    level += (parseInt(curLevel, 10))
  }

  switch (level) {
    case 0:
      return '/ 10';
    case 1:
      return '/ 50';
    case 2:
      return '/ 110';
    case 3:
      return '/ 190';
    case 4:
      return '/ 290';
    case 5:
      return '/ 410';
    case 6:
      return '/ 550';
    case 7:
      return '/ 710';
    case 8:
      return '/ 890';
    case 9:
      return '/ 1090';
    case 10:
      return '';
    default:
      return '';
  }
}

export const CharacterHeader = ({character}: CharacterHeaderProps) => {
  
  // Basic Info
  const name = character.name ? character.name[0]._ : '';
  const [classStr, title] = getClassAndTitle(character);
  const occupation = getValue(character.occupation);
  const alignment = getValue(character.alignment);
  const exp = character.exp ? character.exp[0]._ : '0';
  const expNeeded = character.exp ? getExpNeeded(character) : '';
  

  return (
    <div className='header'>
    <div className='name'>{name}</div>
    <div className='headerInfo'>
      <div className='info'>
        <div className='infoRow'>
          <div className='infoContainer'>
            <div className='infoValue'>{classStr}</div>
          </div>
          <div className='infoContainer'>
            <div className='infoValue'>{occupation}</div>
          </div>
          <div className='infoContainer'>
            <div className='infoValue'>{title}</div>
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
          <div className='label'>Occupation</div>
        </div>
        <div className='infoContainer'>
          <div className='label'>Title</div>
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
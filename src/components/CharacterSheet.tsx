import React from "react";
import AttributesAndSkills from "./AttibutesAndSkills";
import Page from './Page';

interface CharacterSheetProps {
  characterData: any;
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

  return (
    <Page>
      <AttributesAndSkills character={character} />
    </Page>
  )
}

export default CharacterSheet
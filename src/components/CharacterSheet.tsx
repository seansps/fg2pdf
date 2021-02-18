import React from "react";
import Actions from "./Actions";
import AdventureLog from "./AdventureLog";
import AttributesAndSkills from "./AttibutesAndSkills";
import { CharacterHeader } from "./CharacterHeader";
import Features from "./Features";
import Inventory from "./Inventory";
import Notes from "./Notes";
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

  return (
    <>
      <Page>
        <div className='characterContainer'>
          <CharacterHeader character={character} />
          <AttributesAndSkills character={character} />
        </div>
      </Page>
      <Features character={character} />
      <Inventory character={character} />
      <Notes character={character} />
      <AdventureLog character={character} />
      <Actions character={character} />
    </>
  )
}

export default CharacterSheet
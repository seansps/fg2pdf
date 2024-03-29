import React from "react";
import Inventory from "./Pages/Inventory";
import AdventureLog from "./Pages/AdventureLog";
import Main from "./Pages/Main/Main";
import { Notes } from "./Pages/Notes";
import Actions from "./Pages/Actions";
import Features from "./Pages/Features";

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
      <Main character={character} />
      <Inventory character={character} />
      <Features character={character} />
      <Notes character={character} />
      <AdventureLog character={character} />
      <Actions character={character} />
    </>
  )
}

export default CharacterSheet
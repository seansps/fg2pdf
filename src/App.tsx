import React, { useState } from "react";
import "./App.css";
import CharacterSheet from "./components/CharacterSheet";
import FileSelector from "./components/FileSelector";

function App() {

  const [characterData, setCharacterData] = useState<any>();

  const onConvertedFile = (characterData: any) => {
    setCharacterData(characterData);
  }

  return (
    <div className="App">
      {!characterData && (
        <>
          <h1 className='subtitle'>To Begin, Select an XML File</h1>
          <FileSelector onConvertedFile={onConvertedFile} />
        </>
      )}
      {characterData && <CharacterSheet characterData={characterData} />}
    </div>
  );
}

export default App;

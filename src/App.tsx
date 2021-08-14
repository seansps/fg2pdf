import React, { useState } from "react";
import "./App.css";
import CharacterSheet from "./components/5e/CharacterSheet";
import DccCharacterSheet from "./components/dcc/CharacterSheet";
import FileSelector from "./components/FileSelector";

function App() {
  const [characterData, setCharacterData] = useState<any>();
  const [system, setSystem] = useState<string | null>(null);

  const onConvertedFile = (characterData: any, system: string) => {
    setCharacterData(characterData);
    setSystem(system);
  };

  return (
    <div className="App">
      {!characterData && (
        <>
          <h1 className="title">Fantasy Grounds PDF Generator</h1>
          <h2 className="subtitle">
            Select a Fantasy Grounds Unity Character XML File
          </h2>
          <FileSelector onConvertedFile={onConvertedFile} />
        </>
      )}
      {characterData &&
        system &&
        (system === "5e" ? (
          <CharacterSheet characterData={characterData} />
        ) : (
          <DccCharacterSheet characterData={characterData} />
        ))}
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";
import CharacterSheet from "./components/5e/CharacterSheet";
import DccCharacterSheet from "./components/dcc/CharacterSheet";
import FileSelector from "./components/FileSelector";
import Page from "./components/Page";

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
        <Page>
          <div className="fileSelect">
            <h1 className="title">Fantasy Grounds PDF Generator</h1>
            <h2 className="subtitle">
              Select a Fantasy Grounds Unity Character XML File
            </h2>
            <FileSelector onConvertedFile={onConvertedFile} />
          </div>
        </Page>
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

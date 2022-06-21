import React, { useState } from "react";
import "./App.css";
import CharacterSheet from "./components/5e/CharacterSheet";
import fillCyberpunkRedForm from "./components/cyberpunkred/fillForm";
import DccCharacterSheet from "./components/dcc/CharacterSheet";
import FileSelector from "./components/FileSelector";
import Page from "./components/Page";

function App() {
  const [characterData, setCharacterData] = useState<any>();
  const [system, setSystem] = useState<string | null>(null);

  const onConvertedFile = (characterData: any, system: string) => {
    if (characterData && system && system.toLocaleLowerCase() === "cyberpunk red") {
      fillCyberpunkRedForm(characterData)
    }
    else {
      setCharacterData(characterData);
      setSystem(system);
    }
  };

  let is5e = false;
  let isDcc = false;
  if (characterData && system && system.toLocaleLowerCase() === "5e") {
    is5e = true;
  }
  else if (characterData && system && system.toLocaleLowerCase() === "dcc") {
    isDcc = true;
  }

  return (
    <div className="App">
      {!is5e && !isDcc && (
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
      {is5e && (
          <CharacterSheet characterData={characterData} />
        )
      }
      {isDcc && (
        <DccCharacterSheet characterData={characterData} />
      )
      }
    </div>
  );
}

export default App;

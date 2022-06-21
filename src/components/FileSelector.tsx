import React, { useState, ChangeEvent } from "react";
import * as xml2js from "xml2js";

interface UploadFileProps {
  onConvertedFile: (characterData: any, system: string) => void;
}

const FileSelector = ({onConvertedFile}: UploadFileProps) => {
  const [currentFile, setCurrentFile] = useState<File | null>();
  const [system, setSystem] = useState<string>('5e');
  const [message, setMessage] = useState<string | null>();

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target.files.item(0)
      setCurrentFile(file);
    }
  };

  const selectSystem = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target && event.target.value) {
      const systemValue = event.target.value;
      setSystem(systemValue);
    }
  };


  const convert = async () => {
    if (!currentFile) return;
    const xml = await currentFile.text();
    xml2js.parseString(xml, (err, result) => {
      if(err) {
          setMessage(`Error processing XML: ${err}`);
      }
      else {
        // `result` is a JavaScript object
        onConvertedFile(result, system);
      }
    });
  };

  return (
    <div>
      <label className="btn btn-default">
        <input type="file" onChange={selectFile} />
      </label>

      <button
        className="btn btn-success"
        disabled={!currentFile}
        onClick={convert}
      >
        Convert XML
      </button>
      <br/><br/>
      <select id='system-select' onChange={selectSystem}>
        <option value="">Select a System</option>
        <option value="5e">D&amp;D 5th Edition</option>
        <option value="dcc">Dungeon Crawl Classics</option>
        <option value="cyberpunk red">Cyberpunk RED</option>
      </select>

      <div className="alert alert-light" role="alert">
        {message}
      </div>
    </div>
  );
};

export default FileSelector;

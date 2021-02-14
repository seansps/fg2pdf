import React, { useState, ChangeEvent } from "react";
import * as xml2js from "xml2js";

interface UploadFileProps {
  onConvertedFile: (characterData: any) => void;
}

const FileSelector = ({onConvertedFile}: UploadFileProps) => {
  const [currentFile, setCurrentFile] = useState<File | null>();
  const [message, setMessage] = useState<string | null>();

  const selectFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target.files && event.target.files.length) {
      const file = event.target.files.item(0)
      setCurrentFile(file);
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
        onConvertedFile(result);
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

      <div className="alert alert-light" role="alert">
        {message}
      </div>
    </div>
  );
};

export default FileSelector;

import React, { useState, useRef } from "react";
import { Row, Col, Label } from "reactstrap";

export const ExcelImportTool = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const fileRef = useRef();

  const acceptableFileName = ["csv"];

  const checkFileName = (name) => {
    return acceptableFileName.includes(name.split(".").pop().toLowerCase());
  };
  const handleFile = (e) => {
    const myFile = e.target.files[0];
    if (!myFile) return;
    if (!checkFileName(myFile.name)) {
      alert("Invalid File Type");
      return;
    }

    setFile(myFile);
    setFileName(myFile.name);
  };

  const handleRemove = () => {
    setFile(null);
    setFileName(null);
    fileRef.current.value = "";
  };

  return (
    <Row>
      <Col>
        <div className="mb-2">
          {fileName && <Label>FileName: {fileName}</Label>}
          {!fileName && <Label>Please Upload a File</Label>}
        </div>
        <div className="">
          <input
            type="file"
            accept=".csv"
            multiple={false}
            onChange={(e) => handleFile(e)}
            ref={fileRef}
          />
          {fileName && (
            <button className="align-middle" onClick={handleRemove}>
              X
            </button>
          )}
        </div>
      </Col>
    </Row>
  );
};

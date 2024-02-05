import React, { useState, useRef } from "react";
import { Row, Col, Label } from "reactstrap";
import Papa from "papaparse";

export const ExcelImportTool = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const fileRef = useRef();

  const acceptableFileName = ["csv"];

  const checkFileName = (name) => {
    return acceptableFileName.includes(name.split(".").pop().toLowerCase());
  };

  const [data, setData] = useState([]);
  const [columnArray, setColumn] = useState([]);
  const [values, setValues] = useState([]);

  const handleFile = (e) => {
    Papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        if (result.data) {
          const columnArray = [];
          const valuesArray = [];

          result.data.map((d) => {
            columnArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });
          setData(result.data);
          setColumn(columnArray[0]);
          setValues(valuesArray);
        } else {
          console.error("No data found in aprsed file.");
        }
      },
    });
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
    setData(null);
    setColumn(null);
    setValues(null);
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

          <br />

          {data && (
            <table
              style={{
                borderCollapse: "collapse",
                border: "1px solid black",
                margin: "5px auto",
              }}
            >
              <thead>
                <tr>
                  {columnArray.map((col, i) => (
                    <th style={{ border: "1px solid black" }} key={i}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {values.map((v, i) => (
                  <tr key={i}>
                    {v.map((value, i) => (
                      <td style={{ border: "1px solid black" }} key={i}>
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </Col>
    </Row>
  );
};

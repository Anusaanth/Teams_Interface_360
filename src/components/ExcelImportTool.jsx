import React, { useState, useRef } from "react";
import { Row, Col, Label } from "reactstrap";
import Papa from "papaparse";
import axios from "axios";
import FormData from "form-data";
import "./ExcelImportTool.css";

export const ExcelImportTool = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const fileRef = useRef();

  const acceptableFileName = ["xlsx", "csv"];

  const checkFileName = (name) => {
    return acceptableFileName.includes(name.split(".").pop().toLowerCase());
  };

  const [data, setData] = useState([]);
  const [columnArray, setColumn] = useState([]);
  const [values, setValues] = useState([]);

  const handleFile = (e) => {
    // Papa.parse(e.target.files[0], {
    //   header: true,
    //   skipEmptyLines: true,
    //   complete: function (result) {
    //     if (result.data) {
    //       const columnArray = [];
    //       const valuesArray = [];

    //       result.data.map((d) => {
    //         columnArray.push(Object.keys(d));
    //         valuesArray.push(Object.values(d));
    //       });
    //       setData(result.data);
    //       setColumn(columnArray[0]);
    //       setValues(valuesArray);
    //     } else {
    //       console.error("No data found in parsed file.");
    //     }
    //   },
    // });
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
    setBackendData(null);
  };

  const fetchData = () => {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        setBackendData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setBackendData(null);
      });
  };

  const handleUploadData = (csvData) => {
    Papa.parse(csvData, {
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
          console.error("No data found in parsed file.");
        }
      },
    });
  };

  const [backendData, setBackendData] = useState(null);
  const upload = () => {
    const dataform = new FormData();
    dataform.append("name", fileName);
    dataform.append("file", file);

    axios
      .post("http://127.0.0.1:8000/upload", dataform)
      .then((res) => {
        setBackendData(res.data);
        handleUploadData(res.data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setBackendData("Error uploading file");
      });
  };

  return (
    <Row>
      <Col>
        <div>
          <Label>Choose Predictor Model</Label>
        </div>
        <div>
          <input type="radio" name="choice" id="AB-P1"></input>
          <label className="toggle-button" for="AB-P1">
            AB Phase 1
          </label>

          <input type="radio" name="choice" id="AB-ARO"></input>
          <label className="toggle-button" for="AB-ARO">
            AB ARO
          </label>

          <input type="radio" name="choice" id="SK-P1"></input>
          <label className="toggle-button" for="SK-P1">
            SK Phase 1
          </label>

          <input type="radio" name="choice" id="SK-ARO"></input>
          <label className="toggle-button" for="SK-ARO">
            SK ARO
          </label>

          <input type="radio" name="choice" id="BC-P1"></input>
          <label className="toggle-button" for="BC-P1">
            BC Phase 1
          </label>

          <input type="radio" name="choice" id="BC-ARO"></input>
          <label className="toggle-button" for="BC-ARO">
            BC ARO
          </label>
        </div>
        <div>
          {fileName && (
            <Label className="file-info mb-2">File Name: {fileName}</Label>
          )}
          {!fileName && <Label>Please Upload a File</Label>}
        </div>

        <div>
          <input
            type="file"
            accept=".xlsx, .csv"
            multiple={false}
            onChange={(e) => handleFile(e)}
            ref={fileRef}
          />
          <div>
            {fileName && (
              <button
                className="remove-button all-button"
                onClick={handleRemove}
              >
                Remove
              </button>
            )}
          </div>

          <div>
            <button className="upload-button all-button" onClick={upload}>
              Upload Data
            </button>
          </div>

          {backendData && (
            <>
              <div>
                <button className="download-button all-button" onClick={upload}>
                  Download
                </button>
              </div>
              <table
                className="data-table"
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
            </>
          )}
        </div>
      </Col>
    </Row>
  );
};

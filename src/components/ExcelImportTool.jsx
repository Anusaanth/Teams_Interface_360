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

  const [data, setData] = useState(null);
  const [columnArray, setColumn] = useState([]);
  const [values, setValues] = useState([]);

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
    setData(null);
    setColumn(null);
    setValues(null);
    setBackendData(null);
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
  const [loading, setLoading] = useState(false);
  const upload = () => {
    setLoading(true);
    const dataform = new FormData();
    dataform.append("name", fileName);
    dataform.append("file", file);

    axios
      .post("http://127.0.0.1:8000/upload-ARO-AB", dataform)
      .then((res) => {
        setBackendData(res.data);
        handleUploadData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setBackendData("Error uploading file");
        setLoading(false);
      });
  };

  const handleDownload = () => {
    if (backendData && fileName) {
      const uploadedFileName = fileName.split(".")[0];
      const resultFileName = uploadedFileName + "_results.csv";
      const blob = new Blob([backendData], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = resultFileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.id);
    console.log(event.target.id);
  };

  return (
    <Row>
      <Col>
        <div>
          <Label>Choose Predictor Model</Label>
        </div>
        <br />

        <div>
          <div>
            <label>Data Driven Phase 1 Options</label>
            <br />
            <input
              type="radio"
              name="choice"
              id="DDP1-AB"
              checked={selectedOption === "DDP1-AB"}
              onChange={handleOptionChange}
            />
            <label className="toggle-button" htmlFor="DDP1-AB">
              DDP1-AB
            </label>
            <input
              type="radio"
              name="choice"
              id="DDP1-SK"
              checked={selectedOption === "DDP1-SK"}
              onChange={handleOptionChange}
            />
            <label className="toggle-button" htmlFor="DDP1-SK">
              DDP1-SK
            </label>
            <input
              type="radio"
              name="choice"
              id="DDP1-BC"
              checked={selectedOption === "DDP1-BC"}
              onChange={handleOptionChange}
            />
            <label className="toggle-button" htmlFor="DDP1-BC">
              DDP1-BC
            </label>
          </div>

          <br />

          <div>
            <label>ARO Options</label>
            <br />
            <input
              type="radio"
              name="choice"
              id="ARO-AB"
              checked={selectedOption === "ARO-AB"}
              onChange={handleOptionChange}
            />
            <label className="toggle-button" htmlFor="ARO-AB">
              ARO-AB
            </label>
            <input
              type="radio"
              name="choice"
              id="ARO-SK"
              checked={selectedOption === "ARO-SK"}
              onChange={handleOptionChange}
            />
            <label className="toggle-button" htmlFor="ARO-SK">
              ARO-SK
            </label>
            <input
              type="radio"
              name="choice"
              id="ARO-BC"
              checked={selectedOption === "ARO-BC"}
              onChange={handleOptionChange}
            />
            <label className="toggle-button" htmlFor="ARO-BC">
              ARO-BC
            </label>
          </div>
        </div>

        <br />

        <div>
          <input
            type="file"
            accept=".xlsx"
            multiple={false}
            onChange={(e) => handleFile(e)}
            ref={fileRef}
          />
          <div>
            {fileName && (
              <div>
                <div>
                  <button
                    className="remove-button all-button"
                    onClick={handleRemove}
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <button className="upload-button all-button" onClick={upload}>
                    Upload Data
                  </button>
                  {loading && <div>Loading...</div>}
                </div>
              </div>
            )}
          </div>

          {backendData && (
            <>
              <div>
                <button
                  className="download-button all-button"
                  onClick={handleDownload}
                >
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

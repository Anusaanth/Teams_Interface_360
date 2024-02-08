import React, { useState, useContext } from "react";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import { Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import { ExcelImportTool } from "./ExcelImportTool";
import "./Tab.css";

const showFunction = Boolean(config.apiName);

export default function Tab() {
  const { themeString } = useContext(TeamsFxContext);
  const [data, setData] = useState(null);

  const fetchData = () => {
    fetch("http://localhost:9000/testAPI")
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setData(null);
      });
  };

  return (
    <div className="container">
      <Row>
        <Col md={12}>
          <div className="header">
            <h1 className="welcome-text">Welcome</h1>
            <h3>360 Engineering & Environmental Consulting</h3>
            <p className="description">
              This website utilizes wellsite location data and licenses provided
              by the user. The inputted data undergoes processing through a
              public database, extracting specific variables. Subsequently, our
              advanced analysis, facilitated by R code, generates predictions.
              Users can conveniently access the generated predictions through a
              downloadable CSV file.
            </p>
          </div>
          <Card className="custom-card">
            <CardHeader className="card-header">
              <div>
                <h3>Generate Results</h3>
                <p>
                  The provided example serves as a default template. Ensure that
                  the file name and column names match those of the file you
                  upload.
                </p>
                Download Default Template:&nbsp;
                <a
                  href={"lic.xlsx"}
                  download="lic.xlsx"
                  className="download-link"
                  style={{ color: "darkblue", textDecoration: "underline" }}
                >
                  <span>lic.xlsx</span>
                </a>
              </div>
            </CardHeader>
            <CardBody className="card-body">
              <ExcelImportTool />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

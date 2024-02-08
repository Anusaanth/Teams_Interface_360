import React, { useState, useContext } from "react";
import { Welcome } from "./sample/Welcome";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import { Input, Card, CardHeader, CardBody, Row, Col, Table } from "reactstrap";
import { ExcelImportTool } from "./ExcelImportTool";
import { Image } from "@fluentui/react-components";

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
    <>
      <div className="content">
        <Row>
          <Col md={12}>
            <Image src="360.jpg" width={200} height={150} />
            <Card>
              <br />
              <CardHeader>
                <div>
                  Download default template:&nbsp;
                  <a href={"lic.xlsx"} download="lic.xlsx">
                    <span
                      style={{
                        textDecoration: "underline",
                        color: "blue",
                        cursor: "pointer",
                      }}
                    >
                      lic.xlsx
                    </span>
                  </a>
                </div>
                <h5 className="title">Read Excel Sheets </h5>
                <p className="category"></p>
              </CardHeader>
              <CardBody className="all-icons">
                <ExcelImportTool />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

{
  /* <div
      className={
        themeString === "default"
          ? "light"
          : themeString === "dark"
          ? "dark"
          : "contrast"
      }
    >
      <Welcome showFunction={showFunction} />
      <h1>Hello World</h1>
    </div> */
}

import { useContext } from "react";
import { Welcome } from "./sample/Welcome";
import { TeamsFxContext } from "./Context";
import config from "./sample/lib/config";
import { Input, Card, CardHeader, CardBody, Row, Col, Table } from "reactstrap";
import { ExcelImportTool } from "./ExcelImportTool";

const showFunction = Boolean(config.apiName);

export default function Tab() {
  const { themeString } = useContext(TeamsFxContext);
  return (
    <>
      <div className="content">
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader>
                <h5 className="title">Download This Template </h5>
                <h5 className="title">Read Excel Sheets </h5>
                <p className="category"></p>
              </CardHeader>
              <CardBody className="all-icons">
                <ExcelImportTool />
                <Welcome showFunction={showFunction} />
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

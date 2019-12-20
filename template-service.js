// An ugly mock pdf template service. Simulates retrieving a
// template from a database by reading a text file from the
// file system
import fs from "fs";

const template = fs.readFileSync("./templates/test-template.txt", "utf-8");

export const generateDocument = dynamicContent => {
  const parseDynamicProps = props =>
    JSON.stringify(props)
      .slice(2)
      .split('":')
      .join("={")
      .split(',"')
      .join("} ");

  return template.replace(
    "%DYNAMIC_CONTENT_PROPS%",
    parseDynamicProps(dynamicContent)
  );
};

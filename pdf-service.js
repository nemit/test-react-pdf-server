// A super simple PDF generator service. Generates a dummy
// PDF file and returns it as a stream
import ReactPDF from "@react-pdf/renderer";
import transpile from "./transpile";
import { generateDocument } from "./template-service";

const testError = async () => {
  throw new Error("sasdasd");
};

export const generatePDF = async () =>
  new Promise((resolve, reject) => {
    transpile(
      generateDocument({
        dynamicNumber: 321,
        dynamicText: "some text"
      }),
      async element => resolve(await ReactPDF.renderToStream(element)),
      error => reject(error)
    );
  });

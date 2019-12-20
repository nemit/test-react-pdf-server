import http from "http";
import { generatePDF } from "./pdf-service";

http
  .createServer(function(req, res) {
    generatePDF()
      .then(stream => {
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=test.pdf");

        stream.pipe(res);
        console.log("PDF generated and sent!");
      })
      .catch(generationError => {
        console.error("An Error Occurred", generationError);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.write("ERROR");
        res.end();
      });
  })
  .listen(4000, err => {
    if (err) {
      return console.log("Failed to start server", err);
    }

    console.log(`Server is listening on 4000`);
  });

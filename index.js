// server.js
const http = require("http");
const fs = require("fs");
const path = require("path");
const logger = require("./logger");

const server = http.createServer((req, res) => {
  logger.emit("request", req.url);

  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url,
  );

  const extname = path.extname(filePath);
  let contentType = "text/html";

  switch (extname) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      logger.emit("notFound", filePath);
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Not Found</h1>");
      return;
    }

    fs.readFile(filePath, (err, content) => {
      if (err) {
        logger.emit("error", err, filePath);
        res.writeHead(500);
        res.end("Server Error");
        return;
      }

      logger.emit("fileServed", filePath);
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    });
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

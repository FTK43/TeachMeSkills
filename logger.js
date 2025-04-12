// logger.js
const EventEmitter = require("events");
const fs = require("fs");
const path = require("path");

class Logger extends EventEmitter {
  constructor() {
    super();
    this.logFile = path.join(__dirname, "server.log");

    this.on("request", (url) => this.log(`[request] ${url}`));
    this.on("fileServed", (filePath) => this.log(`[fileServed] ${filePath}`));
    this.on("notFound", (filePath) => this.log(`[notFound] ${filePath}`));
    this.on("error", (err, filePath) =>
      this.log(`[error] ${filePath || ""} - ${err.message}`),
    );
  }

  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}\n`;

    fs.appendFile(this.logFile, logMessage, (err) => {
      if (err) console.error("Failed to write log:", err);
    });

    // Также выводим логи в консоль для удобства
    console.log(logMessage.trim());
  }
}

module.exports = new Logger();

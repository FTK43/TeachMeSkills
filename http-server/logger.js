const EventEmitter = require('events');
const fs = require('fs').promises;

class Logger extends EventEmitter {
    constructor(filePath) {
        super();
        this.filePath = filePath;
        this.on('request', async () => {
            await this.log('request', this.filePath);
        });
        this.on('fileServed', async () => {
            await this.log('fileServed', this.filePath);
        });
        this.on('notFound', async () => {
            await this.log('notFound', this.filePath);
        });
        this.on('error', async () => {
            await this.log('error', this.filePath);
        });
    }

    log = async (eventName) => {
        const logResult = `[${new Date().toISOString()}] [${eventName}] ${this.filePath}\n`;
        await fs.appendFile('server.log', logResult, { encoding: 'utf8' });
    }
}

module.exports = {Logger};

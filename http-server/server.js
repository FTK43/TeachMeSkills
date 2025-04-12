const fs = require('fs').promises;
const http = require('http');
const path = require('path');
const {Logger} = require('./logger.js')

const server = http.createServer(async (req, res) => {
    const logger = new Logger(req.url);
    logger.emit('request', req.url);
    try {
        const filePath = path.join(__dirname, 'public', req.url)
        const file = await fs.readFile(filePath);

        if(!file) {
            logger.emit('notFound', req.url);
            res.writeHead(404, {'content-type': 'text/plain'});
            return res.end('file not found')
        }

        const extname = path.extname(filePath).toLowerCase();
        let contentType;
        switch (extname) {
            case '.html':
                contentType = 'text/html';
                break;
            case '.css':
                contentType = 'text/css';
                break;
            case '.jpg':
                contentType = 'text/jpeg';
                break;
            default:
                contentType = 'text/plain';
        }

        res.writeHead(200, {'content-type': contentType});
        res.end(file);
        logger.emit('fileServed', req.url);
    } catch (e) {
        res.writeHead(500, {'content-type': 'text/plain'})
        res.end('Error');
        logger.emit('error', req.url);
    }
});

server.listen(3000, () => {
    console.log('Server started on port 3000');
});

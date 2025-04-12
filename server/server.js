const { addNote, deleteNode, updateNote, getNotes } = require("./noteManager");

const http = require("http");
const url = require("url");
// GET
// POST
// DELETE
// PUT

const PORT = 3000;

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;
  const path = parsedUrl.pathname;

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (method === "GET" && path === "/notes") {
    const notes = getNotes();
    res.writeHead(200, { "content-type": "application/json" });

    let limit = parseInt(parsedUrl.query?.limit, 10);
    let page = parseInt(parsedUrl.query?.page, 10);

    if (isNaN(limit) || limit <= 0) {
      limit = notes.length; // или можно установить дефолтное значение, например 10
    }

    if (isNaN(page) || page < 1) {
      page = 1;
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const data = notes.slice(start, end);

    res.end(
      JSON.stringify({
        page: Number(page),
        limit: Number(limit),
        total: notes.length,
        totalPages: Math.ceil(notes.length / limit),
        data,
      }),
    );
  } else if (method === "POST" && path === "/notes") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const { title } = JSON.parse(body);
        if (!title) {
          throw new Error("title is required");
        }
        const newNote = addNote(title);
        res.writeHead(201, { "content-type": "application/json" });
        res.end(JSON.stringify(newNote));
      } catch (err) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else if (method === "DELETE" && path.startsWith("/notes/")) {
    // localhost:3000/notes/43
    const id = parseInt(path.split("/")[2], 10);

    if (isNaN(id)) {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid ID" }));
    }
    const success = deleteNode(id);

    if (success) {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ message: `note with id ${id} - deleted` }));
    } else {
      res.writeHead(404, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "Note Not Found" }));
    }
  } else if (method === "PUT" && path.startsWith("/notes/")) {
    const id = parseInt(path.split("/")[2], 10);
    if (isNaN(id)) {
      res.writeHead(400, { "content-type": "application/json" });
      res.end(JSON.stringify({ error: "Invalid ID" }));
    }

    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const { title } = JSON.parse(body);
        if (!title) {
          throw new Error("Title is required");
        }
        const updatedNote = updateNote(id, title);

        if (updatedNote) {
          res.writeHead(200, { "content-type": "application/json" });
          res.end(JSON.stringify(updatedNote));
        } else {
          res.writeHead(404, { "content-type": "application/json" });
          res.end(JSON.stringify({ error: "Note Not Found" }));
        }
      } catch (err) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else {
    res.writeHead(404, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Method Not Found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

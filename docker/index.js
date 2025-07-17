const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const PORT = process.env.PORT || 3000;
const MESSAGE = process.env.MESSAGE || 'WE ARE NOT USING .ENV';
const LOG_PATH = process.env.LOG_PATH || '/app/logs';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: 5432,
  user:  process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: 'testdb',
});

app.get('/', async(req, res) => {
  const now = await pool.query('SELECT NOW()');
  res.send(`DATABASE TIME ${now.rows[0].now}`);
});

app.get('/log', (req, res) => {
  const timestamp = new Date().toISOString();
  const message = `${timestamp} new log\n`;

  fs.appendFileSync(path.join(LOG_PATH, 'test.log'), message);
  res.send('New log added');
})

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})
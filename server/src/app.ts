import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

const app = express();
const LISTENING_PORT = process.env.PORT || 7777;

import fs from 'fs';
import path from 'path';

app.get("/ls", (req, res) => {
  fs.readdir("./note", (err, files) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      res.status(200).json({ files });
    }
  });
});

app.get("/note/:title", (req, res) => {
  fs.readFile(`./note/${req.params.title}/index.md`, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json();
    } else {
      res.status(200).json({ data });
    }
  });
});

app.get("/note/:title/image/:filename", (req, res) => {
  const { title, filename } = req.params;
  if (fs.existsSync(`./note/${title}/image/${filename}`)) {
    res.status(200).sendFile(path.join(__dirname, `../note/${title}/image/${filename}`));
  } else {
    res.status(404).json();
  }
});

app.get("*", (req, res) => {
  res.status(404).json();
});

app.listen(LISTENING_PORT, () => {
  console.log(`Server started (:${LISTENING_PORT})`);
});

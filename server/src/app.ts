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
      const { size, ctime, mtime, birthtime } = fs.statSync(`./note/${req.params.title}/index.md`)
      res.status(200).json({
        data,
        meta: {
          size,
          ctime,
          mtime,
          birthtime
        }
      });
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

if (process.env.NODE_ENV === "production") {
  console.log("Serving client files");

  app.use(express.static(path.join(__dirname, "../../build")));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, "../../build/index.html"));
  });
} else {
  // return 404 for any other requests if nonproduction
  app.get("*", (req, res) => {
    res.status(404).json();
  });
}

app.listen(LISTENING_PORT, () => {
  console.log(`Server started (:${LISTENING_PORT})`);
});

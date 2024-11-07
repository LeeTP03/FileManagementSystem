import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import posts from "./routes/posts.mjs";
import "./loadEnvironment.mjs";
import fs from "fs";
import path from "path";
const app = express()
const port = 3000
import multer from "multer";
import db from "./db/conn.mjs";

app.use(cors());
app.use(express.json());

app.use("/posts", posts);

const curr_path = import.meta.url.replace("file:///", "").split("/").slice(0, -1).join("/");
console.log(curr_path);
const filepath = path.join("C:/\Users/\lyfes/\Documents/\Coding/\MD Intern/\server", "uploads");

app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
     cb(null, 'uploads/'); // Specify the directory to store files
  },
  filename: (req, file, cb) => {
     cb(null, Date.now() + '-' + file.originalname); // Create a unique file name
  }
});

const upload = multer({ storage: storage });

app.get('/files', async (req, res) => {
    const files = await db.collection("files").find({}).toArray();
    res.json(files);
  });

app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully');

  const filedata = {
    name: req.file.filename,
    path: `${curr_path}/uploads/${req.file.filename}`,
    date_uploaded: new Date(),
  };

  db.collection("files").insertOne(filedata);
});

app.post('/create', (req, res) => {
  const { filename, content } = req.body;
  
  if (!filename || !content) {
      return res.status(400).json({ 
          error: 'Please provide both filename and content in the request body' 
      });
  }

  const filePath = path.join(filepath, filename);

  fs.writeFile(filePath, content, {flag: 'w'}, (err) => {
      if (err) {
          console.error('Error creating file:', err);
          return res.status(500).json({ 
              error: 'Failed to create file' 
          });
      }
      
      res.json({ 
          message: 'File created successfully',
          path: filePath 
      });
  });

  const filedata = {
    name: filename,
    path: filePath,
    date_uploaded: new Date(),
  };

  db.collection("files").insertOne(filedata);
});

app.delete('/delete-file', (req, res) => {
  const { filename } = req.body; // Get the filename from the request body
  
  if (!filename) {
    return res.status(400).json({ error: 'Filename is required' });
  }

  const filelocation = path.join(filepath, filename);

  // Check if the file exists
  fs.access(filelocation, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Delete the file
    fs.unlink(filelocation, (err) => {
      if (err) {
        console.error('Error deleting file:', err);
        return res.status(500).json({ error: 'Could not delete file' });
      }
      res.json({ message: 'File deleted successfully' });
    });
  });

  db.collection("files").deleteOne({ name: filename });
});

app.get('/readfile', (req, res) => {
  const { filename } = req.query;
  const filelocation = path.join(filepath, filename);
  fs.readFile(filelocation, 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          res.status(500).send('Error reading file');
      } else {
          res.send(data);
      }
  });
});

app.post('/update', (req, res) => {
  const { filename, content } = req.body;
  const filelocation = path.join(filepath, filename);
  fs.writeFile(filelocation, content, {flag: 'w'}, (err) => {
      if (err) {
          console.error('Error updating file:', err);
          return res.status(500).json({ error: 'Failed to update file' });
      }
      res.json({ message: 'File updated successfully' });
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
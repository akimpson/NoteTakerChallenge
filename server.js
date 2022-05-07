// Dependencies
const util = require ("util");
const path = require("path"); 
const fs = require("fs");
const express = require("express");
//const { parse } = require("path");

//const notes = require("./db/bd.json");

const readFileData = util.promisify(fs.readFile);
const writeFileData = util.promisify(fs.writeFile);
//const uuid = require ("uuid");
//const {DH_CHECK_P_NOT_SAFE_PRIME } = require("constants");

// Set up the server
const app = express();
const PORT = process.env.PORT || 2002;

// Middleware that allows access to the public folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("/db/db.json"))

// Setting routes for APIs
// This gets the notes/saved and adds it in db.json | "GET" request
app.get("/api/notes", function(req, res) {
    readFileData("/db/db.json", "utf8").then(function(data) {
        notes = [].concat(JSON.parse(data))
        res.json(notes);    
    })
});

// Add new notes to db.json with the "POST" function
app.post("/api/notes", function(req, res) {
    const note = {"title": "test", "text": "test"};
    readFileData("/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes) {
      writeFileData("/db/db.json", JSON.stringify(notes))
      res.json(note);  
    })
});



// Remove unwanted notes | "DELETE" request
app.delete("/api/notes/:id", function(req, res) {
    const idToDelete = parseInt(req.params.id);
    readFileData("/db/db.json", "utf8").then(function(data) {
        const notes = [].concat(JSON.parse(data));
        const newNotesData = []
        for (let i = 0; i<notes.length; i++) {
            if(idToDelete !== notes[i].id) {
                newNotesData.push(notes[i])
            }
        }
        return newNotesData
    }).then(function(notes) {
        writeFileData("/db/db.json", JSON.stringify(notes))
        res.send('saved success!!!');
    })
})


// HTML Routes
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// Listening function
app.listen(PORT, function() {
    console.log("Server is listening on PORT " + PORT);
});
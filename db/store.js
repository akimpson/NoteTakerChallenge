const util = require ("util");
const fs = require ("fs");
const uuid = require ("uuid");


const readFileData = util.promisify(fs.readFile);
const writeFileData = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileData ("db/db.json", "utf8");

    }
     
    write(note) {
        return writeFileData ("db/db.json", JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            let jsonNotes;
            try {
                jsonNotes = [].concat(JSON.parse(notes));
            }
            catch(err) {
                jsonNotes = [];
            }
            return jsonNotes;
        });
    }
    addNote(note) {}
    removeNote(id) {}
}
module.exports = new Store();




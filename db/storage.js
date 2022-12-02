const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const { parse } = require('path');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('db/db.json', 'utf-8');
    }

    write() {
        return writeFileAsync('db/db.json', JSON.stringify(note));
    }
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        })
    }
    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error("Your note title and text cannot be blank");
        }
        const newNote = { 
            title,
            text,
            id: uuidv4(),
        }

        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => this.write(updatedNotes))
            .then(() => newNote)
    }
}

module.exports = new Store();
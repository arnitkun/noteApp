// console.log(module);
const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-Data.json');
        return JSON.parse(notesString);
        } catch (e) {
            return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = function(title, body){
    var notes = fetchNotes();
    var note = {
        title:  title,
        body: body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    } 
}

var getAll = function() {
    //console.log('Getting all notes..');
    return fetchNotes();
}

var removeNote = function(title) {
    var notes = fetchNotes();
    var newNotes = notes.filter((note) => note.title !== title);
    saveNotes(newNotes);
    return (notes.length !== newNotes.length);
}

var getNote = function(title){
    //console.log('reading note');
    var notes = fetchNotes();
    var notesFound = notes.filter((note) => note.title === title); // this seems like a kind of hack to filter out a single note
    if(notesFound.length > 0){
        return notesFound[0];
    }
}

var logNote = (note) => {
    debugger;
    console.log('Note found!');
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}
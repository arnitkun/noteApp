var fs = require('fs');
var os = require('os');
var _ = require('lodash');
var yargs = require('yargs'); 

var notes = require('./notes.js');

var argv = yargs.argv;
var user = os.userInfo();
var command = argv._[0];

//console.log(argv);
if(command === 'add'){
   var note = notes.addNote(argv.title, argv.body);
    
   if(note){
       notes.logNote(note);
   } else {
       console.log('Note title already exists');
   }
} else if (command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes.`);
    allNotes.forEach((note) => { 
        notes.logNote(note);
    });
} else if (command === 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    console.log(noteRemoved ? 'Note removed.' : 'Note not removed.');
} else  if (command === 'read') {
    var note = notes.getNote(argv.title);
    if(note) {
        notes.logNote(note);
    } else {
        console.log('No such Note!');
    }

} else { 
    console.log('command not recognized');
}
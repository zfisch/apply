var Promise = require('bluebird');
var db = require('../db');
var Note = require('../note/noteModel');

module.exports = {

  createNote: function(note, applicationId) {
    return new Promise(function(resolve, reject){
      new Note({
        "applicationId": applicationId,
        "note": note
      })
      .save()
      .catch(function(err){
        reject({ "Error saving new note": err, status: 500 });
      })
      .then(function(newNote){
        resolve(newNote);
      });
    });
  },

}
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppAPI = require('../utils/appAPI.js');
var AppConstants = require('../constants/AppConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var CHANGE_EVENT = 'change';
var _notes = [];

var AppStore = assign({}, EventEmitter.prototype, {
  addNote: function (note) {
    console.log('add note',note);
    _notes.push(note);
  },
  getNotes: function () {
    return _notes;
  },
  setNotes: function (notes) {
    console.log('set note',notes);
    _notes = notes;
  },
  removeNote: function (noteId) {
    var index = _notes.findIndex(x => x._id.$oid === noteId);
    _notes = _notes.filter(x => x._id.$oid !== noteId );
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function (callback) {
    this.on('change', callback);
  },
  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  }
});


AppDispatcher.register(function (payload) {
  var action = payload.action;

  switch(action.actionType) {
    case AppConstants.ADD_NOTE:
      // Store save
      AppStore.addNote(action.note);
      //API save
      AppAPI.addNote(action.note);
      // Emit change
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.RECEIVE_NOTES:
      console.log('RECEIVE_NOTES');
      AppStore.setNotes(action.notes);
      AppStore.emit(CHANGE_EVENT);
      break;

    case AppConstants.REMOVE_NOTE:
      console.log('REMOVE_NOTE');
      AppStore.removeNote(action.noteId);
      AppAPI.removeNote(action.noteId);
      AppStore.emit(CHANGE_EVENT);
      break;
  }
  return true;
});

module.exports = AppStore;

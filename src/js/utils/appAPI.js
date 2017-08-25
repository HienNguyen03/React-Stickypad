var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');

module.exports = {
    addNote: function (note) {
      $.ajax({
        url: 'https://api.mlab.com/api/1/databases/stickypad/collections/notes?apiKey=xGzV7Tr08X5hZrME-21uibzvQiuBTrQi',
        data: JSON.stringify(note),
        type: 'POST',
        contentType: 'application/json'
      });
    },

    getNotes: function () {
      console.log('GET api');
      $.ajax({
        url: 'https://api.mlab.com/api/1/databases/stickypad/collections/notes?apiKey=xGzV7Tr08X5hZrME-21uibzvQiuBTrQi',
        data: 'json',
        cache: false,
        success: function (data) {
          console.log('get data', data);
          AppActions.receiveNotes(data);
        }.bind(this),
        error: function (xhr, status, err) {
          console.log(err);
        }.bind(this)
      });
    },

    removeNote: function (noteId) {
      $.ajax({
        url: 'https://api.mlab.com/api/1/databases/stickypad/collections/notes/' + noteId + '?apiKey=xGzV7Tr08X5hZrME-21uibzvQiuBTrQi',
        type: 'DELETE',
        async: true,
        timeout: 300000,
        success: function (data) {
          console.log('Note deleted ...');
        }.bind(this),
        error: function (xhr, status, err) {
          console.log(err);
        }
      });
    }
}

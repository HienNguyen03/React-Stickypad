var React = require('react');

var AppActions = require('../actions/AppActions');
var AppStore = require('../stores/AppStore');
var AppAPI = require('../utils/AppAPI');

var AddNodeForm = require('./AddNodeForm.js');
var NoteList = require('./NoteList.js');

function getAppState () {
  return {
    notes: AppStore.getNotes()
  };
}

var App = React.createClass({
  getInitialState: function () {
    return getAppState();
  },
  // componentWillMount: function () {
  //     AppAPI.getNotes();
  // },

  componentDidMount: function () {
    AppStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    AppStore.removeChangeListener(this._onChange);
  },

  render: function () {
    console.log('app state',this.state.notes);
    return (
      <div>
        <div className="off-canvas-wrapper">
          <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
            <div className="off-canvas position-left reveal-for-large" data-off-canvas data-position="left">
              <div className="row column">
                <br />
                <AddNodeForm />
              </div>
            </div>
            <div className="off-canvas-content" data-off-canvas-content>
              <NoteList notes={this.state.notes}/>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _onChange: function () {
    this.setState(getAppState());
  }
});

module.exports = App;

import React from 'react';
import StatusFilter from './status-filter.js';
import StreamContainer from './components/streamer-container';
import Twitch from './../twitch';
import TwitchUser from './../twitch-user';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleStatusFilterChanged = this.handleStatusFilterChanged.bind(
      this
    );

    this.state = {
      statusFilter: StatusFilter.ALL,
      twitchUsers: Twitch.getTwitchUsers()
    };

    Twitch.updateTwitchUsers(() => {
      this.setState({
        twitchUsers: this.state.twitchUsers
      });
    });
  }

  handleStatusFilterChanged(filter) {
    this.setState({
      statusFilter: filter,
    });
  }

  render() {
    return (
      <StreamContainer
        statusFilter={this.state.statusFilter}
        twitchUsers={this.state.twitchUsers}
        onStatusFilterChangedCallback={this.handleStatusFilterChanged}
      />
    );
  }
}

module.exports = App;

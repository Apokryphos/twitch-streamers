import React from 'react';
import StatusFilter from './../../status-filter.js';
import StatusFilterDropdown from './../status-filter-dropdown';
import Streamer from './../streamer';

class StreamerContainer extends React.Component {
  render() {
    const items = this.props.twitchUsers.map(twitchUser => {
      let visible = false;
      if (this.props.statusFilter === StatusFilter.ALL) {
        visible = true;
      } else if (this.props.statusFilter === StatusFilter.ONLINE && twitchUser.isStreaming) {
        visible = true;
      } else if (this.props.statusFilter === StatusFilter.OFFLINE && !twitchUser.isStreaming) {
        visible = true;
      }

      return (
        visible && (
          <Streamer
            key={twitchUser.userName}
            userName={twitchUser.userName}
            description={twitchUser.description}
            displayName={twitchUser.displayName}
            game={twitchUser.game}
            isStreaming={twitchUser.isStreaming}
            logo={twitchUser.logo}
            status={twitchUser.status}
            userExists={twitchUser.exists}
          />
        )
      );
    });

    return (
      <div>
        <h1>Twitch Streamers</h1>
        <StatusFilterDropdown onChangedCallback={this.props.onStatusFilterChangedCallback}/>
        {items}
      </div>
    );
  }
}

module.exports = StreamerContainer;

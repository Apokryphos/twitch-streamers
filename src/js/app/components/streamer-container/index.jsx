import React from 'react';
import StatusFilter from './../status-filter';
import Streamer from './../streamer';

class StreamerContainer extends React.Component {
  render() {
    const items = this.props.twitchUsers.map(twitchUser => {
      let visible = true;
      // if (this.state.filter === 'all') {
      //   visible = true;
      // } else if (this.state.filter === 'online' && twitchUser.isStreaming) {
      //   visible = true;
      // } else if (this.state.filter === 'offline' && !twitchUser.isStreaming) {
      //   visible = true;
      // }

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
        <StatusFilter />
        {items}
      </div>
    );
  }
}

module.exports = StreamerContainer;

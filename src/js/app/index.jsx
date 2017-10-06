import React from 'react';
import StreamContainer from './components/streamer-container';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log('RENDER');
    return <StreamContainer twitchUsers={this.props.twitchUsers} />;
  }
}

module.exports = App;

import React from 'react';
import classNames from 'classnames';

class Streamer extends React.Component {
  render() {
    const divClass = classNames({
      Streamer: true,
      // 'twitch-user-status': true,
      online: this.props.isStreaming,
      offline: !this.props.isStreaming
    });

    const streamStatus = this.props.userExists
      ? `${this.props.displayName} is ${this.props.isStreaming
          ? `streaming ${this.props.game}`
          : 'not streaming'}.`
      : `${this.props.userName} closed their account or does not exist.`;

    const url = `https://www.twitch.tv/${this.props.userName}`;

    const logoElement = this.props.userExists ? (
      <img src={this.props.logo} alt="User Logo" />
    ) : null;

    let gameElement = null;
    if (this.props.isStreaming) {
      const gameLink = `https://www.twitch.tv/directory/game/${this.props
        .game}`;
      gameElement = (
        <span>
          Streaming{' '}
          <a className="gameLink" href={gameLink}>
            {this.props.game}
          </a>.
        </span>
      );
    } else if (this.props.userExists) {
      gameElement = <span>{this.props.displayName} is not streaming.</span>;
    } else {
      gameElement = (
        <span>
          {this.props.userName} closed their account or does not exist.
        </span>
      );
    }

    return (
      <a href={url} className={divClass} title={streamStatus}>
        <div className="Streamer-image-container">
          <div className="Streamer-image-slot">{logoElement}</div>
        </div>
        <div className="Streamer-text-line-container">
          <div className="Streamer-text-line">
            <h2 title={streamStatus}>
              {this.props.displayName}
            </h2>
          </div>
          <div className="Streamer-text-line">{gameElement}</div>
        </div>
      </a>
    );
  }
}

module.exports = Streamer;

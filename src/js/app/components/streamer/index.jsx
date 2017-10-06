import React from 'react';

class Streamer extends React.Component {
  render() {
    return (
      <span className="Streamer">
        <div className="Streamer-image-container">
          <div className="Streamer-image-slot">
            <img src="https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png" />
          </div>
        </div>
        <div className="Streamer-text-line-container">
          <div className="Streamer-text-line">
            <h2 className="online">{this.props.userName}</h2>
          </div>
          <div className="Streamer-text-line">
            <span>{this.props.userName}</span>
          </div>
        </div>
      </span>
    );
  }
}

module.exports = Streamer;

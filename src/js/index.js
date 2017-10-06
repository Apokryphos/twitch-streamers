import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import TwitchUser from './twitch-user';

const twitchUsers = [
  new TwitchUser('TEST001'),
  new TwitchUser('TEST002'),
  new TwitchUser('TEST003'),
  new TwitchUser('TEST004'),
  new TwitchUser('TEST005'),
];

ReactDOM.render(
  <App twitchUsers={twitchUsers}/>,
  document.getElementById('app')
);

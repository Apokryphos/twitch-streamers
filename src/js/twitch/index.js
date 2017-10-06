import TwitchUser from './../twitch-user';

module.exports = (function() {
  //  Public ID; this isn't the app secret ID
  const twitchClientId = 'b92z9quayp21wsisx9o9oe1vf5w8og';

  const channels = [
    'freecodecamp',
    'adfoxhuang',
    'anis13000',
    'dplanet36',
    'squillakilla',
    'mrboredgaming',
    'heyzeusherestoast',
    'amoh_',
    'brunofin',
    'comster404'
  ];

  const twitchUsers = [];

  // function getTwitchUserByUserId(userId) {
  //   return twitchUsers.find(twitchUser => twitchUser.id === userId);
  // }
  //
  // function getTwitchUserByUserName(userName) {
  //   return twitchUsers.find(twitchUser => twitchUser.userName === userName);
  // }

  function getTwitchUsers() {
    return twitchUsers;
  }

  function initTwitchUsers() {
    channels.forEach(channel => twitchUsers.push(new TwitchUser(channel)));
  }

  function updateStreams(callback) {
    const httpHeaders = {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': twitchClientId
    };

    const headers = new Headers(httpHeaders);

    const fetchInit = {
      cache: 'no-cache',
      method: 'GET',
      headers
    };

    //  Use channel IDs instead of channel names
    const channelIds = [];
    twitchUsers.forEach(twitchUser => {
      //  Don't add IDs for non-existant users
      if (twitchUser.id) {
        channelIds.push(twitchUser.id);
      }
    });

    const endpoint = `https://api.twitch.tv/kraken/streams/?channel=${channelIds}`;

    const result = fetch(endpoint, fetchInit);

    result
      .then(response => {
        // console.log('response', response);
        return response.json();
      })
      .then(json => {
        // console.log('got streams JSON', json);
        // console.log('got streams JSON', json.streams);

        if (Object.prototype.hasOwnProperty.call(json, 'streams')) {
          twitchUsers.forEach(twitchUser => {
            const streamJson = json.streams.find(
              item =>
                //  Stream channel ID is a number not a string
                item.channel._id.toString() === twitchUser.id
            );
            twitchUser.updateStream(streamJson);
          });
        }
      })
      .catch(ex => {
        console.log('failed', ex);
      })
      .then(() => {
        if (callback) {
          callback();
        }
      });
  }

  function updateTwitchUsers(callback) {
    const userIds = channels.join(',');

    const httpHeaders = {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': twitchClientId
    };

    const myHeaders = new Headers(httpHeaders);

    const myInit = {
      cache: 'no-cache',
      method: 'GET',
      headers: myHeaders
    };

    const endpoint = `https://api.twitch.tv/kraken/users/?login=${userIds}`;

    const result = fetch(endpoint, myInit);

    result
      .then(response => response.json())
      .then(json => {
        // console.log('got json', json.users);

        if (Object.prototype.hasOwnProperty.call(json, 'users')) {
          twitchUsers.forEach(twitchUser => {
            const userJson = json.users.find(
              item => item.name === twitchUser.userName
            );
            twitchUser.update(userJson);
          });
        }
      })
      .catch(ex => {
        console.log('failed', ex);
      })
      .then(() => {
        updateStreams(callback);
      });
  }

  initTwitchUsers();

  return {
    getTwitchUsers,
    updateTwitchUsers
  };
})();

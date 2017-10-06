class TwitchUser {
  constructor(userName) {
    this.userName = userName;
    this.description = '';
    this.displayName = userName;
    this.exists = true;
    this.game = null;
    this.id = null;
    this.isStreaming = false;
    this.logo = null;
    this.status = null;
  }

  update(json) {
    if (json) {
      this.exists = true;
      this.userName = json.name;
      this.displayName = json.display_name;
      this.description = json.bio;
      this.id = json._id;
      this.logo = json.logo;
    } else {
      this.id = null;
      this.description = 'This user is inactive.';
      this.exists = false;
      this.isStreaming = false;
    }
  }

  updateStream(streamJson) {
    if (streamJson) {
      this.isStreaming = true;
      this.game = streamJson.game;
      this.status = streamJson.channel.status;
    } else {
      this.isStreaming = false;
      this.game = null;
      this.status = null;
    }
  }
}

module.exports = TwitchUser;

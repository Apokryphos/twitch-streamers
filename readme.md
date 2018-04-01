
# Twitch Streamers

React app that shows the status of [Twitch](https://go.twitch.tv/) users.

![screenshot](/screenshot.jpg?raw=true)

## Notes

Twitch users can host another user's channel on their own channel page. Host
channels do not show as streams when streams are queried from the Twitch API.
The Twitch API version used did not support querying Hosts.

User/Channel IDs are returned as strings when getting users but as numbers when
getting streams.

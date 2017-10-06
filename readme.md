
# Twitch Streamers

React app that shows the status of [Twitch](https://go.twitch.tv/) users.

Rewrite of an app I wrote that drops Materialize and has better support for smaller screen sizes.

## Notes

Twitch users can host another user's channel on their own channel page. Host
channels do not show as streams when streams are queried from the Twitch API.
The Twitch API does not currently support querying Hosts.

User/Channel IDs are returned as strings when getting users but as numbers when
getting streams.

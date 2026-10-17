# Design note: Spotify Web API fallback

Status: planned, not built.

## Goal

Let the skill work without the Spotify connector, and remove two connector limits: reading the tracks inside a playlist, and placing exact tracks.

## Shape

TypeScript scripts in `scripts/` that the skill calls through Bash in Claude Code. claude.ai cannot run local scripts, so it keeps using the connector.

| Script | Does |
| --- | --- |
| `auth` | Authorization Code with PKCE, stores a refresh token in the user's config directory, never in the repo |
| `playlists` | Lists the user's playlists and reads their tracks |
| `search` | Searches tracks and artists |
| `create` | Creates a playlist and adds an exact list of track URIs |

The flow stays the same. The difference is in step 5: instead of one description, the skill picks the tracks itself from the judge round, the anchors' top tracks and the seed playlists' contents, and adds them in order.

## Endpoints

Only endpoints that are not deprecated. Spotify deprecated audio features, recommendations and related artists for new apps in November 2024, so the design avoids them. Check every endpoint against the current [Web API reference](https://developer.spotify.com/documentation/web-api) before building; Spotify has renamed and restricted endpoints before.

- Current user's playlists and their items
- Search
- Current user's top artists and tracks
- Saved tracks
- Create playlist and add items to playlist

## Open questions

- Spotify apps in development mode only work for users on the app's allow-list. Each user may need to register their own app and client ID.
- Without recommendations or related artists, discovery depends on search ("artists similar to X" does not exist in the Web API). Discovery playlists may stay connector-only.

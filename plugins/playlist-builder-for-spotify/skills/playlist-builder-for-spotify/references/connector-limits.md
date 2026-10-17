# Spotify connector limits

What the Spotify connector in Claude can and cannot do, found by prototyping this skill on claude.ai in October 2026. The connector exposes five tools: `search`, `generate_playlist`, `get_currently_playing`, `save_to_library` and `remove_from_library`. Each limit below shaped one round of the flow.

## 1. One description builds the whole playlist

`generate_playlist` takes a single text description and returns a finished, private playlist. There is no parameter for exact tracks, no way to pin a track, and no way to edit the result afterwards.

**Workaround:** the whole flow exists to write a better description. The interview gives mood and length, the judge round gives concrete tracks to name, and the seeds give playlists to name. See [`prompt-templates.md`](prompt-templates.md).

## 2. Vibe searches return playlists, not tracks

A query like "chill songs like Radiohead" returns only AI-generated playlists: no tracks, no artists. Those are useless for a judge round, because the user cannot judge a playlist by its title.

**Workaround:** search plain artist names ("Radiohead") to get that artist's real tracks, and "artists similar to Radiohead" to get real artists. Run one search per anchor, in parallel.

## 3. Playlists can be listed, not read

Searching "my playlists" returns the user's playlists with name and description. The connector cannot return the tracks inside them.

**Workaround:** name the playlists in the description ("based on my playlists Late nights, Rainy days"). The generator can see them even though Claude cannot.

## 4. Library status is visible

Search results carry `library_status`. `SAVED` means the user already saved the track or artist.

**Use:** mark saved items ♥ in the judge round. It shows the user at a glance what they already know.

## 5. What is missing

- No playback control: Claude cannot start, pause or queue music.
- No adding tracks to an existing playlist, and no reading a playlist's tracks.
- `generate_playlist` needs Spotify Premium. On a free account it fails.
- The generated playlist is private and not saved. The user saves it in Spotify, or Claude uses `save_to_library` when asked.

## Why not the Spotify Web API?

The Web API can read playlist contents and add exact tracks, which would remove limits 1 and 3. It also needs a Spotify developer app and OAuth per user, and Spotify has deprecated the endpoints that would help most here (audio features, recommendations, related artists). A Web API fallback is on the roadmap: see [`docs/web-api-fallback.md`](https://github.com/Tiebe-Vaes/playlist-builder-for-spotify/blob/main/docs/web-api-fallback.md).

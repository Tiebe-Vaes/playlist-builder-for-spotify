# Spotify connector limits

What the Spotify connector in Claude can and cannot do, found by prototyping this skill on claude.ai in October 2026. The connector exposes five tools: `search`, `generate_playlist`, `get_currently_playing`, `save_to_library` and `remove_from_library`. Each limit below shaped one round of the flow.

## 1. One description builds the whole playlist

`generate_playlist` takes a single text description and returns a finished, private playlist. There is no parameter for exact tracks, no way to pin a track, and no way to edit the result afterwards.

**Workaround:** the whole flow exists to write a better description. The interview gives mood and length, the judge round gives concrete tracks to name, and the seeds give playlists to name. See [`prompt-templates.md`](prompt-templates.md).

## 2. Vibe searches return playlists, not tracks

A query like "chill songs like Radiohead" returns only AI-generated playlists: no tracks, no artists. Those are useless for a judge round, because the user cannot judge a playlist by its title.

**Workaround:** search plain artist names ("Radiohead") to get that artist's real tracks, and "artists similar to Radiohead" to get real artists. Run one search per anchor, in parallel.

## 3. Listening history comes back as real tracks

History queries are the exception to limit 2. Tested live in October 2026:

| Query | Returns |
| --- | --- |
| `my recently played tracks this week` | Up to 20 real tracks the user played recently |
| `my most played songs` | Up to 20 real tracks from the user's top listening |

Set `limit: 20` to get the full list. A result can also say that some tracks were filtered for licensing.

**Use:** these feed the judge round when the user wants to start from their own listening instead of named artists. The generator also accepts "based on the songs I've been listening to this week" (a test call returned a playlist titled "Your Weekly Listening Mix"), but Claude cannot check which tracks it picked. Naming the kept history tracks in the description makes the result predictable.

### Similar songs and discovery

Tested live in October 2026:

| Query | Returns |
| --- | --- |
| `songs similar to <song> by <artist>` | Real tracks, but unreliable: 7 in one test, 1 in the next, mostly ones the user already saved. A third test ("Black and White" by Rainbow Kitten Surprise) returned a `NO_CONTENT` error |
| `new songs I haven't heard similar to <song>` | Only an AI-made playlist (the vibe-query trap) |
| `artists similar to <artist>` | Real artists. Some carry `playback.status: NOT_PLAYABLE` with `LICENSOR_RESTRICTED`; skip those |

**Use:** back "songs similar to" with plain-name searches of the song's artist and of similar artists. For discovery, search the unsaved similar artists by plain name.

## 4. Playlists can be listed, not read

Searching "my playlists" returns the user's playlists with name and description. The connector cannot return the tracks inside them.

**Workaround:** name the playlists in the description, as the main source ("built mainly from songs in my playlists Late nights and Rainy days"). In a live test, seeds in a trailing clause were ignored.

The list mixes the user's own playlists with ones they follow:

| Field | Own playlist | Followed playlist |
| --- | --- | --- |
| `library_status` | `NOT_SAVEABLE` | `SAVED` |
| `can_edit_items` | `true` | absent |
| creator | the user | someone else |

Names are not unique. One test account had three playlists named "." and a description cannot tell those apart.

## 5. Library status is visible

Search results carry `library_status`. `SAVED` means the user already saved the track or artist.

**Use:** mark saved items ♥ in the judge round. It shows the user at a glance what they already know.

## 6. What is missing

- No playback control: Claude cannot start, pause or queue music.
- No adding tracks to an existing playlist, and no reading a playlist's tracks. Generated playlists report `can_edit_items: true`, but no connector tool can add items.
- `generate_playlist` needs Spotify Premium. On a free account it creates nothing and returns `NOT_SUBSCRIBED` or `PREMIUM_REQUIRED_FALLBACK`.
- `search` and `generate_playlist` both require a `language` parameter (a BCP 47 locale such as `en-US`), and the prompt must stay in the user's own language.
- The generated playlist is private and **not in the user's library**. In testing, the user could not find it in Spotify until it was saved. Say so in the wrap-up and offer `save_to_library` with the playlist's URI.
- One description that names many tracks by one artist makes that artist dominate the playlist. Name one track per artist.

## Why not the Spotify Web API?

The Web API can read playlist contents and add exact tracks, which would remove limits 1 and 4. It also needs a Spotify developer app and OAuth per user, and Spotify has deprecated the endpoints that would help most here (audio features, recommendations, related artists). A Web API fallback is on the roadmap: see [`docs/web-api-fallback.md`](https://github.com/Tiebe-Vaes/playlist-builder-for-spotify/blob/main/docs/web-api-fallback.md).

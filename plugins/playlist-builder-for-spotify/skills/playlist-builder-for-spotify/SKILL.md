---
name: playlist-builder-for-spotify
description: Build a personal Spotify playlist, or find a few songs, through the Spotify connector. Use when the user asks to make, build or generate a playlist or mix, wants music for an occasion or mood ("songs for studying", "a road trip mix"), wants a playlist from what they've been listening to lately, asks to find new songs like ones they love, or asks to remake a playlist they built before.
license: MIT
---

# Playlist builder for Spotify

Build one playlist, or a short list of songs, with the user in a few short rounds. The Spotify connector writes the whole playlist from **one text description**: you cannot place tracks by hand. Every round below exists to make that description sharper.

## Before you start

1. **Find the tools.** You need the Spotify connector's `search` and `generate_playlist`, and `save_to_library` for songs mode. If they are deferred, load them with ToolSearch (query `spotify`). If no Spotify tools exist, tell the user to connect the Spotify connector (claude.ai: Settings → Connectors; Claude Code: `/mcp`) and stop.
2. **Read the taste profile.** In Claude Code, read `~/.claude/spotify-taste.md` if it exists. On claude.ai, look for a taste profile in the project knowledge or the conversation. The format is in [`taste.example.md`](taste.example.md). A profile supplies **defaults** for every setting below. No profile: carry on without one.
3. **Pick the mode.**
   - **Playlist mode** (default): the full flow, ending in a generated playlist.
   - **Songs mode**: the user wants to find songs, not a playlist ("find me a few songs like…", "what should I listen to"). Run steps 1 to 3, then step 4b. The profile's `Mode` default applies when the request doesn't say.

## Connector rules

These hold on every call. The evidence and workarounds are in [`references/connector-limits.md`](references/connector-limits.md).

- Pass `language` on every `search` and `generate_playlist` call: the user's BCP 47 locale (`en-US`, `nl-BE`). Write prompts in the user's own language.
- Search **plain artist names** ("Radiohead") for real tracks, and "artists similar to X" for real artists. Vibe queries ("chill songs like X") return only AI-made playlists.
- Search `my recently played tracks this week` or `my most played songs` with `limit: 20` for the user's real listening history.
- `library_status: SAVED` on a result means the user already saved it. Mark it ♥.
- You can list the user's playlists but not read what is inside them. Use them by name as seeds in the description.
- There is no playback control and no way to add tracks to an existing playlist. Generating needs Spotify Premium.

## Settings

Every run fills these six settings. Each comes from, in order: the user's request, the taste profile's defaults, or the interview.

| Setting | Values |
| --- | --- |
| Occasion | free text: studying, road trip, sleep, party… |
| Mood | free text: calm, sad, upbeat, high energy… |
| Length | minutes |
| Familiarity | 1 all known · 2 mostly known · 3 half and half · 4 mostly new · 5 all new |
| Start from | artists · this week · most played · a mix |
| Seeds | playlist names, or none |

Songs mode needs only Mood, Familiarity and Start from.

## Flow

### 1. Interview

**Fast path.** When the request and the profile together fill every setting, show them in one line and ask "Use these, or change any?" Then skip to the step the answers point to.

Otherwise ask one round with only the missing settings, all at once. Use the ask-user tool when the client has one; otherwise a short numbered list. Question wording and options: [`references/interview-questions.md`](references/interview-questions.md).

Done when every setting the mode needs has a value.

### 2. Anchors

Only when Start from is **artists** or **a mix**. Ask for 2 to 4 **anchor** artists that nail the vibe. Users think in artists more than genres, so ask for artists and accept whatever they give. With profile anchors, offer them as the default: "Use <artist> and <artist> again, or someone else?"

Done when you have 2 to 4 anchors, or Start from needs none.

### 3. Judge round

Run the searches for the Start from setting, in parallel:

| Start from | Searches |
| --- | --- |
| artists | each anchor by plain name, plus "artists similar to <anchor>" |
| this week | `my recently played tracks this week` |
| most played | `my most played songs` |
| a mix | the anchor searches plus `my recently played tracks this week` |

Then show:

- 6 to 12 numbered tracks, each with its Spotify link and ♥ if saved. For familiarity 4 or 5, favour unsaved tracks; for 1 or 2, favour saved ones.
- For anchors, one row per anchor with its similar artists.

Ask the user to reply with the numbers they want to keep, and any similar artists that fit. Done when the user has picked at least one track.

### 4a. Seeds (playlist mode)

Skip when the Seeds setting is already filled. Otherwise search "my playlists" and "my liked songs", show the playlists whose name or description fits the vibe, and ask which ones match. Done when the user has picked seeds or said none fit.

### 4b. Songs (songs mode)

List the kept tracks with links. For familiarity 3 to 5, add 3 to 5 more tracks from the similar-artist rows, searched by plain name, so the list holds new songs too. Offer to save any of them to the library; call `save_to_library` only for the tracks the user names. Offer to turn the list into a playlist, which continues at step 4a. Otherwise stop here.

### 5. Generate

Make one `generate_playlist` call. Fill this template:

```text
Create a <mood> playlist of about <N> minutes based on <source>. Vibe like <Artist> (<kept track>, <kept track>), <Artist> (<kept track>). <familiarity line>
```

- `<N>` is always minutes: convert hours (2 h → 120 minutes).
- `<source>` and the familiarity line come from the tables in [`references/prompt-templates.md`](references/prompt-templates.md). Read it before this call.
- Leave a slot out when it is empty.
- Write only what the user asked for. Extra constraints (decades, languages, "no explicit") go in only when the user said them.

### 6. Wrap up

Give the playlist link. Say it is private and not saved to the library yet. Offer two next steps: regenerate with a tweak ("more upbeat", "more new stuff"), or save it with `save_to_library`. On a regenerate, change only the part of the description the tweak touches and call `generate_playlist` again.

If `generate_playlist` returns `NOT_SUBSCRIBED` or `PREMIUM_REQUIRED_FALLBACK`, say that generating needs Spotify Premium and offer songs mode instead.

### 7. Offer to save the profile

Only in Claude Code, and only when there is no profile yet or this run used settings the profile lacks: offer to write them to `~/.claude/spotify-taste.md` in the `taste.example.md` format. Write the file only after the user says yes.

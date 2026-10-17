---
name: playlist-builder-for-spotify
description: Build a personal Spotify playlist through the Spotify connector. Use when the user asks to make, build or generate a playlist or mix, wants music for an occasion or mood ("songs for studying", "a road trip mix"), or asks to remake a playlist they built before.
license: MIT
---

# Playlist builder for Spotify

Build one playlist with the user in a few short rounds. The Spotify connector writes the whole playlist from **one text description**: you cannot place tracks by hand. Every round below exists to make that description sharper.

## Before you start

1. **Find the tools.** You need the Spotify connector's `search` and `generate_playlist`. If they are deferred, load them with ToolSearch (query `spotify`). If no Spotify tools exist, tell the user to connect the Spotify connector (claude.ai: Settings → Connectors; Claude Code: `/mcp`) and stop.
2. **Read the taste profile.** In Claude Code, read `~/.claude/spotify-taste.md` if it exists. On claude.ai, look for a taste profile in the project knowledge or the conversation. The format is in [`taste.example.md`](taste.example.md). A profile pre-fills anchors and seeds; the user still confirms them. No profile: carry on without one.

## Connector rules

These hold on every call. The evidence and workarounds are in [`references/connector-limits.md`](references/connector-limits.md).

- Search **plain artist names** ("Radiohead") for real tracks, and "artists similar to X" for real artists. Vibe queries ("chill songs like X") return only AI-made playlists.
- `library_status: SAVED` on a result means the user already saved it. Mark it ♥.
- You can list the user's playlists but not read what is inside them. Use them by name as seeds in the description.
- There is no playback control and no way to add tracks to an existing playlist. Generating needs Spotify Premium.

## Flow

### 1. Interview

Ask one round, all at once: occasion, mood and energy, length, familiar vs discovery. Use the ask-user tool when the client has one; otherwise a short numbered list. Question wording and options: [`references/interview-questions.md`](references/interview-questions.md).

Done when you know all four. Skip a question the user already answered in their request.

### 2. Anchors

Ask for 2 to 4 **anchor** artists that nail the vibe. Users think in artists more than genres, so ask for artists and accept whatever they give. With a taste profile, offer its artists as the default: "Use <artist> and <artist> again, or someone else?"

Done when you have 2 to 4 anchors.

### 3. Judge round

Search every anchor by plain name, in parallel. Then show:

- 6 to 9 numbered tracks across the anchors, each with its Spotify link and ♥ if saved.
- One row per anchor with the artists from "artists similar to <anchor>".

Ask the user to reply with the numbers they want to keep, and any similar artists that fit. Done when the user has picked at least one track.

### 4. Seeds

Search "my playlists" and "my liked songs". Show the playlists whose name or description fits the vibe, plus any seed playlists from the taste profile. Ask which ones match. Done when the user has picked seeds or said none fit.

### 5. Generate

Make one `generate_playlist` call. Fill this template:

```text
Create a <mood> playlist of about <N> minutes based on my taste and my playlists <A>, <B>. Vibe like <Artist> (<kept track>, <kept track>), <Artist> (<kept track>). <familiarity line>
```

- `<N>` is always minutes: convert hours (2 h → 120 minutes).
- Familiarity line: "Mostly songs and artists I already listen to." for familiar, "Mostly new artists I haven't heard yet." for discovery, both halves for a mix.
- Leave a slot out when it is empty, for example with no seeds drop "and my playlists …".
- Write only what the user asked for. Extra constraints (decades, languages, "no explicit") go in only when the user said them.

More examples and tweak phrasings: [`references/prompt-templates.md`](references/prompt-templates.md).

### 6. Wrap up

Give the playlist link. Say it is private and not saved to the library yet. Offer two next steps: regenerate with a tweak ("more upbeat", "drop artist X"), or save it. On a regenerate, change only the part of the description the tweak touches and call `generate_playlist` again.

If `generate_playlist` fails with a Premium or account error, tell the user that generating needs Spotify Premium.

### 7. Offer to save the profile

Only in Claude Code, and only when there is no profile yet or this session added anchors or seeds: offer to write them to `~/.claude/spotify-taste.md` in the `taste.example.md` format. Write the file only after the user says yes.

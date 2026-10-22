---
name: playlist-builder-for-spotify
description: Build a personal Spotify playlist, find a few songs, or merge playlists through the Spotify connector. Use when the user asks to make, build or generate a playlist or mix, wants music for an occasion or mood ("songs for studying", "a road trip mix"), wants a playlist from one song they can't stop playing or from what they've been listening to lately, asks to find new songs like ones they love, asks to merge or combine playlists, or asks to remake a playlist they built before.
license: MIT
---

# Playlist builder for Spotify

Build one playlist, a short list of songs, or a merge of playlists with the user in a few short rounds. The Spotify connector writes the whole playlist from **one text description**: you cannot place tracks by hand. Every round below exists to make that description sharper.

## Before you start

1. **Find the tools.** You need the Spotify connector's `search`, `generate_playlist` and `save_to_library`. If they are deferred, load them with ToolSearch (query `spotify`). If no Spotify tools exist, tell the user to connect the Spotify connector (claude.ai: Settings → Connectors; Claude Code: `/mcp`) and stop.
2. **Read the taste profile.** In Claude Code, read `~/.claude/spotify-taste.md` if it exists. On claude.ai, look for a taste profile in the project knowledge or the conversation. The format is in [`taste.example.md`](taste.example.md). A profile supplies **defaults** for every setting below. No profile: carry on without one.
3. **Pick the mode.**
   - **Playlist mode** (default): the full flow, ending in a generated playlist.
   - **Songs mode**: the user wants to find songs, not a playlist ("find me a few songs like…"). Run steps 1 to 3, then step 4b.
   - **Merge mode**: the user wants to combine existing playlists ("merge my playlists X and Y"). Run step 4c, then steps 5 and 6.

   The profile's `Mode` default applies when the request doesn't say.

## Connector rules

These hold on every call. The evidence and workarounds are in [`references/connector-limits.md`](references/connector-limits.md).

- Pass `language` on every `search` and `generate_playlist` call: the user's BCP 47 locale (`en-US`, `nl-BE`). Write prompts in the user's own language.
- Search **plain artist names** ("Radiohead") for real tracks, and "artists similar to X" for real artists. Vibe queries ("chill songs like X", "new songs I haven't heard") return only AI-made playlists.
- Search `my recently played tracks this week` or `my most played songs` with `limit: 20` for the user's real listening history.
- `library_status: SAVED` on a result means the user already saved it. Mark it ♥.
- Skip results whose `playback.status` is `NOT_PLAYABLE`: they won't play for this user.
- You can list the user's playlists but not read what is inside them. Use them by name in the description.
- A generated playlist is private and **not in the user's library** until it is saved. There is no playback control and no way to add tracks to an existing playlist. Generating needs Spotify Premium.

## Settings

Each setting comes from, in order: the user's request, the taste profile's defaults, or the interview.

| Setting | Values | Asked in | Default |
| --- | --- | --- | --- |
| Start from | one song · artists · this week · most played; several picks make a mix | core | |
| Occasion and mood | free text | core | |
| Length | minutes, up to 720 | core | |
| Adventure | 1 only songs I know · 2 mostly known · 3 half and half · 4 mostly new · 5 all new | fine-tune | 2 |
| Songs per artist | 1 · 2 · 3 · no limit | fine-tune | 3 |
| Leave out | artists, songs or kinds of music, free text | fine-tune | nothing |
| Seeds | the user's playlists, or none | step 4a | |
| Name | free text | form only | Spotify picks one |
| Judge round | pick songs · skip | form only | pick songs |
| Arc | steady · build up · wind down · rise and fall | never; hints only | steady |

Settings nobody filled use the profile default, else the default above. Two songs by the same artist never play in a row, whatever the songs-per-artist value.

**Fine-tune**: the profile's `Fine-tune` default says when to ask the fine-tune settings: `ask` (the default) offers them as the last question of the core round, `always` asks them with the core round, `never` skips them. Older profiles map over: `Depth: quick` is `never`, `Depth: full` is `always`, and `Familiarity: N` is `Adventure: N`.

**Read hints.** Any reply can set a setting the user wasn't asked about: "I'm open to new artists" in the judge round moves adventure to 3, "nothing too loud" fills leave out. Apply it and name the change in one line, so the user can undo it.

Songs mode needs only Start from, Occasion and mood, and Adventure.

## Flow

### 1. Interview

**Form.** When the client can render an elicitation form, ask the whole interview in **one form**: core and fine-tune settings, the song or artists, seeds, name and whether to skip the judge round. Prefill it from the profile. Search `my playlists` first so the seeds fit in. Layout and fields: [`references/forms.md`](references/forms.md). The form replaces the rounds below and steps 2 and 4a.

**Fast path.** When the request and the profile together fill every core setting, show all settings in one line and ask "Use these, or change any?" Then skip to the step the answers point to.

Without a form, ask one round with only the missing core settings, all at once, plus "Fine-tune more?" as the last question when `Fine-tune` is `ask`. On a yes, ask the fine-tune settings in a second round. Use the ask-user tool when the client has one; otherwise a short numbered list. Question wording and options: [`references/interview-questions.md`](references/interview-questions.md).

Done when every core setting has a value and the fine-tune round, if any, is answered.

### 2. Anchors

| Start from | Ask for |
| --- | --- |
| one song | the song and its artist |
| artists, a mix | 2 to 4 **anchor** artists that nail the vibe |
| this week, most played | nothing |

Skip this step when the form's song-or-artists box already gave them. Users think in artists and songs more than genres, so accept whatever they give. With profile anchors, offer them as the default: "Use <artist> and <artist> again, or someone else?"

### 3. Judge round

Run the searches for the Start from setting, in parallel:

| Start from | Searches |
| --- | --- |
| one song | "songs similar to <song> by <artist>", the artist by plain name, "artists similar to <artist>" |
| artists | each anchor by plain name, plus "artists similar to <anchor>" |
| this week | `my recently played tracks this week` |
| most played | `my most played songs` |
| a mix | the anchor searches plus `my recently played tracks this week` |

"Songs similar to" often returns only a few tracks, mostly saved ones, or a `NO_CONTENT` error. Either way, fill the gap by searching 3 to 5 of the similar artists by plain name. For adventure 4 or 5, pick the unsaved ones.

Then show:

- 8 to 12 numbered tracks, each with its Spotify link and ♥ if saved. **Alternate artists**: never two tracks by the same artist next to each other. For adventure 4 or 5, favour unsaved tracks; for 1 or 2, favour saved ones. Skip artists the user wants left out.
- One row of similar artists, playable ones only.

Ask the user to reply with the tracks to keep and any similar artists that fit. With a form tool, show the tracks as a judge form with 30-second previews instead: see [`references/forms.md`](references/forms.md). Done when the user has picked at least one track.

When the user chose to skip the judge round, run no searches and go on: the description names only the anchors.

### 4a. Seeds (playlist mode)

Skip this step when the form already asked for seeds. Otherwise search `my playlists` with `limit: 20`. Show the user's own playlists (`can_edit_items: true`) first, then followed ones labelled "(followed)". Ask: "Which of your playlists should it be based on?" Pre-select the profile's seed playlists. Warn when two playlists share a name (like "."), because the description cannot tell them apart. Done when the user has picked seeds or said none.

### 4b. Songs (songs mode)

List the kept tracks with links. For adventure 3 to 5, add 3 to 5 more tracks from the similar-artist row, searched by plain name, so the list holds new songs too. Offer to save any of them; call `save_to_library` only for the tracks the user names. Offer to turn the list into a playlist, which continues at step 4a. Otherwise stop here.

### 4c. Merge (merge mode)

Search `my playlists` as in step 4a and ask which 2 or more playlists to merge. Then ask, in one round:

- **Keep rules** (pick any): fits a vibe they describe · mostly from one playlist · drop songs they're sick of · keep their favourites.
- **Length** in minutes.

Tell the user honestly: Claude cannot read the playlists, so the generator picks which songs stay. Then go to step 5 with the merge template.

### 5. Generate

Make one `generate_playlist` call. Read [`references/prompt-templates.md`](references/prompt-templates.md) before this call: it holds the template, the slot tables and the rules. The rules that matter most:

- **Seeds first.** When the user picked seed playlists, the description opens with them as the main source.
- **One named track per artist**, at most about 5 named tracks in total. Naming many tracks by one artist turns the whole playlist into that artist.
- `<N>` is always minutes: convert hours (2 h → 120 minutes).
- Write only what the user asked for, plus the songs-per-artist line.

### 6. Wrap up

Give the playlist link, and say plainly: "It's private and won't show up in your Spotify library until it's saved. Want me to save it?" Call `save_to_library` with the playlist's URI only after a yes.

Then offer a regenerate with a tweak ("more upbeat", "more new stuff"). With a widget tool, offer these and the save as buttons: see [`references/forms.md`](references/forms.md). On a regenerate, change only the part of the description the tweak touches and call `generate_playlist` again.

If `generate_playlist` returns `NOT_SUBSCRIBED` or `PREMIUM_REQUIRED_FALLBACK`, say that generating needs Spotify Premium and offer songs mode instead.

### 7. Offer to save the profile

Only in Claude Code, and only when there is no profile yet or this run used settings the profile lacks: offer to write them to `~/.claude/spotify-taste.md` in the `taste.example.md` format. Write the file only after the user says yes.

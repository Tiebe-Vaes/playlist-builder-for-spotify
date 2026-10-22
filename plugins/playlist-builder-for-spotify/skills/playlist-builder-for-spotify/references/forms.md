# Forms

Use these when the client can render an elicitation form (on claude.ai and Claude Desktop, the `show_widget` tool after `read_me` with the `elicitation` module). A form shows every question at once, so the interview takes one round instead of three. Without a form tool, ask the same questions with the ask-user tool or a short numbered list, as described in [`interview-questions.md`](interview-questions.md).

Forms cannot run scripts. Use the elicitation classes and `data-*` attributes only; the client wires selection and submit. Answers come back as one line, for example `Playlist details — Start from: One song · Song or artists: Black and White by Rainbow Kitten Surprise · Length minutes: 180 · …`.

## Interview form

Search `my playlists` with `limit: 20` **before** showing the form, so the seeds can go in it. Prefill every field the taste profile sets: give the pill `aria-pressed="true"`, or set the slider's `value`. Leave out fields the request already answered.

| Field (`data-name`) | Input | Notes |
| --- | --- | --- |
| `start_from` | cards, multi-select | One song · Artists · This week · Most played. Several picks make "a mix". |
| `song_or_artists` | text box under `start_from` | "Which song or artists?" Fills step 2, so there is no separate anchors round. |
| `mood` | pills, multi-select, with Other | Feeling words: calm, sad, warm, happy, energetic, dreamy. |
| `occasion` | pills, with Other | Studying, driving, working out, falling asleep, walking, just listening. |
| `length_minutes` | slider, 15 to 720, step 15 | Tick labels 15 min, 3 h, 6 h, 9 h, 12 h. The form can't show the live value, so read the number from the answer. |
| `adventure` | slider, 1 to 5 | End labels "only songs I know" and "all new, deep cuts". Default 2. |
| `songs_per_artist` | pills | 1 · 2 · 3 · No limit. Default 3. |
| `seeds` | pills, multi-select | The user's own playlists first, then followed ones labelled "(followed)", then None. Leave out playlists that share a name and say why in a muted note. |
| `leave_out` | text area | Artists, songs or kinds of music. |
| `playlist_name` | text box | Optional. Empty lets Spotify name it. |
| `judge_round` | pills | "Let me pick songs" (default) · "Skip, just make it". |

Header title: "Playlist details". Arc is not a field: set it only from a hint ("build it up slowly").

## Judge form

Show the judge round as a form when the client has one. Each track is a card pill (`data-value` = "Track by Artist") in one multi-select group named `keep`, with:

- the track and artist name, and ♥ when saved;
- a native `<audio controls preload="none" src="<audio_preview_url>">` player under the card, when the result has a preview URL. It plays without scripts.

Keep the order rules from SKILL.md step 3: alternate artists, playable tracks only. Add a second multi-select group `similar_artists` with the similar artists as plain pills. Header title: "Song picks".

## Wrap-up widget

After `generate_playlist`, show a small widget (not a form, so a script is allowed) with the playlist link and buttons that call `sendPrompt()`:

| Button | Sends |
| --- | --- |
| Save to library | `Save the playlist to my library.` |
| More upbeat | `Regenerate it, more upbeat.` |
| More new stuff | `Regenerate it with more new stuff.` |
| Fewer hits | `Regenerate it, less obvious.` |

The plain-text wrap-up from SKILL.md step 6 still goes in the reply, so the save warning is never lost. Without a widget tool, list the same options in text.

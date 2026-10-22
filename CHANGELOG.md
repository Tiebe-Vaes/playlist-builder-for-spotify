# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.4.0] - 2026-10-22

### Added

- Songs per artist setting (1, 2, 3 or no limit), so the artist cap is no longer fixed at 3.
- Leave out setting: artists, songs or kinds of music to skip, written into the description in your words.
- One interview form on clients that render forms (claude.ai, Claude Desktop): start, song or artists, mood and occasion (all multi-select and optional), length up to 12 hours, adventure, seeds, an optional playlist name and a skip-the-judge-round option, prefilled from the taste profile.
- Type in seed playlists that aren't in the list; the skill checks each name with a search.
- Judge round as a form with 30-second previews, and wrap-up buttons for save and common tweaks.
- The skill reads hints from any reply ("I'm open to new artists") and says which setting it changed.

### Changed

- Without a form, the interview asks 3 core questions, then offers to fine-tune adventure, songs per artist and leave out. Arc is no longer asked; it comes only from hints. The quick or full depth question is gone; the profile's `Fine-tune` default (`ask`, `always`, `never`) replaces `Depth`.
- Familiarity and popularity are merged into one adventure setting (1 to 5), which covers both how new the music is and how far from the hits.
- A `NO_CONTENT` error from "songs similar to" falls back to plain-name searches of similar artists.

## [0.3.1] - 2026-10-21

### Added

- The release zip includes the MIT `LICENSE` file.
- Listing copy for the Agensi marketplace in `docs/agensi-listing.md`.
- Compatibility notes in the README: the skill needs Claude's Spotify connector, and it uses no API keys, scripts or network calls of its own.

### Removed

- The roadmap item for saving from the wrap-up, which shipped in 0.3.0.

## [0.3.0] - 2026-10-19

### Added

- Start from one song you can't stop playing.
- Merge mode: combine your playlists, with keep rules such as "drop songs I'm sick of" and "keep my favourites".
- Arc (steady, build up, wind down, rise and fall) and popularity (hits, mix, deep cuts) settings.
- Quick or full interview depth, settable as a profile default.
- Playlist research notes in `docs/research/playlist-interview.md`.

### Changed

- Seed playlists are picked from a list of your own playlists, with followed ones labelled and duplicate names flagged.
- Descriptions open with the seed playlists and name one track per artist, after a live test where one artist took over the playlist.
- Every playlist caps songs per artist and keeps the same artist from playing twice in a row, without asking.
- The judge round alternates artists and skips artists that can't play in your region.
- The wrap-up says a generated playlist won't show up in your library until it's saved, and offers to save it.

## [0.2.0] - 2026-10-17

### Added

- Songs mode: find songs through the judge round and save the ones you like, without generating a playlist.
- Start from your listening history: what you played this week, your most played songs, or a mix with named artists.
- Five familiarity levels, from all known to all new, each with its own description line.
- Taste profile defaults for every setting, and a one-line confirm that skips the interview when they cover everything.
- Live connector findings: history searches return real tracks, the `language` parameter is required, and Premium errors have fixed codes.

### Changed

- The interview asks only for settings the request and the profile leave open.

## [0.1.0] - 2026-10-17

### Added

- `playlist-builder-for-spotify` skill: interview, anchors, judge round, seed playlists, generate, wrap-up.
- References for interview questions, prompt templates and connector limits.
- Optional taste profile read from `~/.claude/spotify-taste.md`.
- Trigger and flow evals in the skill-creator format.
- CI: plugin validation, JSON, markdown lint, link check, eval and version check.
- Release workflow that attaches a claude.ai-ready zip to each GitHub Release.

[Unreleased]: https://github.com/Tiebe-Vaes/playlist-builder-for-spotify/compare/v0.4.0...HEAD
[0.4.0]: https://github.com/Tiebe-Vaes/playlist-builder-for-spotify/compare/v0.3.1...v0.4.0
[0.3.1]: https://github.com/Tiebe-Vaes/playlist-builder-for-spotify/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/Tiebe-Vaes/playlist-builder-for-spotify/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/Tiebe-Vaes/playlist-builder-for-spotify/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Tiebe-Vaes/playlist-builder-for-spotify/releases/tag/v0.1.0

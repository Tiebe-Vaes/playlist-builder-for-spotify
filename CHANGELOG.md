# Changelog

All notable changes to this project are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/Tiebe-Vaes/playlist-builder-for-spotify/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/Tiebe-Vaes/playlist-builder-for-spotify/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/Tiebe-Vaes/playlist-builder-for-spotify/releases/tag/v0.1.0

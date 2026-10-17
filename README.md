# Playlist builder for Spotify

[![CI](https://github.com/Tiebe-Vaes/playlist-builder-for-spotify/actions/workflows/ci.yml/badge.svg)](https://github.com/Tiebe-Vaes/playlist-builder-for-spotify/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/Tiebe-Vaes/playlist-builder-for-spotify)](https://github.com/Tiebe-Vaes/playlist-builder-for-spotify/releases)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Claude Code plugin](https://img.shields.io/badge/Claude%20Code-plugin-d97757)](#claude-code)

A Claude skill that builds Spotify playlists you actually want to hear. Instead of guessing from one sentence, Claude interviews you, lets you judge real sample tracks, picks seed playlists from your library, and then writes one precise prompt for Spotify's playlist generator.

![Demo: building a study playlist in Claude](docs/assets/demo-placeholder.svg)

## Why

The Spotify connector in Claude can generate a playlist, but only from a single text description. Ask for "a chill playlist" and you get a generic one. This skill turns a short conversation into a description that names your artists, the exact tracks you liked, and your own playlists as seeds.

## How it works

```mermaid
flowchart TD
    A([You: make me a playlist]) --> T[Read taste profile, if any]
    T --> I[1. Interview<br/>occasion, mood, length, familiar vs new] --> N[2. Anchors<br/>2 to 4 artists that nail the vibe]
    N --> J[3. Judge round<br/>search each anchor, show numbered tracks<br/>and similar artists, you keep the best]
    J --> S[4. Seeds<br/>pick matching playlists from your library]
    S --> G[5. Generate<br/>one generate_playlist call<br/>with a templated description]
    G --> W[6. Wrap up<br/>link, regenerate with a tweak, or save]
    W -- more upbeat, drop X --> G
```

The description it sends looks like this:

```text
Create a calm, sad acoustic playlist of about 120 minutes based on my taste and my playlists Late nights, Rainy days. Vibe like The Goo Goo Dolls (Iris), Radiohead (Fake Plastic Trees, Exit Music). Mostly songs and artists I already listen to.
```

## Install

You need the **Spotify connector** connected in Claude and a **Spotify Premium** account, since generating playlists needs Premium.

### Claude Code

```text
/plugin marketplace add Tiebe-Vaes/playlist-builder-for-spotify
/plugin install playlist-builder-for-spotify@playlist-builder-for-spotify
```

Connectors you add on claude.ai show up in Claude Code when you sign in with the same account.

### claude.ai

1. Download `playlist-builder-for-spotify.zip` from the [latest release](https://github.com/Tiebe-Vaes/playlist-builder-for-spotify/releases/latest).
2. In claude.ai, open **Settings → Capabilities → Skills** and upload the zip.
3. Connect Spotify under **Settings → Connectors**.

## Usage

Ask for a playlist in your own words:

- "Make me a playlist for studying tonight."
- "Build a 3 hour road trip mix, mostly stuff I know."
- "Remake that last playlist but more upbeat."

### Taste profile (optional)

Save your usual artists and playlists once, and the skill offers them as defaults every time. Copy [`taste.example.md`](plugins/playlist-builder-for-spotify/skills/playlist-builder-for-spotify/taste.example.md) to `~/.claude/spotify-taste.md` and fill it in. On claude.ai, paste it into your project knowledge instead. The skill also offers to write the file for you after your first playlist.

## Limitations

These come from the Spotify connector, not the skill. The full write-up with workarounds is in [`connector-limits.md`](plugins/playlist-builder-for-spotify/skills/playlist-builder-for-spotify/references/connector-limits.md).

| Limit | Workaround in the skill |
| --- | --- |
| One text description builds the whole playlist; no hand-placed tracks | Every round exists to write a better description |
| Vibe searches return only AI-made playlists, no tracks | Search plain artist names and "artists similar to X" |
| Your playlists can be listed but not read | Name them in the description as seeds |
| No playback control, no adding to existing playlists | Out of scope for now; see the roadmap |
| Generating needs Spotify Premium | Clear error message on free accounts |

## Repository layout

```text
.claude-plugin/marketplace.json        marketplace entry for /plugin marketplace add
plugins/playlist-builder-for-spotify/
  .claude-plugin/plugin.json           plugin manifest, single source of the version
  skills/playlist-builder-for-spotify/
    SKILL.md                           the flow Claude follows
    taste.example.md                   taste profile template
    references/                        loaded only when a step needs them
evals/                                 trigger and flow evals (skill-creator format)
scripts/check-evals.mjs                eval shape and version checks for CI
docs/                                  design notes
```

## Roadmap

- [ ] Demo GIF
- [ ] Spotify Web API fallback for users without the connector, which can also read playlist contents and add exact tracks. Design: [`docs/web-api-fallback.md`](docs/web-api-fallback.md)
- [ ] Save the generated playlist to the library from the wrap-up step
- [ ] Run the flow evals in CI once a connector mock exists

## Contributing

Issues and PRs are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE). Not affiliated with or endorsed by Spotify. Spotify is a trademark of Spotify AB.

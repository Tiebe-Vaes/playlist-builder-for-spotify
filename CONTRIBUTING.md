# Contributing

Thanks for helping out. Bug reports, connector findings and prompt improvements are all welcome.

## Found a connector quirk?

The Spotify connector changes without notice. If a search or `generate_playlist` call behaves differently from [`connector-limits.md`](plugins/playlist-builder-for-spotify/skills/playlist-builder-for-spotify/references/connector-limits.md), open a bug report with the query you ran and what came back.

## Making a change

1. Fork the repo and create a branch from `main`.
2. Edit the skill under `plugins/playlist-builder-for-spotify/skills/playlist-builder-for-spotify/`. Keep `SKILL.md` under 500 lines; move detail that only some steps need into `references/`.
3. Test it locally in Claude Code:

   ```text
   /plugin marketplace add ./path/to/your/clone
   /plugin install playlist-builder-for-spotify@playlist-builder-for-spotify
   ```

4. If you changed behaviour, add or update a case in [`evals/`](evals/README.md).
5. Run the checks CI runs:

   ```bash
   claude plugin validate --strict .
   node scripts/check-evals.mjs
   npx markdownlint-cli2 "**/*.md"
   ```

6. Add a line under `[Unreleased]` in [`CHANGELOG.md`](CHANGELOG.md).
7. Open a PR with a [Conventional Commits](https://www.conventionalcommits.org/) title, for example `feat(skill): ask about lyrics for focus playlists`.

## Personal taste stays out

Never commit your own taste profile or playlist names. Examples in the skill use made-up playlist names and well-known artists.

## Releasing (maintainers)

1. Move the `[Unreleased]` entries in `CHANGELOG.md` under a new version heading.
2. Bump `version` in `plugins/playlist-builder-for-spotify/.claude-plugin/plugin.json` and `metadata.version` in `.claude-plugin/marketplace.json`.
3. Commit, then tag and push:

   ```bash
   git tag v0.2.0
   git push origin v0.2.0
   ```

The release workflow checks that the tag matches `plugin.json`, zips the skill, and attaches the zip to a GitHub Release with the changelog entry as notes.

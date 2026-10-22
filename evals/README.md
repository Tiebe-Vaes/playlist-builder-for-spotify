# Evals

Two eval sets in the [skill-creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator) format.

| File | Tests | Cases |
| --- | --- | --- |
| [`trigger-queries.json`](trigger-queries.json) | Does the skill fire on the right requests? 14 should fire, 12 should not. The negatives are near misses: Spotify questions that are not playlist building. | 26 |
| [`evals.json`](evals.json) | Does the flow behave? Interview, judge round, generate prompt, regenerate, missing connector, taste profile, songs mode, listening history, adventure levels, fast path, one-song start, seeds-first descriptions, merge mode, fine-tune, songs per artist, leave out, reading hints, interview form, skipped judge round, save prompt, playlist labels. | 20 |

Flow evals marked `[Simulated state]` describe the conversation so far, so a case can test one step without replaying the whole flow.

## Running them

The flow evals call the real Spotify connector, so they run in a Claude session with Spotify connected, not in CI.

1. Install the skill-creator skill in Claude Code or claude.ai.
2. Ask: "Run the evals in `evals/` against the playlist-builder-for-spotify skill."
3. skill-creator runs each prompt with and without the skill, grades the expectations, and shows the results.

To tune the description, ask skill-creator to optimize it with `trigger-queries.json` as the eval set.

## What CI checks

CI runs `node scripts/check-evals.mjs`. It checks that both files are well-formed, ids and queries are unique, the trigger set has positives and negatives, and the versions in `plugin.json` and `marketplace.json` match. It does not run the evals.

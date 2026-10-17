# Prompt templates

`generate_playlist` takes one free-text description and returns a finished playlist. The description is the only lever, so it has to carry everything the earlier rounds found out.

## Template

```text
Create a <mood> playlist of about <N> minutes based on my taste and my playlists <A>, <B>. Vibe like <Artist> (<kept track>, <kept track>), <Artist> (<kept track>). <familiarity line>
```

Why each part is there:

| Part | Why |
| --- | --- |
| `<mood>` | The user's own words from the interview. The generator reads adjectives well. |
| `about <N> minutes` | Minutes are unambiguous. "2 hours" sometimes comes back short. |
| `based on my taste` | Tells the generator to lean on the user's listening history. |
| `my playlists <A>, <B>` | The only way to use playlists the connector cannot read. |
| `Vibe like <Artist> (<track>)` | Kept tracks from the judge round pin the sound much better than genre names. |
| familiarity line | Steers the familiar vs new balance. |

## Examples

Familiar, with seeds:

```text
Create a calm, sad acoustic playlist of about 120 minutes based on my taste and my playlists Late nights, Rainy days. Vibe like The Goo Goo Dolls (Iris), Radiohead (Fake Plastic Trees, Exit Music). Mostly songs and artists I already listen to.
```

Discovery, no seeds:

```text
Create an upbeat, warm playlist of about 45 minutes based on my taste. Vibe like Phoebe Bridgers (Kyoto), boygenius (Not Strong Enough). Mostly new artists I haven't heard yet.
```

Mix:

```text
Create a high-energy workout playlist of about 60 minutes based on my taste and my playlist Gym. Vibe like Fred again.. (Delilah (pull me out of this)), Bicep (Glue). Half songs I already listen to, half new artists.
```

## Keep it out

Each of these looks harmless but can change the result in a way the user did not ask for:

| Added phrase | What it does |
| --- | --- |
| "from the 90s and 2000s" | Can drop newer tracks, including the user's kept ones. |
| "no explicit lyrics" | Can cut a large part of some genres. |
| "only acoustic" | Can drop kept tracks that have drums. |
| A genre the user never said | Pulls the playlist towards genre staples instead of the user's artists. |

Put a constraint in only when the user said it, in their words.

## Regenerate tweaks

Change only the part of the description the tweak touches:

| User says | Edit |
| --- | --- |
| "more upbeat" | Change `<mood>`. |
| "drop <artist>" | Remove that artist from the vibe list, add "No <artist>." at the end. |
| "longer" / "shorter" | Change `<N>`. |
| "more new stuff" | Change the familiarity line. |
| "more like <track>" | Add the track to its artist in the vibe list. |

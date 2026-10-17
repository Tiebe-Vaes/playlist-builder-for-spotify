# Prompt templates

`generate_playlist` takes one free-text description and returns a finished playlist. The description is the only lever, so it has to carry everything the earlier rounds found out.

## Template

```text
Create a <mood> playlist of about <N> minutes based on <source>. Vibe like <Artist> (<kept track>, <kept track>), <Artist> (<kept track>). <familiarity line>
```

Why each part is there:

| Part | Why |
| --- | --- |
| `<mood>` | The user's own words from the interview. |
| `about <N> minutes` | Minutes are unambiguous, and the connector's own instructions ask for them. |
| `<source>` | Tells the generator what to grow from. See the table below. |
| `Vibe like <Artist> (<track>)` | Kept tracks from the judge round pin the sound much better than genre names. History tracks go here too. |
| familiarity line | Steers the known vs new balance. |

## Source

Pick by the Start from setting, then append the seeds when there are any: `… and my playlists <A>, <B>`.

| Start from | `<source>` |
| --- | --- |
| artists | `my taste` |
| this week | `the songs I've been listening to this week` |
| most played | `my most played songs` |
| a mix | `my taste and the songs I've been listening to this week` |

## Familiarity line

| Level | Line |
| --- | --- |
| 1 all known | `Only songs I already listen to.` |
| 2 mostly known | `Mostly songs and artists I already listen to.` |
| 3 half and half | `Half songs I already listen to, half new artists.` |
| 4 mostly new | `Mostly new artists I haven't heard yet.` |
| 5 all new | `Only artists I haven't listened to before.` |

Claude cannot read the generated playlist, so it cannot check the split. Never promise an exact share in the wrap-up.

## Examples

Familiar, with seeds:

```text
Create a calm, sad acoustic playlist of about 120 minutes based on my taste and my playlists Late nights, Rainy days. Vibe like The Goo Goo Dolls (Iris), Radiohead (Fake Plastic Trees, Exit Music). Mostly songs and artists I already listen to.
```

Discovery, no seeds:

```text
Create an upbeat, warm playlist of about 45 minutes based on my taste. Vibe like Phoebe Bridgers (Kyoto), boygenius (Not Strong Enough). Mostly new artists I haven't heard yet.
```

This week, mostly known:

```text
Create a mellow playlist of about 60 minutes based on the songs I've been listening to this week. Vibe like Slowdive (When the Sun Hits), Bon Iver (Skinny Love). Mostly songs and artists I already listen to.
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
| "more new stuff" / "more songs I know" | Move the familiarity level one step and swap the line. |
| "more like <track>" | Add the track to its artist in the vibe list. |

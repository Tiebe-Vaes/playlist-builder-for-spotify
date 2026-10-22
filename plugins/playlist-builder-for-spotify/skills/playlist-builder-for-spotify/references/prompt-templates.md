# Prompt templates

`generate_playlist` takes one free-text description and returns a finished playlist. The description is the only lever, so it has to carry everything the earlier rounds found out.

## Template

```text
Create a <mood> playlist of about <N> minutes, <source>. <start line> Vibe like <track> by <artist>, <track> by <artist>, <artist>. <arc line> <artist line> <adventure line> <leave-out line> <name line>
```

Leave a slot out when it is empty. Fill each slot from the tables below.

## Rules

These come from live tests. A playlist scored 2/10 when the description broke them.

- **Seeds first.** When the user picked seed playlists, `<source>` names them as the main source. Seeds in a trailing "and my playlists …" clause were ignored.
- **One named track per artist, about 5 in total.** A description that named five Radiohead tracks produced a playlist titled "…Radiohead Vibe" with one artist dominating. Pick the kept tracks that cover the most different artists. Similar artists the user picked go in by name only.
- **Minutes.** `<N>` is always minutes; the connector's own instructions ask for them.
- **Skipped judge round.** With no kept tracks, the vibe list names only the anchors: the song (as the start line) or the artists.
- **Nothing extra.** Decades, languages, "no explicit" and genres go in only when the user said them, in their words.

## Source

| Situation | `<source>` |
| --- | --- |
| seed playlists picked | `built mainly from songs in my playlists <A>, <B> and <C>` |
| no seeds, start from artists or one song | `based on my taste` |
| no seeds, this week | `based on the songs I've been listening to this week` |
| no seeds, most played | `based on my most played songs` |
| no seeds, a mix | `based on my taste and the songs I've been listening to this week` |

With seeds and a history start, add the history after the seeds: `built mainly from songs in my playlists <A>, <B> and the songs I've been listening to this week`.

## Start line

Only for start from **one song**: `Use <song> by <artist> as the starting point.` The song's artist still counts towards the one-track-per-artist rule.

## Arc line

Only when the user hinted at a shape ("build it up slowly"); arc is never asked.

| Arc | Line |
| --- | --- |
| steady | `Keep a steady vibe.` |
| build up | `Start calm and slowly build up energy.` |
| wind down | `Start with more energy and slowly wind down.` |
| rise and fall | `Build up to a peak in the middle, then wind down.` |

## Artist line

| Songs per artist | Line |
| --- | --- |
| 1 | `At most 1 song per artist.` |
| 2 or 3 | `At most <n> songs per artist, and never two songs by the same artist in a row.` |
| no limit | `Never two songs by the same artist in a row.` |

## Adventure line

One line covers both how new the music is and how far from the hits. It replaced separate familiarity and popularity settings in 0.4.0.

| Level | Line |
| --- | --- |
| 1 | `Only songs I already listen to.` |
| 2 | `Mostly songs and artists I already listen to, plus some lesser-known songs.` |
| 3 | `Half songs I already listen to, half new artists, with some deep cuts.` |
| 4 | `Mostly new artists I haven't heard yet, and lesser-known songs over the obvious hits.` |
| 5 | `Only artists I haven't listened to before, mostly deep cuts.` |

## Leave-out line

Only when the user named something: `Leave out <their words>.` For example `Leave out Coldplay and anything too loud.`

Claude cannot read the generated playlist, so it cannot check the split, the arc or the artist cap. Never promise them in the wrap-up.

## Name line

Only when the user gave a name: `Call it <name>.` In a live test, "Call it pianoze." produced "Pianoze Study Vibe": Spotify uses the name as a base, not word for word. In the wrap-up, give the name Spotify returned and never claim the exact one.

## Merge template

```text
Create a playlist of about <N> minutes that merges my playlists <A> and <B>. <keep lines> <artist line> <leave-out line>
```

| Keep rule | Line |
| --- | --- |
| fits a vibe | `Keep only the songs that fit a <vibe> vibe.` |
| mostly from one playlist | `Take most songs from <A>.` |
| drop songs they're sick of | `Leave out songs I've played a lot lately.` |
| keep their favourites | `Keep the songs I've liked.` |

## Examples

Seeds, one song, steady, adventure 2:

```text
Create a cozy evening playlist of about 105 minutes, built mainly from songs in my playlists Late nights and Rainy days. Use Nude by Radiohead as the starting point. Vibe like When the Sun Hits by Slowdive, There Is a Light That Never Goes Out by The Smiths, So Real by Jeff Buckley, bôa. Keep a steady vibe. At most 3 songs per artist, and never two songs by the same artist in a row. Mostly songs and artists I already listen to, plus some lesser-known songs.
```

This week, no seeds, build up, 2 per artist, leave out:

```text
Create a mellow playlist of about 60 minutes, based on the songs I've been listening to this week. Vibe like When the Sun Hits by Slowdive, Skinny Love by Bon Iver. Start calm and slowly build up energy. At most 2 songs per artist, and never two songs by the same artist in a row. Mostly songs and artists I already listen to, plus some lesser-known songs. Leave out anything too loud.
```

Merge:

```text
Create a playlist of about 90 minutes that merges my playlists Late nights and Rainy days. Leave out songs I've played a lot lately. Keep the songs I've liked. At most 3 songs per artist, and never two songs by the same artist in a row.
```

## Regenerate tweaks

Change only the part of the description the tweak touches:

| User says | Edit |
| --- | --- |
| "more upbeat" | Change `<mood>`, or the arc line. |
| "drop <artist>" | Remove that artist from the vibe list and add them to the leave-out line. |
| "longer" / "shorter" | Change `<N>`. |
| "more new stuff" / "more songs I know" / "less obvious" | Move the adventure level one step and swap the line. |
| "too much <artist>" | Lower the cap for that artist: "At most 1 song by <artist>." |

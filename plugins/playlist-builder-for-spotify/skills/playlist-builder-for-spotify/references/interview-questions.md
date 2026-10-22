# Interview questions

With a form tool, use [`forms.md`](forms.md) instead: one form holds every question below. Without one, ask only the settings that neither the request nor the taste profile fills, in as few rounds as possible. Each question offers 3 or 4 options; the user can always type their own answer. A request like "a 2 hour study playlist" already fills occasion and length.

## Core round

### Start from

What should the playlist grow from?

- One song I can't stop playing
- Artists I'll name
- What I've listened to this week
- My most played songs

Allow several picks when the ask-user tool supports multi-select; several picks make "a mix".

### Occasion and mood

What's it for, and what should it feel like? Free text, with examples: "late night walk, sad but warm", "gym, high energy".

### Length

How long should it run?

- About 30 minutes
- About 1 hour
- About 2 hours
- 3 hours or more (the user can type up to 12 hours)

Write the answer down in minutes for the generate step.

### Fine-tune more?

Last question of the core round, only when the profile's `Fine-tune` is `ask` or missing.

- No, that's enough
- Yes: how new, songs per artist, things to leave out

## Fine-tune round

### Adventure

How much should be new to you, and how far from the hits? Five levels; offer them as a list from 1 to 5.

1. Only songs I already know
2. Mostly songs I know, some lesser-known ones
3. Half known, half new
4. Mostly new artists, few obvious hits
5. Only new artists, deep cuts

Ask-user tools often allow only 4 options. Then offer 1, 2, 4 and 5; the user can type "half and half" for level 3.

### Songs per artist

How many songs can one artist get?

- 1
- 2
- 3 (default)
- No limit

Whatever the answer, the same artist never plays twice in a row.

### Leave out

Anything to leave out? Free text: artists, songs, or kinds of music ("no Coldplay", "nothing too loud", "no songs I'm sick of"). "Nothing" is a fine answer.

## Follow-ups

Ask a follow-up only when an answer leaves the description ambiguous:

- **Party or workout**: "Mostly vocals, or fine with instrumentals and remixes?"
- **Sleep or focus**: "Lyrics OK, or mostly instrumental?"
- **Shared listening** (a party, a car with friends): "Should it lean towards songs everyone knows?"

Anything the user says here goes into the description word for word. Anything they don't say stays out.

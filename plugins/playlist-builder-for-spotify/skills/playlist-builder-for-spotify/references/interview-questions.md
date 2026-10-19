# Interview questions

Ask only the settings that neither the request nor the taste profile fills, for the chosen depth, in one round. Each question offers 3 or 4 options; the user can always type their own answer. A request like "a 2 hour study playlist" already fills occasion and length.

## Depth

Ask first, only when the profile has no `Depth` default.

How many questions do you want?

- Quick: 3 questions
- Full: about 6 questions, for a more exact result

## Quick and full

### Start from

What should the playlist grow from?

- One song I can't stop playing
- Artists I'll name
- What I've listened to this week
- My most played songs

"A mix of artists and this week" is the fifth option; offer it when the ask-user tool allows 5, otherwise accept it typed.

### Occasion and mood

What's it for, and what should it feel like? Free text, with examples: "late night walk, sad but warm", "gym, high energy".

### Length

How long should it run?

- About 30 minutes
- About 1 hour
- About 2 hours
- 3 hours or more

Write the answer down in minutes for the generate step.

## Full only

### Familiarity

How much should be new to you? Five levels; offer them as a list from 1 to 5.

1. Only songs I already know
2. Mostly songs I know
3. Half known, half new
4. Mostly new artists
5. Only new artists

Ask-user tools often allow only 4 options. Then offer 1, 2, 4 and 5; the user can type "half and half" for level 3.

### Arc

What shape should it have?

- Steady vibe
- Build up
- Wind down
- Rise and fall

### Popularity

Hits or deep cuts?

- Mostly hits
- A mix
- Mostly deep cuts

## Not asked

Artist spread is a silent default: at most 3 songs per artist, never two in a row. Live testing showed users expect it without being asked. Change it only when the user brings it up.

## Follow-ups

Ask a follow-up only when an answer leaves the description ambiguous:

- **Party or workout**: "Mostly vocals, or fine with instrumentals and remixes?"
- **Sleep or focus**: "Lyrics OK, or mostly instrumental?"
- **Shared listening** (a party, a car with friends): "Should it lean towards songs everyone knows?"

Anything the user says here goes into the description word for word. Anything they don't say stays out.

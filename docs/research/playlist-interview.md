# Playlist interview research

Research for the interview step of the Spotify playlist skill. The question: which things must be asked so that a playlist built for someone is one they love, and which can be inferred.

## Summary

- The sources that exist on playlist curation are small and mostly old. The strongest primary evidence is a qualitative interview study on how people build playlists (Cunningham et al., 2006) and a survey on music listening behaviour that reports activity-dependent effects (Kamalzadeh et al., 2012). Neither gives the per-dimension effect sizes the skill would need.
- Several sources named in the brief could not be verified in full. Their status is marked in the sections below.
- Reddit and Spotify Community evidence is thin for the AI features in particular. Most complaints found concern Discover Weekly and shuffle, not the prompt-based AI Playlist.
- The recommendation (section 7) is mostly judgement. It is built on the few verified findings and is labelled as such.

## 1. Which questions matter most, ranked by evidence

Ranking, from strongest to weakest evidence:

1. **Occasion or activity.** Strongest support. Kamalzadeh et al. report that familiarity, distraction, mood fit and the wish to change mood within a session all depend on the activity during which music is played ([Kamalzadeh, Baur and Möller, ISMIR 2012](https://archives.ismir.net/ismir2012/paper/000373.pdf), abstract only, pp. 373-378). Cunningham et al. study how people build playlists and mixes from interviews and web posts, and the abstract says the information needs map onto MIR tasks ([Cunningham, Bainbridge and Falconer, ISMIR 2006](https://researchcommons.waikato.ac.nz/handle/10289/77), abstract only). The abstract does not say which dimensions matter most.
2. **Familiarity level.** Supported indirectly by the same activity result (familiarity is one of the four activity-dependent variables). Also supported by complaints that recommendations keep returning the same songs ([Spotify Community, Discover Weekly repeats](https://community.spotify.com/t5/Your-Library/Discover-Weekly-songs-are-repeating-and-disappointing-me-quite/m-p/5388972), title only was readable).
3. **Mood or emotional arc.** Mood is one of the four measured variables in Kamalzadeh et al. Spotify's own framing of playlists includes mood, theme and occasion ([Spotify Engineering, Million Playlist Dataset](https://engineering.atspotify.com/introducing-the-million-playlist-dataset-and-recsys-challenge-2018/)).
4. **Length.** Judgement. No verified source measured length preference. It is cheap to ask and it constrains the generator.
5. **Seed artists or existing playlists.** Judgement, supported by the fact that the Million Playlist Dataset task is continuation from existing playlists ([arXiv 1810.01520](https://arxiv.org/abs/1810.01520), abstract). Seeding from the user's own playlists is an inference, not a measured preference.
6. **Ordering and transitions.** Unverified in the playlist literature I could access. See section 3.

Unverified: the "playlist use" data in the Kamalzadeh et al. survey recruitment. The page confirms the study covered playlists in some form only through a recruitment description I could not check, so no playlist result is cited.

## 2. Which answers can be inferred instead of asked

| Dimension | Inference source | Confidence |
| --- | --- | --- |
| Occasion | The request text itself ("for a run", "to study") | High when present |
| Familiarity | Listening history: how often the top artists repeat, and the share of tracks already in the library | Medium, judgement |
| Start from | Whether the user has playlists with names; if they do, offer them as seeds rather than asking which | Judgement |
| Mood | Playlist names and the request wording | Medium |
| Taste exclusions | Excluding a playlist from the taste profile reportedly improved recommendations for one user. Source: a search snippet, not a fetched page; unverified | Low, anecdotal |
| Genre and artist likes | The judge round (the user picks tracks from search results) | High, direct evidence of taste |

Unverified: that Spotify uses any of these inference signals in its own connector. Check the connector before relying on it.

## 3. Ordering and transitions: do people care, and can a one-description generator express it?

- **Do people care.** Unverified. Cunningham et al. study how people build playlists and mixes, and mixes imply transitions, but the abstract I could read does not state a finding about ordering. The full PDF was not read.
- **Evidence from playlist datasets.** Choi, Fazekas and Sandler analysed two playlist datasets to test assumptions about playlists and conclude that deeper understanding is needed ([arXiv 1511.07004](https://arxiv.org/abs/1511.07004), abstract). The abstract does not report ordering results. Unverified for ordering.
- **Skip and session data.** Spotify's Music Streaming Sessions Dataset describes 160 million listening sessions and says it supports session-based sequential recommendation ([arXiv 1901.09851](https://arxiv.org/abs/1901.09851), abstract). It does not, in the abstract, report skip findings. The skip-prediction challenge the brief mentioned is not confirmed by this source.
- **Can a one-description generator express order?** Judgement. A text description can say "start mellow, build to peak, end soft". It cannot control per-transition tempo or key. The generator writes the whole list in one pass, so arc-level ordering is achievable and fine-grained transition control is not.

Recommendation: ask about arc only when the occasion implies one (workout, sleep, dinner). Otherwise do not ask.

## 4. Novelty vs familiarity, and coherence vs variety

- **Familiarity.** Kamalzadeh et al. list familiarity as a dimension that depends on activity ([ISMIR 2012 paper](https://archives.ismir.net/ismir2012/paper/000373.pdf)). This is the only verified finding for this axis. The effect size is not in the abstract.
- **Coherence and variety.** No verified source for this. The Cunningham et al. abstract does not address it.
- **Repetition complaints.** Users on Spotify Community say Discover Weekly reuses a small set of songs over several weeks and that disliked songs return ([Spotify Community thread](https://community.spotify.com/t5/Your-Library/Discover-Weekly-songs-are-repeating-and-disappointing-me-quite/m-p/5388972), title only was readable; a second thread, [Discovery Weekly has been progressively getting worse](https://community.spotify.com/t5/Your-Library/Discovery-weekly-has-been-progressively-getting-worse/m-p/5359421/highlight/true), was seen in search only and its body is unverified). These show that users notice repetition. They do not say how much is too much.
- **Coherence vs variety.** Unverified in the sources I could access. Cunningham et al. touch on mixes and transitions, but the abstract does not give a verdict.

Phrasing for the interview (judgement):

- Familiarity: "How much do you want to hear things you already know, and how much new music?" Options: mostly known, mix, mostly new.
- Coherence: "Should it sound like one thing, or move between styles?" Options: one vibe, a few related styles, wide range.

## 5. Context and activity: how strongly they drive what people want

Kamalzadeh et al. are the only verified source. They report that activity affects familiarity, distraction, mood fit and mood change ([ISMIR 2012 paper](https://archives.ismir.net/ismir2012/paper/000373.pdf)). They also say people want to control these elements but prefer minimal interaction. This is the strongest argument for asking about activity first. The effect size is unverified because I could not read the full paper.

## 6. What typically goes wrong with AI-generated playlists, according to users

Verified complaints, with the caveat that most are about Discover Weekly, shuffle and recommendations, not the prompt-based AI Playlist:

- **Repetition.** Users report the same songs recurring across weeks ([Spotify Community thread](https://community.spotify.com/t5/Your-Library/Discover-Weekly-songs-are-repeating-and-disappointing-me-quite/m-p/5388972), title only). Other Spotify Community threads on the same problem appeared in search results (for example [this one](https://community.spotify.com/t5/Accounts/Discover-Weekly-offering-the-same-songs-every-week/m-p/2426872/highlight/true)), but I could not read their bodies, so the specifics they report are unverified.
- **Only near-copies of known songs.** Some users say suggestions surface covers of songs already in their library ([BGR, Spotify complaints](https://www.bgr.com/2216137/most-common-customer-complaints-about-spotify/), fetched; the article is a secondary summary).
- **Saved songs reappearing.** Discover playlists include songs users already saved ([BGR](https://www.bgr.com/2216137/most-common-customer-complaints-about-spotify/), fetched).
- **Off-brand or unwanted AI tracks.** Users report AI-generated songs in recommendations. Cited via [TechRadar](https://www.techradar.com/audio/spotify/ai-music-is-flooding-spotify-and-subscribers-are-furious-heres-why-music-fans-no-longer-trust-discover-weekly), which I fetched; the article's Reddit links were not visible, so the r/truespotify thread it cites is unverified.
- **Prompt-based AI Playlist output.** A user-shared screenshot showed the feature refusing or lecturing on one prompt. The source is X, not Reddit, and it is a secondary report ([MusicTech](https://musictech.com/news/music/people-accuse-spotify-ai-playlist-feature-of-being-homophobic), search snippet, unverified).
- **Feature access.** A Spotify Community thread is titled "I did not get the new 'create AI playlist' feature" ([thread](https://community.spotify.com/t5/Your-Library/I-did-not-get-the-new-create-AI-playlist-feature/m-p/6910679/highlight/true), title only was readable). The claim that the feature was in gradual rollout comes from a moderator reply in a search snippet and is unverified.

Not found: Reddit threads specific to Spotify AI Playlist quality. The Reddit complaint I could verify is about YouTube Music auto-playlists, via news coverage ([Android Authority](https://www.androidauthority.com/youtube-music-ai-slop-recommendation-issues-3629759), search snippet only). A Reddit shuffle analysis is reported secondhand by [Android Authority](https://androidauthority.com/spotify-shuffle-repeating-song-queue-3708815), which returned HTTP 403 when fetched, so the claim is unverified beyond the search snippet.

## 7. Recommendation

### Six questions

Each question lists options. Backing is marked: **[evidence]** means a verified source in sections 1-6, **[judgement]** means my reasoning.

1. **What is the occasion?** Options: working or studying, exercise, relaxing or sleep, social or party, driving, other. **[evidence]** for activity effects (Kamalzadeh et al.). Ask unless the request already says it.
2. **How familiar should it feel?** Options: mostly known songs, a mix, mostly new. **[evidence]** that familiarity is activity-dependent. The three-way split is **[judgement]**; the brief's 5-level scale is probably more than needed.
3. **Should it stay one vibe or move?** Options: one steady mood, a gentle arc, a clear build or peak. **[judgement]** for the split. The arc option is the only ordering control a text generator can express.
4. **How long?** Options: about 30 min, about 60 min, about 90 min or more. **[judgement]**.
5. **Anything to avoid?** Options: specific artists or genres, explicit lyrics, AI-generated music if the user cares. **[evidence]** that users complain about unwanted tracks and AI tracks. The question is **[judgement]**.
6. **Judge round.** Keep it, but use it for genre and artist taste only. **[evidence]** that it is the most direct taste signal available, but this rests on reasoning from the inference table, not on a cited study.

### Infer silently

- Familiarity, when listening history is available: check how often the top artists repeat. **[judgement]**
- Starting artists and genres, from the judge round and top artists. **[judgement]**
- Mood, from playlist names when they are available. **[judgement]**
- Whether to seed from existing playlists: do it if the user has named ones; do not ask which. **[judgement]**
- Avoid repeating songs recently shown in past playlists. **[evidence]** that repetition is a top complaint.

### Not asked, not inferred

- Transition-level tempo or key. The generator cannot control it. **[judgement]**

## Sources

Verified (fetched and read, abstract or page level):

- Choi, Fazekas, Sandler, "Understanding Music Playlists", ICML 2015 Machine Learning for Music Discovery workshop. [arXiv 1511.07004](https://arxiv.org/abs/1511.07004)
- Cunningham, Bainbridge, Falconer, "More of an art than a science: Supporting the creation of playlists and mixes", ISMIR 2006. Repository record with abstract; full PDF not read. [Waikato Research Commons, handle 10289/77](https://researchcommons.waikato.ac.nz/handle/10289/77)
- Kamalzadeh, Baur, Möller, "A Survey on Music Listening and Management Behaviours", ISMIR 2012, pp. 373-378. [ISMIR archive PDF](https://archives.ismir.net/ismir2012/paper/000373.pdf). The agent read only the abstract and did not report playlist findings.
- Zamani, Schedl, Lamere, Chen, "An Analysis of Approaches Taken in the ACM RecSys Challenge 2018 for Automatic Music Playlist Continuation". [arXiv 1810.01520](https://arxiv.org/abs/1810.01520)
- Spotify Engineering, "Introducing the Million Playlist Dataset and RecSys Challenge 2018". [Spotify Engineering](https://engineering.atspotify.com/introducing-the-million-playlist-dataset-and-recsys-challenge-2018/)
- Brost, Mehrotra, Jehan, "The Music Streaming Sessions Dataset". [arXiv 1901.09851](https://arxiv.org/abs/1901.09851). The abstract does not mention skips.
- Spotify Community, "Discover Weekly songs are repeating and disappointing me quite often recently". Title only was readable. [Thread](https://community.spotify.com/t5/Your-Library/Discover-Weekly-songs-are-repeating-and-disappointing-me-quite/m-p/5388972)
- Spotify Community, "I did not get the new 'create AI playlist' feature". Title only was readable. [Thread](https://community.spotify.com/t5/Your-Library/I-did-not-get-the-new-create-AI-playlist-feature/m-p/6910679/highlight/true)
- Spotify Community, "Issues with Spotify's recommendation algorithms". Title only was readable. [Thread](https://community.spotify.com/t5/Your-Library/Issues-with-Spotify-s-recommendation-algorithms/td-p/5646049)
- BGR, "3 Of The Most Common Customer Complaints About Spotify" (secondary). [BGR](https://www.bgr.com/2216137/most-common-customer-complaints-about-spotify/)
- TechRadar, "AI music is flooding Spotify" (secondary). [TechRadar](https://www.techradar.com/audio/spotify/ai-music-is-flooding-spotify-and-subscribers-are-furious-heres-why-music-fans-no-longer-trust-discover-weekly)

Found in search only, not read in full (treat as unverified):

- Spotify Community, "Discover Weekly offering the same songs every week". [Thread](https://community.spotify.com/t5/Accounts/Discover-Weekly-offering-the-same-songs-every-week/m-p/2426872/highlight/true)
- MusicTech, on the AI Playlist screenshot (secondary). [MusicTech](https://musictech.com/news/music/people-accuse-spotify-ai-playlist-feature-of-being-homophobic)
- Android Authority, YouTube Music AI tracks (secondary). [Android Authority](https://www.androidauthority.com/youtube-music-ai-slop-recommendation-issues-3629759)
- Android Authority, Spotify shuffle repeats (secondary; HTTP 403 on fetch). [Android Authority](https://androidauthority.com/spotify-shuffle-repeating-song-queue-3708815)

Named in the brief but not verified, so not cited for any claim:

- Bonnin and Jannach, "Automated generation of music playlists: Survey and experiments", ACM Computing Surveys 47(2), 2014. Title and venue confirmed via a citing reference, not via the publisher. The DOI could not be confirmed: 10.1145/2644175 was not verified, and 10.1145/2652481 resolved to an ACM page that was not read, so it is not used.
- Schedl et al. survey on music recommender systems. Not searched.
- Spotify Research papers on playlist intent or titles. Search found none specific to intent; not cited.
- Kamalzadeh et al. playlist-use results. Not found in the abstract.
- Choi et al. ordering or coherence results. Not found in the abstract.
- Reddit threads about Spotify AI Playlist quality. Not found.

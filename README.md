# Vibelympics 🏅✨

Welcome to Chainguard's Vibelympics, our first ever vibe coding tournament, where the only rule is writing code without looking at the code! 

## Entering the Competition

To register for the competition, follow these steps:

1. Make sure you're [logged in to GitHub](https://github.com/login).
2. Navigate to the [Vibelympics repository](https://github.com/chainguard-demo/vibelympics#) (this page).
3. On the top right of the repository page, near where Stars are listed, hit the green `Use this template` button, then select `Create new repository` from the dropdown. You can also [follow this direct link](https://github.com/new?template_name=vibelympics&template_owner=chainguard-demo).
4. Fill out the create repository form, filling in the GitHub account or organization that will host your Vibelympics
 repo. We recommend naming the repo `vibelympics`, but the important thing is not to change the name of the repository after you've submitted the URL to us.
5. After creating the repository, fill out the [registration form](https://vibelympics.splashthat.com/). For the field labeled "GitHub repository URL," share the link to the repository you just created.

After registering, take next steps:

1. ~~Edit this README with information related to the projects you create for the competition.~~ ✅
2. ~~When the competition starts on December 1st, review the folder for the first round of Vibelympics for information on the challenge. You'll also receive an email from us.~~ ✅
3. ~~Start vibing!~~ ✅ **VIBING IN PROGRESS**

---

## 🎵 Our Submissions

<div align="center">

### 📻 Round 1: Bill Wurtz Radio 🎨

```
╔═══════════════════════════════════════════════════════════╗
║  🌈  AN EMOJI-ONLY MUSIC PLAYER THAT FIGHTS BACK  ⚠️  ║
╚═══════════════════════════════════════════════════════════╝
```

[![Made with Emojis](https://img.shields.io/badge/Made%20with-Emojis-ff69b4?style=for-the-badge)](round_1/)
[![Powered by Bill Wurtz](https://img.shields.io/badge/Powered%20by-Bill%20Wurtz-00d4ff?style=for-the-badge)](https://www.youtube.com/@billwurtz)
[![Chainguard Inside](https://img.shields.io/badge/Chainguard-Inside-00b4d8?style=for-the-badge)](https://chainguard.dev)
[![Has Penalty Mode](https://img.shields.io/badge/Has-Penalty%20Mode-ff4444?style=for-the-badge)](round_1/)

**🌐 [LIVE DEMO](https://billwurtzradio.up.railway.app/) | 📖 [Full Documentation](round_1/README.md)**

</div>

#### 🎭 What Is It?

A fullscreen music video player featuring **98 Bill Wurtz videos** with an interface made **entirely of emojis**. No words. No text. Just vibes. And if you skip too many songs too fast? The player **locks you out**. That's right—penalty mode.

#### ✨ The Highlights

- 🎵 **98 Videos** - 95 music videos + 3 legendary history videos
- 🚫 **Zero Text** - Every button, label, and title is an emoji
- ⚠️ **Penalty Mode** - Skip 5 songs under 10 seconds? Next button locks for 3 songs
- ❤️ **Weighted Shuffle** - Loved songs appear 3x more often
- 💾 **localStorage Magic** - Remembers your plays, loves, and even your sins (skips)
- ⌨️ **Keyboard Shortcuts** - Space, Arrows, V, M, C, X (for the cool kids)
- 👻 **Ghost Controls** - Auto-hide after 5 seconds when playing
- 📜 **Smart History** - Navigate through your actual listening history
- 🐳 **Tiny Container** - Chainguard nginx, only 16.9MB

#### 🚀 Quick Start

**Try it live:** [https://billwurtzradio.up.railway.app/](https://billwurtzradio.up.railway.app/)

Or run locally:
```bash
cd round_1
docker build -t bill-wurtz-radio .
docker run -p 8080:8080 bill-wurtz-radio
# Open http://localhost:8080 and prepare for vibes
```

#### 🎯 Challenge Compliance

| Requirement | Status | Notes |
|:------------|:------:|:------|
| Emoji-only UI | ✅ | Not a single word in the interface |
| Functional App | ✅ | 98 videos, full player controls |
| Chainguard Container | ✅ | nginx, 16.9MB |
| Gets Weird | ✅✅✅ | Penalty mode says hello |

**[📖 Full Documentation →](round_1/README.md)**

---

</div>

## Schedule

<table role="table" aria-label="Vibelympics Competition Schedule">
  <thead>
    <tr>
      <th scope="col">Round</th>
      <th scope="col">Opens</th>
      <th scope="col">Submission Deadline</th>
      <th scope="col">Judging & Results</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Challenge 1</th>
      <td>December 1</td>
      <td>December 4, 11:59 PM EST</td>
      <td>December 5 (advancing teams announced)</td>
    </tr>
    <tr>
      <th scope="row">Challenge 2</th>
      <td>December 8</td>
      <td>December 11, 11:59 PM EST</td>
      <td>December 12 (finalists announced)</td>
    </tr>
    <tr>
      <th scope="row">Challenge 3 (Final)</th>
      <td>December 15</td>
      <td>December 18, 11:59 PM EST</td>
      <td>December 19 (livestream judging, time TBD)</td>
    </tr>
  </tbody>
</table>

## FAQ

Q: What do you mean, don't look at the code? How are you going to enforce that.

A: We can see you through our Chainguard Omniscope at all times and we will be / are monitoring you. By the way, you should consider wearing more interesting socks.

Q: No, really. Can I look at the code?

A: No.

Q: Can the AI look at the code?

A: Yes, of course. Your'e starting to get it now.

Q: I have a cool idea for the challenge, but, like, I'm worried it violates the requirements you wrote.

A: What are you, some kind of rule follower? Just do it.

Q: Can I post about my project on *teh socials*?

A: Yes, use hashtag #vibelympics and/or tag Chainguard, we'll do our best to repost / boost.

Q: Can I get a hint or something. I read this far in the FAQ and I'm probably the only one who did that.

A: Yeah, why not. We at Chainguard love talking about our beloved octopus friend Linky, burrito bowls, and wearing hats of all kinds. We also, for some reason, like to use Uber ratings as a judge of character. If you want to pander to us you can incorporate or talk about our products (Chainguard Containers, Chainguard Libraries, and Chainguard VMs) or OSS projects we're connected to (Sigstore, K8s, SLSA, Kaniko, Tekton). 

Q: Should we pander to you? Will we win if we do that?

A: Don't you ever get tired of asking questions? You do you. 👈(❛ ᗜ ❛👈)


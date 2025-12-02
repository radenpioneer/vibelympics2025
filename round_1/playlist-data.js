// Bill Wurtz Music Video Playlist
// Extracted from: https://www.youtube.com/playlist?list=PLo7FOXNe7Yt8uSjFvUT4-DNdQYR1qU3aC
// All 98 videos with emoji-translated titles (95 from playlist + 3 history videos)

const PLAYLIST_DATA = [
  {
    id: 'mpkf_p71rKY',
    title: 'might quit',
    emojiTitle: '🚪👋😔'
  },
  {
    id: 'V0HCZ4YGqbw',
    title: 'La de da de da de da de day oh',
    emojiTitle: '🎵🎶🎤✨'
  },
  {
    id: 'RffAHV3tcgM',
    title: '"i don\'t wanna go to school" full song',
    emojiTitle: '🏫❌😫'
  },
  {
    id: 'zNTaVTMoNTk',
    title: 'here comes the sun',
    emojiTitle: '☀️🌅🎵'
  },
  {
    id: 'O2yPnnDfqpw',
    title: 'i just did a bad thing',
    emojiTitle: '😈🙊💔'
  },
  {
    id: 'elizAugXVcI',
    title: 'Mount St. Helens is about to Blow Up',
    emojiTitle: '🌋💥⚠️'
  },
  {
    id: 'NHZr6P1csiY',
    title: 'and the day goes on',
    emojiTitle: '☀️🔄⏰'
  },
  {
    id: 'g02WKrWjUgA',
    title: 'alphabet shuffle',
    emojiTitle: '🔤🔀🎲'
  },
  {
    id: '0MIK7bb69xk',
    title: 'outside',
    emojiTitle: '🌳🌤️🚪'
  },
  {
    id: 'IRSWmkSJJEs',
    title: 'got some money',
    emojiTitle: '💰💵🤑'
  },
  {
    id: 'cXuuhdCnMiU',
    title: 'i\'m a princess',
    emojiTitle: '👸✨💎'
  },
  {
    id: 'KUs1Popfd8g',
    title: 'i wanna be a movie star',
    emojiTitle: '🎬⭐🎥'
  },
  {
    id: 'CpelFcu602A',
    title: 'the Moon is made of Cheese (but i can\'t taste it)',
    emojiTitle: '🌙🧀👅❌'
  },
  {
    id: '0jEm6owSKFU',
    title: 'long long long journey',
    emojiTitle: '🚶🗺️🌍'
  },
  {
    id: 'ldaQLGOoJW0',
    title: 'hello sexy pants',
    emojiTitle: '👋👖😏'
  },
  {
    id: 'q-qqrGtlHkg',
    title: 'at the airport terminal',
    emojiTitle: '✈️🏢🧳'
  },
  {
    id: 'HCxJ4gAt2cs',
    title: 'i\'m Best Friends with my Own Front Door',
    emojiTitle: '🚪🤝😊'
  },
  {
    id: 'CX-Qr8iNqm0',
    title: 'When I Get Older',
    emojiTitle: '👴⏳📅'
  },
  {
    id: 'ZZwii-qhi-c',
    title: 'song: shut up',
    emojiTitle: '🤐🙊❌'
  },
  {
    id: '83w4FgVkjUE',
    title: 'Slow Down',
    emojiTitle: '🐌⏱️🛑'
  },
  {
    id: '3MU_2N1TZM4',
    title: 'i\'m scared',
    emojiTitle: '😨😱💀'
  },
  {
    id: 'jDYXgsMzwSI',
    title: 'christmas isn\'t real',
    emojiTitle: '🎄❌🤷'
  },
  {
    id: 'iLTX81pLOsc',
    title: 'write a tune that really sucks',
    emojiTitle: '🎵💩😅'
  },
  {
    id: 'vf5AMfIOqGw',
    title: 'more than a dream',
    emojiTitle: '💭✨🌟'
  },
  {
    id: 'gqxT6KOFRIo',
    title: 'hallelujah',
    emojiTitle: '🙏✨🎶'
  },
  {
    id: 'ZsmOSHt3MmE',
    title: 'where i\'ve been',
    emojiTitle: '🗺️❓🚶'
  },
  {
    id: 'Th56Xg6OE5s',
    title: 'song: "you\'re free to do whatever you want to"',
    emojiTitle: '🆓✨🎉'
  },
  {
    id: 'i6Mg4WSK_v8',
    title: 'song: i\'m a diamond',
    emojiTitle: '💎✨🔷'
  },
  {
    id: 'mai8KdlzTPo',
    title: 'i\'m a huge gamer most of the time',
    emojiTitle: '🎮🕹️⏰'
  },
  {
    id: 'Dfyswlszyhg',
    title: 'song: "i\'m crazy / it\'s raining"',
    emojiTitle: '🤪☔💧'
  },
  {
    id: '0_wzpkwIM2A',
    title: 'at the corner store',
    emojiTitle: '🏪🛒🌃'
  },
  {
    id: 'cixnLVRRVK0',
    title: 'fly around',
    emojiTitle: '🦅🌍✈️'
  },
  {
    id: '1MvzHGmwgvg',
    title: 'the ending',
    emojiTitle: '🔚🎬👋'
  },
  {
    id: 'vrEG1osAzbM',
    title: '9 8 7',
    emojiTitle: '9️⃣8️⃣7️⃣'
  },
  {
    id: 't6jvMWB8iTs',
    title: 'song: i\'m confused',
    emojiTitle: '😵🤔❓'
  },
  {
    id: 'Np7fFcHFkpg',
    title: 'if the world doesn\'t end',
    emojiTitle: '🌍❌💥'
  },
  {
    id: 'gy0T0QmUV5s',
    title: 'the ground plane',
    emojiTitle: '✈️🛬🌍'
  },
  {
    id: 'dvrBEyKdIiU',
    title: 'i like to wear soft clothing (cause it makes me feel like i\'m rough in comparison)',
    emojiTitle: '👕☁️😌'
  },
  {
    id: 'J2ukpvP5mL8',
    title: 'song: new canaan',
    emojiTitle: '🏘️🗺️✨'
  },
  {
    id: '6pKpUZ7j-Bc',
    title: 'song: the \'ngiueh\' song',
    emojiTitle: '🎵❓😵'
  },
  {
    id: 'KFo9WcA6PF0',
    title: 'meet me in september',
    emojiTitle: '📅🍂🤝'
  },
  {
    id: 'hZ8FqNt_gIs',
    title: 'lima beans',
    emojiTitle: '🫘🥫🍽️'
  },
  {
    id: 'fR2xOh8CqMM',
    title: 'sheep',
    emojiTitle: '🐑🐏🌾'
  },
  {
    id: 'iYeqMr7eovg',
    title: 'no castle',
    emojiTitle: '🏰❌😔'
  },
  {
    id: 'vjUOJEXiX3g',
    title: 'I Wanna Go Home music video',
    emojiTitle: '🏠💭😢'
  },
  {
    id: 'phIWJsqk7_o',
    title: 'song: hi bye',
    emojiTitle: '👋👋⚡'
  },
  {
    id: 'zwc27e98jI4',
    title: 'napkins',
    emojiTitle: '🧻🍽️📄'
  },
  {
    id: 'XllyrBTSUTs',
    title: 'i\'m sad',
    emojiTitle: '😢😭💔'
  },
  {
    id: 'pwi3AmAJO5k',
    title: 'song: i like',
    emojiTitle: '👍❤️😊'
  },
  {
    id: 'TgZH9s788mQ',
    title: 'tuesday',
    emojiTitle: '📅🗓️2️⃣'
  },
  {
    id: 'xCiGCUPIfKA',
    title: 'eat dirt',
    emojiTitle: '🌍🍽️😵'
  },
  {
    id: 'RmU1SnONi70',
    title: 'sing a really dumb song',
    emojiTitle: '🎤💩😂'
  },
  {
    id: 'xNA9Grcthbg',
    title: 'don\'t make (me write you a melody)',
    emojiTitle: '❌🎵🙅'
  },
  {
    id: 'T589gU3sJgE',
    title: 'blind (to no avail)',
    emojiTitle: '👁️❌🕶️'
  },
  {
    id: 'mEr3bR_tmeo',
    title: 'christmas video',
    emojiTitle: '🎄🎥🎅'
  },
  {
    id: 'UcoxBy6DO94',
    title: 'song: dance the',
    emojiTitle: '💃🕺🎶'
  },
  {
    id: 'YhBRhE2l_Gk',
    title: 'song: feel okay',
    emojiTitle: '😌👌✨'
  },
  {
    id: 'DofhF-2sg1o',
    title: 'time mop',
    emojiTitle: '⏰🧹🤷'
  },
  {
    id: '9jUmsBnyBxA',
    title: 'buy my car',
    emojiTitle: '🚗💰🛒'
  },
  {
    id: 'EBur58ZtEqA',
    title: 'the peanut butter song',
    emojiTitle: '🥜🧈🎵'
  },
  {
    id: 'tnwEiGxUYGA',
    title: 'lalala',
    emojiTitle: '🎵🎶🎤'
  },
  {
    id: 'wJXYNRH4bIY',
    title: 'song: sing me a song',
    emojiTitle: '🎤🎵🙏'
  },
  {
    id: 'dvqo-0lY25s',
    title: 'song: barf on me',
    emojiTitle: '🤮💚😵'
  },
  {
    id: 'kzwcCQL1W5w',
    title: 'music video: hey jodie foster',
    emojiTitle: '👋🎬⭐'
  },
  {
    id: 'aguecnU9VoU',
    title: 'song: still silly',
    emojiTitle: '🤪😜🎉'
  },
  {
    id: 'SoRQPnoQw0o',
    title: 'apple juice',
    emojiTitle: '🍎🧃🥤'
  },
  {
    id: 'uPzHKjwhYR0',
    title: 'no harm',
    emojiTitle: '✅☮️😌'
  },
  {
    id: 'p7Oa_IOEzLI',
    title: 'humans',
    emojiTitle: '👥🌍🧑'
  },
  {
    id: '9IcOmfzRjqA',
    title: 'grow mushrooms on the sidewalk',
    emojiTitle: '🍄🚶🌆'
  },
  {
    id: 'LSY8qQ0dcGo',
    title: 'don\'t look in a boot',
    emojiTitle: '👢👀❌'
  },
  {
    id: 'KeoYsbMj0ME',
    title: 'i\'m not sure',
    emojiTitle: '🤔❓🤷'
  },
  {
    id: 'LrIj9v6fL8Y',
    title: 'get outta here',
    emojiTitle: '🚪👉🏃'
  },
  {
    id: 'ZkIF4_puhq8',
    title: 'couldn\'t succeed',
    emojiTitle: '❌😔💔'
  },
  {
    id: '90ouR-cvJ0A',
    title: 'icy james',
    emojiTitle: '🧊❄️👤'
  },
  {
    id: 'lpPPe1M6QWw',
    title: 'raindrops are poisonous',
    emojiTitle: '☔💧☠️'
  },
  {
    id: 'II2CM-Ru0qU',
    title: 'music video: tape deck',
    emojiTitle: '📼🎵📻'
  },
  {
    id: '9imijTTRs14',
    title: 'song: i was wondering how to feel',
    emojiTitle: '🤔💭😶'
  },
  {
    id: 'XYVsASkcoJ4',
    title: 'little door',
    emojiTitle: '🚪🔍👶'
  },
  {
    id: 'qZ32j-ghjR4',
    title: 'im stuck in a rut',
    emojiTitle: '🕳️😫🔄'
  },
  {
    id: '2xMJurbXc8k',
    title: 'skip to my loo',
    emojiTitle: '🚽🎵💃'
  },
  {
    id: 'OMJzgjf26zo',
    title: 'music is cool',
    emojiTitle: '🎵😎✨'
  },
  {
    id: 'Whb9QSnM114',
    title: 'song: gross insides',
    emojiTitle: '🤢🫀💚'
  },
  {
    id: 'ORGxjP48glU',
    title: 'song: hello (2)',
    emojiTitle: '👋😊🎵'
  },
  {
    id: '2iPktazDZyA',
    title: 'don\'t be good to your neighbor',
    emojiTitle: '🏘️❌😈'
  },
  {
    id: 'eGMuJMRamJc',
    title: 'can i reach for the stars?',
    emojiTitle: '⭐🙌❓'
  },
  {
    id: 'cHy0msrWx80',
    title: 'song: get real',
    emojiTitle: '💯🎯😤'
  },
  {
    id: '6PEA1rCeZnk',
    title: 'song: home from work',
    emojiTitle: '🏠💼🚶'
  },
  {
    id: 'vmhlkUxPYuc',
    title: 'i have the heebity deebity\'s',
    emojiTitle: '😵🤪🎵'
  },
  {
    id: 'xCiy3yZZP5g',
    title: 'song: go home (i wanna)',
    emojiTitle: '🏠👉🚶'
  },
  {
    id: 'GwbscLQNSqE',
    title: 'song: the zoo',
    emojiTitle: '🦁🐘🦒'
  },
  {
    id: 'kvU13y2uq0o',
    title: 'sickness as usual',
    emojiTitle: '🤒😷🔄'
  },
  {
    id: 'KCF3PRcBqHE',
    title: 'rock\'n\'roll confusion',
    emojiTitle: '🎸🤘😵'
  },
  {
    id: 'CNIBk1BhADM',
    title: 'song: macy\'s',
    emojiTitle: '🏬🛍️🎁'
  },
  {
    id: 'pe2H1AF6dsU',
    title: 'go back to where you belong',
    emojiTitle: '↩️🏠👉'
  },
  {
    id: 'apo_zSTeTa4',
    title: 'i know, but i can\'t say',
    emojiTitle: '🤐💭🤷'
  },
  {
    id: 'xuCn8ux2gbs',
    title: 'history of the entire world, i guess',
    emojiTitle: '🌍📜🤷✨'
  },
  {
    id: 'n9xQTEHebpA',
    title: 'history of the world',
    emojiTitle: '🌎📖⏳'
  },
  {
    id: 'Mh5LY4Mz15o',
    title: 'history of japan',
    emojiTitle: '🇯🇵🏯📜'
  },
];

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

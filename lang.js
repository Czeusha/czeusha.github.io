/* Przelacznik jezyka.
   Polski jest tekstem domyslnym wpisanym w HTML.
   Kolejne jezyki dodajesz tutaj: wystarczy dopisac nowy blok w TRANSLATIONS
   (np. de: { ... }) oraz przycisk w menu (<button data-lang="de">DE</button>). */

var TRANSLATIONS = {
  en: {
    title: "Czeusha – Mods and projects",
    r_title: "Risen Together – co-op mod for Risen | Czeusha",

    nav_home: "Home",
    nav_links: "Links",

    h1: "Mods. Co-op.<br><em>Old games, new life.</em>",
    hero_p: "Small YouTuber, gamer and streamer. I make mods, build co-op projects and prepare ready-made packs of older games that are easy to run on modern computers.",
    btn_projects: "My projects",

    projects_h: "Projects",
    projects_sub: "Everything I'm working on and have already made, in one place.",
    badge_dev: "In development",
    badge_done: "Released",
    badge_planned: "Planned",
    risen_p: "A co-op mod for Risen. Play the adventure with a friend.",
    coop_p: "A set of 150 Morrowind mods, prepared for playing in co-op.",
    dub_h: "Polish dubbing for Morrowind",
    dub_p: "An installer for Polish voice dubbing for Morrowind, made together with the Polish Khajiits.",
    hom_h: "Polish translation for HoM 5",
    hom_p: "A Polish translation for Heroes of Might and Magic 5 with both expansions, available on Steam.",
    guides_h: "Steam guides",
    guides_p: "Many game guides published on Steam.",
    retro_p: "Ready-made packs of older games, set up to launch easily on new computers.",

    about_h: "About me",
    about_sub: "A gamer who loves old productions despite powerful hardware. I mostly play games with a co-op mode, whether through mods or natively. You'll find all my mods and downloads on this site.",
    about_note: "I only share mods, patches and installers. You need your own copy of the original game to use them.",

    links_h: "Links",
    links_sub: "Where to find me.",
    tip_s: "Support my work",

    r_hero_p: "A co-op mod for Risen. Explore the island with a friend instead of wandering alone.",
    r_dl: "Download – coming soon",
    r_how: "How to install",
    r_video_h: "Trailer / showcase",
    r_video_sub: "The mod is best shown in a video.",
    r_video_ph: "Video will appear here",
    r_about_h: "About the mod",
    r_about_sub: "Risen Together is a work in progress. This page will be updated with details, screenshots and downloads as development goes on.",
    r_feat_h: "Features",
    r_f1: "Co-op play (details coming soon)",
    r_f2: "Feature 2",
    r_f3: "Feature 3",
    r_gal_h: "Gallery",
    r_gal_sub: "Screenshots and short clips from the mod.",
    r_shot1: "Screenshot 1",
    r_shot2: "Screenshot 2",
    r_shot3: "Screenshot 3",
    r_inst_h: "How to install",
    r_inst_sub: "Instructions will be added after the first test version is released.",
    r_s1: "Install Risen (original copy of the game required).",
    r_s2: "Download the latest version of the mod from this page.",
    r_s3: "Follow the instructions included in the package.",
    r_log_h: "Changelog",
    r_log_sub: "What changed in each version.",
    r_log_t: "Project started",
    r_log_p: "Work on Risen Together has begun.",
    r_warn: "This is an early, experimental project. Expect bugs and changes. The mod requires your own copy of Risen and is not affiliated with the game's creators or publisher."
  }
};

function setLang(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    if (el.dataset.pl === undefined) el.dataset.pl = el.innerHTML;
    var text = null;
    if (lang !== 'pl' && TRANSLATIONS[lang]) text = TRANSLATIONS[lang][el.dataset.i18n];
    el.innerHTML = (text !== null && text !== undefined) ? text : el.dataset.pl;
  });

  document.querySelectorAll('.lang button').forEach(function (b) {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  try { localStorage.setItem('lang', lang); } catch (e) {}
}

function detectLang() {
  try {
    var saved = localStorage.getItem('lang');
    if (saved === 'pl' || TRANSLATIONS[saved]) return saved;
  } catch (e) {}
  var nav = (navigator.language || 'pl').slice(0, 2).toLowerCase();
  return (nav === 'pl' || !TRANSLATIONS[nav]) ? (nav === 'pl' ? 'pl' : 'en') : nav;
}

document.querySelectorAll('.lang button').forEach(function (b) {
  b.addEventListener('click', function () { setLang(b.dataset.lang); });
});

setLang(detectLang());

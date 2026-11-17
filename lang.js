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
    coop_h: "Co-op projects",
    coop_sub: "Mods that let you play with friends.",
    retro_sub: "Ready-made packs of older games for modern computers.",
    retro_soon_h: "First packs coming soon",
    retro_soon_p: "More titles will appear on this list as they're ready.",
    other_h: "Other released projects",

    about_h: "About me",
    about_sub: "A gamer who loves old productions despite powerful hardware. I mostly play games with a co-op mode, whether through mods or natively. You'll find all my mods and downloads on this site.",
    about_note: "I only share mods, patches and installers. You need your own copy of the original game to use them.",

    links_h: "Links",
    links_sub: "Where to find me.",
    tip_s: "Support my work",
    dc_online: "online",
    dc_members: "members",
    dc_join: "Join on Discord",

    r_hero_p: "A co-op mod for Risen. Explore the island with a friend instead of wandering alone.",
    r_dl: "Download – coming soon",
    r_how: "How to install",
    r_about_h: "About the mod",
    r_about_sub: "Risen Together adds a co-op mode to Risen. The project is in development, and this page will be updated with screenshots, videos and downloads.",

    r_feat_h: "Features",
    r_dev_note: "The features below work in the development build. A downloadable release is not available yet.",
    r_done_h: "Already working",
    r_wip_h: "Work in progress",
    r_plan_h: "Planned",

    d1: "Trading between players",
    d2: "Splitting item stacks and dropping items (not in the original game)",
    d3: "Lighting sync: torches and magic light",
    d4: "Sprint mechanic with sync",
    d5: "Combat and movement animation sync",
    d6: "Bow shooting sync",
    d7: "New graphical HUD",
    d8: "HUD for damage, attributes and enemy health",
    d9: "Player locator: shows where another player is, in which direction and how far",
    d10: "Player color selection",
    d11: "Built-in co-op settings where you can customize everything: native Risen, my enhanced variant, or e.g. just the new compass and UI",

    w1: "Moving Risen to a new rendering engine (Vulkan wrapper): better rendering, longer draw distance and more graphics options",

    p1: "Minimap",
    p2: "Dialogue and quest sync",
    p3: "Magic sync: transformation, summoning, telekinesis, levitation",
    p4: "Play as other characters, not only the main hero",
    p5: "Graphics refresh: shaders and textures",
    p6: "New content, balance and mechanics",
    p7: "A launcher that downloads and installs everything automatically",
    p8: "Steam integration: play with friends through Steam",

    r_video_h: "Trailer / showcase",
    r_video_sub: "Once there is a build worth recording, a gameplay video will appear here.",
    r_video_ph: "Video will appear here",
    r_gal_h: "Gallery",
    r_gal_sub: "Screenshots will appear here when there is something to show.",
    r_shot1: "Screenshot 1",
    r_shot2: "Screenshot 2",
    r_shot3: "Screenshot 3",
    r_inst_h: "How to install",
    r_inst_sub: "In the end, a launcher will download and install everything for you. A downloadable version is not available yet.",
    r_s1: "Install Risen (original copy of the game required).",
    r_s2: "Download the Risen Together launcher (coming soon).",
    r_s3: "The launcher installs the mod and lets you set up co-op your way.",
    r_log_h: "Changelog",
    r_log_sub: "What changed in each version.",
    r_log_t: "Project started",
    r_log_p: "Work on Risen Together has begun.",
    r_warn: "This is an early, experimental project. Expect bugs and changes. The mod requires your own copy of Risen and is not affiliated with the game's creators or publisher.",

    s_hero_p: "Watch me live and check when the next streams are.",
    s_live_h: "Live",
    s_live_sub: "When I'm streaming, you'll see the stream here. Otherwise you'll see an offline screen.",
    s_sched_h: "Schedule",
    s_sched_sub: "When I usually stream.",
    s_tz: "Times are in Polish time.",
    s_col_day: "Day",
    s_col_time: "Time",
    s_col_what: "What I stream",
    s_mon: "Monday",
    s_tue: "Tuesday",
    s_wed: "Wednesday",
    s_thu: "Thursday",
    s_fri: "Friday",
    s_sat: "Saturday",
    s_sun: "Sunday"
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

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
    nav_coop: "Co-op projects",
    nav_other: "Other projects",

    h1: "Mods. Co-op.<br><em>Old games, new life.</em>",
    hero_p: "Small YouTuber, gamer and streamer. I make mods, build co-op projects and prepare ready-made packs of older games that are easy to run on modern computers.",
    btn_projects: "My projects",

    feat_h: "Main project",
    feat_sub: "You'll also find all projects in the menu at the top of the page.",
    btn_view: "View project",
    badge_dev: "In development",
    badge_done: "Released",
    badge_planned: "Planned",
    risen_p: "A co-op mod for Risen. Play the adventure with a friend.",
    dub_h: "Polish dubbing for Morrowind",
    hom_h: "Polish translation for HoM 5",
    guides_h: "Steam guides",
    retro_soon_h: "First packs coming soon",

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
    s_sun: "Sunday",

    btn_support: "Support me",
    yt_soon_s: "Coming soon",
    yt_soon_title: "The YouTube channel link will appear soon",

    s_yt_soon: "The YouTube player will appear once I add my channel.",
    s_open_twitch: "Open on Twitch",
    s_open_kick: "Open on Kick",
    s_open_yt: "Open on YouTube",
    s_yt_live: "Live stream",

    n_bell_aria: "Notifications",
    n_pop_h: "Notifications",
    n_pop_p: "Choose what I should notify you about. Each setting works independently.",
    n_updates: "Site and mod updates",
    n_updates_btn: "Notify me about new changes",
    n_twitch: "Stream on Twitch",
    n_kick: "Stream on Kick",
    n_youtube: "Stream on YouTube",
    n_all_on: "Turn on all",
    n_all_off: "Turn off all",
    n_on: "On",
    n_off: "Off",
    n_soon: "Notifications will be available soon.",
    n_stream_h: "Notify me about streams",
    n_stream_p: "You'll get a notification when I go live. Turn on only the platforms you care about, or all at once.",
    n_msg_soon: "Notifications will be available soon.",
    n_msg_loading: "Still loading, try again in a moment.",
    n_msg_error: "Could not change the setting. Your browser or an extension may be blocking it.",
    n_msg_denied: "Your browser blocked notifications. Allow them in the site settings and try again.",
    n_msg_unsupported: "This browser does not support notifications. On iPhone, add the site to your home screen first.",
    n_msg_on: "Turned on.",
    n_msg_off: "Turned off.",

    b_btn: "Report a bug",
    b_h: "Found a bug?",
    b_sub: "The mod is still being tested, so reports help a lot. Fill in the short form: the more precisely you describe the situation, the faster it can be fixed.",
    b_h2: "Report a bug – Risen Together",
    b_close: "Close",
    b_note: "Fields marked * are required. Describe the bug in your own words, in Polish or English.",
    b_email: "Your e-mail *",
    b_version: "Mod version / build",
    b_version_ph: "e.g. build from 20.11",
    b_role: "Role in the game",
    b_role_host: "Host (I create the game)",
    b_role_client: "Client (I join a game)",
    b_role_na: "N/A / not sure",
    b_system: "System and hardware",
    b_system_ph: "e.g. Windows 11, RTX 3060, 16 GB RAM",
    b_what: "1. Situation – what happened? *",
    b_what_ph: "e.g. after trading, the item disappeared for both players",
    b_steps: "2. What do I need to do to reproduce it? *",
    b_steps_ph: "1. Start the game as host\n2. Join as the second player\n3. ...",
    b_expected: "3. What should have happened?",
    b_plugins: "4. Which plugins, mods and co-op options were enabled?",
    b_plugins_ph: "e.g. trading, sprint, new HUD, minimap off",
    b_links: "5. Links to logs, screenshots or a recording",
    b_copy: "Copy text",
    b_send: "Send report",
    b_cancel: "Cancel",
    b_msg_sending: "Sending…",
    b_msg_ok: "Thank you! Your report has been sent.",
    b_msg_err: "Could not send the report. Try again or write on Discord.",
    b_msg_mail: "Your mail app should have opened. Send the prepared message. If nothing opened, copy the text below and send it to %EMAIL%.",
    b_msg_long: "The report is long. Copy the text below and send it to %EMAIL%.",
    b_copied: "Copied."
  }
};

var currentLang = 'pl';

/* t(klucz, tekstPolski): zwraca tekst w biezacym jezyku (uzywane przez site.js i notify.js) */
window.t = function (key, pl) {
  var d = TRANSLATIONS[currentLang];
  return (currentLang !== 'pl' && d && d[key] !== undefined) ? d[key] : pl;
};

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    if (el.dataset.pl === undefined) el.dataset.pl = el.innerHTML;
    var text = null;
    if (lang !== 'pl' && TRANSLATIONS[lang]) text = TRANSLATIONS[lang][el.dataset.i18n];
    el.innerHTML = (text !== null && text !== undefined) ? text : el.dataset.pl;
  });

  // atrybuty: data-i18n-aria (aria-label), data-i18n-ph (placeholder), data-i18n-title (title)
  [['aria', 'aria-label'], ['ph', 'placeholder'], ['title', 'title']].forEach(function (pair) {
    var dataKey = 'i18n' + pair[0].charAt(0).toUpperCase() + pair[0].slice(1);
    var store = 'pl' + pair[0];
    document.querySelectorAll('[data-i18n-' + pair[0] + ']').forEach(function (el) {
      if (el.dataset[store] === undefined) el.dataset[store] = el.getAttribute(pair[1]) || '';
      var text = (lang !== 'pl' && TRANSLATIONS[lang]) ? TRANSLATIONS[lang][el.dataset[dataKey]] : null;
      el.setAttribute(pair[1], (text !== null && text !== undefined) ? text : el.dataset[store]);
    });
  });

  document.querySelectorAll('.lang button').forEach(function (b) {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  try { localStorage.setItem('lang', lang); } catch (e) {}
  document.dispatchEvent(new Event('langchange'));
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


/* Menu rozwijane w nawigacji.
   Na komputerze lista pokazuje sie po najechaniu myszka (robi to CSS).
   Ten kod dodaje otwieranie klikniecem/dotknieciem (telefon) i zamykanie klawiszem Esc. */
(function () {
  var dds = document.querySelectorAll('.dropdown');

  function closeAll(except) {
    dds.forEach(function (d) {
      if (d === except) return;
      d.classList.remove('open');
      var b = d.querySelector('.dd-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }

  dds.forEach(function (d) {
    var btn = d.querySelector('.dd-btn');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = !d.classList.contains('open');
      closeAll(d);
      d.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });

  document.addEventListener('click', function () { closeAll(null); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(null); });
})();

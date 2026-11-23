/* Powiadomienia (dzwonki).
   Cztery niezależne ustawienia: updates (aktualizacje strony i modów), twitch, kick, youtube.
   Przyciski "wszystkie" tylko zmieniają kilka z nich naraz, nic ze sobą nie koliduje.
   Powiadomienia w przeglądarce obsługuje usługa OneSignal; App ID wpisujesz w config.js.
   Bez App ID dzwonki pokazują informację "wkrótce" i niczego nie udają. */
(function () {
  'use strict';

  var cfg = window.SITE || {};
  var KEYS = ['updates', 'twitch', 'kick', 'youtube'];
  var STREAMS = ['twitch', 'kick', 'youtube'];
  // etykiety (tagi) w OneSignal: po nich wybierasz odbiorców w panelu
  var TAGS = { updates: 'notify_updates', twitch: 'notify_twitch', kick: 'notify_kick', youtube: 'notify_youtube' };

  var configured = !!cfg.oneSignalAppId;
  var OS = null;          // instancja OneSignal, gdy jest gotowa
  var sdkFailed = false;  // np. zablokowane przez dodatek w przegladarce
  var busy = false;
  var msgTimer = null;
  var state = loadState();

  function t(key, pl) { return window.t ? window.t(key, pl) : pl; }
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

  function loadState() {
    var s = { updates: false, twitch: false, kick: false, youtube: false };
    if (!configured) return s;
    try {
      var raw = JSON.parse(localStorage.getItem('notify') || '{}');
      KEYS.forEach(function (k) { s[k] = raw[k] === true; });
    } catch (e) {}
    return s;
  }
  function saveState() {
    try { localStorage.setItem('notify', JSON.stringify(state)); } catch (e) {}
  }
  function groupKeys(name) { return name === 'streams' ? STREAMS : KEYS; }

  /* ---------- wyglad ---------- */
  function render() {
    $$('[data-notify]').forEach(function (el) {
      var on = !!state[el.dataset.notify];
      el.classList.toggle('on', on);
      if (el.getAttribute('role') === 'switch') el.setAttribute('aria-checked', on ? 'true' : 'false');
      else el.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    $$('[data-notify-all]').forEach(function (el) {
      var allOn = groupKeys(el.dataset.notifyAll).every(function (k) { return state[k]; });
      el.classList.toggle('on', allOn);
      el.setAttribute('aria-pressed', allOn ? 'true' : 'false');
      var label = el.querySelector('.all-label');
      if (label) {
        label.textContent = allOn ? t(el.dataset.offKey, el.dataset.offPl) : t(el.dataset.onKey, el.dataset.onPl);
      }
    });
    var any = KEYS.some(function (k) { return state[k]; });
    $$('.bell-nav').forEach(function (b) { b.classList.toggle('has-on', any); });
    $$('.bell-dot').forEach(function (d) { d.hidden = !any; });
    $$('.n-soon').forEach(function (n) { n.hidden = configured; });
    $$('[data-notify] .st').forEach(function (s) {
      var on = !!state[s.parentNode.dataset.notify];
      s.textContent = on ? t('n_on', 'Włączone') : t('n_off', 'Wyłączone');
    });
  }

  function say(text) {
    $$('[data-notify-msg]').forEach(function (el) { el.textContent = text; });
    clearTimeout(msgTimer);
    msgTimer = setTimeout(function () {
      $$('[data-notify-msg]').forEach(function (el) { el.textContent = ''; });
    }, 7000);
  }

  /* ---------- zmiana ustawien ---------- */
  async function apply(keys, wantOn) {
    if (!configured) { say(t('n_msg_soon', 'Powiadomienia będą dostępne wkrótce.')); return; }
    if (sdkFailed) { say(t('n_msg_error', 'Nie udało się zmienić ustawienia. Możliwe, że blokuje to przeglądarka lub dodatek.')); return; }
    if (!OS) { say(t('n_msg_loading', 'Trwa ładowanie, spróbuj za chwilę.')); return; }
    if (wantOn && OS.Notifications.isPushSupported && !OS.Notifications.isPushSupported()) {
      say(t('n_msg_unsupported', 'Ta przeglądarka nie obsługuje powiadomień. Na iPhonie dodaj najpierw stronę do ekranu głównego.'));
      return;
    }
    if (busy) return;
    busy = true;
    try {
      if (wantOn) {
        if (!OS.Notifications.permission) await OS.Notifications.requestPermission();
        if (!OS.Notifications.permission) {
          say(t('n_msg_denied', 'Przeglądarka zablokowała powiadomienia. Zezwól na nie w ustawieniach strony i spróbuj ponownie.'));
          return;
        }
        await OS.User.PushSubscription.optIn();
        var add = {};
        keys.forEach(function (k) { add[TAGS[k]] = '1'; });
        OS.User.addTags(add);
        keys.forEach(function (k) { state[k] = true; });
      } else {
        OS.User.removeTags(keys.map(function (k) { return TAGS[k]; }));
        keys.forEach(function (k) { state[k] = false; });
        // gdy nic nie jest wlaczone, wypisujemy urzadzenie, zeby nie dostawalo zadnych wiadomosci
        if (!KEYS.some(function (k) { return state[k]; })) await OS.User.PushSubscription.optOut();
      }
      saveState();
      say(wantOn ? t('n_msg_on', 'Włączone.') : t('n_msg_off', 'Wyłączone.'));
    } catch (e) {
      say(t('n_msg_error', 'Nie udało się zmienić ustawienia. Możliwe, że blokuje to przeglądarka lub dodatek.'));
    } finally {
      busy = false;
      render();
    }
  }

  $$('[data-notify]').forEach(function (el) {
    el.addEventListener('click', function () {
      var k = el.dataset.notify;
      apply([k], !state[k]);
    });
  });
  $$('[data-notify-all]').forEach(function (el) {
    el.addEventListener('click', function () {
      var keys = groupKeys(el.dataset.notifyAll);
      var allOn = keys.every(function (k) { return state[k]; });
      apply(keys, !allOn);
    });
  });

  /* ---------- okienko dzwonka w menu ---------- */
  var wrap = document.querySelector('.notify-wrap');
  if (wrap) {
    var bellBtn = wrap.querySelector('.bell-nav');
    var pop = wrap.querySelector('.notify-pop');
    function setOpen(open) {
      pop.hidden = !open;
      bellBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    bellBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      setOpen(pop.hidden);
    });
    document.addEventListener('click', function (e) {
      if (!pop.hidden && !wrap.contains(e.target)) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !pop.hidden) { setOpen(false); bellBtn.focus(); }
    });
  }

  /* ---------- OneSignal: ladowany tylko, gdy w config.js jest App ID ---------- */
  if (configured) {
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    var s = document.createElement('script');
    s.src = 'https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js';
    s.defer = true;
    s.onerror = function () { sdkFailed = true; };
    document.head.appendChild(s);

    window.OneSignalDeferred.push(async function (OneSignal) {
      try {
        await OneSignal.init({
          appId: cfg.oneSignalAppId,
          allowLocalhostAsSecureOrigin: location.hostname === 'localhost' || location.hostname === '127.0.0.1'
        });
        OS = OneSignal;
        // jesli zgode cofnieto w ustawieniach przegladarki albo urzadzenie sie wypisalo, wylaczamy przelaczniki
        if (OS.Notifications.permission !== true || OS.User.PushSubscription.optedIn !== true) {
          KEYS.forEach(function (k) { state[k] = false; });
          saveState();
        }
        render();
      } catch (e) {
        sdkFailed = true;
      }
    });
  }

  document.addEventListener('langchange', render);
  render();
})();

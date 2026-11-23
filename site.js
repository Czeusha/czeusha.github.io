/* Funkcje strony: przyciski YouTube, zakładki streamu, formularz zgłoszeń błędów.
   Linki i klucze ustawiasz w pliku config.js. */
(function () {
  'use strict';

  var cfg = window.SITE || {};

  function t(key, pl) { return window.t ? window.t(key, pl) : pl; }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  /* ---------- 1) Przyciski YouTube: bez linku w config.js są wygaszone ---------- */
  function wireYouTube() {
    $$('[data-yt]').forEach(function (el) {
      if (cfg.youtubeUrl) {
        el.setAttribute('href', cfg.youtubeUrl);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
        el.classList.remove('disabled');
        el.removeAttribute('aria-disabled');
        el.removeAttribute('title');
      } else {
        el.classList.add('disabled');
        el.setAttribute('aria-disabled', 'true');
        el.setAttribute('title', t('yt_soon_title', 'Link do kanału YouTube pojawi się wkrótce'));
      }
    });
    // podpis na kafelku YouTube: "wkrotce" albo adres kanalu
    $$('.yt-sub').forEach(function (el) {
      if (cfg.youtubeUrl) {
        el.removeAttribute('data-i18n');
        el.textContent = cfg.youtubeUrl.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
      }
    });
  }
  wireYouTube();
  document.addEventListener('langchange', wireYouTube);
  // wygaszony przycisk nigdzie nie prowadzi
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-yt].disabled');
    if (a) e.preventDefault();
  });

  /* ---------- 2) Zakładki streamu (Twitch / Kick / YouTube) ---------- */
  var tabs = $$('.tab');
  if (tabs.length) {
    var PLATFORMS = ['twitch', 'kick', 'youtube'];
    var host = location.hostname || 'localhost';
    var ytId = /^UC[\w-]{22}$/.test(cfg.youtubeChannelId || '') ? cfg.youtubeChannelId : '';

    function buildEmbed(p) {
      if (p === 'twitch') {
        return '<iframe src="https://player.twitch.tv/?channel=' + encodeURIComponent(cfg.twitchChannel || 'czeusha') +
               '&parent=' + encodeURIComponent(host) +
               '&muted=true&autoplay=false" title="Twitch" allowfullscreen loading="lazy"></iframe>';
      }
      if (p === 'kick') {
        return '<iframe src="https://player.kick.com/' + encodeURIComponent(cfg.kickChannel || 'czeusha') +
               '?muted=true&autoplay=false" title="Kick" allowfullscreen loading="lazy"></iframe>';
      }
      if (p === 'youtube' && ytId) {
        // odtwarzacz transmisji na zywo kanalu: pokazuje stream, gdy trwa
        return '<iframe src="https://www.youtube.com/embed/live_stream?channel=' + ytId +
               '" title="YouTube" allowfullscreen loading="lazy"></iframe>';
      }
      return '';
    }

    // odtwarzacz laduje sie dopiero, gdy wybierzesz zakladke (strona startuje szybciej)
    function ensureLoaded(p) {
      var panel = document.getElementById('panel-' + p);
      if (!panel || panel.dataset.loaded) return;
      var html = buildEmbed(p);
      if (html) {
        panel.innerHTML = html;
        panel.dataset.loaded = '1';
      }
    }

    function activate(p, opts) {
      opts = opts || {};
      tabs.forEach(function (tab) {
        var on = tab.dataset.platform === p;
        tab.setAttribute('aria-selected', on ? 'true' : 'false');
        tab.tabIndex = on ? 0 : -1;
        var panel = document.getElementById('panel-' + tab.dataset.platform);
        if (panel) panel.hidden = !on;
        if (on && opts.focus) tab.focus();
      });
      // odtwarzacze nieaktywnych zakladek sa wylaczane, zeby nie grały w tle
      PLATFORMS.forEach(function (other) {
        if (other === p) return;
        var op = document.getElementById('panel-' + other);
        if (op && op.dataset.loaded) { op.innerHTML = ''; delete op.dataset.loaded; }
      });
      ensureLoaded(p);
      $$('[data-for]').forEach(function (el) { el.hidden = el.dataset.for !== p; });
      var liveWrap = document.getElementById('yt-live-wrap');
      if (liveWrap) {
        var link = document.getElementById('yt-live');
        var show = p === 'youtube' && !!ytId;
        if (show && link) link.href = 'https://www.youtube.com/channel/' + ytId + '/live';
        liveWrap.hidden = !show;
      }
      if (opts.updateHash) {
        try { history.replaceState(null, '', '#' + p); } catch (e) {}
      }
    }

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { activate(tab.dataset.platform, { updateHash: true }); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (next) {
          e.preventDefault();
          activate(next.dataset.platform, { focus: true, updateHash: true });
        }
      });
    });

    function fromHash() {
      var h = location.hash.replace('#', '');
      return PLATFORMS.indexOf(h) >= 0 ? h : 'twitch';
    }
    window.addEventListener('hashchange', function () {
      var h = location.hash.replace('#', '');
      if (PLATFORMS.indexOf(h) >= 0) activate(h);
    });
    activate(fromHash());
  }

  /* ---------- 3) Formularz "Zgłoś buga" ---------- */
  var dlg = document.getElementById('bug-dialog');
  var openers = $$('[data-open-bug]');
  if (dlg && openers.length) {
    var supportsDialog = typeof dlg.showModal === 'function';
    var form = document.getElementById('bug-form');
    var msgEl = $('.form-msg', dlg);
    var copyWrap = $('.bug-copy-wrap', dlg);
    var copyBox = $('.bug-copy', dlg);
    var copyBtn = $('[data-copy-bug]', dlg);
    var sendBtn = $('[type="submit"]', form);
    var SUBJECT = '[Risen Together] Zgłoszenie błędu';

    function say(text, cls) {
      msgEl.textContent = text || '';
      msgEl.className = 'form-msg' + (cls ? ' ' + cls : '');
    }
    function mailAddr() { return cfg.bugEmail || 'Czeusha@gmail.com'; }

    openers.forEach(function (b) {
      b.addEventListener('click', function () {
        if (supportsDialog) {
          say('');
          dlg.showModal();
        } else {
          window.location.href = 'mailto:' + mailAddr() + '?subject=' + encodeURIComponent(SUBJECT);
        }
      });
    });
    $$('[data-close-bug]', dlg).forEach(function (b) {
      b.addEventListener('click', function () { dlg.close(); });
    });
    // klikniecie w tlo poza oknem zamyka je
    var downOnBackdrop = false;
    dlg.addEventListener('mousedown', function (e) { downOnBackdrop = (e.target === dlg); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg && downOnBackdrop) dlg.close(); });

    // tresc zgloszenia jest zawsze po polsku, zeby latwo Ci ja bylo czytac
    function compose() {
      var f = form.elements;
      function v(n) { return ((f[n] && f[n].value) || '').trim() || '–'; }
      var lines = [
        'ZGŁOSZENIE BŁĘDU – Risen Together',
        '',
        'E-mail zgłaszającego: ' + v('email'),
        'Wersja moda / build: ' + v('version'),
        'Rola w grze: ' + v('role'),
        'System i sprzęt: ' + v('system'),
        '',
        '1. SYTUACJA (co się stało):',
        v('what'),
        '',
        '2. KROKI DO ODTWORZENIA:',
        v('steps'),
        '',
        '3. OCZEKIWANY EFEKT:',
        v('expected'),
        '',
        '4. WŁĄCZONE PLUGINY / MODY / OPCJE CO-OPA:',
        v('plugins'),
        '',
        '5. LINKI (logi, zrzuty ekranu, nagrania):',
        v('links')
      ];
      return { email: (f.email.value || '').trim(), text: lines.join('\n') };
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.elements.botcheck && form.elements.botcheck.checked) return; // pole pulapka dla botow
      var data = compose();
      copyWrap.hidden = true;

      if (cfg.bugFormKey) {
        say(t('b_msg_sending', 'Wysyłam…'));
        sendBtn.disabled = true;
        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            access_key: cfg.bugFormKey,
            subject: SUBJECT,
            from_name: 'Strona Czeushy – Risen Together',
            email: data.email,
            message: data.text,
            botcheck: ''
          })
        })
          .then(function (r) {
            return r.json().then(function (j) { return { ok: r.ok && j.success !== false }; });
          })
          .then(function (res) {
            if (res.ok) {
              say(t('b_msg_ok', 'Dziękuję! Zgłoszenie zostało wysłane.'), 'ok');
              form.reset();
            } else {
              say(t('b_msg_err', 'Nie udało się wysłać zgłoszenia. Spróbuj ponownie lub napisz na Discordzie.'), 'err');
            }
          })
          .catch(function () {
            say(t('b_msg_err', 'Nie udało się wysłać zgłoszenia. Spróbuj ponownie lub napisz na Discordzie.'), 'err');
          })
          .then(function () { sendBtn.disabled = false; });
        return;
      }

      // bez klucza formularza: gotowa wiadomosc w programie pocztowym + mozliwosc skopiowania
      var url = 'mailto:' + mailAddr() + '?subject=' + encodeURIComponent(SUBJECT) + '&body=' + encodeURIComponent(data.text);
      copyBox.value = data.text;
      copyWrap.hidden = false;
      if (url.length <= 1900) {
        say(t('b_msg_mail', 'Otworzył się Twój program pocztowy. Wyślij gotową wiadomość. Jeśli nic się nie otworzyło, skopiuj treść poniżej i wyślij ją na adres %EMAIL%.').replace('%EMAIL%', mailAddr()), 'ok');
        window.location.href = url;
      } else {
        say(t('b_msg_long', 'Zgłoszenie jest długie. Skopiuj treść poniżej i wyślij ją na adres %EMAIL%.').replace('%EMAIL%', mailAddr()), 'ok');
      }
    });

    copyBtn.addEventListener('click', function () {
      function done() { say(t('b_copied', 'Skopiowano.'), 'ok'); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyBox.value).then(done, function () { copyBox.select(); });
      } else {
        copyBox.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
      }
    });
  }
})();

(function () {
  "use strict";

  const LESSONS = window.LESSONS;
  const STORE_KEY = "pbf-progress-v1";
  const DAY = 24 * 60 * 60 * 1000;
  // Интервалы повторения для коробок Лейтнера (в днях).
  const BOX_INTERVALS = [0, 1, 3, 7, 14, 30];
  const STEPS = [
    { n: 1, name: "Изучи" },
    { n: 2, name: "Объясни" },
    { n: 3, name: "Найди пробелы" },
    { n: 4, name: "Упрости и повтори" }
  ];

  // ---------- хранение прогресса ----------
  function load() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || { lessons: {}, cards: {} }; }
    catch (e) { return { lessons: {}, cards: {} }; }
  }
  let state = load();
  function save() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* приватный режим */ }
  }
  function lessonState(id) {
    return (state.lessons[id] = state.lessons[id] || { done: {}, explanation: "", simple: "", quizBest: 0 });
  }
  function markDone(id, step) { lessonState(id).done[step] = true; save(); }
  function lessonProgress(id) {
    const d = lessonState(id).done;
    return STEPS.filter(s => d[s.n]).length / STEPS.length;
  }

  // ---------- утилиты ----------
  const app = document.getElementById("app");
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const find = id => LESSONS.find(l => l.id === id);
  const cardKey = (lessonId, i) => lessonId + ":" + i;

  function allCards() {
    return LESSONS.flatMap(l => l.cards.map((c, i) => ({ key: cardKey(l.id, i), front: c[0], back: c[1], lesson: l })));
  }
  function isDue(key) {
    const c = state.cards[key];
    return !c || c.due <= Date.now();
  }
  function grade(key, known) {
    const c = state.cards[key] || { box: 0, due: 0 };
    c.box = known ? Math.min(c.box + 1, BOX_INTERVALS.length - 1) : 0;
    c.due = Date.now() + BOX_INTERVALS[c.box] * DAY;
    state.cards[key] = c;
    save();
  }

  // ---------- роутер ----------
  function route() {
    const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
    if (parts[0] === "lesson" && find(parts[1])) {
      const step = Math.min(Math.max(parseInt(parts[2], 10) || 1, 1), 4);
      renderLesson(find(parts[1]), step);
    } else if (parts[0] === "review") {
      renderReview(allCards().filter(c => isDue(c.key)), "Повторение всех тем", "#/");
    } else {
      renderHome();
    }
    app.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);

  // ---------- главная ----------
  function renderHome() {
    const due = allCards().filter(c => isDue(c.key)).length;
    app.innerHTML = `
      <section class="card hero">
        <h1>Учим португальский по методу Фейнмана</h1>
        <p class="muted">Ричард Фейнман считал: понял тему только тот, кто может объяснить её просто.
        Каждая тема проходит четыре шага.</p>
        <div class="steps-legend">
          <div><b>1. Изучи</b><br>Короткая теория с примерами.</div>
          <div><b>2. Объясни</b><br>Своими словами, как ребёнку.</div>
          <div><b>3. Найди пробелы</b><br>Тест покажет, что упущено.</div>
          <div><b>4. Упрости и повтори</b><br>Аналогия и карточки.</div>
        </div>
        <div class="actions">
          <a href="#/review"><button ${due ? "" : "disabled"}>Повторить карточки (${due})</button></a>
          <button class="ghost" id="reset">Сбросить прогресс</button>
        </div>
      </section>
      <section class="grid">
        ${LESSONS.map(l => {
          const p = Math.round(lessonProgress(l.id) * 100);
          return `<a class="card lesson-tile" href="#/lesson/${l.id}/1">
            <div class="emoji">${l.emoji}</div>
            <h3>${esc(l.title)}</h3>
            <div class="muted">${esc(l.summary)}</div>
            <div class="progress" aria-label="Прогресс ${p}%"><i style="width:${p}%"></i></div>
          </a>`;
        }).join("")}
      </section>`;
    document.getElementById("reset").onclick = () => {
      if (confirm("Удалить весь прогресс и объяснения?")) { state = { lessons: {}, cards: {} }; save(); renderHome(); }
    };
  }

  // ---------- урок ----------
  function renderLesson(lesson, step) {
    const ls = lessonState(lesson.id);
    app.innerHTML = `
      <p><a href="#/">← Все темы</a></p>
      <h2>${lesson.emoji} ${esc(lesson.title)}</h2>
      <nav class="stepper">
        ${STEPS.map(s => `<button data-step="${s.n}" class="${s.n === step ? "active" : ""} ${ls.done[s.n] ? "done" : ""}">${s.n}. ${s.name}</button>`).join("")}
      </nav>
      <section id="step" class="card"></section>`;
    app.querySelectorAll(".stepper button").forEach(b => {
      b.onclick = () => { location.hash = `#/lesson/${lesson.id}/${b.dataset.step}`; };
    });
    const el = document.getElementById("step");
    [null, stepStudy, stepExplain, stepQuiz, stepSimplify][step](lesson, el);
  }
  const go = (lesson, step) => { location.hash = `#/lesson/${lesson.id}/${step}`; };

  // Шаг 1: изучи
  function stepStudy(lesson, el) {
    el.innerHTML = `
      <h3>Шаг 1. Изучи</h3>
      <p class="muted">Прочитай внимательно. На следующем шаге нужно будет объяснить это без подсказок.</p>
      <ul class="theory">${lesson.theory.map(t => `<li>${t}</li>`).join("")}</ul>
      <div class="actions"><button id="next">Я прочитал(а) → объяснить</button></div>`;
    el.querySelector("#next").onclick = () => { markDone(lesson.id, 1); go(lesson, 2); };
  }

  // Шаг 2: объясни простыми словами
  function stepExplain(lesson, el) {
    const ls = lessonState(lesson.id);
    el.innerHTML = `
      <h3>Шаг 2. Объясни простыми словами</h3>
      <p class="muted">Представь, что объясняешь тему другу, который не знает португальского.
      Пиши без подглядывания и без сложных терминов, с примерами.</p>
      <textarea id="expl" placeholder="Например: «В португальском…»"></textarea>
      <div class="actions">
        <button id="check">Проверить объяснение</button>
        <button class="secondary" id="back">Вернуться к теории</button>
      </div>
      <div id="result"></div>`;
    const ta = el.querySelector("#expl");
    ta.value = ls.explanation || "";
    ta.oninput = () => { ls.explanation = ta.value; save(); };
    el.querySelector("#back").onclick = () => go(lesson, 1);
    el.querySelector("#check").onclick = () => {
      const text = " " + ta.value.toLowerCase().replace(/\s+/g, " ") + " ";
      if (ta.value.trim().length < 20) {
        el.querySelector("#result").innerHTML = `<p class="why">Слишком коротко. Попробуй хотя бы пару предложений с примером.</p>`;
        return;
      }
      const results = lesson.keywords.map(k => ({ idea: k.idea, hit: k.any.some(w => text.includes(w.toLowerCase())) }));
      const hits = results.filter(r => r.hit).length;
      const ok = hits / results.length >= 0.6;
      if (ok) markDone(lesson.id, 2);
      el.querySelector("#result").innerHTML = `
        <h4>Ключевые идеи: ${hits} из ${results.length}</h4>
        <ul class="check">${results.map(r => `<li class="${r.hit ? "hit" : "miss"}">${r.hit ? "✅" : "⚠️"} ${esc(r.idea)}</li>`).join("")}</ul>
        <p class="why">${ok
          ? "Отлично! Пробелы (⚠️) можно дописать, а затем проверить себя тестом."
          : "Пока есть пробелы. Вернись к теории, перечитай пункты с ⚠️ и объясни ещё раз."}</p>
        <div class="actions"><button id="to-quiz" ${ok ? "" : "disabled"}>Дальше → тест</button></div>`;
      el.querySelector("#to-quiz").onclick = () => go(lesson, 3);
    };
  }

  // Шаг 3: найди пробелы (тест)
  function stepQuiz(lesson, el) {
    let i = 0, score = 0;
    const missed = [];
    function show() {
      if (i >= lesson.quiz.length) return finish();
      const q = lesson.quiz[i];
      el.innerHTML = `
        <h3>Шаг 3. Найди пробелы <span class="badge">${i + 1} / ${lesson.quiz.length}</span></h3>
        <p><b>${esc(q.q)}</b></p>
        <div id="opts">${q.options.map((o, k) => `<button class="option" data-k="${k}">${esc(o)}</button>`).join("")}</div>
        <div id="fb"></div>`;
      el.querySelectorAll(".option").forEach(b => {
        b.onclick = () => {
          const k = +b.dataset.k;
          el.querySelectorAll(".option").forEach(x => { x.disabled = true; });
          el.querySelectorAll(".option")[q.answer].classList.add("correct");
          if (k === q.answer) score++; else { b.classList.add("wrong"); missed.push(q); }
          el.querySelector("#fb").innerHTML = `
            <div class="why">${k === q.answer ? "✅ Верно." : "❌ Неверно."} ${esc(q.why)}</div>
            <div class="actions"><button id="nx">${i + 1 < lesson.quiz.length ? "Следующий вопрос" : "Итоги"}</button></div>`;
          el.querySelector("#nx").onclick = () => { i++; show(); };
        };
      });
    }
    function finish() {
      const ls = lessonState(lesson.id);
      const pct = Math.round(score / lesson.quiz.length * 100);
      ls.quizBest = Math.max(ls.quizBest || 0, pct);
      const ok = pct >= 75;
      if (ok) markDone(lesson.id, 3); else save();
      el.innerHTML = `
        <h3>Результат: ${score} из ${lesson.quiz.length} (${pct}%)</h3>
        ${missed.length ? `<p>Вот твои пробелы — именно их стоит объяснить себе заново:</p>
          <ul class="check">${missed.map(q => `<li class="miss">⚠️ ${esc(q.q)}<br><small>${esc(q.why)}</small></li>`).join("")}</ul>`
          : `<p class="why">Пробелов не найдено! 🎉</p>`}
        <div class="actions">
          ${ok ? `<button id="to-simple">Дальше → упростить</button>` : `<button id="to-theory">Вернуться к теории</button>`}
          <button class="secondary" id="retry">Пройти ещё раз</button>
        </div>`;
      const n = el.querySelector("#to-simple"); if (n) n.onclick = () => go(lesson, 4);
      const t = el.querySelector("#to-theory"); if (t) t.onclick = () => go(lesson, 1);
      el.querySelector("#retry").onclick = () => { i = 0; score = 0; missed.length = 0; show(); };
    }
    show();
  }

  // Шаг 4: упрости (аналогия) и повтори (карточки)
  function stepSimplify(lesson, el) {
    const ls = lessonState(lesson.id);
    el.innerHTML = `
      <h3>Шаг 4. Упрости и повтори</h3>
      <p class="muted">Сожми тему до одной-двух фраз или придумай аналогию. Такое объяснение запоминается лучше всего.</p>
      <textarea id="simple" style="min-height:90px" placeholder="Моя аналогия…"></textarea>
      <div class="actions"><button id="compare">Сравнить с примером</button></div>
      <div id="model"></div>`;
    const ta = el.querySelector("#simple");
    ta.value = ls.simple || "";
    ta.oninput = () => { ls.simple = ta.value; save(); };
    el.querySelector("#compare").onclick = () => {
      el.querySelector("#model").innerHTML = `
        <p><b>Один из вариантов:</b></p>
        <div class="simple">${esc(lesson.simple)}</div>
        <p class="muted">Твоя версия не обязана совпадать — главное, чтобы она была простой и верной.</p>
        <div class="actions"><button id="cards">Закрепить карточками (${lesson.cards.length})</button></div>`;
      el.querySelector("#cards").onclick = () => {
        const cards = lesson.cards.map((c, i) => ({ key: cardKey(lesson.id, i), front: c[0], back: c[1], lesson }));
        renderReview(cards, lesson.title, `#/lesson/${lesson.id}/4`, () => markDone(lesson.id, 4));
      };
    };
  }

  // ---------- карточки (система Лейтнера) ----------
  function renderReview(cards, title, backHref, onFinish) {
    const queue = cards.slice().sort(() => Math.random() - 0.5);
    let known = 0, total = queue.length;
    function show() {
      if (!queue.length) {
        if (onFinish) onFinish();
        app.innerHTML = `
          <p><a href="${backHref}">← Назад</a></p>
          <section class="card"><h3>Готово! ✨</h3>
          <p>${total ? `С первого раза вспомнил(а): ${known} из ${total}.` : "Сейчас нечего повторять — загляни позже."}</p>
          <p class="muted">Карточки, которые ты знаешь, вернутся через 1, 3, 7, 14 и 30 дней. Незнакомые — сразу.</p>
          <div class="actions"><a href="#/"><button>На главную</button></a></div></section>`;
        return;
      }
      const c = queue[0];
      let flipped = false;
      app.innerHTML = `
        <p><a href="${backHref}">← Назад</a></p>
        <h2>🃏 ${esc(title)} <span class="badge">осталось ${queue.length}</span></h2>
        <section class="card flash" id="flash" role="button" tabindex="0" aria-label="Перевернуть карточку">
          <div id="face">${esc(c.front)}</div><small>нажми, чтобы перевернуть</small>
        </section>
        <div class="actions" id="grade" hidden>
          <button class="ghost" id="no">Не помню</button>
          <button id="yes">Знаю</button>
        </div>`;
      const flip = () => {
        flipped = !flipped;
        app.querySelector("#face").textContent = flipped ? c.back : c.front;
        app.querySelector("#grade").hidden = false;
      };
      const f = app.querySelector("#flash");
      f.onclick = flip;
      f.onkeydown = e => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); } };
      app.querySelector("#yes").onclick = () => {
        if (!c.retried) known++;
        grade(c.key, !c.retried);
        queue.shift(); show();
      };
      app.querySelector("#no").onclick = () => {
        grade(c.key, false);
        c.retried = true;
        queue.push(queue.shift()); show();
      };
    }
    show();
  }

  // ---------- тема ----------
  const THEME_KEY = "pbf-theme";
  try { const t = localStorage.getItem(THEME_KEY); if (t) document.documentElement.dataset.theme = t; } catch (e) {}
  document.getElementById("theme-toggle").onclick = () => {
    const cur = document.documentElement.dataset.theme ||
      (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const next = cur === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
  };

  route();
})();

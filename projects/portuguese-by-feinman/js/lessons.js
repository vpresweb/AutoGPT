// Учебные темы. Каждая тема проходит 4 шага метода Фейнмана:
// 1) изучи, 2) объясни простыми словами, 3) найди пробелы (тест), 4) упрости и повтори (карточки).
// `keywords` — ключевые идеи, которые должны прозвучать в объяснении ученика.
// Каждая идея задаётся списком вариантов (любой из них засчитывается).
window.LESSONS = [
  {
    id: "greetings",
    title: "Приветствия и вежливость",
    emoji: "👋",
    summary: "Как поздороваться, попрощаться и поблагодарить.",
    theory: [
      "<b>Olá</b> — «здравствуйте / привет» (нейтрально). В Бразилии в разговоре чаще <b>Oi</b>.",
      "Время суток: <b>Bom dia</b> (доброе утро / добрый день до обеда), <b>Boa tarde</b> (добрый день), <b>Boa noite</b> (добрый вечер и спокойной ночи).",
      "Прощание: <b>Tchau</b> (пока), <b>Até logo</b> (до скорого), <b>Até amanhã</b> (до завтра).",
      "Спасибо зависит от рода <i>говорящего</i>: мужчина говорит <b>Obrigado</b>, женщина — <b>Obrigada</b>.",
      "<b>Por favor</b> — пожалуйста (просьба), <b>De nada</b> — не за что.",
      "<b>Tudo bem?</b> — Как дела? Ответ: <b>Tudo bem!</b> / <b>Tudo ótimo!</b>"
    ],
    simple: "Здороваясь, смотри на время суток: bom dia утром, boa tarde днём, boa noite вечером. «Спасибо» меняется по тому, кто говорит: мужчина — obrigado, женщина — obrigada.",
    keywords: [
      { idea: "Olá / Oi — привет", any: ["olá", "ola", "oi"] },
      { idea: "Приветствия по времени суток", any: ["bom dia", "boa tarde", "boa noite"] },
      { idea: "Obrigado / Obrigada по роду говорящего", any: ["obrigad"] },
      { idea: "Род говорящего (мужчина/женщина)", any: ["муж", "жен", "род"] },
      { idea: "Прощание (tchau / até)", any: ["tchau", "até", "ate "] }
    ],
    quiz: [
      { q: "Женщина благодарит продавца. Что она скажет?", options: ["Obrigado", "Obrigada", "De nada", "Por favor"], answer: 1,
        why: "Форма зависит от рода говорящего: женщина говорит obrigada." },
      { q: "Вы встречаете коллегу в 15:00. Как поздороваться?", options: ["Bom dia", "Boa tarde", "Boa noite", "Até logo"], answer: 1,
        why: "Boa tarde — после обеда и до вечера." },
      { q: "Что значит «De nada»?", options: ["Ничего нет", "Не за что", "Пожалуйста (просьба)", "До свидания"], answer: 1,
        why: "De nada — стандартный ответ на obrigado/obrigada." },
      { q: "Как попрощаться до завтра?", options: ["Até amanhã", "Até logo", "Tudo bem", "Boa tarde"], answer: 0,
        why: "Amanhã — завтра." }
    ],
    cards: [
      ["Olá / Oi", "Привет, здравствуйте"],
      ["Bom dia", "Доброе утро"],
      ["Boa tarde", "Добрый день"],
      ["Boa noite", "Добрый вечер / спокойной ночи"],
      ["Obrigado / Obrigada", "Спасибо (м. / ж.)"],
      ["Por favor", "Пожалуйста (просьба)"],
      ["De nada", "Не за что"],
      ["Tudo bem?", "Как дела?"],
      ["Tchau", "Пока"],
      ["Até amanhã", "До завтра"]
    ]
  },
  {
    id: "ser-estar",
    title: "Ser и Estar — два глагола «быть»",
    emoji: "⚖️",
    summary: "Когда что-то постоянно, а когда временно.",
    theory: [
      "В португальском два глагола «быть». <b>Ser</b> — для того, <i>что такое</i> предмет: сущность, профессия, происхождение, характер, время.",
      "<b>Estar</b> — для того, <i>как</i> предмет сейчас: временное состояние, настроение, местонахождение.",
      "Ser: eu <b>sou</b>, você/ele/ela <b>é</b>, nós <b>somos</b>, vocês/eles <b>são</b>.",
      "Estar: eu <b>estou</b>, você/ele/ela <b>está</b>, nós <b>estamos</b>, vocês/eles <b>estão</b>.",
      "<b>Eu sou russo.</b> — Я русский (происхождение, постоянно). <b>Eu estou cansado.</b> — Я устал (сейчас).",
      "<b>Estou em casa.</b> — Я дома (местонахождение → estar). Но место события: <b>A festa é na praia.</b> (ser)."
    ],
    simple: "Ser — это «паспорт»: кто ты и откуда, это не меняется каждый час. Estar — это «статус в мессенджере»: как ты сейчас и где ты.",
    keywords: [
      { idea: "Ser — постоянное / сущность", any: ["постоян", "сущн", "кто ", "происхожд", "професс", "характер"] },
      { idea: "Estar — временное состояние", any: ["времен", "сейчас", "состоян", "настроен"] },
      { idea: "Estar — местонахождение", any: ["мест", "где", "находит"] },
      { idea: "Формы ser (sou, é, somos, são)", any: ["sou", "somos", "são", "sao"] },
      { idea: "Формы estar (estou, está, estamos, estão)", any: ["estou", "está", "esta ", "estamos", "estão", "estao"] }
    ],
    quiz: [
      { q: "«Я врач» по-португальски:", options: ["Eu estou médico", "Eu sou médico", "Eu é médico", "Eu está médico"], answer: 1,
        why: "Профессия — это «кто ты», значит ser: eu sou." },
      { q: "«Мы в ресторане»:", options: ["Nós somos no restaurante", "Nós estamos no restaurante", "Nós estão no restaurante", "Nós são no restaurante"], answer: 1,
        why: "Местонахождение человека — estar: nós estamos." },
      { q: "«Она сегодня грустная»:", options: ["Ela é triste hoje", "Ela está triste hoje", "Ela sou triste hoje", "Ela estou triste hoje"], answer: 1,
        why: "Слово «сегодня» подсказывает временное состояние → estar." },
      { q: "Какая форма ser для «eles»?", options: ["somos", "é", "são", "estão"], answer: 2,
        why: "eles/elas/vocês são." }
    ],
    cards: [
      ["eu sou", "я есть (ser)"],
      ["ele é", "он есть (ser)"],
      ["nós somos", "мы есть (ser)"],
      ["eles são", "они есть (ser)"],
      ["eu estou", "я (сейчас) есть (estar)"],
      ["ela está", "она (сейчас) есть (estar)"],
      ["nós estamos", "мы (сейчас) есть (estar)"],
      ["eles estão", "они (сейчас) есть (estar)"],
      ["Eu estou cansado.", "Я устал."],
      ["Eu sou russo.", "Я русский."]
    ]
  },
  {
    id: "articles",
    title: "Род и артикли",
    emoji: "🏷️",
    summary: "o, a, um, uma и слияния с предлогами.",
    theory: [
      "У каждого существительного есть род: мужской или женский. Обычно <b>-o</b> → мужской (o livro), <b>-a</b> → женский (a casa).",
      "Определённые артикли: <b>o, a, os, as</b> («этот конкретный»). Неопределённые: <b>um, uma, uns, umas</b> («какой-то, один»).",
      "Исключения: <b>o dia</b> (день), <b>o problema</b>, <b>o mapa</b> — мужской род; <b>a mão</b> (рука) — женский.",
      "Артикль сливается с предлогами: de + o = <b>do</b>, de + a = <b>da</b>, em + o = <b>no</b>, em + a = <b>na</b>.",
      "Пример: <b>Eu moro na cidade.</b> — Я живу в городе (em + a cidade)."
    ],
    simple: "Артикль — как бирка с полом на слове: o для «он», a для «она». Когда предлог встречает артикль, они склеиваются: em + a = na.",
    keywords: [
      { idea: "Мужской и женский род", any: ["муж", "жен", "род"] },
      { idea: "Окончания -o / -a", any: ["-o", "-a", "оканч"] },
      { idea: "Определённые артикли o/a/os/as", any: ["определ", " o ", " a ", "os", "as"] },
      { idea: "Неопределённые um/uma", any: ["um", "uma"] },
      { idea: "Слияние с предлогами (do, na…)", any: ["слия", "склеи", "do", "na", "no", "da"] }
    ],
    quiz: [
      { q: "Выберите правильный артикль: ___ dia", options: ["a", "o", "uma", "as"], answer: 1,
        why: "Dia — исключение, мужской род: o dia." },
      { q: "em + a casa = ?", options: ["em a casa", "no casa", "na casa", "da casa"], answer: 2,
        why: "em + a = na." },
      { q: "«Я из Бразилии» (Eu sou ___ Brasil):", options: ["de o", "da", "do", "no"], answer: 2,
        why: "Brasil — мужской род (o Brasil), de + o = do." },
      { q: "Неопределённый артикль для «uma casa» во мн. числе:", options: ["uns casas", "umas casas", "as casas", "os casas"], answer: 1,
        why: "Женский род, мн. число → umas." }
    ],
    cards: [
      ["o livro", "книга"],
      ["a casa", "дом"],
      ["o dia", "день (м. р.!)"],
      ["a mão", "рука (ж. р.!)"],
      ["um / uma", "один / одна, какой-то"],
      ["de + o = do", "слияние de + o"],
      ["em + a = na", "слияние em + a"],
      ["na cidade", "в городе"]
    ]
  },
  {
    id: "ar-verbs",
    title: "Глаголы на -ar в настоящем",
    emoji: "🗣️",
    summary: "Спряжение правильных глаголов: falar, morar, gostar.",
    theory: [
      "Большинство глаголов оканчивается на <b>-ar</b>. Отбрасываем -ar и добавляем окончание.",
      "falar (говорить): eu <b>falo</b>, você/ele/ela <b>fala</b>, nós <b>falamos</b>, vocês/eles <b>falam</b>.",
      "В Португалии также используют <b>tu falas</b> (ты говоришь); в Бразилии чаще <b>você fala</b>.",
      "По той же схеме: morar (жить) → eu moro, trabalhar (работать) → eu trabalho, estudar → eu estudo.",
      "<b>gostar</b> требует предлога <b>de</b>: <b>Eu gosto de café.</b> — Мне нравится кофе."
    ],
    simple: "Глагол на -ar — это корень плюс «хвостик»: я → -o, он/вы → -a, мы → -amos, они → -am. Выучил хвостики — знаешь сотни глаголов.",
    keywords: [
      { idea: "Отбросить -ar и добавить окончание", any: ["-ar", "корен", "основ", "отброс"] },
      { idea: "eu → -o", any: ["-o", "falo", "moro"] },
      { idea: "ele/você → -a", any: ["-a ", "fala ", "fala,", "mora"] },
      { idea: "nós → -amos", any: ["amos"] },
      { idea: "eles → -am", any: ["-am", "falam", "moram"] }
    ],
    quiz: [
      { q: "Nós ___ português. (falar)", options: ["falo", "falam", "falamos", "fala"], answer: 2,
        why: "nós → -amos." },
      { q: "Eu ___ em Lisboa. (morar)", options: ["moro", "mora", "moramos", "moram"], answer: 0,
        why: "eu → -o." },
      { q: "«Мне нравится музыка»:", options: ["Eu gosto música", "Eu gosto de música", "Eu gosta de música", "Eu gostamos música"], answer: 1,
        why: "gostar всегда с de, и eu → gosto." },
      { q: "Eles ___ muito. (trabalhar)", options: ["trabalha", "trabalho", "trabalhamos", "trabalham"], answer: 3,
        why: "eles → -am." }
    ],
    cards: [
      ["falar", "говорить"],
      ["eu falo", "я говорю"],
      ["nós falamos", "мы говорим"],
      ["eles falam", "они говорят"],
      ["morar", "жить (проживать)"],
      ["trabalhar", "работать"],
      ["estudar", "учиться"],
      ["Eu gosto de café.", "Мне нравится кофе."]
    ]
  },
  {
    id: "numbers",
    title: "Числа 1–10",
    emoji: "🔢",
    summary: "Счёт и числа, меняющиеся по роду.",
    theory: [
      "1–10: <b>um, dois, três, quatro, cinco, seis, sete, oito, nove, dez</b>.",
      "Числа 1 и 2 меняются по роду: <b>um livro / uma casa</b>, <b>dois livros / duas casas</b>.",
      "В Бразилии, диктуя номер телефона, вместо seis часто говорят <b>meia</b> (от meia dúzia — полдюжины).",
      "Множественное число существительных обычно получается добавлением <b>-s</b>: um gato → dois gatos."
    ],
    simple: "Считай как обычно, но следи за единицей и двойкой: они подстраиваются под род слова — um/uma, dois/duas.",
    keywords: [
      { idea: "Названия чисел", any: ["um", "dois", "três", "tres", "cinco", "dez"] },
      { idea: "1 и 2 меняются по роду", any: ["uma", "duas", "род"] },
      { idea: "Мн. число через -s", any: ["-s", "множ"] }
    ],
    quiz: [
      { q: "«Две девушки»:", options: ["dois meninas", "duas meninas", "dois meninos", "duas menina"], answer: 1,
        why: "Menina — женский род → duas, и мн. число → meninas." },
      { q: "Какое число — «oito»?", options: ["6", "7", "8", "9"], answer: 2, why: "oito = 8." },
      { q: "Что может означать «meia» при диктовке номера в Бразилии?", options: ["0", "5", "6", "10"], answer: 2,
        why: "meia (dúzia) — полдюжины = 6." },
      { q: "três + quatro = ?", options: ["sete", "seis", "oito", "nove"], answer: 0, why: "3 + 4 = 7 = sete." }
    ],
    cards: [
      ["um / uma", "1"], ["dois / duas", "2"], ["três", "3"], ["quatro", "4"], ["cinco", "5"],
      ["seis", "6"], ["sete", "7"], ["oito", "8"], ["nove", "9"], ["dez", "10"]
    ]
  },
  {
    id: "pronunciation",
    title: "Произношение",
    emoji: "👄",
    summary: "Носовые звуки, lh, nh, ç и бразильские особенности.",
    theory: [
      "<b>ão</b> — носовой звук, примерно «аун» через нос: <b>não</b> (нет), <b>pão</b> (хлеб).",
      "Тильда (~) над гласной делает её носовой: <b>mãe</b> (мама), <b>irmã</b> (сестра).",
      "<b>lh</b> ≈ мягкое «ль»: <b>filho</b> (сын). <b>nh</b> ≈ мягкое «нь»: <b>vinho</b> (вино).",
      "<b>ç</b> всегда звучит как «с»: <b>cabeça</b> (голова), <b>açúcar</b> (сахар).",
      "В Бразилии безударное конечное <b>-e</b> звучит почти как «и»: <b>leite</b> ≈ «лейчи».",
      "В Бразилии <b>t</b> и <b>d</b> перед звуком «и» смягчаются до «ч» и «дж»: <b>tia</b> ≈ «чиа», <b>dia</b> ≈ «джиа»."
    ],
    simple: "Тильда — сигнал «говори в нос». lh и nh — это мягкие «ль» и «нь», а ç — просто «с». В Бразилии «ти/ди» превращаются в «чи/джи».",
    keywords: [
      { idea: "Носовые звуки / тильда", any: ["нос", "тильд", "~", "ão", "ao"] },
      { idea: "lh — мягкое «ль»", any: ["lh"] },
      { idea: "nh — мягкое «нь»", any: ["nh"] },
      { idea: "ç = «с»", any: ["ç", "седил"] },
      { idea: "Бразильские t/d → ч/дж", any: ["чи", "джи", "ч", "дж"] }
    ],
    quiz: [
      { q: "Как примерно звучит «filho»?", options: ["фило", "фильо", "фихо", "финьо"], answer: 1, why: "lh — мягкое «ль»." },
      { q: "Что делает тильда в «mãe»?", options: ["Ударение", "Делает гласную носовой", "Удлиняет звук", "Ничего"], answer: 1,
        why: "Тильда = носовая гласная." },
      { q: "Как звучит «ç» в «cabeça»?", options: ["к", "ч", "с", "ц"], answer: 2, why: "ç всегда «с»." },
      { q: "Как бразилец произнесёт «dia»?", options: ["диа", "джиа", "зиа", "тиа"], answer: 1, why: "d перед «и» → «дж» в Бразилии." }
    ],
    cards: [
      ["não", "нет"], ["pão", "хлеб"], ["mãe", "мама"], ["filho", "сын"],
      ["vinho", "вино"], ["cabeça", "голова"], ["leite", "молоко"], ["tia", "тётя"]
    ]
  }
];

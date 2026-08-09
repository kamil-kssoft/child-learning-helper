# Design: Podstawowe słowa (PL ↔ język obcy)

**Data:** 2026-08-09  
**Status:** Do reviewu przed implementacją

## Cel

Nowy typ nauki dla `locale ≠ pl`: podstawowe słowa i zwroty w parze **polski ↔ aktualny język aplikacji** (na start EN). Dziecko przechodzi przez 4-fazowy cykl na każde słowo, z opcjonalnym losowaniem kolejności i trwałym postępem (istniejący `ProgressBar` + `learningProgress`).

## Decyzje produktowe (zatwierdzone)

| # | Temat | Decyzja |
|---|--------|---------|
| 1 | Widoczność | Sekcja tylko gdy `locale ≠ pl`; para zawsze `pl ↔ locale` |
| 2 | Kierunek | Dwa kafelki w menu (np. PL→EN, EN→PL) |
| 3 | Krok sprawdzenia | Oba języki na kafelku (góra = źródło, dół = cel) |
| 4 | Wejście na słowo | Tylko tekst źródłowy + auto TTS źródłowy |
| 5 | Poziomy | Ekran wyboru po kliknięciu kierunku; „Poziom N — Temat” |
| 6 | Losuj / Quiz | Tylko „Losuj”; bez trybu quizu |
| 7 | Koniec poziomu | Pętla od początku; przy „Losuj” nowa kolejność co obieg |
| 8 | Treść | 50 wspólnych kluczy, `labels` per język, 5 tematów |
| 9 | Tap w TTS | Zablokowany (`tile-waiting`); bez dźwięku — kafelek aktywny |
| 10 | Menu | Nowa sekcja „Język” |
| 11 | Lista słów | W tej specyfikacji (review przed kodem) |
| 12 | Wstecz | Zawsze do menu głównego |
| 13 | Postęp | `ProgressBar`: 0–50 pod kierunkiem w menu, mini per poziom, sesja `n/10` |
| 14 | Ukończenie słowa | Po pełnym cyklu, przy przejściu do następnego słowa |
| 15 | Architektura | Osobne komponenty (nie rozszerzenie `BaseItem`) |

## Architektura

### Nowe pliki

| Plik | Rola |
|------|------|
| `src/config/basicWords.js` | 50 itemów, 5 poziomów, meta tematów, helpery |
| `src/components/BasicWordsLevels.js` | Ekran wyboru poziomu (5 przycisków + mini progress) |
| `src/components/BasicWordsLearn.js` | Maszyna stanów 4 faz + kafelek |
| `src/components/BasicWords.css` | Layout dwujęzycznego kafelka, ekran poziomów |

### Zmiany w istniejących plikach

| Plik | Zmiana |
|------|--------|
| `App.js` | Route `/basic-words` → `BasicWordsLevels` lub `BasicWordsLearn` (wg `level` w query) |
| `Menu.js` | Sekcja `menu.section.language` (warunkowa); 2 linki kierunku + aggregate progress |
| `learningProgress.js` | `getProgressKey` dla `/basic-words`; helper `getBasicWordsDirectionTotal` |
| `i18n/ui/pl.js`, `en.js` | Klucze menu, poziomów, kierunków |

### Routing

```
/basic-words?dir=pl-to-en&randomize=0     → BasicWordsLevels (wybór poziomu)
/basic-words?dir=pl-to-en&level=3&randomize=0 → BasicWordsLearn (nauka)
```

Kierunki:

- `pl-to-en` — polski → angielski (źródło PL, cel EN)
- `en-to-pl` — angielski → polski (źródło EN, cel PL)

Przy przyszłym `locale=it`: `pl-to-it`, `it-to-pl` (ten sam wzorzec).

Parametr `randomize` z globalnego ustawienia menu (jak inne kategorie). **Bez** `count` (quiz wyłączony).

## Maszyna stanów (jedno słowo)

```
┌─────────────────────────────────────────────────────────────┐
│  ENTER / NEXT WORD                                          │
│  step = SOURCE                                              │
│  Widok: tekst źródłowy                                      │
│  Audio: TTS źródłowy (jeśli dźwięk ON)                      │
│  Kafelek: tile-waiting podczas TTS                          │
└───────────────────────────┬─────────────────────────────────┘
                            │ klik (po zakończeniu TTS lub bez dźwięku)
┌───────────────────────────▼─────────────────────────────────┐
│  step = REVEAL                                              │
│  Widok: źródło (góra) + cel (dół)                           │
│  Audio: brak                                                │
└───────────────────────────┬─────────────────────────────────┘
                            │ klik
┌───────────────────────────▼─────────────────────────────────┐
│  step = TARGET_AUDIO                                        │
│  Widok: oba teksty                                          │
│  Audio: TTS docelowy                                        │
│  Kafelek: tile-waiting podczas TTS                          │
└───────────────────────────┬─────────────────────────────────┘
                            │ klik (po zakończeniu TTS lub bez dźwięku)
│  markComplete(progressKeyLevel, wordKey)                    │
│  sessionIndex++                                             │
│  jeśli sessionIndex > 10 → pętla (reshuffle jeśli randomize)│
│  → ENTER / NEXT WORD                                        │
```

**Bez dźwięku:** brak `tile-waiting`, brak TTS; te same kroki wizualne, klik od razu dostępny.

**Kolejność słów:** 10 słów bieżącego poziomu; przy `randomize=1` tasowanie przy starcie sesji i przy każdym obiegu pętli.

## Model danych

### Item

```js
{
  key: 'greeting_morning',       // stabilny identyfikator (postęp, testy)
  level: 1,                      // 1–5
  labels: {
    pl: 'dzień dobry',
    en: 'good morning',
    // it: 'buongiorno' — przy dodaniu IT
  },
}
```

### Poziom (meta)

```js
{
  level: 1,
  themeKey: 'basicWords.level1.theme',  // i18n: „Powitania” / „Greetings”
}
```

### Helpery

- `getBasicWordsForLevel(level)` → 10 itemów
- `getSourceLabel(item, dir)` / `getTargetLabel(item, dir)` — z `dir` (`pl-to-en` | `en-to-pl`)
- `getSpeechLangForDir(dir, side)` → `pl-PL` lub `en-US`
- `getLevelProgressKey(dir, level)` → `basic-words:pl-to-en:level-1`
- `getDirectionProgressKeys(dir)` → 5 kluczy poziomów
- `getDirectionCompletedCount(dir)` → suma unikalnych ukończonych słów (0–50)

## Postęp (`ProgressBar` + `learningProgress`)

### Klucze

| Kontekst | `progressKey` | `max` |
|----------|---------------|-------|
| Menu — kafelek kierunku | agregat liczony z 5 kluczy `level-N` (nie osobny wpis w storage) | 50 |
| Ekran poziomów — poziom N | `basic-words:pl-to-en:level-N` | 10 |
| Sesja nauki | licznik runtime (nie localStorage) | 10 |

### Menu (kierunek)

Pod kafelkiem „Polski → English”: `ProgressBar` z `value = getDirectionCompletedCount('pl-to-en')`, `max = 50`, label `progress.category`.

### Ekran poziomów

Każdy przycisk poziomu: mini `ProgressBar` (`menu-progress` styl), `value = getCompletedCount(levelKey)`, `max = 10`.

### Sesja nauki

`ProgressBar` z klasą `session-progress` (jak `BaseItem`): `value = currentWordIndexInRound` (1–10), `max = 10`, label `t('progress.session', { current, total })`.

Po ukończeniu 10. słowa i przejściu dalej: reset sesji do `1/10` (nowy obieg), trwały postęp pozostaje (np. 10/10 na poziomie).

### `markItemComplete`

Wywołanie przy przejściu do następnego słowa (po kroku `TARGET_AUDIO` + klik). Zapis pod `basic-words:dir:level-N` z `item.key`. Agregat w menu = suma długości list (bez duplikatów między poziomami — klucze słów są unikalne globalnie).

## UI — kafelek dwujęzyczny

- Reuse rozmiaru/stylu `.base-item-tile` (flex, border, font)
- Tekst: `clamp` — źródło większy w kroku SOURCE; w REVEAL/TARGET oba wiersze:
  - `.basic-words-source` — góra
  - `.basic-words-target` — dół, nieco mniejszy / szary do czasu REVEAL (w SOURCE ukryty)
- Bez emoji / obrazków — sam tekst

## UI — ekran poziomów

- `BackButton` → `/menu`
- Tytuł: kierunek (np. `t('basicWords.direction.plToEn')`)
- Lista 5 linków: `t('basicWords.levelTitle', { level, theme })` → nauka
- Layout podobny do `Menu` (duże przyciski, mobile-first)

## UI — menu

Nowa sekcja (tylko `locale !== 'pl'`):

```js
{
  titleKey: 'menu.section.language',
  items: [
    { labelKey: 'menu.item.basicWordsPlTo', icon: '💬', path: '/basic-words?dir=pl-to-{locale}', ... },
    { labelKey: 'menu.item.basicWordsToPl', icon: '💬', path: '/basic-words?dir={locale}-to-pl', ... },
  ],
}
```

`getPath` dodaje tylko `randomize` (nie `count`).

## i18n — nowe klucze (przykłady)

| Klucz | PL | EN |
|-------|----|----|
| `menu.section.language` | Język | Language |
| `menu.item.basicWordsPlTo` | Polski → English | Polish → English |
| `menu.item.basicWordsToPl` | English → Polski | English → Polish |
| `basicWords.levelTitle` | Poziom {level} — {theme} | Level {level} — {theme} |
| `basicWords.level1.theme` | Powitania | Greetings |
| `basicWords.level2.theme` | Grzeczność | Politeness |
| `basicWords.level3.theme` | Na co dzień | Daily phrases |
| `basicWords.level4.theme` | Rodzina | Family |
| `basicWords.level5.theme` | Dom i szkoła | Home & school |

Tematy poziomów w UI locale (język interfejsu), nie w języku nauki.

## Treść — 50 słów (PL ↔ EN)

### Poziom 1 — Powitania

| key | pl | en |
|-----|----|----|
| `greeting_morning` | dzień dobry | good morning |
| `greeting_hello` | cześć | hello |
| `greeting_hi` | hej | hi |
| `greeting_goodbye` | do widzenia | goodbye |
| `greeting_night` | dobranoc | good night |
| `greeting_see_you` | do zobaczenia | see you |
| `greeting_welcome` | witaj | welcome |
| `greeting_evening` | dobry wieczór | good evening |
| `greeting_bye` | pa | bye |
| `greeting_nice` | miło cię poznać | nice to meet you |

### Poziom 2 — Grzeczność

| key | pl | en |
|-----|----|----|
| `polite_please` | proszę | please |
| `polite_thank_you` | dziękuję | thank you |
| `polite_thanks` | dzięki | thanks |
| `polite_sorry` | przepraszam | sorry |
| `polite_excuse_me` | słucham | excuse me |
| `polite_welcome_reply` | proszę bardzo | you're welcome |
| `polite_yes` | tak | yes |
| `polite_no` | nie | no |
| `polite_okay` | dobrze | okay |
| `polite_of_course` | oczywiście | of course |

### Poziom 3 — Na co dzień

| key | pl | en |
|-----|----|----|
| `daily_help` | pomocy | help |
| `daily_wait` | czekaj | wait |
| `daily_here` | tutaj | here |
| `daily_there` | tam | there |
| `daily_now` | teraz | now |
| `daily_water` | woda | water |
| `daily_food` | jedzenie | food |
| `daily_hungry` | jestem głodny | I'm hungry |
| `daily_tired` | jestem zmęczony | I'm tired |
| `daily_dont_know` | nie wiem | I don't know |

### Poziom 4 — Rodzina

| key | pl | en |
|-----|----|----|
| `family_mom` | mama | mom |
| `family_dad` | tata | dad |
| `family_grandma` | babcia | grandma |
| `family_grandpa` | dziadek | grandpa |
| `family_brother` | brat | brother |
| `family_sister` | siostra | sister |
| `family_baby` | dziecko | baby |
| `family_friend` | przyjaciel | friend |
| `family_dog` | pies | dog |
| `family_cat` | kot | cat |

### Poziom 5 — Dom i szkoła

| key | pl | en |
|-----|----|----|
| `place_home` | dom | home |
| `place_school` | szkoła | school |
| `place_play` | baw się | play |
| `place_sleep` | śpij | sleep |
| `place_read` | czytaj | read |
| `place_today` | dzisiaj | today |
| `place_tomorrow` | jutro | tomorrow |
| `place_good` | dobrze | good |
| `place_bad` | źle | bad |
| `place_love` | kocham cię | I love you |

> **Review:** Sprawdź zwłaszcza poziom 3 (dłuższe frazy TTS) i poziom 2 (`słucham` / excuse me). Można wymienić na krótsze formy przed implementacją.

## TTS

- Źródło: `getSpeechLang(dir, 'source')` + `labels[sourceLocale]`
- Cel: `getSpeechLang(dir, 'target')` + `labels[targetLocale]`
- Rate z istniejących ustawień dźwięku (`useAudio` / `speechRate`)
- Ten sam `speakText` / `unlockAudio` co reszta aplikacji

## Błędy i edge cases

| Case | Zachowanie |
|------|------------|
| `dir` niepoprawny | Redirect `/menu` |
| `level` poza 1–5 | Redirect do ekranu poziomów |
| `locale === pl` | Sekcja menu ukryta; bezpośredni URL → redirect `/menu` |
| Brak `labels.en` (przyszły język) | Fallback `labels.pl` + console warn w dev |
| Pusty poziom | Komunikat jak `base.empty` |

## Testy

### Unit

- `basicWords.js` — 50 itemów, 10 per level, unikalne `key`
- `getSourceLabel` / `getTargetLabel` dla obu kierunków
- `getDirectionCompletedCount` — suma po poziomach
- `getProgressKey` rozszerzenie dla `/basic-words`
- Maszyna stanów (opcjonalnie: pure helper `nextBasicWordsStep`)

### Manual

- PL UI → sekcja ukryta
- EN UI → sekcja widoczna, oba kierunki, postęp menu
- Pełny cykl 4 kroków, tap zablokowany w TTS
- Wyłączony dźwięk — brak blokady
- Losuj — różna kolejność po pętli
- Postęp sesji i trwały po ukończeniu słowa

## Poza zakresem (MVP)

- Tryb quizu wielokafelkowy
- Włoski / inne języki (architektura gotowa, content później)
- Zapamiętywanie ostatniego poziomu / pomijanie ekranu wyboru
- Osobny język UI vs język nauki
- Własne nagrania audio (tylko TTS)

## Kolejność implementacji (PR)

1. `basicWords.js` + testy contentu
2. `learningProgress` — klucze i agregat
3. `BasicWordsLearn` + CSS
4. `BasicWordsLevels` + routing + `App.js`
5. `Menu.js` + i18n
6. Manual smoke + unit testy

---

**Następny krok po akceptacji:** plan implementacji (`writing-plans`).

# Plan: przełączanie języka aplikacji (PL / EN → IT+)

## Cel

Umożliwić naukę w wybranym języku całej aplikacji: UI, etykiety kategorii oraz synteza mowy (TTS). Na start **polski i angielski**, potem **włoski** i kolejne języki bez przebudowy architektury.

## Stan obecny

Aplikacja jest w praktyce monolingwalna (PL):

| Warstwa | Gdzie | Problem |
|---|---|---|
| Treść nauki | `src/config/content.js` (`label`, `numberLabels`, `letterLabels`) | Stringi tylko po polsku |
| TTS | `src/utils/speech.js` | Na sztywno `pl-PL` + `pickPolishVoice` |
| UI / feedback | `Menu.js`, `Feedback.js`, `BaseItem.js`, `SoundSettings.js`, bannery | Hardcoded PL |
| Komunikaty audio | `audioPermissions.js` | Hardcoded PL |
| Preferencje | `localStorage` (`soundEnabled`, `speechRate`, …) | Brak klucza języka |

Obrazy/emoji są już niezależne od języka — to dobry punkt wyjścia.

## Kluczowa decyzja produktowa

To nie jest tylko „tłumaczenie interfejsu”. **Język = język nauki**:

- dziecko słyszy i widzi słowa w wybranym języku (`czerwony` ↔ `red` ↔ `rosso`),
- nazwy liter różnią się między językami (`be` vs `bee` vs `bi`),
- marki aut mają lokalne fonetyki TTS (`be em wu` / `B M W`, `peżo` / `peugeot`).

Dlatego rozdzielamy dwie warstwy stringów:

1. **UI chrome** — menu, ustawienia, „Brawo!”, błędy uprawnień.
2. **Learning content** — etykiety wypowiadane i używane w quizie.

Obie zależą od jednego globalnego `locale`.

## Rekomendacja techniczna

**Lekki, własny i18n (bez `i18next`)** — pasuje do CRA + małego zestawu stringów (~30 UI + ~150 content).

Powody przeciw ciężkiej bibliotece:

- brak potrzeby pluralizacji/ICU na start,
- zero nowych zależności w PWA dla dzieci,
- pełna kontrola nad TTS locale i fonetyką.

Jeśli później pojawi się dużo języków / złożone formatowanie — można wtedy migrować na `react-i18next` bez zmiany modelu contentu.

## Model danych

### Locale

```js
// src/i18n/locales.js
export const SUPPORTED_LOCALES = ['pl', 'en']; // później: 'it', …
export const DEFAULT_LOCALE = 'pl';

export const LOCALE_META = {
  pl: { label: 'Polski', speechLang: 'pl-PL' },
  en: { label: 'English', speechLang: 'en-US' },
  // it: { label: 'Italiano', speechLang: 'it-IT' },
};
```

### UI strings

```text
src/i18n/ui/
  pl.js
  en.js
  index.js   // getUiString(locale, key, params?)
```

Przykład kluczy: `menu.title`, `menu.randomize`, `feedback.success`, `quiz.find`, `sound.title`.

### Learning content

Refactor `content.js`: item trzyma tożsamość + `labels` per locale (albo `speech` gdy fonetyka ≠ display):

```js
{ value: '#FF0000', labels: { pl: 'czerwony', en: 'red' } }

{ value: 'car-brands/bmw.png', labels: { pl: 'be em wu', en: 'B M W' } }

// litery / cyfry jako mapy:
letterLabels = {
  pl: { A: 'a', B: 'be', … },
  en: { A: 'ay', B: 'bee', … },
};
```

Helper:

```js
function resolveLabel(itemOrMap, locale) {
  // fallback: locale → DEFAULT_LOCALE → pierwszy dostępny
}
```

**Dlaczego inline `labels`, a nie osobne JSON per język?**  
Treść nauki jest mała i lokalna do itemu; łatwiej reviewować kompletność tłumaczenia przy dodawaniu kategorii. UI może zostać w osobnych plikach (więcej kluczy, mniej powiązania z assetami).

### Kategorie zależne od alfabetu

Na start zostawiamy A–Z we wszystkich językach (jak dziś).  
Polskie znaki (ĄĆĘŁŃÓŚŹŻ) / włoskie akcenty to osobna, późniejsza decyzja produktowa — nie blokuje PL/EN.

## Architektura runtime

```text
App
 └─ LocaleProvider  (locale + setLocale, persist localStorage)
     ├─ document.documentElement.lang = speech/BCP47 short code
     ├─ Menu / SoundSettings / LanguageSwitcher
     ├─ BaseItem / Feedback / banners  → useT() / useLocale()
     └─ useAudio → speakText(text, { lang: speechLang })
```

### Pliki do dodania

| Plik | Rola |
|---|---|
| `src/i18n/locales.js` | Lista locale + meta TTS |
| `src/i18n/localeSettings.js` | get/set `localStorage` (`appLocale`) |
| `src/i18n/LocaleContext.js` | Provider + `useLocale` + `useT` |
| `src/i18n/ui/{pl,en}.js` | Stringi UI |
| `src/components/LanguageSwitcher.js` | Prosty przełącznik PL/EN |

### Pliki do zmiany (główne)

- `App.js` — owinąć `LocaleProvider`
- `config/content.js` — `labels` / mapy per locale + `resolveLabel`
- `utils/speech.js` — `pickVoiceForLang(voices, speechLang)`, `utterance.lang`
- `hooks/useAudio.js` — przekazywać `speechLang` z kontekstu
- `components/BaseItem.js` — `buildQuizPrompt` przez `t('quiz.find', …)`
- `Menu.js`, `Feedback.js`, `SoundSettings.js`, bannery, `audioPermissions.js`
- Komponenty kategorii (`Colors`, `Learn`, …) — `getItemLabel` z locale

## UX przełączania

1. **Widoczny przełącznik na ekranie menu** (rodzic zmienia język przed sesją).
2. Opcjonalnie ten sam kontrol w `SoundSettings` / przyszłych ustawieniach.
3. Zmiana natychmiastowa (re-render); nie wymaga reloadu.
4. Persist w `localStorage` (`appLocale`).
5. Domyślnie `pl` (zachowanie obecne); opcjonalnie później detekcja `navigator.language` tylko gdy brak zapisu.

Kontrol: dwa duże przyciski tekstowe (`Polski` / `English`), bez flag jako jedynego sygnału (dostępność + uniknięcie politycznych skojarzeń). Flagi opcjonalnie jako dekoracja, nie jako jedyna etykieta.

## Synteza mowy

1. Zamienić `pickPolishVoice` → `pickVoiceForLang(voices, 'en-US')` (dokładne dopasowanie, potem prefix `en`).
2. `speakText(text, { lang })` — wymagane `lang` z providera.
3. Test frazy w ustawieniach dźwięku też w aktualnym locale.
4. Brak głosu dla języka: nadal próbować `utterance.lang` (silnik może syntezować bez named voice); UI może pokazać delikatne ostrzeżenie dopiero gdy `onerror` / unsupported — nie blokować nauki.

## Fazy wdrożenia

### Faza 1 — fundament (bez zmiany UX nauki)

1. `locales` + `localeSettings` + `LocaleProvider`
2. UI strings PL (1:1 z obecnymi) + EN
3. `LanguageSwitcher` w menu
4. `speech.js` przyjmuje `lang`
5. Testy jednostkowe: storage, resolveLabel, pickVoiceForLang, speak z `en-US`

**Kryterium gotowości:** przełączenie zmienia menu/feedback/TTS lang; treść kategorii nadal PL (tymczasowo).

### Faza 2 — treść nauki PL + EN

1. Refactor `content.js` na `labels` / mapy per locale
2. Podpiąć `resolveLabel` we wszystkich kategoriach + `Learn`
3. Fonetyki marek aut osobno per locale
4. Quiz prompt i category labels (`cyfrę` / `number`, `literę` / `letter`) przez i18n

**Kryterium gotowości:** pełna sesja nauki/quizu po EN brzmi i pokazuje angielskie słowa.

### Faza 3 — włoski

1. Dodać `it` do `SUPPORTED_LOCALES` + `ui/it.js`
2. Uzupełnić `labels.it` / mapy liter i cyfr
3. `speechLang: 'it-IT'`
4. Smoke test na urządzeniu z głosem IT

### Faza 4+ — kolejne języki

Checklist na język:

- [ ] wpis w `LOCALE_META`
- [ ] plik UI
- [ ] wszystkie `labels.*` w content
- [ ] litery + liczby 0–40
- [ ] fonetyki marek (opcjonalnie = nazwa międzynarodowa)
- [ ] test TTS na telefonie
- [ ] aktualizacja switchera

## Testy

- Unit: `resolveLabel` fallback, `get/setLocale`, `pickVoiceForLang`
- Unit: `speakText` ustawia `utterance.lang` zgodnie z argumentem (rozszerzyć `speech.test.js`)
- Unit: UI `t('feedback.success')` dla `pl`/`en`
- Manual / computer-use: switch PL↔EN na menu, learn, quiz, sound test

## Ryzyka i mitigacje

| Ryzyko | Mitigacja |
|---|---|
| Brak głosów EN/IT na starszych telefonach | Ustawiać `lang` nawet bez named voice; nie crashować |
| Niespójne tłumaczenia contentu | Test „każdy item ma klucz locale” (prosty unit na listach) |
| Fonetyka marek różni się | Osobne `labels` per locale, nie współdzielić PL fonetyki |
| Scope creep (alfabety narodowe) | Świadomie poza MVP PL/EN |
| Duży diff w `content.js` | Faza 1 osobno od Fazy 2; review łatwiejszy |

## Czego nie robić w MVP

- Nie dodawać `i18next` / CDN tłumaczeń.
- Nie trzymać języka w URL (niepotrzebne dla PWA; localStorage wystarczy).
- Nie tłumaczyć nazw plików obrazów.
- Nie budować osobnych buildów per język.
- Nie mieszać „języka UI” i „języka nauki” jako dwóch ustawień — jedno globalne `locale`.

## Proponowana kolejność PR-ów

1. **PR A:** fundament i18n + UI PL/EN + speech `lang` + switcher  
2. **PR B:** content PL/EN we wszystkich kategoriach  
3. **PR C:** włoski  

Ten dokument = akceptacja kierunku przed kodem PR A.

# STAI... ASTA E AI?! 🤯

Prezentare web interactivă de ~10 minute, în limba română, pentru elevi de 12 ani. Include stil de comic-book / anime / jocuri, personaje **originale**, animații CSS, mini-provocări, notițe pentru prezentator și navigare din tastatură. Nu folosește API-uri, conturi sau chei.

## Pornește prezentarea

Pornește serverul local, care servește și linkurile directe către niveluri:

```bash
npm run dev
```

Apoi accesează `http://localhost:8000`.

## Controale

- `→` / `PageDown`: slide următor
- `←` / `PageUp`: slide anterior
- `N`: notițe prezentator
- `F`: fullscreen
- Bara de navigare din partea de jos, inclusiv punctele de progres

## Structura (10 minute)

1. Ce este AI? Definiție și trei analogii — 45 sec
2. Unde întâlnim AI — 60 sec
3. Training cu exemple câine/pisică — 105 sec
4. Joc de continuare a propoziției — 120 sec
5. Halucinații / quiz adevărat-fals — 105 sec
6. Folosește AI ca antrenor, nu pentru copiere — 105 sec
7. Final — 60 sec

## Important despre simulare

Secțiunea „Cum învață AI?” este o **simulare didactică**, nu un model real de învățare automată. Cele cinci imagini sunt fixe, dar orice etichetă aleasă de copii este acceptată și salvată. Testul cu un câine folosește eticheta majoritară dintre cele trei imagini de câine: cu cel puțin doi câini etichetați „pisică”, răspunde „PISICĂ!”. Altfel, răspunde „CÂINE!”. După test apar voturile și sunt evidențiate etichetele greșite; reluarea permite corectarea lor și compararea rezultatelor. Aceasta este o regulă didactică bazată pe clase cunoscute, nu recunoaștere vizuală sau antrenare reală.

## Build și verificare

Necesită Node.js 18+ și Python 3 doar pentru serverul local. Nu sunt necesare pachete npm.

```bash
npm run check
npm run build
npm run dev
```

Build-ul copiază exclusiv fișierele publice în `dist/`. Deschide http://localhost:8000. Pentru verificarea exactă a build-ului: `npm run dev --directory dist`.

## Publicare: Vercel

Importă repository-ul în Vercel. Fișierul `vercel.json` configurează build-ul `npm run build`, directorul `dist` și framework-ul `Other`. Nu sunt necesare chei, variabile de mediu sau servicii AI. Publicarea efectivă se face din contul Vercel; proiectul local nu generează un URL public.

## Ediția pentru proiecție

- Interfața AI holografică este animată local în CSS; Hamlet și Nova sunt personaje originale.
- Tranziții comic-book și bară de progres.
- Schimbarea contextului în scena 4 arată de ce continuarea depinde de textul anterior; textele sunt pregătite, fără inferență AI.
- Provocare finală cu insignă de detectiv, plus quiz cu feedback.
- Scenele inactive sunt `inert`; navigarea mută focusul pe titlu. Animațiile se opresc pentru `prefers-reduced-motion`.
- `N` afișează notițele **pe ecranul proiectat**. Nu este o fereastră privată de prezentator.
- „Reia misiunea” reîncarcă demonstrația: resetează toate exercițiile, selecțiile, modalele și progresul, apoi afișează ecranul inițial „Activează”, cu animația de pornire disponibilă din nou.

Ritmul recomandat rămâne 45 + 60 + 105 + 120 + 105 + 105 + 60 = 600 secunde. Tranzițiile sunt manuale, pentru a lăsa timp votului clasei.

### Limbi

Butonul RO / EN din dreapta sus, lângă ecran complet, schimbă limba fără a pierde progresul. Alegerea se păstrează local și la reluarea misiunii. Textele engleze sunt în `translations.js`; `i18n.js` localizează textele dinamice și atributele de accesibilitate, păstrând datele exercițiilor. Ilustrațiile traduse sunt în `assets/cards/*-en.svg`.

Pasul 6 include o trusă interactivă cu structurarea lecției, analogii și explicare proprie, exersarea reamintirii cu feedback și recapitulări în zile diferite. Exercițiile sunt pregătite didactic. Surse pentru tehnicile de reamintire și distribuire: [AERO](https://www.edresearch.edu.au/guides-resources/practice-guides/spacing-and-retrieval-practice-guide-full-publication), [Carpenter et al., 2022](https://doi.org/10.1038/s44159-022-00089-1).

### Întrebările copiilor

La final, butonul „Întrebările voastre” deschide un bonus cu toate cele 15 întrebări, inclusiv cele două adăugate despre utilizatori și furnizori, inclusiv subîntrebările. Răspunsurile au legături spre scene și surse unde este cazul. Bonusul nu intră în cele 10 minute. LEVEL 01 prezintă direct definiția AI și analogiile cu exemplele, sportul și rețeta digitală; pasul 4 distinge continuarea plauzibilă de verificarea faptelor. Conținutul și notițele sunt disponibile în RO/EN.

Întrebarea despre următorii 10 ani include un singur grafic schematic, de la telegraf (1844) la AI generativ (2022–2024). Axa anilor este proporțională; înălțimea curbei nu reprezintă un indicator măsurat de progres sau inteligență. Sursele istorice sunt legate în răspuns. Nu este o predicție și nu echivalează progresul telecomunicațiilor cu două lansări de produse AI.

### Pagina de pornire și nivelurile

`/` este homepage-ul, cu activarea AI și „Start misiune”. Nu este inclus în numărătoarea nivelurilor. „Start misiune” deschide `/slide-1`, unde definiția și cele trei analogii sunt afișate direct în LEVEL 01, fără modal. Urmează `/slide-2` până la `/slide-7`. Săgețile, sigla, istoricul browserului și legăturile din întrebări păstrează navigarea coerentă. Linkurile directe către niveluri funcționează și la refresh, prin regulile Vercel și serverul local (`npm run dev`, opțional `-- --port 8001`). „Reia misiunea” revine la `/` și reface activarea. Notițele homepage-ului sunt separate de cele pentru LEVEL 01.

### Utilizarea AI și furnizorii

Bonusul are 15 întrebări. Datele despre utilizarea AI generativ sunt Eurostat, UE, 2025 (16–24 versus 16–74 de ani; ultimele 3 luni înainte de sondaj), nu un clasament mondial sau după ore de utilizare. Întrebarea despre cel mai deștept AI prezintă opt furnizori/produse, cu logo-uri locale și detalii la click, fără un câștigător absolut. Descrierile au legături la furnizori; metodologia de comparație este legată la Artificial Analysis. Verificare editorială: 3 noiembrie 2026.

Logo-uri: `@lobehub/icons-static-svg` 1.102.0, [Lobe Icons](https://github.com/lobehub/lobe-icons), MIT; licența este în `assets/ai-logos/LICENSE`. Mărcile aparțin titularilor lor; imaginile identifică produsele și nu indică afiliere.

Întrebările despre inventator și anul dezvoltării explică contribuția colectivă, propunerea din 1955 și proiectul Dartmouth din 1956, cu legătură la documentul original și traducere în engleză.

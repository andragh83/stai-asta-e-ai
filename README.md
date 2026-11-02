# STAI... ASTA E AI?! 🤯

Prezentare web interactivă de ~10 minute, în limba română, pentru elevi de 12 ani. Include stil de comic-book / anime / jocuri, personaje **originale**, animații CSS, mini-provocări, notițe pentru prezentator și navigare din tastatură. Nu folosește API-uri, conturi sau chei.

## Pornește prezentarea

Deschide `index.html` într-un browser modern. Pentru dezvoltare în Codex/VS Code, poți porni și un server static:

```bash
python3 -m http.server 8000
```

Apoi accesează `http://localhost:8000`.

## Controale

- `→` / `PageDown`: slide următor
- `←` / `PageUp`: slide anterior
- `N`: notițe prezentator
- `F`: fullscreen
- Bara de navigare din partea de jos, inclusiv punctele de progres

## Structura (10 minute)

1. Hook — 45 sec
2. Unde întâlnim AI — 60 sec
3. Training cu exemple câine/pisică — 105 sec
4. Joc de continuare a propoziției — 120 sec
5. Halucinații / quiz adevărat-fals — 105 sec
6. Folosește AI ca antrenor, nu pentru copiere — 105 sec
7. Final — 60 sec

## Important despre simulare

Secțiunea „Cum învață AI?” este o **simulare didactică**, nu un model real de învățare automată. Cele cinci exemple, etichetele și predicția afișată sunt fixe. Scopul este să reprezinte vizual etapele „exemple etichetate → detectarea tiparelor → predicție pe un caz nou”.

## Build și verificare

Necesită Node.js 18+ și Python 3 doar pentru serverul local. Nu sunt necesare pachete npm.

```bash
npm run check
npm run build
npm run dev
```

Build-ul copiază exclusiv fișierele publice în `dist/`. Deschide http://localhost:8000. Pentru verificarea exactă a build-ului: `python3 -m http.server 8000 --directory dist`.

## Publicare: Vercel

Importă repository-ul în Vercel. Fișierul `vercel.json` configurează build-ul `npm run build`, directorul `dist` și framework-ul `Other`. Nu sunt necesare chei, variabile de mediu sau servicii AI. Publicarea efectivă se face din contul Vercel; proiectul local nu generează un URL public.

## Ediția pentru proiecție

- Pixel, Hamlet și Nova sunt personaje originale, desenate în CSS.
- Tranziții comic-book și bară de progres.
- Schimbarea contextului în scena 4 arată de ce continuarea depinde de textul anterior; textele sunt pregătite, fără inferență AI.
- Provocare finală cu insignă de detectiv, plus quiz cu feedback.
- Scenele inactive sunt `inert`; navigarea mută focusul pe titlu. Animațiile se opresc pentru `prefers-reduced-motion`.
- `N` afișează notițele **pe ecranul proiectat**. Nu este o fereastră privată de prezentator.
- „Reia misiunea” resetează antrenarea, quiz-ul și selecțiile. Reîncărcarea paginii resetează întreaga demonstrație.

Ritmul recomandat rămâne 45 + 60 + 105 + 120 + 105 + 105 + 60 = 600 secunde. Tranzițiile sunt manuale, pentru a lăsa timp votului clasei.

(() => {
  'use strict';
  function openDialog(dialog){
    dialog.showModal();
    const heading=dialog.querySelector('h3');
    if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}
    dialog.scrollTop=0;
  }
  document.querySelectorAll('dialog').forEach(dialog=>{
    let startedOutside=false;
    const isOutside=event=>{
      const bounds=dialog.getBoundingClientRect();
      return event.clientX<bounds.left || event.clientX>bounds.right || event.clientY<bounds.top || event.clientY>bounds.bottom;
    };
    dialog.addEventListener('pointerdown',event=>{startedOutside=event.target===dialog && isOutside(event);});
    dialog.addEventListener('click',event=>{
      if(startedOutside && event.target===dialog && isOutside(event) && dialog.open)dialog.close();
      startedOutside=false;
    });
    dialog.addEventListener('close',()=>{startedOutside=false;});
  });
  const slides = [...document.querySelectorAll('.slide')];
  const activationGate=document.getElementById('activationGate');
  const activateButton=document.getElementById('activateAI');
  activateButton.addEventListener('click',()=>{
    if(activateButton.disabled)return;
    activateButton.disabled=true;activateButton.textContent='ACTIVARE…';
    activationGate.classList.add('activating');
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setTimeout(()=>{
      activationGate.hidden=true;
      document.body.classList.remove('awaiting-activation');
      document.querySelector('.app-shell').inert=false;
      go(0);
      const title=document.getElementById('slide1title');title.tabIndex=-1;title.focus({preventScroll:true});
    },reduced?0:2200);
  });
  let fitFrame;
  function fitActiveScene(){
    const active=document.querySelector('.slide.active');if(!active)return;
    slides.forEach(s=>{if(s!==active)s.style.zoom='';});
    active.style.zoom='';
    if(window.innerWidth<=1000)return;
    // Fit the scene's actual content, including newly revealed blocks. Never clip it.
    for(let pass=0;pass<5;pass++){
      const extra=active.scrollHeight-active.clientHeight;
      if(extra<=2)break;
      const current=Number(active.style.zoom)||1;
      const next=current*(active.clientHeight/active.scrollHeight)*.99;
      if(next<.55){active.style.zoom='.55';break;}
      active.style.zoom=String(next);
    }
  }
  function scheduleSceneFit(){cancelAnimationFrame(fitFrame);fitFrame=requestAnimationFrame(fitActiveScene);}
  window.addEventListener('resize',scheduleSceneFit);
  document.addEventListener('languagechange',scheduleSceneFit);
  new ResizeObserver(scheduleSceneFit).observe(document.getElementById('stage'));
  new MutationObserver(scheduleSceneFit).observe(document.getElementById('stage'),{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['hidden']});
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const slideCount = document.getElementById('slideCount');
  const pips = document.getElementById('pips');
  const notes = document.getElementById('speakerNotes');
  const noteContent = document.getElementById('noteContent');
  let slideIndex = 0;

  const speakerNotes = [
    "45 secunde · Deschiderea misiunii\nÎntreabă: „Câți ați folosit vreodată AI?” Apoi: „Dar fără să știți?” Prezintă-l AI-ul, detectivul AI, și pe Hamlet, cățelul curios.\nSpune: „AI nu e magie. Hai să vedem ce face și unde poate greși!” Apasă „Start misiune”.\nInstrucțiunile de acțiune sunt în casete albastre, cu emoji. Timpurile sunt repere pentru tine; nu există cronometru sau avansare automată.\nTaste: ←/→ schimbă scenele, N arată/ascunde notițele, F activează ecranul complet. Notițele apar și pe proiector: ascunde-le cu N înainte să continui.",
    "1 minut · AI în viața reală\nCere clasei să aleagă 1–2 carduri. Ilustrațiile arată schematic mecanismul fiecărui card: recomandarea unui clip, compararea feței, regula paznicului și generarea textului. Apăsarea afișează analogia, mecanismul, limita și o întrebare. Sub explicație, apasă „Vezi indiciul”: modalul arată ce observă sistemul → ce face cu informația. Închide cu „Am înțeles!” sau Escape.\nDefinește indiciul: o informație care ajută la o estimare sau alegere, nu o dovadă sigură.\nRecomandări: vizionarea clipurilor oferă semnale despre interese. Face Unlock: caracteristicile feței sunt comparate cu cele înregistrate. NPC: intrarea în câmpul vizual declanșează regula de urmărire; asta nu înseamnă învățare. Chatbot: cuvintele din mesaj oferă context pentru răspuns.\nNu citi toate explicațiile integral: alege analogiile după interesul clasei.",
    "1 min 45 sec · Antrenorii AI-ului\nCere copiilor să numească animalul și apasă CÂINE sau PISICĂ după vot. Fotografiile meme, fără text suprapus: Doge, Polite Cat, Walter, Grumpy Cat, Smiling Dog. Ordinea: câine, pisică, câine, pisică, câine. Exemplele corecte se adună în cardul „Exemplele din care învață”, în dreapta pe desktop și mai jos pe mobil. O alegere greșită afișează feedback în cardul de antrenare și nu avansează; aici nu apare un modal.\nDupă 5 exemple, priviți fotografia nouă, cu un Shiba Inu în zăpadă, din cardul „Testul”. Întreabă: „Ce credeți că va răspunde AI?” Butonul de sub test apare după finalizarea celor 5 exemple. Pe mobil, după aproximativ 2 secunde, pagina derulează automat către test. Apasă „Vezi răspunsul lui AI”: apare reveal-ul mare „CÂINE!”. „Reîncepe” resetează doar această demonstrație.\nIdeea pentru copii: vede exemple → învață ce seamănă → încearcă să recunoască un animal nou. Folosește „ce au în comun” în loc de „tipare” și „ce crede AI că este” în loc de „predicție”. Într-un model real, antrenarea ajustează parametri matematici; nu înseamnă doar memorarea imaginilor. Aici exemplele și predicția sunt pregătite: nu antrenăm un AI real și cinci exemple nu garantează recunoașterea corectă.",
    "2 minute · Context și generarea textului\nPasul 1: citește „Mi-e foame! Aș mânca o…”. Clasa votează pizza, rachetă sau pernă. La început, propoziția nu are indicii evidențiate. După alegerea corectă, „Mi-e foame!” devine un buton albastru subliniat. Apasă-l: se deschide modalul care explică noțiunea de context și de ce indiciul duce la pizza. După închidere se deblochează pasul 2. Contextul este tot textul disponibil, nu doar indiciul evidențiat.\nPizza deblochează descoperirea contextului. Celelalte alegeri deschid un modal cu propoziția trăsnită și un smiley; închide-l și reîncercați. Precizează că alegem continuarea obișnuită pentru exercițiu, nu singura propoziție posibilă.\nPasul 2: întregul „Mi-e foame! Aș mânca o pizza” este noul context, albastru și subliniat. Apasă de 5 ori „Adaugă următoarea bucată”; predicțiile apar cu verde. Fiecare bucată intră la rândul ei în context, chiar dacă verdele rămâne pentru a arăta ce s-a adăugat.\nUltima apăsare dezvăluie cele două casete „De reținut” despre context și secretul chatbotului și deschide modalul de succes despre tokenuri: bucăți de text, nu neapărat cuvinte întregi. Folosește analogia pieselor LEGO. Explică și contorul de consum: în multe servicii AI pentru aplicații, tokenurile citite și generate contribuie la cost; tokenul nu este o monedă, iar într-o aplicație gratuită sau cu abonament nu se plătește neapărat separat fiecare mesaj. Demo-ul nu apelează un AI plătit. După închiderea modalului, citește concluziile cu clasa. Abia acum apare butonul „Schimbă contextul”, sub explicații; la începutul exercițiului este ascuns. Aceste casete sunt ascunse până la completarea propoziției și se ascund din nou când schimbi contextul. Închide-l, apoi „Schimbă contextul”: acum alegerea așteptată este rachetă. Repetă dacă timpul permite.\nUn model real calculează continuări din context și tiparele învățate. Bucățile de aici sunt pregătite didactic; nu reprezintă tokenizarea reală a unui model.",
    "1 min 45 sec · Quiz: AI poate greși\nCitește fiecare afirmație și cere vot adevărat/fals înainte de click. Răspunsurile celor 3 întrebări: ADEVĂRAT, FALS, FALS.\nFiecare alegere deschide un modal de succes sau eroare cu răspunsul corect și explicația. Închide-l cu „Am înțeles!” sau Escape, apoi apasă „Următoarea”. Nu se trece automat la întrebarea următoare. După întrebarea 3, „Reia provocarea” reia quiz-ul.\nExplică halucinația folosind cazul Mata v. Avianca (SUA, 2023), inclus în modal: ChatGPT a inventat hotărâri judecătorești, iar avocații le-au depus fără verificare corectă și le-au susținut după avertismente. Doi avocați și firma au fost sancționați cu 5.000 de dolari în total, nu fiecare. Subliniază atât greșeala AI, cât și responsabilitatea oamenilor de a verifica. La întrebarea despre imagini, modalul evidențiază ideea „Imaginile și videoclipurile pot fi generate sau modificate cu AI” și arată imaginea falsă cu Papa Francisc în geacă albă (2023), afișată fără marcaje sau modificări. Explică faptul că identificarea ca imagine AI se bazează pe verificarea originii, nu pe presupuneri despre ochelari, cruce sau mână. Nu este un exemplu creat pentru lecție; verificarea Full Fact este legată sub imagine. Întreabă clasa: „Unde am căuta să aflăm cine a creat imaginea?” Explică: erorile vizuale sunt motive de verificare, nu o dovadă sigură; unele imagini AI nu au erori vizibile, iar fotografiile reale pot avea detalii neobișnuite. Verificăm sursa și alte relatări. Viteza și tonul sigur nu dovedesc adevărul.\nÎntreabă: „Unde am verifica?” Exemple: manual, sursă oficială, adult de încredere.",
    "1 min 45 sec · AI ca antrenor și regula VIR\nCere clasei să aleagă mesajul care ajută la învățare, apoi explorați și celălalt card. Fiecare alegere deschide un modal: succes pentru explicații și exerciții, eroare pentru tema făcută în locul copilului. Închide fiecare modal.\nTrebuie apăsate ambele carduri, în orice ordine. După închiderea celui de-al doilea modal, apar „AI ca antrenor” și Nova: „puterea ta: întrebările bune”. Apăsarea repetată a aceluiași card nu deblochează mesajele.\nÎntreabă: „Ce ai putea cere după explicația cu pizza?” De exemplu: un exercițiu și un indiciu, fără răspunsul direct.\nApasă butonul centrat „VIR · Very Important Rule”, disponibil și înainte de explorarea cardurilor. Citește avertizarea: nu trimite parole, adresa, telefonul, școala sau documente personale. Pentru fracții, AI nu are nevoie să știe unde locuiești. La îndoială, întreabă un adult. Închide modalul.\nDupă explorarea ambelor carduri, deschide „Cum mă ajută AI să învăț?”: trusa are 4 butoane. Alege 1–2 exemple în timpul prezentării, circa 30–45 secunde, ca să păstrezi ritmul de 10 minute. Organizează informația: schema plantei și refacerea ei din memorie. Fă legături: 3 din 12 pătrățele de ciocolată = un sfert; cere copiilor să explice 6/12. Testează-te: copiii spun răspunsul înainte de „Verifică răspunsul”; library înseamnă bibliotecă, bookshop înseamnă librărie. Revino în timp: arată planul orientativ azi/mâine/peste 3 zile; nu există un interval perfect pentru orice lecție și AI nu trimite automat reamintiri în acest demo.\nExersarea reamintirii și practica distribuită au suport în cercetare; AI poate ajuta la aplicarea lor, dar nu garantează învățare mai rapidă sau note mai mari. Verificați rezumatele, întrebările și explicațiile cu manualul ori profesorul. Surse: AERO, Spacing and retrieval practice guide (https://www.edresearch.edu.au/guides-resources/practice-guides/spacing-and-retrieval-practice-guide-full-publication); Carpenter et al., 2022, The science of effective learning with spacing and retrieval practice (https://doi.org/10.1038/s44159-022-00089-1).",
    "1 minut · Recapitulare și insigna de detectiv\nParcurge cu săgețile de sub card cele 8 idei, cu accent pe ce pot folosi copiii: AI învață din exemple; contextul; tokenurile (arată cele două împărțiri ilustrative: cuvinte întregi versus un cuvânt împărțit; bucățile nu sunt neapărat silabe și împărțirea reală depinde de model); costul textului (analogia traficului de internet din abonamentul telefonului: mai mult text înseamnă, de obicei, mai multe tokenuri; plata depinde de serviciu); halucinațiile și verificarea; imaginile/video create ori schimbate cu AI; AI ca antrenor; datele personale. Exemplele de utilizare și NPC-urile nu mai au carduri separate: sunt introducere, nu mesajele principale. Spune câte o propoziție pe idee. Tastele ←/→ schimbă scenele principale, nu cardurile recapitulării.\nUltima provocare apare numai după vizualizarea tuturor celor 8 idei și rămâne deblocată dacă revii la una anterioară.\nCere vot: cred imediat sau caut o sursă? Prima variantă deschide modalul de eroare; închideți și reîncercați. „Caut o sursă de încredere” deschide explicația de succes. După închiderea ei apare separat modalul „Insignă de detectiv deblocată!”.\nButonul „Reia misiunea” din modal resetează exercițiile, explorarea cardurilor și progresul recapitulării, apoi revine la ecranul inițial cu butonul „Activează”. Animația de pornire poate fi redată din nou. Folosește-l numai dacă vrei să reîncepi. Pentru încheiere, lasă insigna pe ecran."
];

  function render() {
    slides.forEach((slide, index) => {
      const active = index === slideIndex;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.inert = !active;
      if (active) slide.scrollTop = 0;
    });
    document.getElementById('missionFill').style.width = `${(slideIndex+1)/slides.length*100}%`;
    slideCount.textContent = `${String(slideIndex + 1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
    prevBtn.disabled = slideIndex === 0;
    nextBtn.disabled = slideIndex === slides.length - 1;
    nextBtn.innerHTML = slideIndex === slides.length - 2 ? '<span>FINALUL</span> →' : '<span>URMĂTORUL</span> →';
    pips.innerHTML = slides.map((_, i) => `<button class="pip ${i === slideIndex ? 'active' : i < slideIndex ? 'done' : ''}" data-slide="${i}" title="Slide ${i+1}" aria-label="Mergi la slide-ul ${i+1}" ${i === slideIndex ? 'aria-current="step"' : ''}></button>`).join('');
    noteContent.textContent = speakerNotes[slideIndex];
    scheduleSceneFit();
    if (history.replaceState) history.replaceState(null, '', `#slide-${slideIndex + 1}`);
  }
  function go(index){const target=Math.max(0,Math.min(slides.length-1,index));if(target===slideIndex)return;document.getElementById('stage').classList.remove('scene-cut');void document.getElementById('stage').offsetWidth;document.getElementById('stage').classList.add('scene-cut');slideIndex=target;render();const title=slides[slideIndex].querySelector('h1,h2');title.tabIndex=-1;title.focus({preventScroll:true});}
  function next(){go(slideIndex+1)}
  function previous(){go(slideIndex-1)}
  prevBtn.addEventListener('click',previous);
  nextBtn.addEventListener('click',next);
  document.querySelectorAll('[data-next]').forEach(b => b.addEventListener('click',next));
  pips.addEventListener('click',e => {const p=e.target.closest('[data-slide]');if(p)go(Number(p.dataset.slide))});
  function restartMission(){
    // Reload the initial document so every activity, dialog and animation resets.
    history.replaceState(null,'',location.pathname+location.search);
    location.reload();
  }
  document.getElementById('restartBtn').addEventListener('click',restartMission);
  document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();go(0)});
  const savedIndex = Number((location.hash.match(/slide-(\d+)/)||[])[1]);
  if(savedIndex >= 1 && savedIndex <= slides.length) slideIndex=savedIndex-1;

  function toggleNotes(value){notes.hidden = typeof value === 'boolean' ? !value : !notes.hidden;document.getElementById('notesToggle').setAttribute('aria-expanded', String(!notes.hidden));}
  document.getElementById('notesToggle').addEventListener('click',()=>toggleNotes());
  document.getElementById('notesClose').addEventListener('click',()=>toggleNotes(false));
  async function toggleFullscreen(){try{if(document.fullscreenElement){await document.exitFullscreen?.()}else{await document.documentElement.requestFullscreen?.()}}catch{document.getElementById('fullscreenToggle').title='Folosește opțiunea Ecran complet a browserului.'}}
  document.getElementById('fullscreenToggle').addEventListener('click',toggleFullscreen);
  document.addEventListener('keydown', e=>{
    const tag = document.activeElement?.tagName;
    if(!activationGate.hidden || document.querySelector('dialog[open]'))return;
    if(tag === 'INPUT' || tag === 'TEXTAREA') return;
    if(e.key === 'ArrowRight' || e.key === 'PageDown'){e.preventDefault();next()}
    if(e.key === 'ArrowLeft' || e.key === 'PageUp'){e.preventDefault();previous()}
    if(e.key.toLowerCase() === 'n'){toggleNotes()}
    if(e.key.toLowerCase() === 'f'){toggleFullscreen()}
    if(e.key === 'Escape' && !notes.hidden){toggleNotes(false)}
  });


  // Level 02 — cards
  const useExplanations={
    youtube:{emoji:'📱',title:'Ca un coleg care îți recomandă clipuri',analogy:'Te uiți până la capăt la trucuri de Minecraft, dar sari peste rețete. Un coleg ar observa: „Cred că îți plac jocurile!” și ți-ar trimite alt clip asemănător.',mechanism:'AI caută tipare în semnale precum ce urmărești, cât timp și ce apreciezi. Compară și cu alte obiceiuri de vizionare, apoi estimează ce te-ar interesa.',limit:'Nu îți citește gândurile și nu te cunoaște perfect. O recomandare este o presupunere.',question:'Dacă ai urmări numai clipuri cu fotbal o săptămână, ce crezi că ți-ar recomanda?'},
    face:{emoji:'😎',title:'Ca un portar care verifică legitimația',analogy:'La un club sportiv, portarul compară fotografia de pe legitimație cu fața ta. Telefonul face o comparație matematică, folosind caracteristici ale feței.',mechanism:'La configurare, telefonul creează o reprezentare a feței. La deblocare, verifică dacă fața din fața camerei seamănă suficient cu cea înregistrată. Unele sisteme verifică și adâncimea.',limit:'Nu „știe cine ești” ca un om. Verifică o potrivire și poate avea dificultăți sau erori.',question:'De ce crezi că o fotografie tipărită nu ar trebui să fie suficientă pentru deblocare?'},
    games:{emoji:'🎮',title:'Paznicul din joc: te vede → te urmărește',analogy:'NPC înseamnă un personaj controlat de joc, nu de un alt jucător. Imaginează-ți un paznic: cât timp stai după un zid, patrulează. Ieși în fața lui? Te vede și începe să te urmărească. Te ascunzi din nou? Te caută, apoi revine la patrulare.',mechanism:'Indiciul este că ai intrat în câmpul lui vizual. Programatorul poate scrie regula: „Dacă vezi jucătorul, urmărește-l.” Jocul verifică situația și alege acțiunea potrivită. E ca la un joc cu „dacă… atunci…”: dacă auzi „Roșu!”, te oprești; dacă auzi „Verde!”, înaintezi.',limit:'Paznicul poate părea isteț doar urmând reguli. Nu înseamnă că învață după fiecare partidă. Un sistem care învață poate, în schimb, să-și ajusteze strategia după multe încercări și rezultate. Nu toate jocurile folosesc un astfel de sistem.',question:'Paznicul te vede și te urmărește de fiecare dată. A învățat ceva nou sau aplică aceeași regulă?'} ,
    chat:{emoji:'🤖',title:'Ca o continuare de poveste, la ora de română',analogy:'Profesorul începe: „A fost odată un…” și clasa propune continuări. „Dragon” se potrivește într-un basm; „atacant” se potrivește mai bine într-o poveste despre fotbal. Textul de până atunci oferă indicii.',mechanism:'Un chatbot a învățat tipare din multe texte. Folosește mesajele disponibile ca să calculeze ce bucăți de text ar putea urma, apoi le adaugă una câte una.',limit:'O poveste care sună convingător nu este automat adevărată. Chatbotul poate inventa fapte sau surse.',question:'Dacă îi ceri să explice fracțiile folosind felii de pizza, ce indiciu îi dai?'}
  };
  const situationClues={
    youtube:{name:'Recomandări',icon:'▶',observed:'Te uiți până la capăt la clipuri cu Minecraft.',resultIcon:'🎮',result:'Îți propune un alt clip cu Minecraft.',note:'Timpul de vizionare este un indiciu despre ce te-ar putea interesa. Nu este o certitudine.'},
    face:{name:'Face Unlock',icon:'😎',observed:'Camera măsoară caracteristici ale feței.',resultIcon:'🔓',result:'Le compară cu modelul salvat: potrivire suficientă → deblocare.',note:'Indiciul este asemănarea dintre caracteristicile măsurate și cele înregistrate, nu o presupunere despre ce îți place.'},
    games:{name:'Paznicul din joc',icon:'👀',observed:'Jucătorul intră în câmpul vizual al paznicului.',resultIcon:'🏃',result:'Paznicul începe să îl urmărească.',note:'Aici „indiciul” este un semnal care declanșează o regulă: dacă te vede, te urmărește. Nu trebuie să învețe ca să facă asta.'},
    chat:{name:'Chatbot',icon:'💬',observed:'Scrii: „Explică-mi fracțiile folosind pizza”.',resultIcon:'🍕',result:'Poate genera o explicație despre felii și părți dintr-un întreg.',note:'Cuvintele „fracții” și „pizza” sunt indicii din context: îi arată subiectul și exemplul cerut. Răspunsul poate conține greșeli.'}
  };
  function showSituationClue(key){
    const info=situationClues[key],panel=document.getElementById('clueDefinition');panel.textContent='';panel.dataset.situation=key;
    const title=document.createElement('strong');title.className='clue-title';title.textContent='🔎 INDICIUL ÎN ACEASTĂ SITUAȚIE · '+info.name;
    const flow=document.createElement('div');flow.className='clue-flow';
    for(const [icon,label,description] of [[info.icon,'CE OBSERVĂ',info.observed],[info.resultIcon,'CE FACE SISTEMUL',info.result]]){
      const step=document.createElement('div');step.className='clue-step';
      const visual=document.createElement('span');visual.className='clue-visual';visual.textContent=icon;visual.setAttribute('aria-hidden','true');
      const copy=document.createElement('div'),caption=document.createElement('b'),text=document.createElement('p');caption.textContent=label;text.textContent=description;copy.append(caption,text);step.append(visual,copy);
      if(flow.children.length){const arrow=document.createElement('span');arrow.className='clue-arrow';arrow.textContent='→';arrow.setAttribute('aria-hidden','true');flow.append(arrow);}flow.append(step);
    }
    const note=document.createElement('p');note.className='clue-note';note.textContent=info.note;panel.append(title,flow,note);
  }
  let useCardAnimations=[];
  document.querySelectorAll('.use-card').forEach(card=>card.addEventListener('click',()=>{
    if(card.classList.contains('selected'))return;
    useCardAnimations.forEach(animation=>animation.cancel());useCardAnimations=[];
    const useCards=[...document.querySelectorAll('.use-card')];
    const before=useCards.map(element=>element.getBoundingClientRect());
    const firstReveal=!document.getElementById('slide-2').classList.contains('has-explanation');
    const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.querySelectorAll('.use-card').forEach(c=>{c.classList.toggle('selected',c===card);c.setAttribute('aria-pressed',String(c===card));});
    document.getElementById('slide-2').classList.add('has-explanation');
    const info=useExplanations[card.dataset.reveal];
    const reveal=document.getElementById('useReveal');reveal.hidden=false;reveal.textContent='';reveal.classList.add('expanded');
    const icon=document.createElement('span');icon.textContent=info.emoji;icon.setAttribute('aria-hidden','true');
    const body=document.createElement('div');body.className='use-detail';
    const title=document.createElement('h3');title.textContent=info.title;body.append(title);
    for(const [label,text,cls] of [['Imaginează-ți: ',info.analogy,'analogy-detail'],['Ce face sistemul: ',info.mechanism,'mechanism-detail'],['Ține minte: ',info.limit,'limit-detail'],['Voi ce credeți? ',info.question,'question-detail']]){
      const paragraph=document.createElement('p');paragraph.className=cls;const heading=document.createElement('b');heading.textContent=label;paragraph.append(heading,document.createTextNode(text));body.append(paragraph);
    }
    const clueButton=document.createElement('button');clueButton.className='secondary clue-open';clueButton.textContent='🔎 VEZI INDICIUL';clueButton.setAttribute('aria-haspopup','dialog');clueButton.setAttribute('aria-controls','clueModal');
    clueButton.addEventListener('click',()=>{showSituationClue(card.dataset.reveal);openDialog(document.getElementById('clueModal'));});
    body.append(clueButton);reveal.append(icon,body);
    cancelAnimationFrame(fitFrame);fitActiveScene();
    if(!reducedMotion){
      if(window.innerWidth>1000){
        const zoom=Number(document.getElementById('slide-2').style.zoom)||1;
        useCards.forEach((element,i)=>{
          const after=element.getBoundingClientRect(),old=before[i];
          if(!after.width || !after.height)return;
          useCardAnimations.push(element.animate([
            {transformOrigin:'top left',transform:`translate(${(old.left-after.left)/zoom}px,${(old.top-after.top)/zoom}px) scale(${old.width/after.width},${old.height/after.height})`},
            {transformOrigin:'top left',transform:'translate(0,0) scale(1,1)'}
          ],{duration:480,easing:'cubic-bezier(.22,1,.36,1)'}));
        });
      }
      useCardAnimations.push(reveal.animate([
        {opacity:0,transform:`translateY(${firstReveal?22:10}px)`},
        {opacity:1,transform:'translateY(0)'}
      ],{duration:360,delay:firstReveal&&window.innerWidth>1000?160:0,easing:'ease-out',fill:'backwards'}));
    }

    if(window.matchMedia('(max-width: 650px)').matches)reveal.scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }));

  document.getElementById('clueModalClose').addEventListener('click',()=>document.getElementById('clueModal').close());

  // Level 03 — training simulation, NOT an actual ML model.
  const examples=[['doge.jpg','CÂINE','Doge'],['polite-cat.jpg','PISICĂ','Polite Cat'],['walter.jpg','CÂINE','Walter'],['grumpy-cat.jpg','PISICĂ','Grumpy Cat'],['smiling-dog.jpg','CÂINE','Smiling Dog']];
  function memeImage(file,name){const img=document.createElement('img');img.src='assets/memes/'+file;img.alt=name;img.decoding='async';return img;}
  let seen=0, predictionShown=false, trainingBusy=false, trainingFeedbackTimer, trainingTestScrollTimer;
  const trainBtn=document.getElementById('trainBtn'), trainReset=document.getElementById('trainReset');
  const examplesRow=document.getElementById('examplesRow');
  const labelChoices=document.getElementById('labelChoices');
  function resetTrain(){clearTimeout(trainingTestScrollTimer);clearTimeout(trainingFeedbackTimer);document.querySelector('.training-screen').classList.remove('training-leave','training-enter');trainingBusy=false;seen=0;predictionShown=false;examplesRow.innerHTML='<div class="empty-example">? <span>Aici apar animalele etichetate de voi.</span></div>';updateTrain();}
  function updateTrain(){
    document.getElementById('trainingStatus').classList.remove('is-error');
    const ready=seen===examples.length;
    document.querySelectorAll('[data-label]').forEach(b=>{b.disabled=false;b.classList.remove('correct','wrong');b.textContent=b.dataset.label;});
    document.getElementById('xpFill').style.width=`${seen/examples.length*100}%`;
    document.getElementById('xpText').textContent=`${seen} / 5 exemple`;
    document.getElementById('trainStep').textContent=ready?'3 · TESTEAZĂ AI-UL':'1 · ANTRENEAZĂ AI-UL';
    const animal=document.getElementById('trainingAnimal');
    animal.textContent='';
    if(ready){animal.innerHTML='<div class="mini-ai-hud" aria-hidden="true">AI</div>';}else{animal.append(memeImage(examples[seen][0],examples[seen][2]));}
    animal.setAttribute('aria-label',ready?'Interfață AI':examples[seen][1]==='CÂINE'?'Câine':'Pisică');
    document.getElementById('animalQuestion').textContent=ready?'Priviți animalul din TEST-ul pentru AI.':'Ce animal este? Arată-i AI-ului.';
    document.getElementById('trainingStatus').textContent=ready?'Votați: câine sau pisică? Apoi descoperiți ce răspunde AI.':seen===0?'Votați în clasă, apoi apăsați CÂINE sau PISICĂ.':'Etichetă corectă! Exemplul a fost adăugat. Ce animal urmează?';
    labelChoices.hidden=ready;
    trainBtn.hidden=!ready;
    document.getElementById('trainAnswerAction').hidden=!ready;
    trainBtn.disabled=predictionShown;
    document.getElementById('testPrediction').textContent=predictionShown?'':ready?'Exemplele sunt gata. Ce credeți că va răspunde AI?':'Mai întâi, etichetați cele 5 animale din cardul de antrenare.';
    document.getElementById('predictionReveal').hidden=!predictionShown;
    document.getElementById('predictionDisclaimer').hidden=!predictionShown;
    document.getElementById('testCard').hidden=predictionShown;
    trainBtn.textContent=predictionShown?'RĂSPUNS DEZVĂLUIT ✓':'VEZI RĂSPUNSUL LUI AI →';
  }
  document.querySelectorAll('[data-label]').forEach(button=>button.addEventListener('click',()=>{
    if(seen===examples.length || trainingBusy)return;
    document.querySelectorAll('[data-label]').forEach(b=>{b.classList.remove('correct','wrong');b.textContent=b.dataset.label;});
    const [file,label,name]=examples[seen];
    if(button.dataset.label!==label){document.getElementById('trainingStatus').classList.add('is-error');button.classList.add('wrong');button.textContent='✕ '+button.dataset.label;document.getElementById('trainingStatus').textContent='Mai uită-te o dată! '+(label==='CÂINE'?'Acesta este un câine':'Aceasta este o pisică')+'. Alege eticheta potrivită ca să nu încurcăm AI-ul.';return;}
    document.getElementById('trainingStatus').classList.remove('is-error');
    trainingBusy=true;button.classList.add('correct');button.textContent='✓ '+button.dataset.label;
    document.querySelectorAll('[data-label]').forEach(b=>{b.disabled=true;});
    document.getElementById('trainingStatus').textContent='Corect! Adăugăm exemplul…';
    trainingFeedbackTimer=setTimeout(()=>{
      const screen=document.querySelector('.training-screen');
      const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      screen.classList.add('training-leave');
      trainingFeedbackTimer=setTimeout(()=>{
        if(seen===0)examplesRow.textContent='';
        const chip=document.createElement('div');chip.className='example-chip';
        const caption=document.createElement('small');caption.textContent=label;
        chip.append(memeImage(file,name),caption);examplesRow.append(chip);seen++;updateTrain();
        screen.classList.remove('training-leave');screen.classList.add('training-enter');
        document.querySelectorAll('[data-label]').forEach(b=>{b.disabled=true;});
        trainingFeedbackTimer=setTimeout(()=>{
          screen.classList.remove('training-enter');trainingBusy=false;
          document.querySelectorAll('[data-label]').forEach(b=>{b.disabled=false;});
          if(seen===examples.length){
            trainBtn.focus({preventScroll:true});
            clearTimeout(trainingTestScrollTimer);
            trainingTestScrollTimer=setTimeout(()=>{
              if(window.innerWidth<=1000 && document.getElementById('slide-3').classList.contains('active') && !predictionShown && seen===examples.length){
                document.getElementById('testCard').scrollIntoView({block:'start',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
              }
            },2200);
          }
        },reduced?0:380);
      },reduced?0:220);
    },700);
  }));
  trainBtn.addEventListener('click',()=>{if(seen!==examples.length)return;clearTimeout(trainingTestScrollTimer);predictionShown=true;updateTrain();document.getElementById('predictionReveal').focus({preventScroll:true});document.getElementById('predictionReveal').scrollIntoView({block:'nearest',behavior:'instant'});document.getElementById('trainingStatus').textContent='Vede exemple → învață ce seamănă → încearcă să recunoască un animal nou.';});
  trainReset.addEventListener('click',resetTrain);
  updateTrain();

  // Level 04 — a scripted illustration of contextual text generation.
  const wordResponse=document.getElementById('wordResponse');
  const wordRounds=[
    {clue:'Mi-e foame!',rest:' Aș mânca o ',prefix:'Mi-e foame! Aș mânca o ',hint:'Ce variantă se potrivește cel mai bine cu propoziția?',fit:'pizza',tail:[' cu',' brânză',' și',' roșii','.']},
    {clue:'Vreau să zbor în spațiu!',rest:' Construiesc o ',prefix:'Vreau să zbor în spațiu! Construiesc o ',hint:'Context nou: ce se potrivește cu „să zbor în spațiu”?',fit:'rachetă',tail:[' care',' ajunge',' pe',' Lună','.']}
  ];
  let wordRound=0, chosenWord='', chunkIndex=0;
  let wordAnimations=[];
  const wordLayoutElements=()=>[document.getElementById('wordInstruction'),document.querySelector('.word-workshop'),document.getElementById('wordResponse'),document.getElementById('wordGeneration'),document.getElementById('contextHint'),document.getElementById('wordTakeaways'),document.getElementById('contextAction')];
  function beginWordChange(){
    wordAnimations.forEach(animation=>animation.cancel());wordAnimations=[];
    return new Map(wordLayoutElements().filter(el=>el.getClientRects().length).map(el=>[el,el.getBoundingClientRect()]));
  }
  function finishWordChange(before,entering=[]){
    cancelAnimationFrame(fitFrame);fitActiveScene();
    if(!document.getElementById('slide-4').classList.contains('active')||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const zoom=Number(document.getElementById('slide-4').style.zoom)||1;
    wordLayoutElements().forEach(el=>{
      if(!el.getClientRects().length)return;
      const old=before.get(el),next=el.getBoundingClientRect();
      if(old && Math.abs(old.top-next.top)>2){
        wordAnimations.push(el.animate([{transform:`translateY(${(old.top-next.top)/zoom}px)`},{transform:'translateY(0)'}],{duration:420,easing:'cubic-bezier(.22,1,.36,1)'}));
      }else if(!old){entering.push(el);}
    });
    [...new Set(entering)].forEach((el,i)=>{
      if(!el.getClientRects().length)return;
      wordAnimations.push(el.animate([{opacity:0,transform:'translateY(14px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,delay:Math.min(i*45,135),easing:'ease-out',fill:'backwards'}));
    });
  }

  function resetWords(){
    const previousLayout=beginWordChange();
    chosenWord='';chunkIndex=0;
    document.getElementById('wordChoices').hidden=false;
    const prompt=document.querySelector('.user-speech');prompt.textContent='';
    const clue=document.createElement('span');clue.className='context-prompt-clue';clue.textContent=wordRounds[wordRound].clue;prompt.append(clue,document.createTextNode(wordRounds[wordRound].rest));
    const gap=document.createElement('span');gap.className='word-gap';gap.textContent='___';prompt.append(gap);
    document.getElementById('wordInstruction').dataset.actionIcon='🗳️';
    document.getElementById('wordInstruction').innerHTML='<b>1 · Pune-te în locul AI!</b> Citiți propoziția, votați în clasă și alegeți ce s-ar potrivi în spațiul liber.';
    wordResponse.textContent=wordRounds[wordRound].hint;
    document.getElementById('wordGeneration').hidden=true;
    document.getElementById('wordTakeaways').hidden=true;
    document.getElementById('contextAction').hidden=true;
    document.getElementById('generatedSentence').textContent='';
    document.getElementById('nextChunk').disabled=false;
    document.querySelectorAll('.choice').forEach(b=>b.classList.remove('selected'));
    document.getElementById('chunkExplanation').textContent='Apasă și urmărește cum fiecare bucată nouă devine parte din context.';
    finishWordChange(previousLayout,[document.querySelector('.user-speech'),document.getElementById('wordChoices'),document.getElementById('wordInstruction')]);
  }
  document.querySelectorAll('.choice').forEach(button=>button.addEventListener('click',()=>{
    const round=wordRounds[wordRound];
    document.querySelectorAll('.choice').forEach(c=>c.classList.toggle('selected',c===button));
    if(button.dataset.word!==round.fit){
      const sentence=document.getElementById('wrongSentence');sentence.textContent='';
      const clue=document.createElement('span');clue.textContent=round.clue;
      const wrong=document.createElement('strong');wrong.textContent=button.dataset.word+'.';
      sentence.append(clue,document.createTextNode(round.rest),wrong);
      openDialog(document.getElementById('wordErrorModal'));return;
    }
    const previousLayout=beginWordChange();
    chosenWord=button.dataset.word;chunkIndex=0;
    document.getElementById('wordChoices').hidden=true;
    document.querySelector('.word-gap').textContent=chosenWord;
    wordResponse.textContent='Exact! Acum descoperim ce te-a ajutat să alegi.';
    const oldClue=document.querySelector('.context-prompt-clue');
    const clueButton=document.createElement('button');clueButton.className='context-clue context-discovery-trigger';clueButton.textContent=round.clue;clueButton.setAttribute('aria-haspopup','dialog');
    oldClue.replaceWith(clueButton);
    document.getElementById('wordInstruction').dataset.actionIcon='👆';
    document.getElementById('wordInstruction').innerHTML='<b>Ai ales corect!</b> Apasă pe textul evidențiat cu albastru ca să descoperi ce înseamnă contextul.';
    clueButton.addEventListener('click',()=>{
      document.getElementById('contextDiscoveryQuote').textContent='„'+round.clue+'”';
      document.getElementById('contextDiscoveryExplanation').textContent=wordRound===0?'„Mi-e foame!” face parte din context: îți spune că vorbim despre mâncare. De aceea „pizza” se potrivește mai bine decât „rachetă”. Contextul include și restul propoziției, nu doar indiciul evidențiat.':'„Vreau să zbor în spațiu!” face parte din context: acum vorbim despre o călătorie în spațiu. De aceea „rachetă” se potrivește. Același set de opțiuni, alt context!';
      openDialog(document.getElementById('contextDiscoveryModal'));
    });
    finishWordChange(previousLayout,[clueButton,document.querySelector('.word-gap'),document.getElementById('wordInstruction')]);
    clueButton.focus({preventScroll:true});
  }));
  function startWordGeneration(){
    const previousLayout=beginWordChange();
    const round=wordRounds[wordRound];
    document.getElementById('wordInstruction').dataset.actionIcon='👆';
    document.getElementById('wordInstruction').innerHTML='<b>2 · Construiți răspunsul!</b> Apăsați pe „Adaugă următoarea bucată” până se termină propoziția.';
    document.getElementById('wordGeneration').hidden=false;
    const sentence=document.getElementById('generatedSentence');sentence.textContent='';
    const context=document.createElement('mark');context.className='context-clue generated-context';
    context.textContent=round.prefix+chosenWord;sentence.append(context);
    document.getElementById('nextChunk').disabled=false;
    document.getElementById('chunkExplanation').textContent='Și textul nou intră în context! AI folosește acum toată propoziția de mai sus ca să o continue.';
    finishWordChange(previousLayout,[document.getElementById('wordInstruction')]);
    document.getElementById('nextChunk').focus({preventScroll:true});
  }
  document.getElementById('contextDiscoveryClose').addEventListener('click',()=>document.getElementById('contextDiscoveryModal').close());
  document.getElementById('contextDiscoveryModal').addEventListener('close',()=>{if(chosenWord && document.getElementById('wordGeneration').hidden)startWordGeneration();});
  resetWords();
  document.getElementById('nextChunk').addEventListener('click',()=>{
    const round=wordRounds[wordRound];if(!chosenWord || chunkIndex>=round.tail.length)return;
    const piece=document.createElement('span');piece.className='generated-chunk';piece.textContent=round.tail[chunkIndex++];document.getElementById('generatedSentence').append(piece);
    if(chunkIndex===round.tail.length){document.getElementById('wordTakeaways').hidden=false;document.getElementById('nextChunk').disabled=true;document.getElementById('chunkExplanation').textContent='Propoziția este completă! Puteți încerca și celălalt context.';openDialog(document.getElementById('wordSuccessModal'));}
  });
  document.getElementById('wordSuccessClose').addEventListener('click',()=>document.getElementById('wordSuccessModal').close());
  document.getElementById('wordSuccessModal').addEventListener('close',()=>{
    const previousLayout=beginWordChange();
    document.getElementById('contextAction').hidden=false;
    finishWordChange(previousLayout,[document.getElementById('wordTakeaways')]);
    const conclusion=document.querySelector('#wordTakeaways h3');conclusion.tabIndex=-1;conclusion.focus({preventScroll:true});conclusion.scrollIntoView({block:'nearest',behavior:'instant'});
  });
  document.getElementById('wordErrorClose').addEventListener('click',()=>document.getElementById('wordErrorModal').close());
  document.getElementById('contextToggle').addEventListener('click',()=>{wordRound=(wordRound+1)%wordRounds.length;resetWords();wordResponse.textContent=wordRound===1?'S-a schimbat contextul: acum vrem să zburăm în spațiu, nu să mâncăm. Ce alegem?':'S-a schimbat contextul: acum ne este foame. Ce continuare se potrivește?';});

  // Level 05 — true/false quiz
  const quiz=[
    {q:'AI poate inventa informații și totuși să sune foarte sigur.',a:true,why:'CORECT! Asta se numește uneori „halucinație AI”. Nu confunda tonul sigur cu adevărul.'},
    {q:'Orice imagine spectaculoasă de pe internet este automat reală.',a:false,why:'CORECT! Imaginile și videoclipurile pot fi generate sau modificate cu AI.'},
    {q:'Dacă AI îți răspunde repede, înseamnă că nu poate greși.',a:false,why:'CORECT! Răspunsurile rapide pot conține și erori. Verifică sursele importante.'}
  ];
  let questionIndex=0, answered=false;
  const trueBtn=document.getElementById('trueBtn'),falseBtn=document.getElementById('falseBtn'),nextQuestion=document.getElementById('nextQuestion');
  function displayQuestion(){const q=quiz[questionIndex];document.getElementById('quizQuestion').textContent=q.q;document.getElementById('quizProgress').textContent=`ÎNTREBAREA ${questionIndex+1} / ${quiz.length}`;document.getElementById('quizFeedback').textContent='Alege răspunsul.';[trueBtn,falseBtn].forEach(b=>{b.classList.remove('correct','wrong');b.textContent=b===trueBtn?'ADEVĂRAT':'FALS';b.disabled=false});nextQuestion.disabled=true;nextQuestion.textContent=questionIndex===quiz.length-1?'REIA PROVOCAREA ↺':'URMĂTOAREA →';answered=false;}
  const quizResultModal=document.getElementById('quizResultModal');
  quizResultModal.addEventListener('close',()=>nextQuestion.focus({preventScroll:true}));
  document.getElementById('quizResultClose').addEventListener('click',()=>quizResultModal.close());
  function answer(value){
    if(answered)return;answered=true;
    const current=quiz[questionIndex],correct=current.a===value;
    const button=value?trueBtn:falseBtn;
    button.classList.add(correct?'correct':'wrong');
    const correctButton=current.a?trueBtn:falseBtn;
    correctButton.classList.add('correct');
    correctButton.textContent='✓ CORECT: '+(current.a?'ADEVĂRAT':'FALS');
    if(!correct)button.textContent='✕ AI ALES: '+(value?'ADEVĂRAT':'FALS');
    document.getElementById('quizFeedback').textContent=correct?'⭐ Răspuns corect!':'👀 Răspunsul corect: '+(current.a?'ADEVĂRAT.':'FALS.');
    trueBtn.disabled=true;falseBtn.disabled=true;nextQuestion.disabled=false;
    quizResultModal.classList.toggle('word-success-modal',correct);
    document.getElementById('quizResultIcon').textContent=correct?'🏆':'😄';
    document.getElementById('quizResultTitle').textContent=correct?'CORECT! AI OCHI DE DETECTIV!':'UPS! HAI SĂ LĂMURIM.';
    document.getElementById('quizResultQuestion').textContent=current.q;
    document.getElementById('quizResultAnswer').textContent=questionIndex===0?'HALUCINAȚIE AI':questionIndex===1?'IMAGINILE ȘI VIDEOCLIPURILE POT FI GENERATE SAU MODIFICATE CU AI':'Răspunsul corect: '+(current.a?'ADEVĂRAT':'FALS');
    document.getElementById('mediaLiteracyDemo').hidden=questionIndex!==1;
    document.getElementById('hallucinationCase').hidden=questionIndex!==0;
    quizResultModal.classList.toggle('has-media-demo',questionIndex===1);
    document.getElementById('quizResultExplanation').textContent=questionIndex===0?'O halucinație AI apare când sistemul inventează o informație și o prezintă ca și cum ar fi adevărată. Iată un caz în care asta a avut consecințe reale:':questionIndex===1?'O imagine poate arăta ca o fotografie fără să surprindă un eveniment real. La fel, un videoclip poate fi creat sau modificat. Privește exemplul real de dezinformare de mai jos: imaginea cu Papa Francisc în geacă albă, devenită virală în 2023, a fost generată cu AI.':current.why.replace('CORECT! ','');
    openDialog(quizResultModal);
  }
  trueBtn.addEventListener('click',()=>answer(true));falseBtn.addEventListener('click',()=>answer(false));
  nextQuestion.addEventListener('click',()=>{questionIndex=(questionIndex+1)%quiz.length;displayQuestion()});

  // Level 06 — learn, don't outsource thinking
  const promptFeedback=document.getElementById('promptFeedback');
  const good=document.getElementById('goodPrompt'),bad=document.getElementById('badPrompt');
  const promptResultModal=document.getElementById('promptResultModal');
  let lastPromptWasGood=false;
  const exploredPrompts=new Set();
  function resetPromptExploration(){exploredPrompts.clear();document.getElementById('mentorReveal').hidden=true;document.getElementById('promptExploration').textContent='Explorează ambele carduri · 0 / 2';[good,bad].forEach(card=>card.classList.remove('explored'));}
  document.getElementById('virButton').addEventListener('click',()=>openDialog(document.getElementById('virModal')));
  document.getElementById('virClose').addEventListener('click',()=>document.getElementById('virModal').close());
  document.getElementById('promptResultClose').addEventListener('click',()=>promptResultModal.close());
  promptResultModal.addEventListener('close',()=>{document.getElementById('mentorReveal').hidden=exploredPrompts.size!==2;(lastPromptWasGood?good:bad).focus({preventScroll:true});});
  function selectPrompt(isGood){
    lastPromptWasGood=isGood;
    good.classList.toggle('selected',isGood);bad.classList.toggle('selected',!isGood);
    exploredPrompts.add(isGood?'good':'bad');
    (isGood?good:bad).classList.add('explored');
    document.getElementById('promptExploration').textContent=exploredPrompts.size===2?'Ambele variante explorate · 2 / 2 ✓':`Explorează și celălalt card · ${exploredPrompts.size} / 2`;
    promptResultModal.classList.toggle('word-success-modal',isGood);
    document.getElementById('promptResultIcon').textContent=isGood?'🏆':'😄';
    document.getElementById('promptResultTitle').textContent=isGood?'LEVEL UP! TU ÎȚI ANTRENEZI CREIERUL!':'UPS! CINE MAI ÎNVAȚĂ AICI?';
    document.getElementById('promptResultChoice').textContent=isGood?'„Explică-mi fracțiile folosind pizza, apoi testează-mă!”':'„Rezolvă-mi tema. Dă-mi doar răspunsurile.”';
    document.getElementById('promptResultExplanation').textContent=isGood?'Ceri o explicație, apoi exersezi chiar tu. AI poate fi antrenorul tău: îți oferă indicii și întrebări. Tu rezolvi și verifici dacă ai înțeles!':'Poate primești tema gata, dar nu exersezi cum să o rezolvi singur. E ca și cum altcineva ar face antrenamentul în locul tău! Cere explicații și indicii, apoi încearcă tu.';
    document.getElementById('promptResultClose').textContent=isGood?'AM ÎNȚELES! ✓':'ALEG DIN NOU ↺';
    openDialog(promptResultModal);
  }
  good.addEventListener('click',()=>selectPrompt(true));bad.addEventListener('click',()=>selectPrompt(false));
  const learningToolkit=document.getElementById('learningToolkitModal');
  function showLearningTool(key){
    document.querySelectorAll('[data-learning-tool]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.learningTool===key)));
    document.querySelectorAll('[data-learning-panel]').forEach(panel=>{panel.hidden=panel.dataset.learningPanel!==key;});
  }
  document.getElementById('learningToolkitOpen').addEventListener('click',()=>{
    showLearningTool('organize');
    document.getElementById('learningRecallAnswer').hidden=true;
    document.getElementById('learningRecallCheck').setAttribute('aria-expanded','false');
    openDialog(learningToolkit);
  });
  document.querySelectorAll('[data-learning-tool]').forEach(button=>button.addEventListener('click',()=>showLearningTool(button.dataset.learningTool)));
  document.getElementById('learningRecallCheck').addEventListener('click',()=>{
    document.getElementById('learningRecallAnswer').hidden=false;
    document.getElementById('learningRecallCheck').setAttribute('aria-expanded','true');
  });
  document.getElementById('learningToolkitClose').addEventListener('click',()=>learningToolkit.close());
  learningToolkit.addEventListener('close',()=>document.getElementById('learningToolkitOpen').focus({preventScroll:true}));

  const takeawayCards=[...document.querySelectorAll('#takeawayTrack article')];
  let takeawayIndex=0;
  const viewedTakeaways=new Set();
  function showTakeaway(index){
    takeawayIndex=Math.max(0,Math.min(takeawayCards.length-1,index));
    viewedTakeaways.add(takeawayIndex);
    document.getElementById('exitTicket').hidden=viewedTakeaways.size!==takeawayCards.length;
    takeawayCards.forEach((card,i)=>{card.hidden=i!==takeawayIndex;card.setAttribute('aria-label',`Ideea ${i+1} din ${takeawayCards.length}`);});
    document.getElementById('takeawayCount').textContent=`${takeawayIndex+1} / ${takeawayCards.length}`;
    document.getElementById('takeawayPrev').disabled=takeawayIndex===0;
    document.getElementById('takeawayNext').disabled=takeawayIndex===takeawayCards.length-1;
  }
  document.getElementById('takeawayPrev').addEventListener('click',()=>showTakeaway(takeawayIndex-1));
  document.getElementById('takeawayNext').addEventListener('click',()=>showTakeaway(takeawayIndex+1));
  showTakeaway(0);
  const exitModal=document.getElementById('exitResultModal');
  let exitCorrect=false;
  document.getElementById('exitResultClose').addEventListener('click',()=>exitModal.close());
  const badgeModal=document.getElementById('badgeModal');
  exitModal.addEventListener('close',()=>{
    if(exitCorrect){openDialog(badgeModal);}
    else{document.querySelector('[data-exit="copy"]').focus({preventScroll:true});}
  });
  badgeModal.addEventListener('close',()=>document.querySelector('[data-exit="check"]').focus({preventScroll:true}));
  document.getElementById('badgeRestart').addEventListener('click',restartMission);
  document.querySelectorAll('[data-exit]').forEach(b=>b.addEventListener('click',()=>{
    exitCorrect=b.dataset.exit==='check';
    exitModal.classList.toggle('word-success-modal',exitCorrect);
    document.getElementById('exitResultIcon').textContent=exitCorrect?'🏆':'😄';
    document.getElementById('exitResultTitle').textContent=exitCorrect?'CORECT! AI ALES SĂ VERIFICI!':'UPS! SIGUR PE EL NU ÎNSEAMNĂ CORECT.';
    document.getElementById('exitResultExplanation').textContent=exitCorrect?'Curiozitate + verificare = superputere! Compară informația cu o sursă de încredere, precum manualul sau o sursă oficială. AI te ajută, tu verifici.':'Un răspuns poate suna convingător și totuși să fie inventat. Înainte să crezi sau să distribui informația, caută o sursă de încredere. Mai încearcă o dată!';
    document.getElementById('exitResultClose').textContent=exitCorrect?'CONTINUĂ →':'ALEG DIN NOU ↺';
    document.getElementById('exitFeedback').textContent=exitCorrect?'Provocare rezolvată! ✓':'Mai încearcă: cum poți verifica informația?';
    openDialog(exitModal);
  }));
  document.getElementById('notesToggle').setAttribute('aria-expanded','false');
  render();
})();

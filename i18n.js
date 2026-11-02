(() => {
  'use strict';
  const dictionary=window.AI_EN;
  const sourceText=new WeakMap(),sourceAttributes=new WeakMap();
  const toggle=document.getElementById('languageToggle');
  let language='ro';
  try{language=localStorage.getItem('ai-language')==='en'?'en':'ro';}catch{}
  function english(source){
    const key=source.trim();
    if(key==='AI?')return '?';
    let translated=dictionary[key];
    if(translated===undefined){
      if(/^\d+ \/ 5 exemple$/.test(key))translated=key.replace('exemple','examples');
      else if(/^ÎNTREBAREA \d+ \/ \d+$/.test(key))translated=key.replace('ÎNTREBAREA','QUESTION');
      else if(/^Mergi la slide-ul \d+$/.test(key))translated=key.replace('Mergi la slide-ul','Go to slide');
      else if(/^Ideea \d+ din \d+$/.test(key))translated=key.replace('Ideea','Takeaway').replace(' din ',' of ');
      else if(key.startsWith('🔎 INDICIUL ÎN ACEASTĂ SITUAȚIE · '))translated='🔎 THE CLUE IN THIS SITUATION · '+english(key.slice('🔎 INDICIUL ÎN ACEASTĂ SITUAȚIE · '.length));
      else if(key.startsWith('Explorează ambele carduri · '))translated=key.replace('Explorează ambele carduri','Explore both cards');
      else if(key.startsWith('Explorează și celălalt card · '))translated=key.replace('Explorează și celălalt card','Explore the other card too');
      else if(/^[✓✕] (CÂINE|PISICĂ)$/.test(key))translated=key.slice(0,2)+english(key.slice(2));
      else if(key==='rachetă.')translated='rocket.';
      else if(key==='pernă.')translated='pillow.';
    }
    return translated===undefined?source:source.slice(0,source.indexOf(key))+translated+source.slice(source.indexOf(key)+key.length);
  }
  function localizeValue(current,previous){
    // Retain source copy when switching back; accept fresh text from any activity.
    const original=previous && current===previous.rendered?previous.original:current;
    return {original,rendered:language==='en'?english(original):original};
  }
  const attributes=['aria-label','aria-roledescription','alt','title','src','content'];
  function translateTree(root){
    if(root.nodeType===Node.TEXT_NODE){
      if(!root.parentElement?.closest('script,style,#languageToggle')){
        const entry=localizeValue(root.nodeValue,sourceText.get(root));
        sourceText.set(root,entry);if(root.nodeValue!==entry.rendered)root.nodeValue=entry.rendered;
      }
      return;
    }
    if(root.nodeType!==Node.ELEMENT_NODE || root.matches('script,style,#languageToggle'))return;
    let saved=sourceAttributes.get(root);if(!saved){saved={};sourceAttributes.set(root,saved);}
    for(const name of attributes){
      if(!root.hasAttribute(name))continue;
      const entry=localizeValue(root.getAttribute(name),saved[name]);saved[name]=entry;
      if(root.getAttribute(name)!==entry.rendered)root.setAttribute(name,entry.rendered);
    }
    for(const child of root.childNodes)translateTree(child);
  }
  const observer=new MutationObserver(records=>{
    observer.disconnect();
    for(const record of records){
      if(record.type==='childList')record.addedNodes.forEach(translateTree);
      else translateTree(record.target);
    }
    observe();
  });
  function observe(){observer.observe(document.documentElement,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:attributes});}
  function applyLanguage(){
    observer.disconnect();
    document.documentElement.lang=language;
    translateTree(document.documentElement);
    toggle.setAttribute('aria-label',language==='ro'?'Switch to English':'Schimbă în română');
    toggle.title=language==='ro'?'Switch to English':'Schimbă în română';
    toggle.setAttribute('aria-pressed',String(language==='en'));
    toggle.querySelector('[data-lang="ro"]').classList.toggle('current',language==='ro');
    toggle.querySelector('[data-lang="en"]').classList.toggle('current',language==='en');
    observe();
    document.dispatchEvent(new Event('languagechange'));
  }
  toggle.addEventListener('click',()=>{
    language=language==='ro'?'en':'ro';
    try{localStorage.setItem('ai-language',language);}catch{}
    applyLanguage();
  });
  applyLanguage();
})();

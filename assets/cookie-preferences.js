(() => {
 const key='diez42-measurement-choice';
 const banner=document.querySelector('[data-cookie-banner]');
 const translateBanner=()=>{const lang=document.documentElement.lang.toLowerCase();banner?.querySelectorAll('[data-text-en]').forEach(n=>{n.textContent=n.getAttribute('data-text-'+lang)||n.getAttribute('data-text-en');});};
 translateBanner();
 new MutationObserver(translateBanner).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 const read=()=>{try{return localStorage.getItem(key);}catch{return null;}};
 const save=value=>{try{localStorage.setItem(key,value);}catch{}};
 function activate(){
  if(document.querySelector('[data-active-analytics]'))return;
  const source=document.querySelector('[data-analytics]')?.content.querySelector('script');
  if(!source)return;
  const script=document.createElement('script');
  for(const a of source.attributes)script.setAttribute(a.name,a.value);
  script.dataset.wstConsent='granted';
  script.dataset.activeAnalytics='true';
  document.head.append(script);
 }
 if(banner)banner.hidden=!!read();
 if(read()==='accepted')activate();
 document.querySelectorAll('[data-cookie-choice]').forEach(button=>button.addEventListener('click',()=>{
  save(button.dataset.cookieChoice); if(banner)banner.hidden=true;
  if(button.dataset.cookieChoice==='accepted')activate();else if(document.querySelector('[data-active-analytics]'))location.reload();
 }));
 document.querySelector('[data-cookie-reset]')?.addEventListener('click',()=>{if(banner)banner.hidden=false;});
 const toggle=document.querySelector('[data-nav-toggle]');
 const nav=document.querySelector('.glass-nav .site-nav');
 toggle?.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav?.classList.toggle('is-open',open);});
 nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');toggle?.setAttribute('aria-expanded','false');}));
})();

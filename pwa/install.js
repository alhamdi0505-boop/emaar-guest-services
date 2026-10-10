(()=>{
const scope=location.pathname.startsWith('/tower2/')?'/tower2/':'/tower1/';
let promptEvent=null;
const button=document.getElementById('install-app'),help=document.getElementById('install-help'),offline=document.getElementById('offline-note');
function translate(){const english=document.documentElement.lang==='en';document.querySelectorAll('[data-ar][data-en]').forEach(el=>el.textContent=el.dataset[english?'en':'ar']);if(!help.hidden)showHelp();}
function showHelp(){help.hidden=false;const english=document.documentElement.lang==='en';const ios=/iPhone|iPad|iPod/.test(navigator.userAgent)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);help.textContent=ios?(english?'In Safari, tap Share → Add to Home Screen → Open as Web App → Add.':'من Safari اضغط مشاركة ← إضافة إلى الشاشة الرئيسية ← فتح كتطبيق ويب ← إضافة.'):(english?'Open this link in Chrome or Samsung Internet. From the browser menu, choose Install app or Add to Home screen.':'افتح الرابط في Chrome أو Samsung Internet. من قائمة المتصفح اختر تثبيت التطبيق أو إضافة إلى الشاشة الرئيسية.');}
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();promptEvent=event;});
window.addEventListener('appinstalled',()=>{promptEvent=null;document.querySelector('.install-panel').hidden=true;});
button.addEventListener('click',async()=>{if(promptEvent){const event=promptEvent;promptEvent=null;try{await event.prompt();await event.userChoice;}catch{showHelp();}}else showHelp();});
if(matchMedia('(display-mode: standalone)').matches||navigator.standalone)document.querySelector('.install-panel').hidden=true;
function network(){offline.hidden=navigator.onLine;}
window.addEventListener('online',network);window.addEventListener('offline',network);network();
new MutationObserver(translate).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});translate();
if('serviceWorker' in navigator)navigator.serviceWorker.register(scope+'sw.js',{scope}).catch(()=>{});
})();
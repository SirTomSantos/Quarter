/* Quarters service worker. Caches only 'quarters-*' caches, so it never touches Marginalia or Commonplace on the same site. */
const VER='quarters-v2',FONTS='quarters-fonts-v1';
const SHELL=['./','index.html','config.js','manifest.webmanifest','icon-192.png','icon-512.png','maskable-512.png','apple-touch-icon.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(VER).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.indexOf('quarters-')===0&&k!==VER&&k!==FONTS).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){
    e.respondWith(caches.open(FONTS).then(c=>c.match(r).then(hit=>{const net=fetch(r).then(res=>{if(res&&res.status===200)c.put(r,res.clone());return res}).catch(()=>hit);return hit||net})));return;
  }
  if(u.origin!==location.origin)return;                       /* never touch Google sign-in or Drive */
  if(/\/(Marginalia|marginalia|Commonplace|commonplace)/.test(u.pathname))return;
  e.respondWith(fetch(r).then(res=>{if(res&&res.status===200){const copy=res.clone();caches.open(VER).then(c=>c.put(r,copy))}return res}).catch(()=>caches.match(r).then(hit=>hit||caches.match('index.html'))));
});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(self.clients.matchAll({type:'window'}).then(cs=>{for(const c of cs){if('focus' in c)return c.focus()}return self.clients.openWindow('./')}))});

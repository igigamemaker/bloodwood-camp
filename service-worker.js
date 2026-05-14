const CACHE_NAME = 'bloodwood-camp-loading-fix-v2';

const CORE_ASSETS = ['./', './index.html', './manifest.webmanifest', './assets/ability/image_62.png', './assets/ability/image_63.png', './assets/ability/image_64.png', './assets/ability/image_65.png', './assets/ability/image_66.png', './assets/ability/image_67.png', './assets/ability/image_68.png', './assets/ability/image_69.png', './assets/ability/image_70.png', './assets/ability/image_71.png', './assets/ability/image_72.png', './assets/ability/image_73.png', './assets/ability/image_74.png', './assets/ability/image_75.png', './assets/ability/image_76.png', './assets/ability/image_77.png', './assets/ability/image_78.png', './assets/ability/image_79.png', './assets/bosses/boss_1.png', './assets/bosses/boss_10.png', './assets/bosses/boss_11.png', './assets/bosses/boss_12.png', './assets/bosses/boss_13.png', './assets/bosses/boss_14.png', './assets/bosses/boss_15.png', './assets/bosses/boss_16.png', './assets/bosses/boss_17.png', './assets/bosses/boss_18.png', './assets/bosses/boss_19.png', './assets/bosses/boss_2.png', './assets/bosses/boss_20.png', './assets/bosses/boss_21.png', './assets/bosses/boss_22.png', './assets/bosses/boss_23.png', './assets/bosses/boss_24.png', './assets/bosses/boss_25.png', './assets/bosses/boss_3.png', './assets/bosses/boss_4.png', './assets/bosses/boss_5.png', './assets/bosses/boss_6.png', './assets/bosses/boss_7.png', './assets/bosses/boss_8.png', './assets/bosses/boss_9.png', './assets/heroes/archer.png', './assets/heroes/guard.png', './assets/heroes/mag.png', './assets/image_01.png', './assets/image_03.jpg', './assets/maps/map_1.jpg', './assets/maps/map_2.png', './assets/maps/map_3.png', './assets/maps/map_4.png', './assets/maps/map_5.png', './assets/mobs/mob_1.png', './assets/mobs/mob_10.png', './assets/mobs/mob_11.png', './assets/mobs/mob_12.png', './assets/mobs/mob_13.png', './assets/mobs/mob_14.png', './assets/mobs/mob_15.png', './assets/mobs/mob_16.png', './assets/mobs/mob_17.png', './assets/mobs/mob_18.png', './assets/mobs/mob_19.png', './assets/mobs/mob_2.png', './assets/mobs/mob_20.png', './assets/mobs/mob_21.png', './assets/mobs/mob_22.png', './assets/mobs/mob_23.png', './assets/mobs/mob_24.png', './assets/mobs/mob_3.png', './assets/mobs/mob_4.png', './assets/mobs/mob_5.png', './assets/mobs/mob_6.png', './assets/mobs/mob_7.png', './assets/mobs/mob_8.png', './assets/mobs/mob_9.png', './assets/story_battle.png'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE_NAME).then(cache =>
    Promise.allSettled(CORE_ASSETS.map(url => cache.add(url)))
  ));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : Promise.resolve())))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const isHtml = event.request.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname.endsWith('/');
  if (isHtml) {
    event.respondWith(
      fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(() => {});
        return response;
      }).catch(() => caches.match(event.request).then(cached => cached || caches.match('./index.html')))
    );
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(() => {});
      return response;
    }).catch(() => cached))
  );
});

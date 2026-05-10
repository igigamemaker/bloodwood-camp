const CACHE_NAME = 'bloodwood-camp-folder-assets-icons-refresh-v2';

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/image_01.png",
  "./assets/image_02.png",
  "./assets/image_03.jpg",
  "./assets/story_battle.png",
  "./assets/image_04.png",
  "./assets/image_05.png",
  "./assets/image_06.png",
  "./assets/image_07.png",
  "./assets/image_08.png",
  "./assets/image_09.png",
  "./assets/image_10.png",
  "./assets/image_11.png",
  "./assets/image_12.png",
  "./assets/image_13.png",
  "./assets/image_14.png",
  "./assets/image_15.png",
  "./assets/image_16.png",
  "./assets/image_17.png",
  "./assets/image_18.png",
  "./assets/image_19.png",
  "./assets/image_20.png",
  "./assets/image_21.png",
  "./assets/image_22.png",
  "./assets/image_23.png",
  "./assets/image_24.png",
  "./assets/image_25.png",
  "./assets/image_26.png",
  "./assets/image_27.png",
  "./assets/image_28.png",
  "./assets/image_29.png",
  "./assets/image_30.png",
  "./assets/image_31.png",
  "./assets/image_32.png",
  "./assets/image_33.png",
  "./assets/image_34.png",
  "./assets/image_35.png",
  "./assets/image_36.png",
  "./assets/image_37.png",
  "./assets/image_38.png",
  "./assets/image_39.png",
  "./assets/image_40.png",
  "./assets/image_41.png",
  "./assets/image_42.png",
  "./assets/image_43.png",
  "./assets/image_44.png",
  "./assets/image_45.png",
  "./assets/image_46.png",
  "./assets/image_47.png",
  "./assets/image_48.png",
  "./assets/image_49.png",
  "./assets/image_50.png",
  "./assets/image_51.png",
  "./assets/image_52.png",
  "./assets/image_53.png",
  "./assets/image_54.png",
  "./assets/image_55.png",
  "./assets/image_56.png",
  "./assets/image_57.png",
  "./assets/image_58.png",
  "./assets/image_59.jpg",
  "./assets/image_60.png",
  "./assets/image_61.png",
  "./assets/image_62.png",
  "./assets/image_63.png",
  "./assets/image_64.png",
  "./assets/image_65.png",
  "./assets/image_66.png",
  "./assets/image_67.png",
  "./assets/image_68.png",
  "./assets/image_69.png",
  "./assets/image_70.png",
  "./assets/image_71.png",
  "./assets/image_72.png",
  "./assets/image_73.png",
  "./assets/image_74.png",
  "./assets/image_75.png",
  "./assets/image_76.png",
  "./assets/image_77.png",
  "./assets/image_78.png",
  "./assets/image_79.png",
  "./assets/image_80.png",
];

self.addEventListener("install", event => {
  self.skipWaiting();
  // Updated cleaned boss and boss-minion sprites. Force old cached images to refresh.
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      Promise.allSettled(CORE_ASSETS.map(url => cache.add(url)))
    )
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(key => {
      if (key !== CACHE_NAME) return caches.delete(key);
    }))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy)).catch(() => {});
        return response;
      }).catch(() => {
        if (event.request.mode === "navigate") return caches.match("./index.html");
      });
    })
  );
});

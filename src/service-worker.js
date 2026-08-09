/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import {
  precacheAndRoute,
  createHandlerBoundToURL,
} from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { animalFilenames, carBrandFilenames } from './config/content';
import { imageRevisions } from './config/imageRevisions';

clientsClaim();

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

const PRECACHE_IMAGES = [...animalFilenames, ...carBrandFilenames].map(
  (file) => `/img/${file}`
);

precacheAndRoute(
  self.__WB_MANIFEST.concat(
    PRECACHE_IMAGES.map((url) => ({ url, revision: imageRevisions[url] }))
  )
);

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(
  ({ request, url }) => {
    if (request.mode !== 'navigate') {
      return false;
    }
    if (url.pathname.startsWith('/_')) {
      return false;
    }
    if (url.pathname.match(fileExtensionRegexp)) {
      return false;
    }
    return true;
  },
  createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html')
);

registerRoute(
  ({ request, url }) =>
    url.origin === self.location.origin &&
  (request.destination === 'image' ||
    /\.(png|jpg|jpeg|gif|webp|ico|svg)$/i.test(url.pathname)),
  new CacheFirst({
    cacheName: 'static-images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 200,
        maxAgeSeconds: 365 * 24 * 60 * 60,
      }),
    ],
  })
);

registerRoute(
  ({ url }) =>
    url.origin === self.location.origin &&
    url.pathname.endsWith('.json'),
  new StaleWhileRevalidate({
    cacheName: 'static-json',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
      }),
    ],
  })
);

if(!self.define){let e,s={};const n=(n,i)=>(n=new URL(n+".js",i).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,a)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>n(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(i.map((e=>o[e]||r(e)))).then((e=>(a(...e),c)))}}define(["./workbox-50de5c5d"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"f791e14b88cfcc69dfc33fd7d4f13293"},{url:"/_next/static/2GhWp2m0JAbdFqX3lQHh9/_buildManifest.js",revision:"66a650a40453999ca40002ee32e3481e"},{url:"/_next/static/2GhWp2m0JAbdFqX3lQHh9/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/110-22c6511eedb5a46c.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/117-e1c1db6fda6b58a8.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/161-343c9c4543fa9c62.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/23-36ac32e87b4b9915.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/307-a8af770b46896935.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/345-3dceda9b6dcb08f0.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/360-bbf85903a1202af3.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/396-052ac1d354f37b83.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/490-082121dc30380e89.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/563-53330f3ac1d304f0.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/596-d73c74a93d226a55.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/667-f9ef8e4712dca834.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/76-9f2cb8e88d5791b0.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/829-4092686011636d49.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/842-a004d4f4b0d09f13.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/874-269000c8e3b34ecc.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/957-4a4558d8f9e53c03.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/987-1036b03583e56d9a.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/app/%5Bcategoria%5D/page-61548f64ce6685f1.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/app/bar/page-c87a804eddff35a7.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/app/home/page-7df428aa1884f9c8.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/app/layout-87fecd537d7e580b.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/app/loading-82fefdef135c7f64.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/app/login/loading-7305e3568c40e585.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/app/login/page-36442d6c10e2fffa.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/app/page-143a994da5a21779.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/app/puntos/page-f3b43c867432a5a1.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/app/qr-vinculation/page-809ed3b45c1f6504.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/app/register/page-771ed9a1bf203a1a.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/app/vincular-maquina/layout-c45d17eb71e0b3e3.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/app/vincular-maquina/loading-5f398d8ba23c0918.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/app/vincular-maquina/page-347c4111fc20a12c.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/fd9d1056-bf905d35460d9b1f.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/framework-8883d1e9be70c3da.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/main-476f5eadaed42bd7.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/main-app-f7b9eb40fe6b0a99.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/pages/_app-52924524f99094ab.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/pages/_error-c92d5c4bb2b49926.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-76810f300ba1fc13.js",revision:"2GhWp2m0JAbdFqX3lQHh9"},{url:"/_next/static/css/babce5296f9f73c8.css",revision:"babce5296f9f73c8"},{url:"/_next/static/media/JuegoResponsable.17a269a8.png",revision:"32efd176f6f705e6b0015ae3c7419967"},{url:"/icon-192x192.png",revision:"9fdf1b360e23b28c3af0022423a4d0ab"},{url:"/icon-256x256.png",revision:"f059e91859891bf4f08cf6c8771bb4c6"},{url:"/icon-384x384.png",revision:"dc0a7fbb5c450864524cd4f5a7d98f63"},{url:"/icon-512x512.png",revision:"ea7539e637879eff00425750360efa39"},{url:"/icons/JuegoResponsable.png",revision:"32efd176f6f705e6b0015ae3c7419967"},{url:"/icons/JuegoResponsable.svg",revision:"fe253a2bb315004d1c30fb9147fc4182"},{url:"/manifest.json",revision:"7db0b44c5e5fdfc1a7d03ba7811ed71c"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));

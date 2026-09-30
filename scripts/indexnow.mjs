// Tell Bing, Yandex and other IndexNow engines that the site's URLs changed.
// Run after a deploy that changes content:  node scripts/indexnow.mjs
// The key file public/d2fa262adc07166aa19133d92cd67023.txt proves ownership (it is public by design).
const host = "fareskhanchouch.com";
const key = "d2fa262adc07166aa19133d92cd67023";
const urlList = [
  "https://fareskhanchouch.com/",
  "https://fareskhanchouch.com/writing/grounded-llm-generation",
  "https://fareskhanchouch.com/resume.pdf",
];
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
});
console.log("IndexNow:", res.status, res.statusText);

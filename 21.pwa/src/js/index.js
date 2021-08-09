import '../css/iconfont.css';
import '../css/index.less';
import { add } from './test';

// eslint-disable-next-line no-console
console.log(add(2, 3));

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
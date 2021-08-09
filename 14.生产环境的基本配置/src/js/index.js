import '../css/iconfont.css';
import '../css/index.less';
import '../css/a.css';
import '../css/b.css';

const add = (x, y) => x + y;

// eslint-disable-next-line no-console
console.log(add(1, 2));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    // eslint-disable-next-line no-console
    console.log(1);
    resolve();
  }, 1000);
});
// eslint-disable-next-line no-console
console.log(promise);

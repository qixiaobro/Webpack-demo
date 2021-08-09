// import '@babel/polyfill';

const add = (x, y) => (x + y);
console.log(add(1, 2));

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log(1);
    resolve();
  }, 1000);
});

promise();

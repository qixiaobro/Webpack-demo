// import mul from './test.js';

console.log('index.js文件被加载了');

document.getElementById('btn').onclick = function () {
  import(/*webpackChunkName:'test',webpackPrefetch: true */'./test.js').then(({mul})=>{
    console.log(mul(2, 4));
  })
};

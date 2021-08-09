import '../css/iconfont.css';
import '../css/index.less';
import print from './print';

console.log('index.js被加载了');
print();
function add(x, y) {
  return x + y;
}

console.log(add(1, 2));

if (module.hot) {
  module.hot.accept('./print.js', () => {
    // 此方法监听print.js的改变，
    print();
  });
}

//入口文件
/*
1.运行指令:
 开发环境：webpack ./src/index.js -o ./build/built.js --mode=development
 生产环境：webpack ./src/index.js -o ./build/built.js --mode=production
*/
import data from './data.json'
console.log(data)
function add(x,y){
 return x + y
}

console.log(add(1,2))
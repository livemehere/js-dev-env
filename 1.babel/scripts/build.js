const babel = require('@babel/core');
const fs = require('fs');

const input = fs.readFileSync('./src/app.ts',{encoding:'utf-8'});
const output = babel.transformSync(input,{
    filename:'app.js',
    plugins: ["@babel/plugin-transform-typescript"],
});
console.log(output)
console.log(1)
if(!fs.existsSync('dist')){
    fs.mkdirSync('dist');
    console.log('dist 폴더가 생성되었습니다.')
}

fs.writeFileSync('dist/main.js',output.code)


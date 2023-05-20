const babel = require('@babel/core');
const examplePlugin = require('../plugin/example.js');
const fs = require('fs');

const input = fs.readFileSync('./src/app.js',{encoding:'utf-8'});
const output = babel.transformSync(input,{
    filename:'app.js',
    plugins: [examplePlugin],
});

if(!fs.existsSync('dist')){
    fs.mkdirSync('dist');
    console.log('dist 폴더가 생성되었습니다.')
}

fs.writeFileSync('dist/main.js',output.code)


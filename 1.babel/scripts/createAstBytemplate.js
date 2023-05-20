const template = require('@babel/template').default;
const t = require('@babel/types');
const generate = require('@babel/generator').default;

const buildRequire = template(`
    function ADD(a,b){return a+b}
`);

const ast = buildRequire({
    ADD: t.identifier('z'),
})

const output = generate(ast);
console.log(output)
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;
const t = require('@babel/types');

const fs = require('fs');
const path = require('path');

const code = fs.readFileSync(path.join(__dirname,'..','src','app.js'), 'utf-8');

const ast = parser.parse(code);

const visitor = {
    Identifier(path){
        if(t.isIdentifier(path.node, {name :'z'})){
            path.node.name = 'x';
        }
    }
}

traverse(ast, visitor);

const output = generate(ast);

console.log(output)

const b = t.binaryExpression('+', t.identifier('z'), t.identifier('z'));
const r = t.isBinaryExpression(b, {
    operator: '*',
})
console.log(r)
const myPlugin = function ({types:t}){
    return {
        visitor:{
            CallExpression(path,state){
                console.log(state.opts)
                const object = path.node.callee.object;
                if(t.isIdentifier(object, {name:'console'})){
                    path.remove();
                }
            }
        }
    }
}

module.exports = myPlugin;
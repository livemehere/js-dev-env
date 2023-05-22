
const updateParamVisitor = {
    Identifier(path){
        if( path.node.name === this.paramName){
            path.node.name = 'z'
        }
        console.log('식별자 호출!!')
    }
}


function examplePlugin (){
    return {
        visitor:{
            FunctionDeclaration(path){
                const param = path.node.params[0];
                const paramName = param.name;
                param.name = 'z';
                console.log(path)
                path.traverse(updateParamVisitor,{paramName})
            },
        }
    }
}

module.exports = examplePlugin;
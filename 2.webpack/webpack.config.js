module.exports = {
    target:'web',
    mode:'development',
    entry:{
        index:'./index.ts'
    },
    output:{
        filename:'[name].bundle.js',
        path:__dirname + '/dist',
    },
    module:{
        rules:[
            {test: /.ts$/, use: 'ts-loader'},
            {test: /.css$/, use: [
                {loader: 'style-loader'},
                {loader: 'css-loader'},
            ]},
        ]
    },
    resolve:{
        extensions:['.ts', '.js'],
        alias:{
            '@':__dirname
        },
        modules:[__dirname,'node_modules']
    }
}
module.exports = {
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
    }
}
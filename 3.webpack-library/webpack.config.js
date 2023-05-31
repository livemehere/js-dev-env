const path = require('path');

module.exports = (env)=> {
    console.log(env)
    return {
        entry: './src/uuid.js',
        output: {
            filename: `${env.output}.js`,
            path: path.resolve(__dirname, 'dist'),
            library: 'uuid',
            globalObject: 'this',
            libraryTarget: 'umd',
        },
    }
}
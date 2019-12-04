import typescript from 'rollup-plugin-typescript';

export default {
    input: 'src/index.ts',
    output: {
        name: 'CrappyFighter',
        file: 'dist/bundle.js',
        format: 'umd'
    },
    plugins: [
        typescript({lib: ["es5", "es6", "dom"], target: "es5", module: 'ES2015'})
    ]
}
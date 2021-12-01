## Node

```txt
├── dist
├── node_modules
├── src
│   ├── assets
│   └── index.ts
├── webpack.config.js
├── tsconfig.json
├── package.json
└── yarn.lock
```

`package.json`

```json
"scripts": {
    "build": "webpack",
    "test": "ts-node --dir ./src/ ./index.ts"
},
"devDependencies": {
    "@types/node": "^16.11.11",
    "copy-webpack-plugin": "^6.4.1",
    "ts-loader": "^8.3.0",
    "ts-node": "^10.4.0",
    "typescript": "^4.5.2",
    "webpack": "^4.46.0",
    "webpack-cli": "^3.3.12"
},
"dependencies": {
    "json5": "^2.2.0"
}
```

`tsconfig.json`

```json
{
    "compilerOptions": {
        // 输出配置
        "module": "CommonJS",
        "target": "ES6",
        // 源码检查
        "allowJs": false,
        "strict": true,
        "skipLibCheck": true,
        "noImplicitReturns": true,
        "noFallthroughCasesInSwitch": true,
        "noUnusedParameters": false,
        // "noImplicitAny": true,
        // "noImplicitThis": true,
        // "strictFunctionTypes": true,
    }
}
```

`webpack.config.js`

```js
const path = require('path');
const root = path.resolve(__dirname);
const sourcePath = path.resolve(root, 'src');
const outputPath = path.resolve(root, 'dist');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: 'production',
    target: 'node',
    entry: {
        index: path.join(sourcePath, 'index.ts')
    },
    output: {
        path: outputPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ['ts-loader'],
                exclude: /node_modules/
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{
                from: sourcePath,
                to: './',
                globOptions: {
                    ignore: [
                        "**/*.ts",
                        "**/*.js",
                        "**/*.tsx",
                        "**/*.jsx",
                    ]
                }
            }]
        }),
    ]
}
```

`index.ts`

```js
import * as path from 'path'
console.log(path.resolve("."))
```

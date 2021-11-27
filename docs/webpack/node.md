## 本地

```bash
mkdir src
mkdir src/assets
touch src/index.ts
touch src/assets/.gitkeep
touch tsconfig.json
touch webpack.config.js
npm init -y

# Webpack
yarn -D add webpack@^4 webpack-cli@^3

# Webpack-Plugins
yarn -D add copy-webpack-plugin@^6 ts-loader@^8

# Typescript
yarn -D add typescript ts-node @types/node

# Common Library
yarn add json5
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

**调试项目**：

```bash
# Linux
pushd src; npx ts-node --scope-dir . index.ts; popd
```

```batch
REM Windows
pushd src & npx ts-node --scope-dir . index.ts & popd
```

**打包项目**：

```bash
npx webpack
```

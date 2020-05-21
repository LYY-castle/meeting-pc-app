# meeting-pc-web

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


yarn electron:build:win 报错：ENOENT. spawn prlctl ENOENT.

临时处理方法1：
1、`brew upgrade wine`, make sure "/usr/local/bin/wine64" exist
2、rm -rf ~/.wine
3、edit "node_modules/rcedit/lib/rcedit.js", change "wine" to "wine64" at line 42
4、download "https://github.com/electron/rcedit/releases/download/v1.1.1/rcedit-x64.exe", rename to "rcedit.exe" and replace "node_modules/rcedit/bin/rcedit.exe"

临时处理方法2：
$ `brew install homebrew/cask/wine-stable`, Then `mv /usr/local/bin/wine64 /usr/local/bin/wine`
$ download "https://github.com/electron/rcedit/releases/download/v1.1.1/rcedit-x64.exe", rename to "rcedit.exe" and replace "node_modules/rcedit/bin/rcedit.exe"

正确处理方法：
等待 vue-cli-plugin-electron-builder 插件升级采用 electron-builder 22.2.0 以上版本.

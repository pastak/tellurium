# tellurium

ブラウザ上のユーザの操作を元に、操作部分のテストコードを生成し、テキストエディタに補完する GUI テスト支援ツールです。

![demo movie](doc/tellurium-demo.gif)

## 構成

Tellurium は、Editor Plugin、Telluirum Server、Browser Plugin から構成されています。

ブラウザで行った操作を Browser Plugin でキャプチャし、
キャプチャしたイベントを Tellurium Server でテストコード片に変換、
変換したコード片は、Editor Plugin が受け取り、エディタの編集領域に補完する、という流れです。

![](doc/system.png)

各モジュールは、以下のリポジトリに分割しています。
* [Tellurium Server](https://github.com/tellurium-project/chrome-tellurium)
* [Editor Plugin (Atom用)](https://github.com/tellurium-project/chrome-tellurium)
* [Browser Plugin (Google Chrome用)](https://github.com/tellurium-project/chrome-tellurium)

## Tellurium のセットアップ

1. [Chrome Tellurium](https://github.com/tellurium-project/chrome-tellurium) をセットアップ
  1. `$ cd ./chrome-tellurium`
  2. `$ npm run build`
  3. Google Chrome で拡張機能をインストール
2. [Atom Tellurium](https://github.com/tellurium-project/atom-tellurium) をセットアップ
  1. `$ cd ./atom-tellurium`
  2. `$ apm link`
3. [Tellurium Server](https://github.com/tellurium-project/tellurium) をセットアップ
  1. `$ npm install`
  2. `$ npm run build`
  3. `$ npm link`

## 使い方

1. テストを記述するディレクトリ、またはその親・先祖ディレクトリに、補完設定ファイル（後述）を設置する
2. Shell から `tellurium` コマンドで Tellurium Server を起動
2. Atom のコマンドパレットから `Tellurium: Enable Complete` と入力
3. Google Chrome でページを操作
4. テストコードが補完される!

## 補完設定ファイル

設定ファイルは、補完に関する設定を記述する JSON ファイルです。
`.tellurium` という名前のファイルを設定として認識します。
以下に例を示します。

``` json
{
  "url": "http://localhost:3000/**/*",
  "generator": {
    "name": "capybara",
    "options": {
      "ruby": {
        "stringLiteralType": "singleQuote",
        "useParameterParentheses": false
      }
    }
  },
  "files": [
    "spec/**/*_spec.rb"
  ]
}
```

### 設定項目

|パス|型|説明|
|:---|:---|:---|
| `url` | string | テスト対象 URL（Glob パターン） |
| `files` | Array of string | 補完対象のテストファイル（Glob パターン）|
| `generator.name` | string | コード生成に使用する名前（現状は `capybara` のみ）|
| `generator.ruby.stringLiteralType` | string | リテラル文字列に使用する記号（`singleQuote` または`doubleQuote`） |
| `generator.ruby.useParameterParentheses` | boolean | メソッド呼び出しの引数にカッコを使用するかどうか |

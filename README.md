# 자바스크립트 개발환경 상세 분석

## 의문점

- [ ] babel preset 배열은 last to first 순서인데, 왜 preset-env 와 preset-typescript 는 순서에 상관없이 잘 동작하는가? preset-env 가 먼저 적용되면 .ts 를 컴파일하지 못해서 에러를 발생해야 할 것 같은데 ...

## TODO

- [x] 바벨 
- [x] 웹팩
- [x] react, vue 개발환경 구축
- [x] ESLint
- [x] Prettier
- [ ] TypeScript
- [ ] HMR (Hot Module Replacement) 분석과 구현
- [ ] 모노레포
- [ ] svelte 개발환경 구축 및 비교분석
- [ ] React, Vue SSR 서버 만들기

- [ ] Yarn
- [ ] NPM
- [ ] NPX
- [ ] PNPM

- [ ] Jest

- [ ] Rollup
- [ ] Vite
- [ ] Parcel
- [ ] Gulp

- [ ] 모노레포로 만들어서 공통, 개별 설정 해보기

## 종합 메모

- 바벨, 웹팩에서 역순으로 적용되는 것들은
  - 바벨 : presets
  - 웹팩 : loader

## 내 생각

- ~~바벨의 대안은 딱히 없는 것 같다.~~ ~~(SWC 는 아직 생태계가 부족하지앟나..?)~~
- 바벨의 대안은 미래 창창한 SWC 이다!
- `parcel` 은 점유율을 생각해 봤을때 굳이 안배워도 될것 같다..
- 번들러 툴 중에서는 웹팩이 압도적이다. 하지만 `rollup` 과 `vite` 의 DX 가 뛰어나서 추가로 배워보기 좋을 것 같다.
- 개발환경을 세팅한다고 하면 바벨, swc 로만 하려고 하기 보다는, webpack or rollup or vite 와 같은 번들러로 시작해야한다는 생각을 하는게 좋다.(어차피 쓰는게 맘편하다)

## 바벨

> ~~🚨 바벨은 코드가 브라우저에서 동작하도록 컴파일 하지 않습니다. **브라우저에서 동작하도록 하려면 webpack 과 같은 번들러의 역할입니다.**~~
> 바벨은 @babel/preset-env 를 통해서 "modules" 값에 따라서 module 시스템에 맞춰 컴파일을 해준다.
> default 값은 node 이며, 이떄는 commonjs 모듈을 사용하고, modules:false 일 시에는 ESModule 를 사용한다.
> 단, modules:false 라도 원본 소스코드가 commonjs 라면 그것을 ESModule 로 변경하지는 않는다.

> 최신 문법을 지원하기 위함이 첫 번째 목적인데, 사실상 요즘 브라우저는 ECMAScript 를 최신버전까지 잘 지원하고 있어서, 이제는 그저 필요한 문법을 파싱하는 것이 주된 목적으로 사용되는 것 같다?(물론 구 브라우저 사용자를 위함이지만.. 거의 안쓰니)

- 바벨로 컴파일된 `.js` 파일은 브라우저 용이 아니다. `target` 을 브라우저 버전으로 어느 정도까지 폴리필이 필요한지를 파악하는데 사용될 뿐, 브라우저에 돌아갈 코드로 변환은 번들러가 해야한다. **(모듈처리)**
- core js 로 폴리필 하기위해서는 `npm i core-js` 패키지를 별도로 설치해주어야 한다.
- `polyfill` 동작은 `core-js` 에서 `require()` 되거나 구현한 구문이 추가된다. (예를 들면 `async`, `await` 은 `core-js` 가 아니라, 구현코드가 추가된다)
- `async function` 과 `generator` 는 폴리필 하기 위해서 `regenerator-runtime` 패키지를 사용한다. (`@babel/preset-env` 에 다포함되어있다)
- `core-js` 와 만약 `@babel/polyfill` 패키지를 사용한다면 `devDependencies` 가 아닌 `dependencies` 로 번들에 포함되도록 설치해 주는 것이 올바르다. (폴리필 하는 녀석들이니까)
- 바벨의 config 는 다양한 방법으로 적용될 수 있다. (예를 들면 `babel.config.js`, `.babelrc`, `package.json` 등등..) 주의 사항으로는 각각이 우선순위가 다르다는 것이다. (예를 들면 `babel.config.js` 가 우선순위가 가장 높다)
  - 우선 순위는 `babel.config.js` > `.babelrc` > `package.json` 이다.

### 바벨 config 파일 종류

> 각각 merge, override 과정에서 우선순위가 다르다. 

- .babel.config.*
- .babelrc.*
- .babelrc
- package.json (babel key)

### 바벨 config 옵션

- `@babel/cli` 의 경우 `kebab-case` 로 추가해 줄 수 있다.
- `targets` 을 설정하지 않으면 `ES5` 와 호환되도록 하기 때문에, 코드량을 줄이기 위해서 설정해주는 것이 좋다.
- `"sourceType": "module" `을 설정하면 `import` `export` 문법을 사용할 수 있다. (commonjs 는 node 환경이라 기본적으로 사용가능하다. 이 설정을 하면 esmoudle 을 사용할 수 있게된다)
  - "script" 는 `import` `export` 문법을 사용할 수 없고, 스크립트 문법으로 구문을 분석한다.
  - "unambiguous" 는 `import` `export` 문법이 포함되어있으면 esmoudle 로, 아니면 스크립트로 간주한다.

### Plugin 과 Preset 의 순서

- Plugin > Preset 순서로 적용된다.
- Plugin 끼리는 `first to last` 순서이다.
- Preset 끼리는 `last to first` 순서이다. 

### 마지막 바벨 TODO

- [x] @babel/preset-typescript 로 타입스크립트 컴파일 해보기
  -  타입스크립트를 컴파일 하기 위해서는, `cli` 의 경우 `--extensions` `.ts` 를 추가해주어야한다. `config` 파일에서는 설정할 수 없는 옵션이다.
- [x] 커스텀 바벨 플러그인 만들기

### 커스텀 플러그인 만들기

- 타입에 따라서 AST 의 각 레벨들의 구조가 다르다.

```json5
{
  type: "FunctionDeclaration",
  id: {...},
  params: [...],
  body: {...}
}
```

```json5
{
  type: "Identifier",
  name: ...
}
```

```json5
{
  type: "BinaryExpression",
  operator: ...,
  left: {...},
  right: {...}
}
```

- plugin 은 객체를 반환해야하는데, `visitor` 라는 키를 가지고 있다.
- `visitor` 는 `key` 가 `AST` 의 `type` 이고, 이를 입맛대로 조정한다.

> path 모듈을 사용해야, node 스크립트가 실행되는 위치에 상관없이, 현재 파일의 경로를 가져올 수 있다.

- `@babel/parser` 는 `parse()` 메서드를 통해서 `AST` 를 생성한다.
- `@babel/traverse` 는 `traverse()` 메서드를 통해서 `AST` 를 탐색한다. (with `visitor`)
- `@babel/generator` 는 `generate()` 메서드를 통해서 `AST` 를 코드로 변환한다.
- `@babel/types` 는 `types` 객체를 통해서 `AST` 를 생성 혹은 검증 한다.
- `@babel/template` 는 `template()` 메서드를 통해서 `AST` 를 생성한다.
  - %%placeholder%% 를 통해서, `AST` 를 생성할 때, `placeholder` 를 넣을 수 있다.
  - 혹은 대문자를 통해서 placeholder 로 사용할 수 있다.

## 웹팩(Webpack)

- 웹팩은 정적 모듈 번들러이다.
- webpack 은 기본적으로 javascript 와 json 만 처리할 수 있다.
  - 하지만 `loader` 를 통해서 다른 파일들을 처리할 수 있다.
- plugin 은 웹팩의 기능을 확장할 수 있다.
  - 대부분은 new 키워드로, 인스턴스를 만들어 사용한다.
- 웹팩으로 번들링 하기 전 코드는 `commonjs` 나 `ESModule` 둘다 사용 가능하다.
  - 왜냐하면... 코드는 모듈처럼 동작하도록 바꾸는 것이고, 결국 하나의 물리적인 파일로 만들어 주기 때문이다.
- 자동으로 사용하지 않는 코드들을 제거하고, 합치면서 최적화한다.
- 웹팩에서 경험상, 하나의 html 파일에 하나의 번들.js 를 삽입한다. 즉, multi-page(html) 갯수 만큼 entry 를 만들어 주는 것이 일반 적이다.
- `[fullhash]` 값은 webpack 설정별로 고유하다.(=변경사항이 없으면 동일하다)
- publicPath 는 `output` 에서 설정할 수 있고, dev-server 에 영향을 미친다.
  - `output` 에서 설정한 `publicPath` 는 `html` 에서 `script` 태그의 `src` 에 적용된다.
  - `output` 에서 설정한 `publicPath` 는 `css` 에서 `background-image` 의 `url` 에 적용된다.

### 흐름도

Entry -> Loaders(babel, less, img...) -> Plugins(개발환경, 최적화..) -> Output

### Loaders

- loader 는 import 되는 시점에서 전처리를 진행한다.
- loader 체인의 끝은 항상 javascript 여야하고, 웹팩도 그럴 것이라고 예상한다.

### Plugins

- webpack 의 기본이며, loader 가 처리할 수 없는 일들을 처리한다.

### resolve

- 웹팩은 모듈을 해석할 때 `절대경로`, `상대경로`는 그대로 처리하고, `resolve` 옵션을 통해서 커스텀 할 수 있다.
- `resolve` 는 모듈을 해석할 때, 어떤식으로 해석할지 정의한다.
- 다른 것 보다 절대 경로를 설정할 경우가 많은데, `webpack` 과 `tsconfig.json` 모두 설정해주어야한다. 에디터는 `config` 파일을 따라 린팅해주기 때문에 만약 webpack 만 설정한다면 오류는 안나지만, ts-loader 에서 경고메세지, 에디터에서 린트가 발생한다. 아래 예시 참고

```js
    resolve:{
        extensions:['.ts', '.js'],
        alias:{
            '@':__dirname
        },
        modules:[__dirname,'node_modules']
    }
```

#### tsconfig.json

```json
{
  "paths" : {
    "@/*" : ["./*"]
  }
}
```


#### webpack

- --watch 는 파일이 변경될 때마다, 다시 빌드한다.
- webpack-dev-server --hot 은 변경된 파일만 다시 빌드한다.
- nodejs 에만 있었던 모듈 시스템을 브라우저에도 도입할 수 있게 해주었다.
- js 이외의 모든 에셋도 한번에 처리할 수 있게 됬다.

### target 

??!

### HMR(Hot Module Replacement)

- HMR 은 변경된 모듈만 다시 로드하는 기능이다.
- HMR 은 `webpack-dev-server` 에서만 동작한다. 다른 방법으로 직접 구현할 수 도 있다.

### Asset Management

- less, sass, scss, post-css 등 css 전처리기는 `npm i {전처리기}-loader` 와 `npm i 전처리기` , 이렇게 보통 둘다 설치하는 형태이다.
- post-css 의 경우 postcss.config.js 를 loader 가 자동 인식한다. 타입추론은 별도의 패키지로 제공하고있다.

```js
/**
 * @type {import('postcss-load-config').Config}
 */
const config = {}
module.exports = config;
```

- **아래 예시처럼 type 문법은 .js 에만 동작하고, .ts 에서는 안되니 file-loader 를 사용해준다.**

```js
 module: {
   rules: [
     {
       test: /\.png/,
       type: 'asset/resource'
     }
   ]
 }
```

- 에셋 추출을 해시와 함께한다면, 추후 불펌해가진 리소스에 대한 서버 비용을 아낄 수 있다?!
- json 은 webpack 에서 기본적으로 객체로 import 를 지원하지만 .ts 에서는 .tsconfig.json 의 설정에 따른다. 아래 두개 설정을 해줘야한다.

```json
{
  "resolveJsonModule":true,
  "esModuleInterop":true
}
```

### optimization

- runtimeChunk:true 옵션을 넣어 주어야만, 각 모듈을 단 한번만 호출한다.
  - 그렇지 않으면 엔트리 포인트 별로 각각 모듈을 중복적으로 import 한다.

### output

- clean:true 속성으로 번들전 폴더를 비운다.

### Development

- `devtool: 'inline-source-map'` 옵션으로 디버깅을 한다. 그렇지 않다면 항상 번들된 하나의 js 만을 가르킨다.
- watch, webpack-dev-server, webpack-dev-middleware 이 있다.

#### watch

- 모든 코드를 감시하며, 전체 빌드를 재수행한다. 새로고침 해주어야한다는 단점이 있다.

### Code Splitting

- 엔트리 포인트로 분리
- 동적 import 로 개별 로딩

### Caching

- 네이밍에 `[contenthash]` 는 마치 Etag 처럼 변경사항이 없다면 유지된다. 이것으로 번들 결과가 캐싱됬는지 확인 가능하다.
- 아래처럼 외부 모듈을 캐싱하는 방법이라고 소개하는데, 이렇게 안해도 알아서 캐싱이 되고있는거 같다.

```js
    optimization: {
      runtimeChunk: 'single',
     splitChunks: {
       cacheGroups: {
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           chunks: 'all',
         },
       },
  };
```

### 라이브러리 만들기

- 기본적으로 웹팩을 라이브러리 모드로하면, script 태그 전용으로 번들링한다.
  - `globalObject` 의 객체에 추가하는 방식으로 번들링한다. 예를들면 uuid 라는 함수를 만들면 `window.[라이브러리이름].uuid()` 로 접근이 가능하다.
- node 환경, script 로 추가해서 window 에 추가 하는, 둘다 지원하려면 아래와 같은 설정을 추가해준다.

```js
globalObject: 'this'
libraryTarget: 'umd'
```

- export default 로 작성하면, `모듈이름.default` 로 접근이 가능하다.

### CLI 로 ENV 전달하기


1. `webpack.config.js` 에서 `module.exports = (env)=>{}` 로 함수를 만들어준다.

```js
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
```

2. `package.json` 에서 `--env` 로 전달한다.
  
```bash
webpack --env output=uuid
```

### 빌드 포퍼먼스 꿀팁 들

[문서](https://webpack.kr/guides/build-performance/)


### Tree shaking

- 이건 문서에는 development 모드에서 동작하지 않는다고 하는데, 되고있고, 별도의 설정을 하지 않아도 작동하고있다.

## 개발환경 만들어보기

### React

- jsx 문법 파싱만 ts-loader 혹은 babel-loader 에 맞기면 되고 별다른 이슈 없이 정직하게 구축된다. (유튜브 영상으로 설명 대체)

### Vue

- vue 는 프레임워크 답게 별도의 `vue-loader` 와 내장되어있는 `VueLoaderPlugin` 을 적용해주어야한다.
  - 아마 내부적으로 `*.vue` 파일을 파싱하는 `vue-template-compiler` 를 사용하는거 같다.
- vue 파일이 `html`, `css`, `js` 의 결과물로 나오는데, 그래서 `style, css loader` 도 필수적이다.
- typescript 는 애를 좀 먹었는데, `ts-loader` 에 `*.vue` 를 인식하기 위한 아래와 같은 설정을 해주어야한다.

```js
{
    test:/\.tsx?$/,
    loader: 'ts-loader',
    options: { appendTsSuffixTo: [/\.vue$/] },
}
```

- vue 파일에서 `script` 부분에 `lang="ts"` 를 추가해주어야한다.
- `export default` 하는 객체를 `Vue.extend()` 로 감싸주어야한다. 
- 마찬가지로 유튜브 영상으로 긴 설명을 대체.

> 공통적으로 적용 했던 부분은 에셋관리인데, 에셋은 src 폴더 외부에 public 폴더에서 관리하고, `copy-webpack-plugin` 으로 번들 결과에 복사해주었다.(dist 파일만 배포하면 되도록)

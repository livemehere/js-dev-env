# 자바스크립트 개발환경 상세 분석

## TODO

- [x] 바벨 
- [ ] 웹팩
- [ ] TypeScript
- [ ] ESLint
- [ ] Prettier

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

## 내 생각

- ~~바벨의 대안은 딱히 없는 것 같다.~~ ~~(SWC 는 아직 생태계가 부족하지앟나..?)~~
- 바벨의 대안은 미래 창창한 SWC 이다!
- `parcel` 은 점유율을 생각해 봤을때 굳이 안배워도 될것 같다..
- 번들러 툴 중에서는 웹팩이 압도적이다. 하지만 `rollup` 과 `vite` 의 DX 가 뛰어나서 추가로 배워보기 좋을 것 같다.

## 바벨

> ~~🚨 바벨은 코드가 브라우저에서 동작하도록 컴파일 하지 않습니다. **브라우저에서 동작하도록 하려면 webpack 과 같은 번들러의 역할입니다.**~~
> 바벨은 @babel/preset-env 를 통해서 "modules" 값에 따라서 module 시스템에 맞춰 컴파일을 해준다. (commonjs, esmoudle, umd 등등..)

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

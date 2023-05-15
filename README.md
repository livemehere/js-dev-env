# 자바스크립트 개발환경 상세 분석

## TODO

- [🏃] 바벨 
- [ ] TypeScript
- [ ] 웹팩
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

## 내 생각

- 바벨의 대안은 딱히 없는 것 같다.
- `parcel` 은 점유율을 생각해 봤을때 굳이 안배워도 될것 같다..
- 번들러 툴 중에서는 웹팩이 압도적이다. 하지만 `rollup` 과 `vite` 의 DX 가 뛰어나서 추가로 배워보기 좋을 것 같다.

## 바벨

> 🚨 바벨은 코드가 브라우저에서 동작하도록 컴파일 하지 않습니다. **브라우저에서 동작하도록 하려면 webpack 과 같은 번들러의 역할입니다.**

> 최신 문법을 지원하기 위함이 첫 번째 목적인데, 사실상 요즘 브라우저는 ECMAScript 를 최신버전까지 잘 지원하고 있어서, 이제는 그저 필요한 문법을 파싱하는 것이 주된 목적으로 사용되는 것 같다?(물론 구 브라우저 사용자를 위함이지만.. 거의 안쓰니)

- 바벨로 컴파일된 `.js` 파일은 브라우저 용이 아니다. `target` 을 브라우저 버전으로 어느 정도까지 폴리필이 필요한지를 파악하는데 사용될 뿐, 브라우저에 돌아갈 코드로 변환은 번들러가 해야한다. **(모듈처리)**
- core js 로 폴리필 하기위해서는 `npm i core-js` 패키지를 별도로 설치해주어야 한다.
- `polyfill` 동작은 `core-js` 에서 `require()` 되거나 구현한 구문이 추가된다. (예를 들면 `async`, `await` 은 `core-js` 가 아니라, 구현코드가 추가된다)
- `async function` 과 `generator` 는 폴리필 하기 위해서 `regenerator-runtime` 패키지를 사용한다. (`@babel/preset-env` 에 다포함되어있다)
- `core-js` 와 만약 `@babel/polyfill` 패키지를 사용한다면 `devDependencies` 가 아닌 `dependencies` 로 번들에 포함되도록 설치해 주는 것이 올바르다. (폴리필 하는 녀석들이니까)
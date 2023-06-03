# Vue 개발 환경 가이드

## *.vue 스펙

> 먼저 *.vue 스펙에 대해서 이해할 필요가 있다.

- `<template>`, `<script>`, `<style>` 태그를 가지고 있는 파일이다.
- `<template>`, `<script>` 는 최대 1개씩, style 은 여러개가 올 수 있다.
- `<style lang=""></style>` 을 통해서 전처리기 사용이 가능하다.
- `<script>` 는 `babel-loader` 가 감지되면 자동으로 지원하고, 모듈 환경에서 실행된다. 또한 ES2015 를 지원하여 export, import 를 지원한다.
- `<script>` 는 vue 컴포넌트 객체를 export 해야한다. 혹은 Vue.extend()에 의해 생성자를 통해서 생성한 확장된 생성자를 export 할 수 있다. (보통 타입스크립트 사용할 떄 사용된다)
- `<style>` 은 추출되어 style-loader 에 의해 `<head>` 에 `<style>` 태그로 삽입된다.

## webpack + vue-loader


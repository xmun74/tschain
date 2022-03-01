# tschain

Learning Typescript by making a Blockchain with it

### Setting

1. `git remote add origin 주소` `git pull origin master --allow-unrelated-histories` 깃헙과 연결
2. `npm init -y`
3. `npm i typescript --save-dev` 하거나 `npm i typescript -g`
4. index.ts 파일생성
5. tsconfig.json 파일생성

```js
{
"compilerOptions": {
"module": "commonjs",
"target": "ES2015",
"sourceMap": true
},
"include": ["index.ts"], //컴파일할 파일
"exclude": ["node_modules"] //디폴트로 제외하기
}
```

6. package.json에 수정

```js
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "node index.js", //npm start하면 prestart먼저 하고나서 start실행함
"prestart": "npx tsc" // index.js, index.js.map 파일 생김
},
```

7. `npx tsc` npx tsc하는 이유: node.js는 ts이해 못하기때문에 js코드로 컴파일 해야함
8. `npm start`

---

### watch모드로 변경 : src(ts파일) 변경시마다 dist(컴파일된js파일)도 변경됨

1. TSLint 패키지 설치
2. npm i tsc-watch --save-dev
3. package.json파일 수정

```js
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "tsc-watch --onSuccess \" node dist/index.js"  //수정
  },
```

4. tsconfig.json파일 수정

```js
  "outDir": "dist" //.ts는 src폴더에 들어가고, 컴파일된 건 dist폴더로 감
},
"include": ["src/**/*"], //컴파일할 파일
```

5. .gitignore 파일에 dist추가  
    // # dotenv environment variables file
   .env
   .env.test
   dist //추가

---

### interface

- interface는 ts에서만 작동.
- 오브젝트의 data type 정의할 수 있다.

---

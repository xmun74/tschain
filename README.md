# tschain

Learning Typescript by making a Blockchain with it

### Setting

git clone 주소
npm init -y

npm i typescript --save-dev 하거나 npm i typescript -g
-index.ts 파일생성
-tsconfig.json 파일생성
{
"compilerOptions": {
"module": "commonjs",
"target": "ES2015",
"sourceMap": true
},
"include": ["index.ts"], //컴파일할 파일
"exclude": ["node_modules"] //디폴트로 제외하기
}
-package.json에 수정
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1",
"start": "node index.js", //npm start하면 prestart먼저 하고나서 start실행함
"prestart": "npx tsc" // index.js, index.js.map 파일 생김
},

npx tsc
npm start

npx tsc하는 이유: node.js는 ts이해 못하기때문에 js코드로 컴파일 해야함

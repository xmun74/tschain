# tschain

Learning Typescript by making a Blockchain with it <br><br><br><br><br>

### TS

- React, Redux, GraphQL, express, node.js 일할때 좋음
- static 함수로 class 내부에 함수사용 가능
- (함수인자의 data type)과 (함수리턴 type)을 체크할 수 있음
- interface와 class로 속성 선언하기
- blockchain 만들기 : 속성담은 블록배열
  <br><br><br><br>

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

<br><br><br><br>

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

<br><br><br><br>

### TS - interface

- interface는 ts에서만 작동.
- 오브젝트의 data type 정의할 수 있다.

```js
interface Human {
  //data type정의
  name: string;
  age: number;
  gender: string;
}

const person = {
  name: "coco",
  age: 22,
  gender: "male",
};

const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}~!`;
};

console.log(sayHi(person));

export {};
```

---

<br><br><br><br>

### TS - Class : js에서 interface를 쓰고 싶을때

- class가 어떤 속성들을 가지는 지 선언해야함 (js와 달리 ts에선 속성선언해야함)

```js
class Human {
  public name: string; //name이란 이름의 public속성 선언
  public age: number;
  public gender: string;
  constructor(name: string, age: number, gender?: string) {
    //생성자 :class로부터 객체만들때마다 호출되는 메소드
    this.name = name; //class의 name은 = 생성자의 name과 같다고 정의
    this.age = age;
    this.gender = gender;
  }
}

const lynn = new Human("Lynn", 18, "female");

const sayHi = (person: Human): string => {
  return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}~!`;
};

console.log(sayHi(lynn));

export {};

```

<br><br><br><br>

### blockchain

- 블록타입만 블록배열에 추가됨. 다른 타입은 추가안됨. 원치 않는 것 푸쉬안되게 해줌
- 많은 함수리턴type과 함수인자type이 있을 땐 ts가 편함

```js
//blockchain
class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;
  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, "2020202002020", "", "Hi", 123456);
//       :Block 데이터타입 = 새블록 생성()
let blockchain: Block[] = [genesisBlock];
// 블록체인 : Block의 array 타입 = 새블록array

console.log(blockchain);

export {};

```

---

<br><br><br><br>

### Create Block

- Hash : 모든속성을 문자열로 결합한 것
- `static` 함수 사용 : class 내부에서 함수작성할때 사용.

1. `npm i crypto-js` : js에서 Hash함수 통해 암호화하게 해주는 패키지

```js
import * as CryptoJS from "crypto-js"; // import하기

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  //메소드가 Block클래스 안에 있고 / Block클래스 생성안해도 호출할 수 있는 메소드.
  static calculateBlockHash = (
    // static없이 그냥 함수쓰면 : 블록생성한 다음에만 사용가능함
    // static : 블록생선 전에도 사용가능
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
    // => 리턴값

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

// Block.calculateBlockHash()  // static : 블록생선 전에도 사용가능

const genesisBlock: Block = new Block(0, "2020202002020", "", "Hi", 123456);
//       :Block 데이터타입 = 새블록 생성()

let blockchain: Block[] = [genesisBlock];
// 블록체인 : Block의 array 타입 = 새블록array

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1];

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

export {};

```

```js
import * as CryptoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static calculateBlockHash = (
    // static없이 그냥 함수쓰면 : 블록생성한 다음에만 사용가능함
    // static : 블록생선 전에도 사용가능. class안에 생성가능.
    index: number,
    previousHash: string,
    data: string,
    timestamp: number
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
  // => 리턴값(합칠 속성).문자열로변환

  constructor(
    index: number,
    hash: string,
    previousHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}
// Block.calculateBlockHash()  // static : 블록생선 전에도 사용가능

const genesisBlock: Block = new Block(0, "2020202002020", "", "Hi", 123456); //  :Block 데이터타입 = 새블록 생성()

let blockchain: Block[] = [genesisBlock]; // 블록체인 : Block의 array 타입 = 새블록array

const getBlockchain = (): Block[] => blockchain; //블록체인이 얼마나 긴지 알아야하니깐, 오래된블록/ Block배열리턴

const getLatestBlock = (): Block => blockchain[blockchain.length - 1]; //블록체인안에서 최근블록

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  //블록체인 생성 = (인자): Block리턴 => 새블록리턴
  const previousBlock: Block = getLatestBlock(); //최근블록
  const newIndex: number = previousBlock.index + 1;
  const newTimestamp: number = getNewTimeStamp();
  const newHash: string = Block.calculateBlockHash(
    newIndex,
    previousBlock.hash,
    data,
    newTimestamp
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previousBlock.hash,
    data,
    newTimestamp
  );
  return newBlock;
};

console.log(createNewBlock("hello"), createNewBlock("bye bye")); //[genesisBlock]블록 1개만 가지므로 index가 둘다 1임

export {};

```

---

<br><br><br><br>

### Validation Block Structure

- 블록이 유효한 구조를 가지는지 확인. 데이터구조가 같은지, 데이터 속성이 같은지 비교

1. 데이터구조 검증
2. 블록 검증
3. 해쉬 얻기
4. 블록 추가
5. 테스트하면 각블록에 previoushash 이전해쉬까지 다 잘 연결돼있음

```js
// 새블럭 추가 후 테스트하기
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockchain);
```

![](https://images.velog.io/images/xmun74/post/253a7e85-946b-489c-800b-44642764e706/image.png)

import * as CryptoJS from "crypto-js";

class Block {
  // static없이 그냥 함수쓰면 : 블록생성한 다음에만 사용가능함
  // static : 블록생선 전에도 사용가능. class안에 생성가능.
  static calculateBlockHash = (
    index: number,
    previousHash: string,
    data: string,
    timestamp: number
  ): string =>
    CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
  // => 리턴값(합칠 속성).문자열로변환

  // 구조가 유효한지 boolean으로 확인하는 함수 / data type이 동일한 구조인지 확인
  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.data === "string" &&
    typeof aBlock.timestamp === "number";

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

  addBlock(newBlock);
  return newBlock;
};

// console.log(createNewBlock("hello"), createNewBlock("bye bye")); //[genesisBlock]블록 1개만 가지므로 index가 둘다 1임

// 해쉬얻기
const getHashforBlock = (aBlock: Block): string =>
  Block.calculateBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.data,
    aBlock.timestamp
  );

// 블록검증 = candidate새블럭과 previous이전블럭 가져와서 비교
const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) {
    //데이터 구조 검증
    return false;
  } else if (previousBlock.index + 1 !== candidateBlock.index) {
    //이전블록인덱스+1 와 새인덱스랑 다르면 거짓.
    return false;
  } else if (previousBlock.hash !== candidateBlock.previousHash) {
    //이전해쉬가 새해쉬랑 다르면 거짓.
    return false;
  } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
    //얻은해쉬계산했는데 새해쉬가 아닌 다른해쉬면 거짓.
    return false;
  } else {
    return true;
  }
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockchain.push(candidateBlock);
  }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockchain);

export {};

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

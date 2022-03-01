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
let blockchain: [Block] = [genesisBlock];
// 블록체인 : Block의 array 타입 = 새블록array

console.log(blockchain);

export {};

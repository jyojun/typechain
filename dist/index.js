"use strict";
// node.js 는 TypeScript 를 이해하지 못하기 때문에
// 일반적인 JavaScript 코드로 컴파일 하는 작업이 필요함. 
// 변수뒤에 ? 는 선택적으로 사용할 수 있는 변수
Object.defineProperty(exports, "__esModule", { value: true });
// interface 는 타입스크립트에서만 제공됨 (not JS)
// interface Human {
//     name: string,
//     age: number,
//     gender: string
// }
// class Human {
//     public name: string;
//     public age: number; // class 밖에서는 직접 불러올 수 없음 (private 일 때)
//     public gender: string;
//     constructor(name: string, age:number, gender: string){
//         this.name = name;
//         this.age = age; 
//         this.gender = gender;
//     } // class 가 실행될 때 마다 실행됨 
// }
// const lynn = new Human("Lynn", 18, "female");
// const person = {
//     name: "nicolas",
//     age: 22,
//     gender: "male"
// };
// const sayHi = (person: Human): string => {
//     return `Hello ${person.name}, you are ${person.age}, you are a ${person.gender}!`;
// };
// //console.log(sayHi("Nicolas", 24, "male")); // 3 arguments expected, error occurs if not 3 arguements included 
// console.log(sayHi(person));
// console.log(sayHi(lynn));
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
// static method는 새로 Block 클래스를 생성하지 않고도 다음 함수를 외부에서 사용할 수 있음.
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.validateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";
const genesisBlock = new Block(0, "2020202020202", "", "Hello", 123456);
let blockchain = [genesisBlock]; // typescript 는 Block class만 배열에 추가되게 할 것임.
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1]; // max index-1
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const nextTimestamp = getNewTimeStamp();
    const nextHash = Block.calculateBlockHash(newIndex, previousBlock.hash, nextTimestamp, data);
    const newBlock = new Block(newIndex, nextHash, previousBlock.hash, data, nextTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
// block 이 구조가 맞는지 확인
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockchain);
//# sourceMappingURL=index.js.map
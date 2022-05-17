import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MGserveService {
  public clickedX = 0;
  public clickedY = 0;

  public gameDimensionX = 0;
  public gameDimensionY = 0; 
  
  //게임에 사용할 동물 수
  public picTypeNum = 8;

animalList = ['kangaroo', 'rabbit', 'dog', 'cat', 'Koala', 'Gorilla', 'monkey', 
'whale', 'camel', 'snake', 'seal', 'mouse', 'cow', 'horse', 'pig', 'turtle', 'Crocodile', 
'tiger', 'leopard', 'Cheetah', 'wolf', 'fox', 'skunk', 'mole', 'Dolphin', 'lizard', 'Eagle', 
'Unicorn', 'lobster', 'starfish', 'giraffe', 'Crow', 'duck', 'parrot', 'owl', 'Sparrow', 
'oriole', 'butterfly', 'dragonfly', 'iguana', 'chameleon', 'anteater', 'Spider', 'carp', 
'bear', 'Penguin', 'goose', 'bat', 'Chick', 'chicken', 'boar', 'Seagull', 'rhino', 'deer', 
'elephant', 'Hippo', 'squirrel', 'Stingray', 'meerkat', 'cobra', 'hippocampus', 'toad', 'magpie', 
'Blowfish', 'octopus', 'squid', 'orangutan', 'jellyfish', 'platypus', 'raccoon', 'sheep', 'peacock', 
'frog', 'ostrich', 'komodo dragon', 'cicada', 'stag beetle', 'hawk', 'crab', 'beetle', 'bee', 'Goat', 
'pigeon', 'scarab', 'pelican', 'woodpecker', 'shark', 'crane', 'snail', 'earthworm', 'zebra', 'mosquito', 
'silkworm', 'anaconda', 'mantis', 'cuckoo', 'ant', 'swallow', 'lion', 'hyena'];

  constructor() {
   }

   //리스트 항목을 셔플하는 함수
   suffleArray(list){
     for (let i=list.length-1;i>0;i--) {
       let j = Math.floor(Math.random()*(i+1));
       let temp = list[i]
       list[i] = list[j]
       list[j] = temp 
     }

     return list

   }

   //list 내의 항목 중 주어진 갯수의 항목을 무작위로 첫번째부터 축출하는 함수
   pickSelectedNumPicFromList(pickNUm:number) { 
      return this.suffleArray(this.animalList).slice(0, pickNUm)
   }



  //같은 종류의 사진에서 랜덤으로 2개 뽑을 때 인덱스 생성 함수, 만들고 보니 필요없는 함수가 되버림;;;
  randomIndex() {
    let randomIndexArray = [];
    for(let i=0;i<2;i++) {
      let randomNum = Math.floor(Math.random()*4);
      if (randomIndexArray.indexOf(randomNum) === -1) {
        randomIndexArray.push(randomNum);
      } else {
        i--;
      }
    }
    return randomIndexArray
  }

  //좌표 생성 함수
  makeXYparing(row:number, col:number) {
    let coordinateList = [];
    for (let i=0;i<row; i++) {
      for (let j=0;j<col;j++) {
        coordinateList.push(i.toString()+j.toString())
      }
    }

    return coordinateList 

  }

  //좌표와 이미지파일을 매치시키는 함수
  randomPositionPic(){
    let animalFileName = [];
    let randomAnimalName = this.pickSelectedNumPicFromList(this.picTypeNum);
    let randomIndex = Math.floor(Math.random()*5);
    for(let animal of randomAnimalName) {
      animalFileName.push(animal+randomIndex.toString()+".jpg");
      animalFileName.push(animal+randomIndex.toString()+".jpg");

    }
    let randomCoordiate  = this.suffleArray(this.makeXYparing(4,4))
    let XYanimalArray = {};


    for (let i=0;i<randomCoordiate.length;i++) {
      XYanimalArray[randomCoordiate[i]] = animalFileName[i];
    }

    return XYanimalArray;
  }



  
}

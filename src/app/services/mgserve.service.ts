import { Injectable } from '@angular/core';
//import { Storage } from '@ionic/storage';
import { Storage } from '@capacitor/storage';



@Injectable({
  providedIn: 'root'
})
export class MGserveService {
  public clickedX = 0;
  public clickedY = 0;

  public gameDimensionX = 4;
  public gameDimensionY = 4; 
  
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

fruitVegeList = ['apple',  'apricot',  'avocado',  'banana', 'Blueberries', 'broccoli', 'cabbage', 'carrot', 'cherry', 'coconut', 
'corn', 'cucumber', 'eggplant', 'fig', 'garlic', 'ginger', 'Ginseng', 'grape', 'grapefruit', 'Jujube', 'Kiwi', 'lemon',
 'Lettuce',  'mango', 'melon', 'mushroom', 'onion', 'orange', 'palm', 'parsley', 'peach', 'pepper', 'pickle', 'pimento',
 'pineapple', 'plum', 'Pomegranate', 'potato', 'pumpkin', 'radish', 'Sesame', 'spinach', 'Starfruit', 'Strawberry',
  'sweet potato', 'Virgil', 'watermelon']

players = [
  {name: '김신일', nameChecked:true}, 
  {name: '민아영', nameChecked:false},
  {name: "김하임", nameChecked:false},
  {name: "김로하", nameChecked:false},
  {name: "김하온", nameChecked:false}
]; 

public selectedPlayer=['김신일'];

//private _storage: Storage | null = null;

public scoreList = [];

public recordList = [];


  constructor(
    //private storage:Storage,
  ){
    this.init(); 
   }

  async init() {
  //    const storage = await this.storage.create();
  //    this._storage = storage;
  const data = await Storage.get({'key':'record'});
  console.log('data', data.value);
  return JSON.parse(data.value)
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
      return this.suffleArray(this.fruitVegeList).slice(0, pickNUm)
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
    let itemFileName = [];
    let randomAnimalName = this.pickSelectedNumPicFromList(this.picTypeNum);
    let randomIndex = Math.floor(Math.random()*5);
    for(let animal of randomAnimalName) {
      itemFileName.push(animal+randomIndex.toString()+".jpg");
      itemFileName.push(animal+randomIndex.toString()+".jpg");

    }
    let randomCoordiate  = this.suffleArray(this.makeXYparing(this.gameDimensionX, this.gameDimensionY))
    let XYanimalArray = {};


    for (let i=0;i<randomCoordiate.length;i++) {
      XYanimalArray[randomCoordiate[i]] = itemFileName[i];
    }

    return XYanimalArray;
  }

  saveRecord() {
    // this._storage.set('record', this.recordList).then(()=>{
    //   console.log('save record!!')
    // })

  }

  addRecord(record) {
    this.recordList.push(record);
    //this.saveRecord();
    Storage.set({key:'record', value:JSON.stringify(this.scoreList)})
  }


  
}

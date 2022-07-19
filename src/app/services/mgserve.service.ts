import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
//import { Storage } from '@ionic/storage';
import { collection, getDocs, getDoc, doc } from "firebase/firestore"
import { Storage } from '@capacitor/storage';
import { AuthenticationService } from '../authentication/authentication.service';



@Injectable({
  providedIn: 'root'
})
export class MGserveService {
  public clickedX = 0;
  public clickedY = 0;

  public gameDimensionX = 6;
  public gameDimensionY = 4; 
  
  //게임에 사용할 동물 수
  public picTypeNum = 8;

public animalList = ['kangaroo', 'rabbit', 'dog', 'cat', 'koala', 'gorilla', 'monkey', 
'whale', 'camel', 'snake', 'seal', 'mouse', 'cow', 'horse', 'pig', 'turtle', 'crocodile', 
'tiger', 'leopard', 'cheetah', 'wolf', 'fox', 'skunk', 'mole', 'dolphin', 'lizard', 'eagle', 
'unicorn', 'lobster', 'starfish', 'giraffe', 'crow', 'duck', 'parrot', 'owl', 'sparrow', 
'oriole', 'butterfly', 'dragonfly', 'iguana', 'chameleon', 'anteater', 'spider', 'carp', 
'bear', 'penguin', 'goose', 'bat', 'chick', 'chicken', 'boar', 'seagull', 'rhino', 'deer', 
'elephant', 'hippo', 'squirrel', 'stingray', 'meerkat', 'cobra', 'hippocampus', 'toad', 'magpie', 
'blowfish', 'octopus', 'squid', 'orangutan', 'jellyfish', 'platypus', 'raccoon', 'sheep', 'peacock', 
'frog', 'ostrich', 'komodo dragon', 'cicada', 'stag beetle', 'hawk', 'crab', 'beetle', 'bee', 'goat', 
'pigeon', 'scarab', 'pelican', 'woodpecker', 'shark', 'crane', 'snail', 'earthworm', 'zebra', 'mosquito', 
'silkworm', 'anaconda', 'mantis', 'cuckoo', 'ant', 'swallow', 'lion', 'hyena'];

public fruitVegeList = ['apple',  'apricot',  'avocado',  'banana', 'blueberries', 'broccoli', 'cabbage', 'carrot', 'cherry', 'coconut', 
'corn', 'cucumber', 'eggplant', 'fig', 'garlic', 'ginger', 'ginseng', 'grape', 'grapefruit', 'jujube', 'kiwi', 'lemon',
 'lettuce',  'mango', 'melon', 'mushroom', 'onion', 'orange', 'palm', 'parsley', 'peach', 'pepper', 'pickle', 'pimento',
 'pineapple', 'plum', 'pomegranate', 'potato', 'pumpkin', 'radish', 'sesame', 'spinach', 'starfruit', 'strawberry',
  'sweet potato', 'watermelon']

public school = ['school', 'book', 'friend', 'teacher', 'table', 'pencil', 'blackboard', 'principal', 'classroom', 'playground', 'canteen',
 'lunch', 'exam', 'bus', 'restroom', 'hallway', 'window', 'presentation', 'notebook', 'piano', 'computer', 'violin', 'cooking', 'picnic']

public nature = ['mountain',  'river', 'lake', 'ocean', 'space', 'tree', 'flower', 'wind', 'typhoon', 'wave', 'sky', 'waterfall', 'rain', 'snow',
 'fog', 'sun', 'cloud', 'forest', 'rock', 'soil', 'moon', 'jungle', 'desert', 'earthquake', 'iceberg', 'beach', 'volcano', 'lightning']

public music = ['cello',  'conductor', 'orchestra', 'piano', 'drum', 'guitar', 'violin', 'flute', 'accordian', 'castanets', 'clarinet',
 'cymbals', 'harmonica', 'harp', 'oboe', 'organ', 'ocarina', 'saxophone', 'tambourine', 'triangle', 'viola', 'vuvuzela',
 'xylophone', 'trumpet', 'timpani', 'contrabass', 'bassoon']

public  sports = ['soccer', 'basketball', 'volleyball', 'baseball', 'table tennis', 'bowling', 'tennis', 'hockey', 'badminton',
 'swimming', 'marathon', 'ski', 'snowboard', 'judo', 'boxing', 'fencing', 'golf', 'archery', 'tug of war', 'curling']

categoriesList = ['animalList', 'fruitVegeList', 'school', 'nature', 'music', 'sports']

players=[];

categories = [
  {name: '동물', engName:'animalList', nameChecked:true}, 
  {name: '과일&채소', engName:'fruitVegeList', nameChecked:false},
  {name: '학교', engName: 'school', nameChecked:false},
  {name: '자연', engName: 'nature', nameChecked:false},
  {name: '음악', engName: 'music', nameChecked:false},
  {name: '스포츠', engName: 'sports', nameChecked: false}
];

public selectedPlayer=[];
public selectedCategory=['animalList']
public selectedCategoryItems = this.animalList;

newGameButtonValid = true;


//private _storage: Storage | null = null;

public scoreList = [];

public recordList = [];


  constructor(
    //private storage:Storage,
    private firestore: Firestore,
  ){
    this.init(); 
    
   }

  async init() {
  //    const storage = await this.storage.create();
  //    this._storage = storage;
  const data = await Storage.get({'key':'record'});
  
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
      return this.suffleArray(this.selectedCategoryItems).slice(0, pickNUm)
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
    let randomItemName = this.pickSelectedNumPicFromList(this.picTypeNum);
    let randomIndex = Math.floor(Math.random()*5);
    for(let item of randomItemName) {
      itemFileName.push(item+randomIndex.toString()+".jpg");
      itemFileName.push(item+randomIndex.toString()+".jpg");

    }
    let randomCoordiate  = this.suffleArray(this.makeXYparing(this.gameDimensionX, this.gameDimensionY))
    let XYitemArray = {};


    for (let i=0;i<randomCoordiate.length;i++) {
      XYitemArray[randomCoordiate[i]] = itemFileName[i];
    }

    return XYitemArray;
  }

  //파일 읽었나 못읽었나 확인하는 함수
  readFile(file) {
    let req = new XMLHttpRequest();
    req.open("GET", file, false);
    req.send(null);
    let headers = req.status;
    console.log(headers)
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

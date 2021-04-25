'use strict';


let imgArr = [
  'bag',
  'banana',
  'bathroom',
  'boots',
  'boots',
  'breakfast',
  'bubblegum',
  'chair',
  'cthulhu',
  'dog-duck',
  'dragon',
  'pen',
  'pet-sweep',
  'scissors',
  'shark',
  'sweep',
  'tauntaun',
  'tauntaun',
  'unicorn',
  'usb',
  'water-can',
  'water-can'
];

//const results = document.getElementById( 'results' );
const imageSec = document.getElementById( 'imageSec' );
const leftImage = document.getElementById( 'leftImage' );
const mediumImage = document.getElementById( 'mediumImage' );
const rightImage = document.getElementById( 'rightImage' );






// let img = ['image 1', 'image 2', 'image 3', 'image 4', 'image 5', 'image 6', 'image 7', 'image 8', 'image 9', 'image 10' ,
//'image 11', 'image 12' , 'image 13' , 'image 14' , 'image 15' , 'image 16' , 'image 17' , 'image 18' 'image 19' , 'image 20'
//, 'image 21' , 'image 22'
//]

let clickNumber = 0;
let leftImageIndex = 0;
let rightImageIndex = 0;
let mediumImageIndex = 0;


//let Results = {
//  name: 'Results',
//},


function Ima( name ) {
  this.name = name;
  this.img = `./img/${name}.jpg`;
  this.shown = 0;
  this.clicks = 0;
  Ima.all.push( this );
}

Ima.all = [];

for ( let i = 0; i < imgArr.length; i++ ) {
  new Ima( imgArr[i] );
}

function eventHandler( e ) {
  if ( ( e.target.id === 'leftImage' || e.target.id === 'rightImage' || e.target.id === 'mediumImage' ) && clickNumber < 25 ) {

    if ( e.target.id === 'leftImage' ) {
      Ima.all[leftImageIndex].clicks++;
      console.log( leftImageIndex );
    }

    if ( e.target.id === 'rightImage' ) {
      Ima.all[rightImageIndex].clicks++;
    }
    if ( e.target.id === 'mediumImage' ) {
      Ima.all[mediumImageIndex].clicks++;
    }

    clickNumber++;
    renderIma();

  } else {
    console.log( Ima.all );
  }
}


function renderIma() {
  let leftIndex = randomNumber( 0, imgArr.length - 1 );
  let mediumIndex = randomNumber( 0, imgArr.length - 1 );
  let rightIndex;


  do {
    rightIndex = randomNumber( 0, imgArr.length - 1 );
  } while ( leftIndex === rightIndex === mediumIndex );

  leftImage.src = Ima.all[leftIndex].img;
  mediumImage.src = Ima.all[mediumIndex].img;
  rightImage.src = Ima.all[rightIndex].img;

  leftImageIndex = leftIndex;
  mediumImageIndex = mediumIndex;
  rightImageIndex = rightIndex;

  Ima.all[leftIndex].shown++;
  Ima.all[mediumIndex].shown++;
  Ima.all[rightIndex].shown++;

}

imageSec.addEventListener( 'click', eventHandler );
renderIma();






function randomNumber( min, max ) {
  min = Math.ceil( min );
  max = Math.floor( max );
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}








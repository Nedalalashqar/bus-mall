'use strict';

let imgArr = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
];

//const results = document.getElementById( 'results' );
const imageSec = document.getElementById( 'imageSec' );
const leftImage = document.getElementById( 'leftImage' );
const mediumImage = document.getElementById( 'mediumImage' );
const rightImage = document.getElementById( 'rightImage' );
const viewResult = document.getElementById( 'viewResult' );
const resultContainer = document.getElementById( 'res' );



// let img = ['image 1', 'image 2', 'image 3', 'image 4', 'image 5', 'image 6', 'image 7', 'image 8', 'image 9', 'image 10' ,
//'image 11', 'image 12' , 'image 13' , 'image 14' , 'image 15' , 'image 16' , 'image 17' , 'image 18' 'image 19' , 'image 20'
//, 'image 21' , 'image 22'
//]

let clickNumber = 0;
let leftImageIndex = 0;
let rightImageIndex = 0;
let mediumImageIndex = 0;
let attempt=25;

//let Results = {
//  name: 'Results',
//},

function Ima( name , img ) {
  this.name = name.split('.')[0];
  this.img = `./img/${name}`;
  this.shown = 0;
  this.clicks = 0;
  Ima.all.push( this );
}

Ima.all = [];

for ( let i = 0; i < imgArr.length; i++ ) {
  new Ima( imgArr[i] );
}

function eventHandler( e ) {
  if ( ( e.target.id === 'leftImage' || e.target.id === 'rightImage' || e.target.id === 'mediumImage' ) && clickNumber < attempt ) {

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
  let mediumIndex;
  let rightIndex;

  do {
    rightIndex = randomNumber( 0, imgArr.length - 1 );
    mediumIndex = randomNumber( 0, imgArr.length - 1 );
  } while ( leftIndex === rightIndex || leftIndex === mediumIndex || rightIndex === mediumIndex );

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


function viewResultsFunction( evt ){
  let ulE = document.createElement( 'li' );
  resultContainer.appendChild( ulE );

  for (let i =0 ; i < Ima.all.length ; i++) {
    let liE =document.createElement('li');
    ulE.appendChild(liE);
    liE.textContent = `${Ima.all[i].name} had a ${Ima.all[i].clicks} votes , and was seen a ${Ima.all[i].shown}.`;
  }

  viewResult.removeEventListener('click' , viewResultsFunction );


}


viewResult.addEventListener('click' , viewResultsFunction );

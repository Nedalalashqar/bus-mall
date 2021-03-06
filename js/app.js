/* eslint-disable no-undef */
'use strict';

//testing linking to repl.it

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

//const imaTrack = document.getElementById( 'imaTrack' );
const imageSec = document.getElementById( 'imageSec' );
const leftImage = document.getElementById( 'leftImage' );
const mediumImage = document.getElementById( 'mediumImage' );
const rightImage = document.getElementById( 'rightImage' );
const viewResult = document.getElementById( 'viewResult' );
//const resultContainer = document.getElementById( 'res' );
const track = document.getElementById( 'track' );

let clickNumber = 0;
let leftImageIndex = 0;
let rightImageIndex = 0;
let mediumImageIndex = 0;
let attempt = 25;


function Ima( name, img ) {
  this.name = name.split( '.' )[0];
  this.img = `./img/${name}`;
  this.shown = 0;
  this.clicks = 0;
  Ima.all.push( this );
}

Ima.all = [];
Ima.prevIndex = [];

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
    renderhart();
    localStorage.setItem( 'track', JSON.stringify( Ima.all ) );
  }
}

function renderIma() {

  Ima.prevIndex = [];
  if ( clickNumber > 0 ) {
    Ima.prevIndex = [leftImageIndex, mediumImageIndex, rightImageIndex];
  }

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

track.addEventListener( 'click', subHandle );
function subHandle( event ) {
  event.preventDefault();
  const name = event.target.name.value;
  const img = event.target.img.value;
  const shown = event.target.shown.value;
  const clicks = event.target.clicks.value;
  new Ima( name, img, shown, clicks );
  console.log( Ima.all );
  saveData();

}

function saveData() {
  localStorage.setItem( 'track', JSON.stringify( Ima.all ) );
}

//function renderImage()
function getData() {
  let data = JSON.parse( localStorage.getItem( 'track' ) );
  if ( data ) {
    for ( let i = 0; i < data.length; i++ ) {
      new Ima( data[i].name, data[i].img, data[i].shown, data[i].clicks );
    }
    viewResultsFunction();

  }
}
let newFun = getData;
newFun();

imageSec.addEventListener( 'click', eventHandler );
renderIma();

function renderhart() {

  let clicks = [];
  let names = [];
  let shown = [];
  for ( let i = 0; i < Ima.all.length; i++ ) {
    clicks.push( Ima.all[i].clicks );
    names.push( Ima.all[i].name );
    shown.push( Ima.all[i].shown );
  }

  let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-unused-vars
  let myChart = new Chart( ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: clicks,
        backgroundColor:
          'rgba(255, 99, 132, 0.2)',
        borderColor:
          'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }, {
        label: '# of Shown',
        data: shown,
        backgroundColor:
          'rgba(144, 99, 100, 0.2)',
        borderColor:
          'rgba(144, 99, 100, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  } );
}

function viewResultsFunction( evt ) {
  track.innerHTML = '';
  for ( let i = 0; i < Ima.all.length; i++ ) {
    let liE = document.createElement( 'li' );
    track.appendChild( liE );
    liE.textContent = `${Ima.all[i].name} had a ${Ima.all[i].clicks} votes , and was seen a ${Ima.all[i].shown}.`;
  }
  viewResult.removeEventListener( 'click', viewResultsFunction );
}

function randomNumber( min, max ) {
  min = Math.ceil( min );
  max = Math.floor( max );

  let rand;
  let allowed;
  do {
    rand = Math.floor( Math.random() * ( max - min + 1 ) + min );
    allowed = true;
    for ( let i = 0; i < Ima.prevIndex.length; i++ ) {
      if ( Ima.prevIndex[i] === rand ) {
        allowed = false;

      }
    }
  } while ( !allowed );
  return rand;
}

viewResult.addEventListener( 'click', viewResultsFunction );

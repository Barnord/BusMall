'use strict'

const data = document.getElementById('data')
const productOneh2 = document.getElementById('productOneh2')
const productOneImg = document.getElementById('productOneImg')
const productTwoh2 = document.getElementById('productTwoh2')
const productTwoImg = document.getElementById('productTwoImg')
const productThreeh2 = document.getElementById('productThreeh2')
const productThreeImg = document.getElementById('productThreeImg')

let voteCounter = 0;

let currentProductOne = null;
let currentProductTwo = null;
let currentProductThree = null;

function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  shown = 0;
  votes = 0;

  Product.allProducts.push(this);
}

Product.allProducts = [];

new Product('R2D2 Suitcase', './assets/bag.jpg' );
new Product('Banana Cutter', './assets/banana.jpg');
new Product('TP Tablet Holder', './assets/bathroom.jpg');
new Product('Toeless Rainboots', './assets/boots.jpg');
new Product('All-in-one Breakfast Maker', './assets/breakfast.jpg');
new Product('Meatball Bubble Gum', './assets/bubblegum.jpg');
new Product('Uncomfortable Chair', './assets/chair.jpg');
new Product('Cthulu Action Figure', './assets/cthulu.jpg');
new Product('Dog Duck Beak!', './assets/dog-duck.jpg');
new Product('Dragon Meat', './assets/dragon.jpg');
new Product('Pen Untensils', './assets/pen.jpg');
new Product('Pet Sweep', './assets/pet-sweep.jpg');
new Product('Pizza Scissors', './assets/scissors.jpg');
new Product('Sleeping Shark', './assets/shark.jpg');
new Product('Baby Sweep', './assets/sweep.jpg');
new Product('Tauntaun Sleeping Bag', './assets/tauntaun.jpg');
new Product('Unicorn Meat', './assets/unicorn.jpg');
new Product('Self-watering Can', './assets/water-can.jpg');
new Product('No Spill Wine Glass', './assets/wine-glass.jpg');
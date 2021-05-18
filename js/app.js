'use strict'

const data = document.getElementById('data')
const dataChart = document.getElementById('chart')
const results = document.getElementById('results')
const productContainer = document.getElementById('productContainer')
const productOneh2 = document.getElementById('productOneh2')
const productOneImg = document.getElementById('productOneImg')
const productTwoh2 = document.getElementById('productTwoh2')
const productTwoImg = document.getElementById('productTwoImg')
const productThreeh2 = document.getElementById('productThreeh2')
const productThreeImg = document.getElementById('productThreeImg')

let voteCounter = 0;

let votesAr = [];
let showsAr = [];
let namesAr = [];
let labelColors = [];

let currentProductOne = null;
let currentProductTwo = null;
let currentProductThree = null;

function Product(name, imgPath) {
  this.name = name;
  this.imgPath = imgPath;
  this.shown = 0;
  this.votes = 0;

  Product.allProducts.push(this);
}

Product.allProducts = [];

Product.prototype.renderProduct = function(h2, imageTag) {
  imageTag.src = this.imgPath;
  h2.textContent = this.name;
}

function renderThreeProducts(productOne, productTwo, productThree) {
  productOne.renderProduct(productOneh2, productOneImg);
  productTwo.renderProduct(productTwoh2, productTwoImg);
  productThree.renderProduct(productThreeh2, productThreeImg);
}

function pickProducts() {
  const usedProducts = [];
  usedProducts.push(currentProductOne);
  usedProducts.push(currentProductTwo);
  usedProducts.push(currentProductThree);

  while (usedProducts.includes(currentProductOne)) {
    let productOneIndex = Math.floor(Math.random() * Product.allProducts.length);
    currentProductOne = Product.allProducts[productOneIndex];
  }
  usedProducts.push(currentProductOne)

  while (usedProducts.includes(currentProductTwo)) {
    let productTwoIndex = Math.floor(Math.random() * Product.allProducts.length);
    currentProductTwo = Product.allProducts[productTwoIndex];
  }
  usedProducts.push(currentProductTwo)

  while (usedProducts.includes(currentProductThree)) {
    let productThreeIndex = Math.floor(Math.random() * Product.allProducts.length);
    currentProductThree = Product.allProducts[productThreeIndex];
  }
  currentProductOne.shown++;
  currentProductTwo.shown++;
  currentProductThree.shown++;
}

function renderResults() {
  results.innerHTML = '';
  const h2Elem = document.createElement('h2')
  h2Elem.textContent = 'Results';
  results.appendChild(h2Elem);
  for (let product of Product.allProducts) {
    const liElem = document.createElement('li');
    liElem.textContent = `${product.name} recieved ${product.votes} votes after ${product.shown} showings`;
    results.appendChild(liElem);
  }
}

function makeButton() {
  const button = document.createElement('button');
  button.addEventListener('click', displayResults)
  button.textContent = 'View Data';
  data.appendChild(button);
}

function handleClick(e) {
  console.log('working')
  let clickedItem = e.target;
  console.log(clickedItem);
  if (voteCounter < 5) {
    if (clickedItem === productOneImg || clickedItem === productTwoImg || clickedItem === productThreeImg) {
      voteCounter++;
      if (clickedItem === productOneImg) {
        currentProductOne.votes++;
      } else if (clickedItem === productTwoImg) {
        currentProductTwo.votes++;
      } else {
        currentProductThree.votes++;
      }
      pickProducts();
      renderThreeProducts(currentProductOne, currentProductTwo, currentProductThree)
    } else {
      alert('Please click an image.')
    }
  } else {
      productContainer.removeEventListener('click', handleClick);
      // renderResults();
      makeButton();
  }
}

function displayResults() {
  renderResults();
  getDataSets();
  renderViewChart();
  data.removeEventListener('click', displayResults)
}

function getDataSets() {
  votesAr = [];
  showsAr = [];
  labelColors = [];
  for (let product of Product.allProducts) {
    namesAr.push(product.name)
    votesAr.push(product.votes)
    showsAr.push(product.shown)
  }
  for (let i=0; i<Product.allProducts.length; i++)
    if (i%2 === 0) {
      labelColors.push('rgba(104, 217, 134, 0.2)')
    } else {
      labelColors.push('rgba(213, 217, 104, 0.2)')
    }
}

function renderViewChart() {
  const myChart = new Chart(dataChart,  {
    type: 'bar',
    data: {
      labels: namesAr,
      datasets: [{
        label: '# of Votes',
        data: votesAr,
        backgroundColor: labelColors
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
}

productContainer.addEventListener('click', handleClick)

new Product('R2D2 Suitcase', './assets/bag.jpg' );
new Product('Banana Cutter', './assets/banana.jpg');
new Product('Swipe & Wipe', './assets/bathroom.jpg');
new Product('Toeless Rainboots', './assets/boots.jpg');
new Product('All-in-one Breakfast Maker', './assets/breakfast.jpg');
new Product('Meatball Bubble Gum', './assets/bubblegum.jpg');
new Product('Uncomfortable Chair', './assets/chair.jpg');
new Product('Cthulhu Action Figure', './assets/cthulhu.jpg');
new Product('Dog Duck Beak!', './assets/dog-duck.jpg');
new Product('Dragon Meat', './assets/dragon.jpg');
new Product('Pen Untensils', './assets/pen.jpg');
new Product('Pet Sweep', './assets/pet-sweep.jpg');
new Product('Pizza Scissors', './assets/scissors.jpg');
new Product('Sleeping Shark', './assets/shark.jpg');
new Product('Baby Sweep', './assets/sweep.png');
new Product('Tauntaun Sleeping Bag', './assets/tauntaun.jpg');
new Product('Unicorn Meat', './assets/unicorn.jpg');
new Product('Self-watering Can', './assets/water-can.jpg');
new Product('No Spill Wine Glass', './assets/wine-glass.jpg');

pickProducts();
console.log(currentProductOne);
console.log(currentProductTwo);
console.log(currentProductThree);
renderThreeProducts(currentProductOne, currentProductTwo, currentProductThree);
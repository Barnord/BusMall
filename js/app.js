'use strict'

const data = document.getElementById('data')
const buttonDiv = document.getElementById('buttonDiv')
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

function Product(name, imgPath, shown, votes) { // Creates products for use throughout this app, pushes into an array of only products
  this.name = name;
  this.imgPath = imgPath;
  this.shown = shown;
  this.votes = votes;

  Product.allProducts.push(this);
}

Product.allProducts = [];

Product.prototype.renderProduct = function(h2, imageTag) { //displays a product
  imageTag.src = this.imgPath;
  h2.textContent = this.name;
}

function renderThreeProducts(productOne, productTwo, productThree) { // displays three products
  productOne.renderProduct(productOneh2, productOneImg);
  productTwo.renderProduct(productTwoh2, productTwoImg);
  productThree.renderProduct(productThreeh2, productThreeImg);
}

function pickProducts() { // chooses products to display, and insures that a product from the previous rotation doesn't reappear in the current rotation.
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

function renderResults() { // renders the list from this batch of results.
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

// function makeButton() { // creates a button with a corresponding listener to view data
//   const button = document.createElement('button');
//   button.addEventListener('click', displayResults)
//   button.textContent = 'View Data';
//   buttonDiv.appendChild(button);
// }

function handleClick(e) { // insures people click the images, sets number of votes a person gets, and tracks how many times a product has been voted on.
  console.log('working')
  let clickedItem = e.target;
  console.log(clickedItem);
  if (voteCounter < 25) {
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
      // makeButton();
      data.setAttribute('class', '');
      displayResults();
  }
}

function displayResults() { // shows the results of all data collection
  buttonDiv.innerHTML = ''
  updateStorage();
  renderResults();
  getDataSets();
  renderViewChart();
  data.removeEventListener('click', displayResults)
  productContainer.setAttribute('class', 'hide')
}

function getDataSets() { // prepares necessary data & arrays for chart
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

function renderViewChart() { // prints the chart with collected data
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

function updateStorage() { // stores all product data to local storage.
  const stringifiedProducts = JSON.stringify(Product.allProducts);
  localStorage.setItem('products', stringifiedProducts);
}

function callStorage() { // pulls collected data from previous sessions out of local storage.
  let returnedProducts = localStorage.getItem('products');
  if (returnedProducts) {
    let parsedProducts = JSON.parse(returnedProducts);
    Product.allProducts = [];
    for (let product of parsedProducts) {
      new Product(product.name, product.imgPath, product.shown, product.votes);
    }
  } else {
    console.log('Nothing matching in storage.')
  }
}

productContainer.addEventListener('click', handleClick)

new Product('R2D2 Suitcase', './assets/bag.jpg', 0, 0);
new Product('Banana Cutter', './assets/banana.jpg', 0, 0);
new Product('Swipe & Wipe', './assets/bathroom.jpg', 0, 0);
new Product('Toeless Rainboots', './assets/boots.jpg', 0, 0);
new Product('All-in-one Breakfast Maker', './assets/breakfast.jpg', 0, 0);
new Product('Meatball Bubble Gum', './assets/bubblegum.jpg', 0, 0);
new Product('Uncomfortable Chair', './assets/chair.jpg', 0, 0);
new Product('Cthulhu Action Figure', './assets/cthulhu.jpg', 0, 0);
new Product('Dog Duck Beak!', './assets/dog-duck.jpg', 0, 0);
new Product('Dragon Meat', './assets/dragon.jpg', 0, 0);
new Product('Pen Untensils', './assets/pen.jpg', 0, 0);
new Product('Pet Sweep', './assets/pet-sweep.jpg', 0, 0);
new Product('Pizza Scissors', './assets/scissors.jpg', 0, 0);
new Product('Sleeping Shark', './assets/shark.jpg', 0, 0);
new Product('Baby Sweep', './assets/sweep.png', 0, 0);
new Product('Tauntaun Sleeping Bag', './assets/tauntaun.jpg', 0, 0);
new Product('Unicorn Meat', './assets/unicorn.jpg', 0, 0);
new Product('Self-watering Can', './assets/water-can.jpg', 0, 0);
new Product('No Spill Wine Glass', './assets/wine-glass.jpg', 0, 0);

callStorage();
pickProducts();
console.log(currentProductOne);
console.log(currentProductTwo);
console.log(currentProductThree);
renderThreeProducts(currentProductOne, currentProductTwo, currentProductThree);
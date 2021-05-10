// 'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const main = document.querySelector('.container');
const imageContainer = document.querySelector('.images');

///////////////////////////////////////
// Working with Ajax  --->

function html(data, clas) {
  const html = ` <article class="${clas}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫 </span>${(
        +data.population / 1000000
      ).toFixed(2)}m people </p>
      <p class="country__row"><span>🗣️ </span>${
        data.languages[0].nativeName
      }</p>
      <p class="country__row"><span>💰 </span>${data.currencies[0].symbol}</p>
      <p class="country__row"><span>🏛 </span>${data.capital}</p>
    </div>
  </article> `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
}

// Old style -->>

// function neighbbourApi(target) {
//   const api2 = new XMLHttpRequest();
//   api2.open('GET', `https://restcountries.eu/rest/v2/alpha/${target}`);
//   api2.send();
//   api2.addEventListener('load', function () {
//     const data2 = JSON.parse(this.responseText);
//     console.log(data2);
//     html(data2, 'neighbour');
//   });
// }

// function api(country) {
//   const apiRequest = new XMLHttpRequest();
//   apiRequest.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
//   apiRequest.send();

//   apiRequest.addEventListener('load', function () {
//     const [data] = JSON.parse(apiRequest.responseText);
//     console.log(data);
//     html(data, 'country');
//     console.log(data.borders);
//     if (!data.borders) return;
//     data.borders.forEach(coad => neighbbourApi(coad));
//   });
// }
// api('bangladesh');
// api('usa');
// api('portugal');

/////////////////////////////////////////////////////////////
//  function error(err) {
//   const writte = `<h3>${err}</h3>`;
//   countriesContainer.insertAdjacentHTML('beforeend', writte);
//   countriesContainer.style.opacity = 1;
// }
// // Ajax chainig proccess modern style  ==>>>>>

// neighbour country call
function neighbourCall(country) {
  fetch(`https://restcountries.eu/rest/v2/alpha/${country}`)
    .then(programe => {
      if (!programe.ok)
        throw new Error(`Something went Wrong error ${programe.status}`);
      return programe.json();
    })
    .then(data => {
      console.log(data);
      html(data, 'neighbour');
    })
    .catch(err => error(err));
}
/// main country call
function callcountry(country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(programe => {
      if (!programe.ok)
        throw new Error(`Something went Wrong error ${programe.status}`);
      return programe.json();
    })
    .then(data => {
      html(data[0], 'country');
      data[0].borders.forEach(nCountry => neighbourCall(nCountry));
    })
    .catch(data => {
      console.log(data);
      error(data);
    });
}

//callcountry('bangladesh');

//////////////////////////////////////////////////////////////

// Coading challeng 01 -->>>

// In this challenge you will build a funtion 'whereAmI' which reders a country only based on GPS Coordinates. for that , you will use a second API to geocode Coordinates .

// Start from here :

// part 1 -

// 1.Creat a function 'whereAmI' which takes as inputs a latitude value (lat) and a longtitude  value (lang) ;###

// 2. Do 'reverse geocoding ' of the provided coordinates . Reverse geocoding means to connvert coordinates to a meaningful location , Like a city and country name. Use this API to do revers geocoding : https://geocode.xyz/52.5085.13.381?geoit=json. the AJAX call will be done to a url with this format : .................................... use the fetch API and promises to get the data . Do NOT use the getJson function we created , theat is cheating .######

// 3. ONce you have the data , take a look at it in the console to see all the attributes that you recieved about the provided location . then , using this data , log a message like this to the console : 'You are in Berlin,Germany'###

// 4. Cahin a .catch methid to the end of the promise cain and log errors to the conslole   ####

// 5. This API allows you to make only 3 request per second , If you reload fast , you will get this error with code 403. this is an error with the request.  Remember , Fetch() doews not refect the promise  in this case , So creat an error to reject the promise yourself , with a meaningful error message .

//  Part 2 ---- >>>>

//  6. NOw its time to use the received data to rder a country . So take the relenant attribute formm the eocoding API result , and plug it into the countries API that we have been using.

//  7. Render the country and catch any errors , just like we have done in the last lecture ( you can even copy this code , no ned to type the same code );

// const data = [50.608, 13.381];

const whereAmI = function ([lat, long]) {
  return fetch(`https://geocode.xyz/${lat},${long}?geoit=json`)
    .then(programe => {
      return programe.json();
    })
    .then(data => {
       callcountry(data.country.toLowerCase());
      return console.log(`You are in ${data.city},${data.country}`);
    });
};

if (!navigator.geolocation) alert(`Cannot read your location`);
navigator.geolocation.getCurrentPosition(function (position) {
  const { latitude, longitude } = position.coords;
  whereAmI([latitude, longitude]);
});
///////////////////////////////////////////////////////////

// //Promise method or Promise ajax call

// const lotteryTest = new Promise(function (resolve, reject) {
//   if (Math.random() >= 0.5) resolve('You win');
//   reject('You loss');
// });
// lotteryTest.then(
//   pass => console.log(pass),
//   fail => console.log(fail)
// );

// function wait(second) {
//   return new Promise(function (resolve, reject) {
//     setTimeout(resolve, second * 1000);
// });
// }

// wait(2).then(pass => console.log('pass'));

// const getLocation = new Promise(function (resolve, reject) {
//   if (!navigator.geolocation) return;
//   navigator.geolocation.getCurrentPosition(resolve, reject);
// });

// function forEvent() {
//   getLocation
//     .then(position => {
//       const { latitude, longitude } = position.coords;
//       fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
//         .then(programe => {
//           return programe.json();
//         })
//         .then(data => {
//           callcountry(data.country.toLowerCase());
//           return console.log(`You are in ${data.city},${data.country}`);
//         });
//     })
//     .catch(err => console.log(err.message));
// }

/////////////////////////////////////

// const wait = function (time) {
//   const promiseTime = new Promise(function (resolve) {
//     setTimeout(resolve, time * 1000);
//   });
//   return promiseTime;
// };
// let currentImage;
// const creatImage = function (path) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = path;
//     img.addEventListener('load', function () {
//       imageContainer.append(img);
//       resolve(img);
//     });
//     img.addEventListener('erro', function () {
//       reject();
//     });
//   });
// };
// function imageShower() {
//   creatImage('img/img-1.jpg')
//     .then(pass => {
//       console.log(`${pass} is loaded`);
//       currentImage = pass;
//       return wait(2);
//     })
//     .then(() => {
//       currentImage.style.display = 'none';
//       return wait(2);
//     })
//     .then(() => creatImage('img/img-2.jpg'))
//     .then(pass => {
//       console.log(`${pass} is loaded`);
//       currentImage = pass;
//       return wait(2);
//     })
//     .then(() => {
//       currentImage.style.display = 'none';
//       return wait(2);
//     })
//     .then(() => creatImage('img/img-3.jpg'))
//     .then(pass => {
//       console.log(`${pass} is loaded`);
//       currentImage = pass;
//       return wait(2);
//     })
//     .then(() => {
//       currentImage.style.display = 'none';
//       return wait(2);
//     })
//     .catch(err => {
//       error(err);
//     });
// }
// btn.addEventListener('click', imageShower);
///////////////////////////////////////////////
// const getLocation = function () {
//   return new Promise(function (resolve, reject) {
//     if (!navigator.geolocation) return;
//     navigator.geolocation.getCurrentPosition(resolve, reject);
//   });
// };

// const country = async function () {
//   const location = await getLocation();
//   console.log(location);
//   const { latitude, longitude } = location.coords;
//   const locationinfo = await fetch(
//     `https://geocode.xyz/${latitude},${longitude}?geoit=json`
//   );

//   const locationData = await locationinfo.json();
//   console.log(locationData);

//   const res = await fetch(
//     `https://restcountries.eu/rest/v2/name/${locationData.country}`
//   );
//   const data = await res.json();
//   console.log(data[0]);
//   callcountry(data[0].name);
// };

// console.log('First');
// country();
// console.log('Last');

////////////////////////////////////////////////////
// const getJson = function (link) {
//   return fetch(link).then(pass => pass.json());
// };

// const makeArray = async function (c1, c2, c3) {
//   try {
//     const data = await Promise.all([
//       getJson(`https://restcountries.eu/rest/v2/name/${c1}`),
//       getJson(`https://restcountries.eu/rest/v2/name/${c2}`),
//       getJson(`https://restcountries.eu/rest/v2/name/${c3}`),
//     ]);
//     console.log(data);
//     const capitals = data.map(data => data[0].capital);
//     console.log(capitals);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// makeArray('bangladesh', 'usa', 'china');
/////////////////////////////////////////////////////////

const wait = function (time) {
  const promiseTime = new Promise(function (resolve) {
    setTimeout(resolve, time * 1000);
  });
  return promiseTime;
};
let currentImage;
const creatImage = function (path) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = path;
    img.addEventListener('load', function () {
      imageContainer.append(img);
      resolve(img);
    });
    img.addEventListener('erro', function () {
      reject();
    });
  });
};

// const imageShower = async function () {
//   try {
//     // first image load
//     currentImage = await creatImage('img/img-1.jpg');
//     console.log(`1 is loaded`);
//     await wait(2);
//     currentImage.style.display = 'none';
//     await wait(2);
//     // second image load
//     currentImage = await creatImage('img/img-2.jpg');
//     console.log(`2 is loaded`);
//     await wait(2);
//     currentImage.style.display = 'none';
//     await wait(2);
//     // Third image load
//     currentImage = await creatImage('img/img-2.jpg');
//     console.log(`3 is loaded`);
//     await wait(2);
//     currentImage.style.display = 'none';
//     await wait(2);
//   } catch (error) {}
// };

// imageShower();

////////////////////////////////////////////////////////////////

// Part two ==

const dataArr = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];

//  1. Creat an async function 'loadAll' that receives an array of image paths 'imgarr';
//  2.Use .map to loop over the array , to load all the images with the  ' creatImage ' function (call the resulting array 'imgs')
//  3. Check out the 'imgs' array in the console ! Is it like you expected?;
//  4. Use a promise conbinator function to actually get the images from the array
//  5. Add the 'parelell' class to all the images (it has some Css styles ).

const loadAll = async function (imgArr) {
  try {
    const elImg = await imgArr.map(async el => await creatImage(el));
    console.log(elImg);
    const elImgPrm = await Promise.all(elImg);
    console.log(elImgPrm);
    elImgPrm.forEach(img => img.classList.add('parallel'));
  } catch (err) {
    console.error(err);
  }
};
loadAll(dataArr);

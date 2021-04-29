'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const weatherContainer = document.querySelector('.weather');
let inputGet = document.querySelector('#inputGet');
let result = document.querySelector('#result');
let btnGet = document.querySelector('#btnGet');
// const input = document.querySelector('.myText');
// const weatherRequest = new XMLHttpRequest();
// weatherRequest.open('GET', 'https://goweather.herokuapp.com/weather/lisabon');
// weatherRequest.send();

// weatherRequest.addEventListener('load', function () {
//   // console.log(this.responseText);
//   const weatherData = JSON.parse(this.responseText);
//   console.log(weatherData);
// });
let x;
btnGet.addEventListener('click', e => {
  e.preventDefault();
  x = inputGet.value;
  getWeather();
});
//////////////

function getWeather() {
  const weatherRequest = new XMLHttpRequest();
  weatherRequest.open('GET', `https://goweather.herokuapp.com/weather/${x}`);
  weatherRequest.send();

  weatherRequest.addEventListener('load', function () {
    // console.log(this.responseText);
    const weatherData = JSON.parse(this.responseText);
    // console.log(weatherData);
    // const temperature = weatherData.temperature;
    // console.log(temperature);

    const weatherHtml = `<p> Todays temperature is ${
      weatherData.temperature
    } and ${
      weatherData.description === 'Sunny'
        ? '<img class="weather__image" src="img/sunny.svg" />'
        : '<img class="weather__image" src="img/rain.svg" />'
    }</p>
    <h2>The wind is ${weatherData.wind}</h2>
     <h3>Forcast for tommorow ${weatherData.forecast[0].temperature}</h3>
     <h3>Forcast for dayafter tommorow ${
       weatherData.forecast[1].temperature
     }</h3>
    
     `;

    weatherContainer.insertAdjacentHTML('beforeend', weatherHtml);
  });
}

// /////

const request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.eu/rest/v2/name/portugal');
request.send();

request.addEventListener('load', function () {
  // console.log(this.responseText);
  const [data] = JSON.parse(this.responseText);
  // console.log(data);

  const html = `<article class="country">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
          </div>
        </article>`;

  countriesContainer.insertAdjacentHTML('beforeend', html);

  countriesContainer.style.opacity = 1;
});

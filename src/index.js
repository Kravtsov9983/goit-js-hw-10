import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector("#search-box")
const list = document.querySelector(".country-list");


  fetchCountries()
    .then(insertContent)
    .catch((error) => { console.log(error) })

function fetchCountries() {
  return fetch(`https://restcountries.com/v3.1/name/{name}?fullText=true`)
    .then(response => {return response.json()})
};

    const createListItem = (item) => `<li>
  <img src="${item.flags[1]}" alt="${item.name.official}">
  <h2>${item.name.official ? item.name.official : ""}</h2>
  <p>${item.capital ? item.capital : ""}</p>
  <p>${item.population ? item.population : ""}</p>
  <p>${Object.values(item.languages) ? Object.values(item.languages) : ""}</p>
</li>`;

 const generateContent = (array) => array?.reduce((acc, item) => acc + createListItem(item), "");

function insertContent (array) {
  const result = generateContent(array);
  list.insertAdjacentHTML("beforeend", result);
}


// fetch("https://restcountries.com/v3/all?fields=name,capital,population,flags,languages ")
//     .then(response => response.json())
//     .then((date) => {insertContent(date)})
//   fetchCountries()
//     .then(insertContent)
//     .catch((error) => { console.log(error) })
import './css/styles.css';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector("#search-box")
const list = document.querySelector(".country-list");



fetch("https://restcountries.com/v3/all?fields=name,capital,population,flags,languages ")
    .then(response => response.json())
    .then((date) => {insertContent(date)})
    .catch((error) => { console.log(error) })


    const createListItem = (item) => `<li>
  <img src="${item.flags[1]}" alt="">
  <h2>${item.name.official}</h2>
  <p>${item.capital}</p>
  <p>${item.population}</p>
  <p>${item.languages}</p>
</li>`;

 const generateContent = (array) => array?.reduce((acc, item) => acc + createListItem(item), "");

const insertContent = (array) => {
  const result = generateContent(array);
  list.insertAdjacentHTML("beforeend", result);
};
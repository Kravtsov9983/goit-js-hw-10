import './css/styles.css';
import Notiflix from 'notiflix';


const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const input = document.querySelector("#search-box")
const listEl = document.querySelector(".country-list");
const boxEl = document.querySelector('.country-info');

function checkAndRender(list) {
  if (list.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (list.length <= 10 && list.length > 1) {
    listEl.innerHTML = '';
    boxEl.innerHTML = '';
    renderList(list, listEl);
  } else {
    boxEl.innerHTML = '';
    listEl.innerHTML = '';
    renderCountryBox(list, boxEl);
    return;
  }
}

import fetchCountries from './fetchCountries';
 
input.addEventListener('input', debounce(onInputCoundtyRender, DEBOUNCE_DELAY));

function onInputCoundtyRender(event) {
  const value = event.target.value.toLowerCase().trim();
  if (!value) {
    listEl.innerHTML = '';
    boxEl.innerHTML = '';
    return;
  }
  fetchCountries(value)
    .then(checkAndRender)
    .catch(error => console.log('Oops, there is no country with that name'));
}

function renderCountryBox(list, box) {
  const markup = list
    .map(
      ({
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
      }) =>
        `<div class="country-info__box"><img src="${svg}" alt="flag" width="30">
    <h1 class="country-info__main-title">${official}</h1></div>
    <ul class="country-info__list">
    <li class="country-info__item">
     <h2 class="country-info___title">Capital:</h2>
    <p class="country-info___text">${capital}</p>
    </li>
    <li class="country-info__item">
        <h2 class="country-info___title">Population:</h2>
     <p class="country-info___text">${population}</p>
    </li>
    <li class="country-info__item">
    <h2 class="country-info___title">Languages:</h2>
     <p class="country-info___text">${Object.values(languages)}</p></li>
    </ul>`
    )
    .join('');
  return (box.innerHTML = markup);
}


 

  function renderList(list, listBox) {
  const markup = list
    .map(
      ({ flags: { svg }, name: { official } }) =>
        `<li class="country-list__item">
<img src="${svg}" alt="flag" width="30">
<h1 class="country-list__title">${official}</h1>
      </li>`
    )
    .join('');
  return (listBox.innerHTML = markup);
}

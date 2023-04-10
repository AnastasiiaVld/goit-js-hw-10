import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import lodash from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listInfoEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', lodash(onInputChange, DEBOUNCE_DELAY));

function onInputChange(evt) {
  evt.preventDefault();

  const countryName = evt.target.value.trim();

  if (!countryName.length) {
    countryInfoEl.innerHTML = '';
    listInfoEl.innerHTML = '';
    return;
  }

  fetchCountries(countryName)
    .then(data => {
      console.log(data);

      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countryInfoEl.innerHTML = '';
        listInfoEl.innerHTML = '';
      } else if (data.length >= 2 && data.length <= 10) {
        const markup = data
          .map(country => {
            return `
            <li class="list"
              <div class="flex"> 
              <p class= "country-name font-size">${country.name.official}</p>
                <img class = flag src=" ${country.flags.svg}" alt="">
        
              </div>
            </li>
           `;
          })
          .join('');

        listInfoEl.innerHTML = markup;
        countryInfoEl.innerHTML = '';
      } else if (data.length === 1) {
        const markup = data
          .map(country => {
            return `
              <div class="flex">
                <img class="flag" src="${country.flags.svg}" alt="" />
                <p class="country-name font-size">${country.name.official}</p>
            </div>
                <p class="capital font-size"><span class="span">Capital :</span>
                  ${country.capital}
                </p>
                <p class="population font-size">
                      <span class="span">Population : </span>${
                        country.population
                      }
                </p>
                <p class="languages font-size">
                  <span class="span">Languages :</span>
                  ${Object.values(country.languages)}
                </p>
            `;
          })
          .join('');

        countryInfoEl.innerHTML = markup;
        listInfoEl.innerHTML = '';
      }
    })
    .catch(err => {
      console.log(err);
      countryInfoEl.innerHTML = '';
      listInfoEl.innerHTML = '';
    });
}

import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import lodash from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { pageСleaner } from './markap';
import { createMoreCountry } from './markap';
import { createCountry } from './markap';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listInfoEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

inputEl.addEventListener('input', lodash(onInputChange, DEBOUNCE_DELAY));

function onInputChange(evt) {
  evt.preventDefault();

  const countryName = evt.target.value.trim();

  if (!countryName.length) {
    pageСleaner();
    return;
  }

  fetchCountries(countryName)
    .then(data => {
      if (!data) {
        return null;
      }

      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        pageСleaner();
      } else if (data.length >= 2 && data.length <= 10) {
        let markup = data.map(country => createMoreCountry(country)).join('');

        listInfoEl.innerHTML = markup;
        countryInfoEl.innerHTML = '';
      } else if (data.length === 1) {
        let markup = data.map(country => createCountry(country)).join('');

        countryInfoEl.innerHTML = markup;
        listInfoEl.innerHTML = '';
      }
    })
    .catch(err => {
      console.log(err);
      pageСleaner();
    });
}

import { Notify } from 'notiflix';

const BASE_URL = 'https://restcountries.com/v3.1/';
export function fetchCountries(name) {
  const url = `${BASE_URL}/name/${name}?
  fields=name,
  capital,
  population
  flags
  languaages,
  `;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        console.log(response);
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data;
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

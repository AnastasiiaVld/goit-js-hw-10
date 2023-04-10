const listInfoEl = document.querySelector('.country-list');
const countryInfoEl = document.querySelector('.country-info');

export function pageСleaner() {
  countryInfoEl.innerHTML = '';
  listInfoEl.innerHTML = '';
}

export function createMoreCountry(country) {
  return `
    <li class="list"
      <div class="flex"> 
        <p class= "country-name font-size">${country.name.official}</p>
        <img class = flag src=" ${country.flags.svg}" alt="">
      </div>
    </li>
  `;
}

export function createCountry(country) {
  return `
        <div class="flex">
            <img class="flag" src="${country.flags.svg}" alt="" />
            <p class="country-name font-size">${country.name.official}</p>
        </div>
            <p class="capital font-size"><span class="span">Capital :</span>${
              country.capital
            }
            </p>
            <p class="population font-size">
                      <span class="span">Population : </span>${
                        country.population
                      }
            </p>
            <p class="languages font-size">
                  <span class="span">Languages :</span>${Object.values(
                    country.languages
                  )}
            </p>
            `;
}

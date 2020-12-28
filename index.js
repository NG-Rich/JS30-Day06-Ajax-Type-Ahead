const endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities = [];

fetch(endpoint)
  .then(data => data.json())
  .then(result => cities.push(...result));

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');

    return place.city.match(regex) || place.state.match(regex) || place.rank.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  const matchesArray = findMatches(this.value, cities);

  if (this.value == "") {
    const html = `
    <li>Filter for a city/state</li>
    <li>or by rank (1-1000)</li>
    `

    return suggestions.innerHTML = html;
  }else {
    const html = matchesArray.map(place => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
      const rankNum = place.rank.replace(regex, `<span class="hl">${this.value}</span>`);

      return `
        <li>
          <span class=".name">#${rankNum} ${cityName}, ${stateName}</span>
          <span class=".population">${numberWithCommas(place.population)}</span>
        </li>
      `
    }).join("");
  
    suggestions.innerHTML = html;
  }
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
import axios from 'axios';

const countryMap = {
  'United States': 'USA',
  'South Korea': 'S-Korea',
};

/**
 * @param {string} country Optional
 */
const fetchData = country =>
  axios({
    method: 'GET',
    url: process.env.RAPID_API_URL,
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': process.env.RAPID_API_HOST,
      'x-rapidapi-key': process.env.RAPID_API_KEY,
      useQueryString: true,
    },
    params: {
      country: countryMap[country] || country,
    },
  })
    .then(({ data }) => {
      const { response, errors } = data;
      if (errors.length || !response) {
        console.error('something went wrong', errors);
        throw Error('error while fetching country data');
      }
      return response;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });

/**
 * @param {string} country Optional
 */
const getDataByCountry = async country => {
  const response = await fetchData(country);
  const [countryData] = response;
  if (!countryData) {
    console.error(`no country data found for ${country}`);
    throw Error('error while fetching country data');
  }
  const {
    country: countryName,
    population,
    cases,
    deaths,
    tests,
  } = countryData;
  return { country: countryName, population, cases, deaths, tests };
};

/**
 * @param {array} countries Required
 */
const getDataByCountries = async countries => {
  const response = await fetchData();
  const countiesData = response.filter(
    data =>
      !!countries
        .map(country => countryMap[country] || country)
        .find(country => data.country === country)
  );
  if (!countiesData || !countiesData.length) {
    console.error(`no countries data found for ${countries}`);
    throw Error('error while fetching country data');
  }

  return countiesData.map(
    ({ country: countryName, population, cases, deaths, tests }) => ({
      country: countryName,
      population,
      cases,
      deaths,
      tests,
    })
  );
};

export { getDataByCountry, getDataByCountries };

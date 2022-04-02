import { getPrivateEnvVars } from '~/config/env.server';

type Entry = number | string | null;

interface CountryData {
  continent: string;
  country: string;
  population: Entry;
  cases: {
    new: Entry;
    active: Entry;
    critical: Entry;
    recovered: Entry;
    '1M_pop': Entry;
    total: Entry;
  };
  deaths: {
    new: Entry;
    '1M_pop': Entry;
    total: Entry;
  };
  tests: {
    '1M_pop': Entry;
    total: Entry;
  };
  day: string;
  time: string;
}

const countryMap: Record<string, string> = {
  'United States': 'USA',
  'South Korea': 'S-Korea',
};

function getCountrySearch(country?: string) {
  if (!country) return '';
  return `?country=${countryMap[country] || country}`;
}

/**
 * @param {string} country Optional
 */
const fetchData = async (country?: string): Promise<Array<CountryData>> => {
  const { covidApiHost, covidApiKey, covidApiUrl } = getPrivateEnvVars();
  const resp = await fetch(`${covidApiUrl}/statistics${getCountrySearch(country)}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/octet-stream',
      'x-rapidapi-host': covidApiHost,
      'x-rapidapi-key': covidApiKey,
    },
  });
  const json = await resp.json();
  console.log(json);
  const { response, errors } = json;
  if (errors.length || !response) {
    console.error('something went wrong', errors);
    throw Error('error while fetching country data');
  }
  return response;
};

/**
 * @param {string} country Optional
 */
const getDataByCountry = async (country?: string): Promise<CountryData | null> => {
  const response = await fetchData(country);
  const [countryData] = response;
  if (!countryData) {
    console.error(`no country data found for ${country}`);
    return null;
  }
  return countryData;
};

/**
 * @param {array} countries Required
 */
const getDataByCountries = async (countries: Array<string>): Promise<Array<CountryData> | null> => {
  const response = await fetchData();
  const countiesData = response.filter(
    (data) => !!countries.map((country) => countryMap[country] || country).find((country) => data.country === country),
  );
  if (!countiesData || !countiesData.length) {
    console.error(`no countries data found for ${countries}`);
    return null;
  }

  return countiesData;
};

export type { CountryData };

export { getDataByCountry, getDataByCountries };

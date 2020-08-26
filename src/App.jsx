/* global ssmlDocument */
import React, { useState, useMemo } from 'react';

import isCountryIntent from './utils/isCountryIntent';
import isCountriesIntent from './utils/isCountriesIntent';
import intents from './enums/intents';
import { CountryProvider } from './contexts/country';
import { CountriesProvider } from './contexts/countries';
import CountryDeaths from './handlers/country/deaths';
import CountryPopulation from './handlers/country/population';
import CountryCasesSummary from './handlers/country/cases/cases';
import CountryTotalCases from './handlers/country/cases/total';
import CountryPerMillionCases from './handlers/country/cases/million';
import CountryNewCases from './handlers/country/cases/new';
import CountryActiveCases from './handlers/country/cases/active';
import CountryTests from './handlers/country/tests';
import CountriesCases from './handlers/countries/cases/cases';
import UnsupportedIntent from './components/errors/unsupported';

const routes = [
  // country death
  {
    intent: intents.countryDeaths,
    handler: <CountryDeaths />,
  },
  // country population
  {
    intent: intents.countryPopulation,
    handler: <CountryPopulation />,
  },
  // country cases
  {
    intent: intents.countryCases,
    handler: <CountryCasesSummary />,
  },
  {
    intent: intents.countryTotalCases,
    handler: <CountryTotalCases />,
  },
  {
    intent: intents.countryCasesPerMil,
    handler: <CountryPerMillionCases />,
  },
  {
    intent: intents.countryNewCases,
    handler: <CountryNewCases />,
  },
  {
    intent: intents.countryActiveCases,
    handler: <CountryActiveCases />,
  },
  // country tests
  {
    intent: intents.countryTests,
    handler: <CountryTests />,
  },
  // countries
  {
    intent: intents.countriesCases,
    handler: <CountriesCases />,
  },
];

const App = () => {
  const [intent] = useState(ssmlDocument.intent);
  const route = useMemo(() => routes.find(r => r.intent === intent), [intent]);
  if (!route) {
    return <UnsupportedIntent />;
  }

  if (isCountryIntent(intent)) {
    return (
      <CountryProvider>
        <p>{route.handler}</p>
      </CountryProvider>
    );
  }

  if (isCountriesIntent(intent)) {
    return (
      <CountriesProvider>
        <p>{route.handler}</p>
      </CountriesProvider>
    );
  }

  return <p>{route.handler}</p>;
};

export default App;

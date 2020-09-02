import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { documentType, conversationType } from 'react-ssml-dom';

import isCountryIntent from './utils/isCountryIntent';
import isCountriesIntent from './utils/isCountriesIntent';
import isTotalIntent from './utils/isTotalIntent';
import intents from './enums/intents';
import { ConversationProvider } from './contexts/conversation';
import { DocumentProvider } from './contexts/document';
import { CountryProvider } from './contexts/country';
import { CountriesProvider } from './contexts/countries';
import { TotalProvider } from './contexts/total';
import CountryDeaths from './handlers/country/deaths';
import CountryPopulation from './handlers/country/population';
import CountryCasesSummary from './handlers/country/cases/cases';
import CountryTotalCases from './handlers/country/cases/total';
import CountryPerMillionCases from './handlers/country/cases/million';
import CountryNewCases from './handlers/country/cases/new';
import CountryActiveCases from './handlers/country/cases/active';
import CountryTests from './handlers/country/tests';
import CountriesCases from './handlers/countries/cases/cases';
import TotalSummary from './handlers/total/summary';
import TotalCases from './handlers/total/cases';
import TotalDeaths from './handlers/total/deaths';
import TotalTests from './handlers/total/tests';
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
  // total
  {
    intent: intents.totalSummary,
    handler: <TotalSummary />,
  },
  {
    intent: intents.totalCases,
    handler: <TotalCases />,
  },
  {
    intent: intents.totalDeaths,
    handler: <TotalDeaths />,
  },
  {
    intent: intents.totalTests,
    handler: <TotalTests />,
  },
];

const Wrapper = ({ conv, doc, children }) => (
  <ConversationProvider conv={conv}>
    <DocumentProvider doc={doc}>{children}</DocumentProvider>
  </ConversationProvider>
);

Wrapper.propTypes = {
  conv: conversationType.isRequired,
  doc: documentType.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

const App = ({ conv, doc }) => {
  const [intent] = useState(conv.intent);
  const route = useMemo(() => routes.find(r => r.intent === intent), [intent]);
  if (!route) {
    return (
      <Wrapper conv={conv} doc={doc}>
        <UnsupportedIntent />
      </Wrapper>
    );
  }

  if (isCountriesIntent(intent)) {
    return (
      <Wrapper conv={conv} doc={doc}>
        <CountriesProvider>
          <p>{route.handler}</p>
        </CountriesProvider>
      </Wrapper>
    );
  }

  if (isCountryIntent(intent)) {
    return (
      <Wrapper conv={conv} doc={doc}>
        <CountryProvider>
          <p>{route.handler}</p>
        </CountryProvider>
      </Wrapper>
    );
  }

  if (isTotalIntent(intent)) {
    return (
      <Wrapper conv={conv} doc={doc}>
        <TotalProvider>
          <p>{route.handler}</p>
        </TotalProvider>
      </Wrapper>
    );
  }

  return (
    <Wrapper conv={conv} doc={doc}>
      <p>{route.handler}</p>
    </Wrapper>
  );
};

App.propTypes = {
  conv: conversationType,
  doc: documentType,
};

export default App;

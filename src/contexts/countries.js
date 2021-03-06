import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import loadingStatus from '../enums/loadingStatus';
import { getDataByCountries } from '../covid-api';
import { ConversationContext } from './conversation';
import useStatus from '../hooks/useStatus';
import CountriesPrompt from '../components/prompts/countries';
import CountriesTimeout from '../components/timeouts/countries';
import CountriesError from '../components/errors/countries';

const CountriesContext = React.createContext({
  countries: undefined,
  countriesData: undefined,
});

function CountriesProvider({ children }) {
  const { conv } = useContext(ConversationContext);
  const [countries] = useState(conv.getParameter('countries'));
  const [countriesData, setCountriesData] = useState();
  const { status, setStatus } = useStatus();
  console.log('fetching status', status);

  useEffect(() => {
    if (countries && countries.length && status === loadingStatus.isIdle) {
      setStatus(loadingStatus.isLoading);
      const fetchCountriesData = async () => {
        try {
          const data = await getDataByCountries(countries);
          setCountriesData(data);
          setStatus(loadingStatus.hasSucceeded);
        } catch (err) {
          setStatus(loadingStatus.hasFailed);
        }
      };
      fetchCountriesData();
    }
  }, [countries, setStatus, status]);

  const context = {
    countries,
    countriesData,
  };

  if (!countries || !countries.length) {
    return <CountriesPrompt />;
  }

  if (status === loadingStatus.hasFailed) {
    return <CountriesError />;
  }

  if (status === loadingStatus.hasSucceeded) {
    return (
      <CountriesContext.Provider value={context}>
        {children}
      </CountriesContext.Provider>
    );
  }

  return <CountriesTimeout />;
}

CountriesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { CountriesContext, CountriesProvider };

import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import loadingStatus from '../enums/loadingStatus';
import { getDataByCountry } from '../covid-api';
import { ConversationContext } from './conversation';
import useStatus from '../hooks/useStatus';
import CountryPrompt from '../components/prompts/country';
import CountryTimeout from '../components/timeouts/country';
import CountryError from '../components/errors/country';

const CountryContext = React.createContext({
  country: undefined,
  countryData: undefined,
});

function CountryProvider({ children }) {
  const { conv } = useContext(ConversationContext);
  const [country] = useState(conv.getParameter('country'));
  const [countryData, setCountryData] = useState();
  const { status, setStatus } = useStatus();
  console.log('fetching status', status);

  useEffect(() => {
    if (country && status === loadingStatus.isIdle) {
      setStatus(loadingStatus.isLoading);
      const fetchCountryData = async () => {
        try {
          const data = await getDataByCountry(country);
          setCountryData(data);
          setStatus(loadingStatus.hasSucceeded);
        } catch (err) {
          setStatus(loadingStatus.hasFailed);
        }
      };
      fetchCountryData();
    }
  }, [country, setStatus, status]);

  const context = {
    country,
    countryData,
  };

  if (!country) {
    return <CountryPrompt />;
  }

  if (status === loadingStatus.hasFailed) {
    return <CountryError />;
  }

  if (status === loadingStatus.hasSucceeded) {
    return (
      <CountryContext.Provider value={context}>
        {children}
      </CountryContext.Provider>
    );
  }

  return <CountryTimeout />;
}

CountryProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { CountryContext, CountryProvider };

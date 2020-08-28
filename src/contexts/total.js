import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import loadingStatus from '../enums/loadingStatus';
import { getDataByCountry } from '../covid-api';
import useStatus from '../hooks/useStatus';
import TotalTimeout from '../components/timeouts/total';
import TotalError from '../components/errors/total';

const TotalContext = React.createContext({
  data: undefined,
});

function TotalProvider({ children }) {
  const [data, setData] = useState();
  const { status, setStatus } = useStatus();
  console.log('fetching status', status);

  useEffect(() => {
    if (status === loadingStatus.isIdle) {
      setStatus(loadingStatus.isLoading);
      const fetchCountryData = async () => {
        try {
          const fetched = await getDataByCountry('All');
          setData(fetched);
          setStatus(loadingStatus.hasSucceeded);
        } catch (err) {
          setStatus(loadingStatus.hasFailed);
        }
      };
      fetchCountryData();
    }
  }, [setStatus, status]);

  const context = {
    data,
  };

  if (status === loadingStatus.hasFailed) {
    return <TotalError />;
  }

  if (status === loadingStatus.hasSucceeded) {
    return (
      <TotalContext.Provider value={context}>{children}</TotalContext.Provider>
    );
  }

  return <TotalTimeout />;
}

TotalProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export { TotalContext, TotalProvider };

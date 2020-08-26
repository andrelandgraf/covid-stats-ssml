/* global ssmlDocument */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getCountryName } from '../../i18n';
import { CountryContext } from '../../contexts/country';

const Population = ({ reportNoData }) => {
  const {
    countryData: { country, population },
  } = useContext(CountryContext);

  useEffect(() => {
    ssmlDocument.setReady();
  }, []);

  if (!population && !reportNoData) return null;

  if (!population && reportNoData) {
    return (
      <s>{`Unfortunately, there is no data available about the population of ${getCountryName(
        country
      )}`}</s>
    );
  }

  return (
    <s>{`${getCountryName(
      country,
      true
    )} has a population of ${population}.`}</s>
  );
};

Population.propTypes = {
  reportNoData: PropTypes.bool,
};

Population.defaultProps = {
  reportNoData: true,
};

export default Population;

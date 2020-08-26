/* global ssmlDocument */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getCountryName } from '../../../i18n';
import { CountryContext } from '../../../contexts/country';

const ActiveCases = ({ reportNoData, standalone }) => {
  const {
    countryData: { country, cases },
  } = useContext(CountryContext);

  useEffect(() => {
    if (standalone) {
      ssmlDocument.setReady();
    }
  }, [standalone]);

  if (!cases || !cases.active) {
    if (!reportNoData) {
      return null;
    }
    return (
      <s>{`Unfortunately, there is no data available about the active number of cases in ${getCountryName(
        country
      )}`}</s>
    );
  }

  const { active: activeCases } = cases;

  return (
    <s>
      {standalone
        ? `There are currently ${activeCases} active cases reported in ${getCountryName(
            country
          )}.`
        : `And there are now ${activeCases} active cases.`}
    </s>
  );
};

ActiveCases.propTypes = {
  reportNoData: PropTypes.bool,
  standalone: PropTypes.bool,
};

ActiveCases.defaultProps = {
  reportNoData: true,
  standalone: true,
};

export default ActiveCases;

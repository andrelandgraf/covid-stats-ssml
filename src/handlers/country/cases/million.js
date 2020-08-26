/* global ssmlDocument */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { getCountryName } from '../../../i18n';
import { CountryContext } from '../../../contexts/country';

const PerMillionCases = ({ reportNoData, standalone }) => {
  const {
    countryData: { country, cases },
  } = useContext(CountryContext);

  useEffect(() => {
    if (standalone) {
      ssmlDocument.setReady();
    }
  }, [standalone]);

  if (!cases || !cases['1M_pop']) {
    if (!reportNoData) {
      return null;
    }
    return (
      <s>{`Unfortunately, there is no data available about the number of cases per million population in ${getCountryName(
        country
      )}`}</s>
    );
  }

  const { '1M_pop': perMillionCases } = cases;

  return (
    <s>
      {standalone
        ? `There have been ${perMillionCases} cases per a million reported in ${getCountryName(
            country
          )}.`
        : `That is ${perMillionCases} cases per a million.`}
    </s>
  );
};

PerMillionCases.propTypes = {
  reportNoData: PropTypes.bool,
  standalone: PropTypes.bool,
};

PerMillionCases.defaultProps = {
  reportNoData: true,
  standalone: true,
};

export default PerMillionCases;

import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { getCountryName } from '../../../i18n';
import { CountryContext } from '../../../contexts/country';
import useReadyOnRender from '../../../hooks/useReadyOnRender';

const TotalCases = ({ reportNoData, standalone }) => {
  const {
    countryData: { country, cases },
  } = useContext(CountryContext);
  useReadyOnRender(standalone);

  if (!cases || !cases.total) {
    if (!reportNoData) {
      return null;
    }
    return (
      <s>{`Unfortunately, there is no data available about the total number of cases in ${getCountryName(
        country
      )}`}</s>
    );
  }

  const { total: totalCases } = cases;

  return (
    <s>
      {standalone
        ? `Overall, there have been ${totalCases} cases reported in ${getCountryName(
            country
          )}.`
        : `Overall, there have been ${totalCases} cases`}
    </s>
  );
};

TotalCases.propTypes = {
  reportNoData: PropTypes.bool,
  standalone: PropTypes.bool,
};

TotalCases.defaultProps = {
  reportNoData: true,
  standalone: true,
};

export default TotalCases;

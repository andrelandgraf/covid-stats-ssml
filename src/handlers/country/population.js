import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { getCountryName } from '../../i18n';
import { CountryContext } from '../../contexts/country';
import useReadyOnRender from '../../hooks/useReadyOnRender';

const Population = ({ reportNoData }) => {
  const {
    countryData: { country, population },
  } = useContext(CountryContext);
  useReadyOnRender();

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

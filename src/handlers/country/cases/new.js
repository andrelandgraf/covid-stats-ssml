import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { getCountryName } from '../../../i18n';
import { CountryContext } from '../../../contexts/country';
import useReadyOnRender from '../../../hooks/useReadyOnRender';

const NewCases = ({ reportNoData, standalone }) => {
  const {
    countryData: { country, cases },
  } = useContext(CountryContext);
  useReadyOnRender(standalone);

  if (!cases || !cases.new) {
    if (!reportNoData) {
      return null;
    }
    return (
      <s>{`Unfortunately, there is no data available about newly reported cases in ${getCountryName(
        country
      )}`}</s>
    );
  }

  const { new: newCases } = cases;

  return (
    <s>
      {standalone
        ? `There have been ${newCases} new cases reported in ${getCountryName(
            country
          )}.`
        : `Currently, there are ${newCases} new cases reported.`}
    </s>
  );
};

NewCases.propTypes = {
  reportNoData: PropTypes.bool,
  standalone: PropTypes.bool,
};

NewCases.defaultProps = {
  reportNoData: true,
  standalone: true,
};

export default NewCases;

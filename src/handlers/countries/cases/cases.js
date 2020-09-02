import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { getCountryName } from '../../../i18n';
import { CountriesContext } from '../../../contexts/countries';
import useReadyOnRender from '../../../hooks/useReadyOnRender';

const Country = ({ countryData }) => {
  const { country, cases, population } = countryData;

  if (!cases || !cases['1M_pop'] || !cases.total) {
    return `I am sorry, there seems to be data missing for ${getCountryName(
      country
    )}`;
  }

  const { '1M_pop': perMillionCases, total } = cases;
  return (
    <>
      <s>{`${getCountryName(country, true)} has a total of ${total} cases.`}</s>
      <s>{`With a population of ${population} that is ${perMillionCases} cases per million.`}</s>
    </>
  );
};

Country.propTypes = {
  countryData: PropTypes.shape.isRequired,
};

const SummaryCases = () => {
  useReadyOnRender();
  const { countriesData } = useContext(CountriesContext);

  return (
    <>
      {countriesData.map(country => (
        <Country countryData={country} />
      ))}
    </>
  );
};

export default SummaryCases;

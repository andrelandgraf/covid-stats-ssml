/* global ssmlDocument */
import React, { useContext, useEffect } from 'react';

import { CountryContext } from '../../contexts/country';
import { getCountryName } from '../../i18n';

const Tests = () => {
  const {
    countryData: { country, tests },
  } = useContext(CountryContext);

  useEffect(() => {
    ssmlDocument.setReady();
  }, []);

  if (!tests || !tests['1M_pop'] || !tests.total) {
    return (
      <s>{`Unfortunately, there is no data available about the number of tests in ${getCountryName(
        country
      )}`}</s>
    );
  }

  const { '1M_pop': perMillionTests, total } = tests;

  return (
    <>
      <s>{`${getCountryName(
        country,
        true
      )} have tested ${total} in total. `}</s>
      <s>{`That's ${perMillionTests} tests per one million people.`}</s>
    </>
  );
};

export default Tests;

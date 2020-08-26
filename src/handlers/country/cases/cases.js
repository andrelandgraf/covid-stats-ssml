/* global ssmlDocument */
import React, { useContext, useEffect } from 'react';

import { getCountryName } from '../../../i18n';
import { CountryContext } from '../../../contexts/country';
import TotalCases from './total';
import PerMillionCases from './million';
import NewCases from './new';
import ActiveCases from './active';
import Population from '../population';

const SummaryCases = () => {
  const {
    countryData: { country, cases },
  } = useContext(CountryContext);

  useEffect(() => {
    ssmlDocument.setReady();
  }, []);

  if (!cases) {
    return (
      <s>{`Unfortunately, there is no data available for ${getCountryName(
        country
      )}`}</s>
    );
  }

  return (
    <>
      <s>{`I got the following information for ${getCountryName(country)}`}</s>
      <TotalCases standalone={false} reportNoData={false} />
      <PerMillionCases standalone={false} reportNoData={false} />
      <NewCases standalone={false} reportNoData={false} />
      <ActiveCases standalone={false} reportNoData={false} />
      <Population reportNoData={false} />
    </>
  );
};

export default SummaryCases;

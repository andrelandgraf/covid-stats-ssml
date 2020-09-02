import React, { useContext } from 'react';

import { getCountryName } from '../../i18n';
import { CountryContext } from '../../contexts/country';
import useReadyOnRender from '../../hooks/useReadyOnRender';
import Population from './population';

const Deaths = () => {
  const {
    countryData: { country, deaths },
  } = useContext(CountryContext);
  useReadyOnRender();

  if (!deaths || !deaths.total) {
    return (
      <s>{`Unfortunately, there is no data available about the total number of deaths in ${getCountryName(
        country
      )}`}</s>
    );
  }

  const { total: totalDeaths } = deaths;

  return (
    <>
      <s>
        {`In total, there have been ${totalDeaths} deaths reported in ${getCountryName(
          country
        )}.`}
      </s>
      <Population reportNoData={false} />
    </>
  );
};

export default Deaths;

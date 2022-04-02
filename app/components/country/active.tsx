import { useCountryData } from '~/hooks/useCountryData';
import { getCountryName } from '~/utils/i18n';
import type { CountryProps } from './countryProps';

const ActiveCases = ({ reportNoData, standalone }: CountryProps) => {
  const { country, cases } = useCountryData();

  if (!cases || !cases.active) {
    if (!reportNoData) {
      return null;
    }
    return (
      <s>{`Unfortunately, there is no data available about the active number of cases in ${getCountryName(
        country,
      )}.`}</s>
    );
  }

  const { active: activeCases } = cases;

  return (
    <s>
      {standalone
        ? `There are currently ${activeCases} active cases reported in ${getCountryName(country)}.`
        : `There are now ${activeCases} active cases.`}
    </s>
  );
};

export default ActiveCases;

import { useCountryData } from '~/hooks/useCountryData';
import { getCountryName } from '~/utils/i18n';
import type { CountryProps } from './countryProps';

const PerMillionCases = ({ reportNoData, standalone }: CountryProps) => {
  const { country, cases } = useCountryData();

  if (!cases || !cases['1M_pop']) {
    if (!reportNoData) {
      return null;
    }
    return (
      <s>{`Unfortunately, there is no data available about the number of cases per million population in ${getCountryName(
        country,
      )}.`}</s>
    );
  }

  const { '1M_pop': perMillionCases } = cases;

  return (
    <s>
      {standalone
        ? `There have been ${perMillionCases} cases per a million reported in ${getCountryName(country)}.`
        : `That is ${perMillionCases} cases per a million.`}
    </s>
  );
};

export default PerMillionCases;

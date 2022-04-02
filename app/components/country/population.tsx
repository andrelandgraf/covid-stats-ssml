import { useCountryData } from '~/hooks/useCountryData';
import { getCountryName } from '~/utils/i18n';
import type { CountryProps } from './countryProps';

const Population = ({ reportNoData }: CountryProps) => {
  const { country, population } = useCountryData();

  if (!population && !reportNoData) return null;

  if (!population && reportNoData) {
    return <s>{`Unfortunately, there is no data available about the population of ${getCountryName(country)}.`}</s>;
  }

  return <s>{`${getCountryName(country, true)} has a population of ${population}.`}</s>;
};

export default Population;

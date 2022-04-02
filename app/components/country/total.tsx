import { useCountryData } from '~/hooks/useCountryData';
import { getCountryName } from '~/utils/i18n';
import type { CountryProps } from './countryProps';

const TotalCases = ({ reportNoData, standalone }: CountryProps) => {
  const { country, cases } = useCountryData();

  if (!cases || !cases.total) {
    if (!reportNoData) {
      return null;
    }
    return (
      <s>{`Unfortunately, there is no data available about the total number of cases in ${getCountryName(
        country,
      )}.`}</s>
    );
  }

  const { total: totalCases } = cases;

  return (
    <s>
      {standalone
        ? `Overall, there have been ${totalCases} cases reported in ${getCountryName(country)}.`
        : `Overall, there have been ${totalCases} cases.`}
    </s>
  );
};

export default TotalCases;

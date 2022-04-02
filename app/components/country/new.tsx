import { useCountryData } from '~/hooks/useCountryData';
import { getCountryName } from '~/utils/i18n';
import type { CountryProps } from './countryProps';

const NewCases = ({ reportNoData, standalone }: CountryProps) => {
  const { country, cases } = useCountryData();

  if (!cases || !cases.new) {
    if (!reportNoData) {
      return null;
    }
    return (
      <s>{`Unfortunately, there is no data available about newly reported cases in ${getCountryName(country)}.`}</s>
    );
  }

  const { new: newCases } = cases;

  return (
    <s>
      {standalone
        ? `There have been ${newCases} new cases reported in ${getCountryName(country)}.`
        : `Currently, there are ${newCases} new cases reported.`}
    </s>
  );
};

export default NewCases;

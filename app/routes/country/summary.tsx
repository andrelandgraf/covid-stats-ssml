import { getCountryName } from '~/utils/i18n';
import TotalCases from '~/components/country/total';
import PerMillionCases from '~/components/country/million';
import NewCases from '~/components/country/new';
import ActiveCases from '~/components/country/active';
import Population from '~/components/country/population';
import Deaths from '~/components/country/deaths';
import { useCountryData } from '~/hooks/useCountryData';

const SummaryIntent = () => {
  const { country, cases } = useCountryData();

  if (!cases) {
    return <s>{`Unfortunately, there is no data available for ${getCountryName(country)}.`}</s>;
  }

  return (
    <>
      <s>{`I got the following information for ${getCountryName(country)}.`}</s>
      <Population standalone={false} reportNoData={false} />
      <TotalCases standalone={false} reportNoData={false} />
      <PerMillionCases standalone={false} reportNoData={false} />
      <Deaths />
      <NewCases standalone={false} reportNoData={false} />
      <ActiveCases standalone={false} reportNoData={false} />
    </>
  );
};

export default SummaryIntent;

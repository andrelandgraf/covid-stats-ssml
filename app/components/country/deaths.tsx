import { useCountryData } from '~/hooks/useCountryData';
import { getCountryName } from '~/utils/i18n';

const Deaths = () => {
  const { country, deaths } = useCountryData();

  if (!deaths || !deaths.total) {
    return (
      <s>{`Unfortunately, there is no data available about the total number of deaths in ${getCountryName(
        country,
      )}.`}</s>
    );
  }

  const { total: totalDeaths } = deaths;

  return (
    <>
      <s>{`In total, there have been ${totalDeaths} deaths reported in ${getCountryName(country)}.`}</s>
    </>
  );
};

export default Deaths;

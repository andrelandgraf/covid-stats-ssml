import { useCountryData } from '~/hooks/useCountryData';
import { getCountryName } from '~/utils/i18n';

const TestsIntent = () => {
  const { country, tests } = useCountryData();

  if (!tests || !tests['1M_pop'] || !tests.total) {
    return <s>{`Unfortunately, there is no data available about the number of tests in ${getCountryName(country)}`}</s>;
  }

  const { '1M_pop': perMillionTests, total } = tests;

  return (
    <>
      <s>{`${getCountryName(country, true)} have tested ${total} in total. `}</s>
      <s>{`That's ${perMillionTests} tests per one million people.`}</s>
    </>
  );
};

export default TestsIntent;

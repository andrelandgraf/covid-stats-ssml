import { useTotalData } from '~/hooks/useTotalData';
import type { TotalProps } from './totalProps';

const Deaths = ({ standalone, reportNoData }: TotalProps) => {
  const { deaths } = useTotalData();

  if (!deaths || !deaths.total) {
    if (!reportNoData) {
      return null;
    }
    return <s>Unfortunately, there is no data available for the total number of deaths.</s>;
  }

  const { total: totalDeaths } = deaths;

  return (
    <s>
      {standalone
        ? `In total, there have been ${totalDeaths} deaths reported.`
        : `${totalDeaths} people have lost their lives to the virus.`}
    </s>
  );
};

export default Deaths;

import { useTotalData } from '~/hooks/useTotalData';
import type { TotalProps } from './totalProps';

const Cases = ({ standalone, reportNoData }: TotalProps) => {
  const { cases } = useTotalData();

  if (!cases || !cases.total || !cases.active || !cases.new) {
    if (!reportNoData) {
      return null;
    }
    return <s>Unfortunately, there is no data available for the total number of deaths.</s>;
  }

  const { total, active, new: newCases } = cases;

  return (
    <s>
      {standalone
        ? `In total, there have been ${total} cases reported of which ${active} are still active. There has been a change of ${newCases} new cases.`
        : `In total, there have been ${total} cases reported.`}
    </s>
  );
};

export default Cases;

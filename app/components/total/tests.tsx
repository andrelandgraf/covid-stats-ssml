import { useTotalData } from '~/hooks/useTotalData';
import type { TotalProps } from './totalProps';

const Tests = ({ standalone, reportNoData }: TotalProps) => {
  const { tests } = useTotalData();

  if (!tests || !tests.total) {
    if (!reportNoData) {
      return null;
    }
    return <s>Unfortunately, there is no data available for the total number of tests.</s>;
  }

  const { total: totalTests } = tests;

  return (
    <s>
      {standalone
        ? `In total, there have been ${totalTests} tests worldwide.`
        : `So far, ${totalTests} have been reported worldwide.`}
    </s>
  );
};

export default Tests;

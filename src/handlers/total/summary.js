/* global ssmlDocument */
import React, { useEffect, useContext } from 'react';

import { TotalContext } from '../../contexts/total';
import Cases from './cases';
import Deaths from './deaths';
import Tests from './tests';

const Summary = () => {
  const {
    data: { cases },
  } = useContext(TotalContext);

  useEffect(() => {
    ssmlDocument.setReady();
  }, []);

  if (!cases) {
    return (
      <s>
        Unfortunately, there is no data available for the total number of cases.
      </s>
    );
  }

  return (
    <>
      <Cases standalone={false} reportNoData={false} />
      <Deaths standalone={false} reportNoData={false} />
      <Tests standalone={false} reportNoData={false} />
    </>
  );
};

export default Summary;

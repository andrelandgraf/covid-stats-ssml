import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { TotalContext } from '../../contexts/total';
import useReadyOnRender from '../../hooks/useReadyOnRender';

const Tests = ({ standalone, reportNoData }) => {
  const {
    data: { tests },
  } = useContext(TotalContext);
  useReadyOnRender(standalone);

  if (!tests || !tests.total) {
    if (!reportNoData) {
      return null;
    }
    return (
      <s>
        Unfortunately, there is no data available for the total number of
        deaths.
      </s>
    );
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

Tests.propTypes = {
  reportNoData: PropTypes.bool,
  standalone: PropTypes.bool,
};

Tests.defaultProps = {
  reportNoData: true,
  standalone: true,
};

export default Tests;

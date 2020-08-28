/* global ssmlDocument */
import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { TotalContext } from '../../contexts/total';

const Cases = ({ standalone, reportNoData }) => {
  const {
    data: { cases },
  } = useContext(TotalContext);

  useEffect(() => {
    if (standalone) {
      ssmlDocument.setReady();
    }
  }, [standalone]);

  if (!cases || !cases.total || !cases.active || !cases.new) {
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

  const { total, active, new: newCases } = cases;

  return (
    <s>
      {standalone
        ? `In total, there have been ${total} cases reported of which ${active} are still active. There has been a change of ${newCases} new cases.`
        : `In total, there have been ${total} cases reported.`}
    </s>
  );
};

Cases.propTypes = {
  reportNoData: PropTypes.bool,
  standalone: PropTypes.bool,
};

Cases.defaultProps = {
  reportNoData: true,
  standalone: true,
};

export default Cases;

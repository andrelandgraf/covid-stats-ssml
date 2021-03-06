import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { TotalContext } from '../../contexts/total';
import useReadyOnRender from '../../hooks/useReadyOnRender';

const Deaths = ({ standalone, reportNoData }) => {
  const {
    data: { deaths },
  } = useContext(TotalContext);
  useReadyOnRender(standalone);

  if (!deaths || !deaths.total) {
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

  const { total: totalDeaths } = deaths;

  return (
    <s>
      {standalone
        ? `In total, there have been ${totalDeaths} deaths reported.`
        : `${totalDeaths} have lost there life to the virus.`}
    </s>
  );
};

Deaths.propTypes = {
  reportNoData: PropTypes.bool,
  standalone: PropTypes.bool,
};

Deaths.defaultProps = {
  reportNoData: true,
  standalone: true,
};

export default Deaths;

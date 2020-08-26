import { useState } from 'react';
import loadingStatus from '../enums/loadingStatus';

const useStatus = () => {
  const [status, setStatus] = useState(loadingStatus.isIdle);
  return { status, setStatus };
};

export default useStatus;

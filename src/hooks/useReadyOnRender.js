import { useEffect, useContext } from 'react';
import { DocumentContext } from '../contexts/document';

const useReadyOnRender = (shouldSetReady = true) => {
  const { doc } = useContext(DocumentContext);
  useEffect(() => {
    if (shouldSetReady) {
      doc.setReady();
    }
  }, [doc, shouldSetReady]);
};

export default useReadyOnRender;

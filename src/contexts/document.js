import React from 'react';
import PropTypes from 'prop-types';
import { documentType } from 'react-ssml-dom';

const DocumentContext = React.createContext({
  doc: undefined,
});

function DocumentProvider({ doc, children }) {
  const context = { doc };

  return (
    <DocumentContext.Provider value={context}>
      {children}
    </DocumentContext.Provider>
  );
}

DocumentProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  doc: documentType,
};

export { DocumentContext, DocumentProvider };

import React from 'react';
import PropTypes from 'prop-types';
import { conversationType } from 'react-ssml-dom';

const ConversationContext = React.createContext({
  conv: undefined,
});

function ConversationProvider({ conv, children }) {
  const context = { conv };

  return (
    <ConversationContext.Provider value={context}>
      {children}
    </ConversationContext.Provider>
  );
}

ConversationProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  conv: conversationType,
};

export { ConversationContext, ConversationProvider };

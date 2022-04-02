const target = 'Simple JSON (default)';

const canBuildConversation = (request) => {
  const { intent } = request;
  return !!intent;
};

const buildConversation = (request) => {
  const { intent, parameters, user, queryText, sessionId, locale = 'en-US' } = request;
  return {
    orginalRequest: request,
    intent,
    parameters: parameters || {},
    target,
    locale,
    user,
    queryText,
    sessionId,
  };
};

const buildPayload = (conversation) => ({
  ...conversation.response,
});

const SimpleJSON = {
  target,
  canBuildConversation,
  buildConversation,
  buildPayload,
};

export { SimpleJSON };

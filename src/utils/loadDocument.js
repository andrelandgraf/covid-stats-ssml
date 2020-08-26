/* global ssmlDocument */

const loadDocument = request => {
  const { intent, contexts } = request;
  if (!intent || !contexts) {
    console.error('missing intent or contexts in request');
    throw Error('missing intent or contexts in request');
  }
  ssmlDocument.intent = intent;
  ssmlDocument.contexts = contexts;
  ssmlDocument.locale = 'en';
};

export default loadDocument;

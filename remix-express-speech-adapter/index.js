import Conversation, { ActionsOnGoogle, SimpleJSON } from '../conversation';

const stream = require('stream');
const node = require('@remix-run/node');
const { installGlobals } = require('@remix-run/node');
const serverRuntime = require('@remix-run/server-runtime');

installGlobals();

function createRequestHandler({ build, getLoadContext, intentToURL, mode = process.env.NODE_ENV }) {
  const platform = {};
  const handleRequest = serverRuntime.createRequestHandler(build, platform, mode);
  return async (req, res, next) => {
    try {
      const conversation = new Conversation();
      conversation.useAdapter(SimpleJSON).useAdapter(ActionsOnGoogle);
      const isSpeechRequest = req.body && conversation.canHandleRequest(req.body);
      console.log('isSpeechRequest', isSpeechRequest);
      if (isSpeechRequest) {
        global.conversation = conversation;
        conversation.handleRequest(req.body);
      }
      let request = createRemixRequest(req, isSpeechRequest, conversation, intentToURL);
      let loadContext = typeof getLoadContext === 'function' ? getLoadContext(req, res) : undefined;
      let response = await handleRequest(request, loadContext);
      sendSpeechResponse(res, response);
    } catch (error) {
      next(error);
    }
  };
}

function createRemixHeaders(requestHeaders) {
  const headers = new node.Headers();
  for (let [key, values] of Object.entries(requestHeaders)) {
    if (values) {
      if (Array.isArray(values)) {
        for (let value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }
  return headers;
}

function createRemixRequest(req, isSpeechReq, conversation, intentToURL) {
  let urlStr = req.url;

  // Rewrite req if it's a speech request
  if (isSpeechReq) {
    urlStr = `/${intentToURL ? intentToURL(conversation.intent) : conversation.intent}`;
    req.method = 'GET';
  }

  let origin = `${req.protocol}://${req.get('host')}`;
  let url = new URL(urlStr, origin);
  console.log('url', url);
  let init = {
    method: req.method,
    headers: createRemixHeaders(req.headers),
    signal: void 0,
    abortController: null,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.pipe(
      new stream.PassThrough({
        highWaterMark: 16384,
      }),
    );
  }

  return new node.Request(url.href, init);
}

function sendSpeechResponse(res, response) {
  res.statusMessage = response.statusText;
  res.status(response.status);

  for (let [key, values] of Object.entries(response.headers.raw())) {
    for (let value of values) {
      res.append(key, value);
    }
  }

  if (global.conversation) {
    const ssml = response.body.toString();
    const json = global.conversation.buildPayload(ssml);
    res.set('Content-Type', 'application/json');
    res.json(json);
  } else {
    if (Buffer.isBuffer(response.body)) {
      res.end(response.body);
    } else if (response.body?.pipe) {
      response.body.pipe(res);
    } else {
      res.end();
    }
  }
}

export { createRequestHandler };

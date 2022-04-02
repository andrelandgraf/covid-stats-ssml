import { SimpleJSON } from './adapters';

export * from './adapters';

export default class Conversation {
  request;
  locale = 'en-US';
  intent;
  adapter;
  parameters = {};
  user;
  queryText;
  sessionId;
  response = {
    reply: '',
    contexts: [],
    endConversation: true,
  };

  adapters = [{ adapter: SimpleJSON, map: {} }];

  useAdapter(adapter, map = {}) {
    if (!this.adapters.find((a) => a.adapter === adapter)) {
      this.adapters.push({ adapter, map });
    }
    return this;
  }

  constructor(request) {
    this.request = request;
  }

  static fromJson(json) {
    const conv = new Conversation(json.request);
    conv.locale = json.locale;
    conv.intent = json.intent;
    conv.parameters = json.parameters;
    conv.user = json.user;
    conv.queryText = json.queryText;
    conv.sessionId = json.sessionId;
    conv.response = json.response;
    return conv;
  }

  canHandleRequest(request) {
    return !!this.adapters.find(({ adapter }) => adapter.canBuildConversation(request));
  }

  handleRequest(request) {
    this.request = request || this.request;
    const targetAdapter = this.adapters.find(({ adapter }) => adapter.canBuildConversation(request));
    if (!targetAdapter) {
      throw Error('request does not fit any adapter');
    }
    this.adapter = targetAdapter;
    const { adapter, map } = targetAdapter;
    const {
      locale = this.locale,
      intent = this.intent,
      parameters = this.parameters,
      user = this.user,
      queryText = this.queryText,
      sessionId = this.sessionId,
    } = adapter.buildConversation(request, map);
    this.locale = locale;
    this.intent = intent;
    this.parameters = parameters;
    this.user = user;
    this.queryText = queryText;
    this.sessionId = sessionId;
  }

  buildPayload(reply) {
    if (!this.adapter) {
      if (this.adapters.length === 1) {
        this.adapter = this.adapters[0];
      } else {
        throw Error('no request has been specified');
      }
    }
    if (reply) {
      this.response.reply = reply;
    }
    const { adapter, map } = this.adapter;
    return adapter.buildPayload(this);
  }

  getParameter = (key) => (this.parameters ? this.parameters[key] : undefined);
}

// this is a demo server //
import React from 'react';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import ReactSMML, { Conversation, Document, withAoG } from 'react-ssml-dom';

import { aogMap } from './src/utils/mappers';

import App from './src/App';

dotenv.config();
const app = express();

// configure express middlewares
// helmet first
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Conversation.useBuilder(withAoG, aogMap);

app.post('/', async (req, res) => {
  const conv = new Conversation(req.body);
  const doc = new Document(conv.locale, true, false);

  ReactSMML.render(<App conv={conv} doc={doc} />, doc.body);

  console.log('initial');
  console.log(doc.toString());

  let hasBeenSent = false;

  const sendToUser = logMessage => {
    if (hasBeenSent) {
      console.log('document has already be sent');
      return;
    }
    console.log(logMessage);
    hasBeenSent = true;
    const reply = doc.toString();
    console.log(reply);
    res.json(conv.buildPayload(reply));
  };

  const timeout = setTimeout(() => {
    sendToUser('sent after 5000ms');
  }, 5000);

  await doc.isReady;
  clearTimeout(timeout);
  sendToUser('sent after isReady has resolved');
});

app.listen(8888, () =>
  console.log('Express backend listening on port 8888! 🚀')
);

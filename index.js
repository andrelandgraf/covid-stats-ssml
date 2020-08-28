// this is a demo server //
/* global ssmlDocument */
import React from 'react';
import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
import ReactSMML, { Document, Node } from 'react-ssml-dom';

import loadDocument from './src/utils/loadDocument';
import App from './src/App';

dotenv.config();
const app = express();

// configure express middlewares
// helmet first
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
  const { locale = 'en-US' } = req.body;
  global.ssmlDocument = new Document(locale, true, true);

  loadDocument(req.body);

  ReactSMML.render(<App />, ssmlDocument.body);

  console.log('initial');
  console.log(ssmlDocument.toString());

  let hasBeenSent = false;
  const payload = {};

  const timeout = setTimeout(() => {
    console.log('after timedout at 5000');
    hasBeenSent = true;
    const reply = ssmlDocument.toString();
    payload.reply = reply;
    console.log(reply);
    res.json(payload);
  }, 5000);

  await ssmlDocument.isReady;
  if (hasBeenSent) {
    console.log('has already been sent');
  } else {
    clearTimeout(timeout);
    console.log('after isReady');
    hasBeenSent = true;
    const reply = ssmlDocument.toString();
    payload.reply = reply;
    console.log(reply);
    res.json(payload);
  }
});

app.listen(8888, () =>
  console.log('Express backend listening on port 8888! 🚀')
);

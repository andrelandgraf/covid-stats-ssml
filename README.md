<div align="center">
  <img src="banner.png" alt="Covid Stats Banner" />
</div>
<h1 align="center">
  SSML COVID-19 Stats - ReactSSML
</h1>

This is a demo app that illustrates how [ReactSSML](https://www.npmjs.com/package/react-ssml-dom) lets you use React and Remix to build voice applications! It is built with [Remix](https://remix.run) and implements a custom Remix adapter to receive Dialogflow (Google Actions) requests. The covid stats data used in this demo is provided by rapidapi.com - [covid-193](https://rapidapi.com/api-sports/api/covid-193).

## ❓ ReactSSML

![Hello World SSML using ReactSSML](code.png)

This application uses [ReactSSML](https://www.npmjs.com/package/react-ssml-dom) and runs React and Remix to develop voice UIs. ReactSSML provides a simple custom React renderer that let's you use React and JSX to create SSML output.

I wrote a small article about [my motivation](https://medium.com/@andre.timo.landgraf/a-react-renderer-for-ssml-91cdd1d66b3e) for using React for voice UIs.

## 🌟 Quick Start

Get the source code

```bash
git clone https://github.com/andrelandgraf/covid-stats-ssml.git
cd covid-stats-ssml/
```

### Create a `.env` file

```bash
touch .env
```

Go to https://rapidapi.com/api-sports/api/covid-193 and get your credentials (free to use).

Your `.env` file should look something like this:

```
COVID_API_URL=https://covid-193.p.rapidapi.com
COVID_API_HOST=covid-193.p.rapidapi.com
COVID_API_KEY=[key]
```

### Start the dev server

```bash
npm run dev

> dev:remix
> remix watch

[nodemon] starting `node ./build/index.js`
```

This server runs a Remix app to render the React app server-side. Find more information about how to work with Remix in the [Remix.md](./Remix.md) file.

## Send a request to the server

Use Postman or a tool of your choice to hit the fulfillment endpoint.

```bash
curl -X POST http://localhost:3000/
     -H "Content-Type: application/json"
     -d '{ "intent": "country/summary", "parameters": { "country": "Japan" } }'
```

And there we go!

```json
{
  "reply": "<?xml version=\"1.0\"?><speak version=\"1.1\" xmlns=\"http://www.w3.org/2001/10/synthesis\" xml:lang=\"en-US\"><s>I got the following information for Japan.</s> <s>Japan has a population of 125798669.</s> <s>Overall, there have been 6702086 cases.</s> <s>That is 53276 cases per a million.</s> <s>In total, there have been 28286 deaths reported in Japan.</s> <s>Currently, there are +48245 new cases reported.</s> <s>There are now 470278 active cases.</s></speak>",
  "contexts": [],
  "endConversation": true
}
```

## 🃏 Example requests

For a full list of possible intents checkout the [curl test file](./tests/rest.http).

**Pro Tip:** Get yourself the [REST Client VS Code extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) to run the tests from VS Code!

PS: Don't forget to set your API key in the `.env` file!

## 🤖 Google Assistant

You can import the [Dialogflow model](./dialogflow) to use it with Google Assistant!

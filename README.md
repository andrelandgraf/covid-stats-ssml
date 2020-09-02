<h1 align="center">
  SSML COVID-19 Stats - ReactSSML
</h1>
<div align="center">
  <img src="code.png" alt="Hello World SSML" />
</div>

## ❓What is this?

Query covid-19 stats. Find the data source [here](https://rapidapi.com/api-sports/api/covid-193).

This is a demo express app that returns SSML based on a simple request (similar to what a nlu provider would send).

It runs React to develop voice UIs. [ReactSSML](https://www.npmjs.com/package/react-ssml-dom) provides a simple custom React renderer that let's you use React and JSX to create SSML output.

I wrote a small article about [my motivation](https://medium.com/@andre.timo.landgraf/a-react-renderer-for-ssml-91cdd1d66b3e).

This project is brand new, so if you run into issues or have questions, open up an issue and let me know! Any feedback is highly appreciated.

## 🌟 Quick Start

Get the source code

```bash
git clone https://github.com/andrelandgraf/covid-stats-ssml.git
cd covid-stats-ssml/
```

Create a `.env` file

```bash
touch .env
```

Go to https://rapidapi.com/api-sports/api/covid-193 and get your credentials (free to use).

Your `.env` file should look something like this:

```
RAPID_API_URL=https://covid-193.p.rapidapi.com/statistics
RAPID_API_HOST=#hostname
RAPID_API_KEY=#key
```

Build the code

```bash
npm run build
```

Start the server 

```bash
npm run start

> covid-19-ssml@1.0.0 start /covid-19-ssml
> node dist/main.js

Express backend listening on port 8888! 🚀
```

***Express server is now running on port 8888!***

Use Postman or a tool of your choice to hit the fulfillment endpoint.

```bash
curl -X POST http://localhost:8888/
     -H "Content-Type: application/json"
     -d '{ "intent": "COUNTRIES_CASES", "parameters": { "countries": ["Germany", "USA"] } }'
```

And there we go!

```json
{
    "reply": "<speak> <p> <s> The USA has a total of 5952840 cases.</s>
    <s> With a population of 331293410 that is 17968 cases per million.</s>
    <s>  Germany has a total of 237568 cases.</s>
    <s>  With a population of 83824401 that is 2834 cases per million.</s> </p> </speak>"
}
```

## 🃏 Example requests

For a full list of possible intents checkout `./src/enums/intents`

Try the following requests:

- Everything about cases in Japan

```json
{
    "intent": "COUNTRY_CASES",
    "parameters": { "country": "Japan" }
}
```

- Number of new cases in the South Korea

```json
{
    "intent": "COUNTRY_NEW_CASES",
    "parameters": { "country": "S-Korea" }
}
```

- Number of total cases in Germany

```json
{
    "intent": "COUNTRY_TOTAL_CASES",
    "parameters": { "country": "Germany" }
}
```

- Number of active cases in the Netherlands

```json
{
    "intent": "COUNTRY_ACTIVE_CASES",
    "parameters": { "country": "Netherlands" }
}
```

- Number of cases per million in Mexico

```json
{
    "intent": "COUNTRY_CASES_PER_MILLION",
    "parameters": { "country": "Mexico" }
}
```

- Number of tests in India

```json
{
    "intent": "COUNTRY_TESTS",
    "parameters": { "country": "India" }
}
```

- Number of deaths in the USA

```json
{
    "intent": "COUNTRY_DEATHS",
    "parameters": { "country": "USA" }
}
```

- Population in Germany

```json
{
    "intent": "COUNTRY_POPULATION",
    "parameters": { "country": "Germany" }
}
```

- Comparison between France, Germany, and Spain

```json
{
    "intent": "COUNTRIES_CASES",
    "parameters": { "countries": ["France", "Germany", "Spain"] }
}
```

- Total data worldwide

```json
{
    "intent": "TOTAL_SUMMARY"
}
```

- Total cases

```json
{
    "intent": "TOTAL_CASES"
}
```

- Total deaths

```json
{
    "intent": "TOTAL_DEATHS"
}
```

- Total tests

```json
{
    "intent": "TOTAL_TESTS"
}
```
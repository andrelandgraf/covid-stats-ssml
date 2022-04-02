import invariant from 'tiny-invariant';

type PrivateEnvVars = {
  covidApiUrl: string;
  covidApiHost: string;
  covidApiKey: string;
};

function getPrivateEnvVars(): PrivateEnvVars {
  const covidApiUrl = process.env.COVID_API_URL;
  const covidApiHost = process.env.COVID_API_HOST;
  const covidApiKey = process.env.COVID_API_KEY;
  invariant(covidApiUrl && typeof covidApiUrl === 'string', 'Covid API URL is not defined');
  invariant(covidApiHost && typeof covidApiHost === 'string', 'Covid API HOST is not defined');
  invariant(covidApiKey && typeof covidApiKey === 'string', 'Covid API KEY is not defined');
  return {
    covidApiUrl,
    covidApiHost,
    covidApiKey,
  };
}

export { getPrivateEnvVars };
